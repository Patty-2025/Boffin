import { get, onValue, orderByChild, equalTo, limitToFirst, push, query as realtimeQuery, ref, remove, set, update } from 'firebase/database';
import { realtimeDb } from './firebase';

type Data = Record<string, any>;
type Reference = { path: string; id?: string };
type Constraint = { type: 'where' | 'orderBy' | 'limit'; field?: string; op?: string; value?: any; direction?: string; count?: number };
type Query = { path: string; constraints: Constraint[] };

export function collection(_database: unknown, path: string): Reference { return { path: path.replace(/^\/+|\/+$/g, '') }; }

export function doc(databaseOrCollection: unknown, pathOrCollection?: string | Reference, id?: string): Reference {
  const collectionReference = pathOrCollection === undefined && typeof databaseOrCollection === 'object' && databaseOrCollection !== null && 'path' in databaseOrCollection
    ? databaseOrCollection as Reference
    : undefined;
  const path = collectionReference?.path || (typeof pathOrCollection === 'string' ? pathOrCollection : (pathOrCollection as Reference).path);
  const documentId = id || push(ref(realtimeDb, path)).key!;
  return { path: `${path.replace(/\/+$/, '')}/${documentId}`, id: documentId };
}

export function query(source: Reference, ...constraints: Constraint[]): Query { return { path: source.path, constraints }; }
export function where(field: string, op: string, value: any): Constraint { return { type: 'where', field, op, value }; }
export function orderBy(field: string, direction = 'asc'): Constraint { return { type: 'orderBy', field, direction }; }
export function limit(count: number): Constraint { return { type: 'limit', count }; }
export function serverTimestamp(): { '.sv': string } { return { '.sv': 'timestamp' }; }
export function increment(amount: number): { __increment: number } { return { __increment: amount }; }

function resolveValue(value: any, current: any): any {
  if (value?.__increment !== undefined) return (Number(current) || 0) + value.__increment;
  return value;
}

function applyUpdates(current: Data, values: Data): Data {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, resolveValue(value, current[key])]));
}

export async function addDoc(source: Reference, data: Data) {
  const documentRef = doc(realtimeDb, source.path);
  await set(ref(realtimeDb, documentRef.path), data);
  return { id: documentRef.id };
}

export async function setDoc(documentRef: Reference, data: Data, options?: { merge?: boolean }) {
  const target = ref(realtimeDb, documentRef.path);
  if (options?.merge) await update(target, data);
  else await set(target, data);
}

export async function updateDoc(documentRef: Reference, data: Data) {
  const target = ref(realtimeDb, documentRef.path);
  const snapshot = await get(target);
  await update(target, applyUpdates(snapshot.val() || {}, data));
}

export async function deleteDoc(documentRef: Reference) { await remove(ref(realtimeDb, documentRef.path)); }

export async function getDoc(documentRef: Reference) {
  const snapshot = await get(ref(realtimeDb, documentRef.path));
  return { id: documentRef.id || documentRef.path.split('/').pop(), exists: () => snapshot.exists(), data: () => snapshot.val() };
}

function matches(data: any, constraints: Constraint[]) {
  return constraints.filter((constraint) => constraint.type === 'where').every((constraint) => {
    if (constraint.op === '==') return data?.[constraint.field!] === constraint.value;
    return true;
  });
}

function sortDocuments(documents: Array<{ id: string; data: Data }>, constraints: Constraint[]) {
  const ordering = constraints.find((constraint) => constraint.type === 'orderBy');
  if (!ordering) return documents;
  return documents.sort((first, second) => {
    const left = first.data?.[ordering.field!];
    const right = second.data?.[ordering.field!];
    const result = left === right ? 0 : left > right ? 1 : -1;
    return ordering.direction === 'desc' ? -result : result;
  });
}

function getRealtimeQuery(source: Reference | Query) {
  const constraints = 'constraints' in source ? source.constraints : [];
  const whereConstraint = constraints.find((constraint) => constraint.type === 'where' && constraint.op === '==');
  const limitConstraint = constraints.find((constraint) => constraint.type === 'limit');
  let result = realtimeQuery(ref(realtimeDb, source.path));
  if (whereConstraint) result = realtimeQuery(result, orderByChild(whereConstraint.field!), equalTo(whereConstraint.value));
  if (limitConstraint) result = realtimeQuery(result, limitToFirst(limitConstraint.count!));
  return result;
}

export async function getDocs(source: Reference | Query) {
  const path = source.path;
  const constraints = 'constraints' in source ? source.constraints : [];
  const snapshot = await get(getRealtimeQuery(source));
  const value = snapshot.val() || {};
  let documents = Object.entries(value).map(([id, data]) => ({ id, data: data as Data })).filter((document) => matches(document.data, constraints));
  documents = sortDocuments(documents, constraints);
  const max = constraints.find((constraint) => constraint.type === 'limit')?.count;
  if (max !== undefined) documents = documents.slice(0, max);
  return { empty: documents.length === 0, size: documents.length, docs: documents.map((document) => ({ id: document.id, data: () => document.data })) };
}

export function onSnapshot(source: Reference | Query, callback: (snapshot: any) => void, error?: (reason: Error) => void) {
  return onValue(getRealtimeQuery(source), async () => {
    try { callback('id' in source && source.id ? await getDoc(source) : await getDocs(source)); } catch (reason) { error?.(reason as Error); }
  }, error);
}

export async function runTransaction(_database: unknown, callback: (transaction: any) => Promise<void> | void) {
  const writes: Array<{ type: 'set' | 'update'; reference: Reference; data: Data }> = [];
  await callback({
    get: getDoc,
    set: (reference: Reference, data: Data) => writes.push({ type: 'set', reference, data }),
    update: (reference: Reference, data: Data) => writes.push({ type: 'update', reference, data })
  });
  for (const write of writes) {
    if (write.type === 'set') await setDoc(write.reference, write.data);
    else await updateDoc(write.reference, write.data);
  }
}

export function writeBatch(_database: unknown) {
  const writes: Array<() => Promise<void>> = [];
  return {
    set: (reference: Reference, data: Data, options?: { merge?: boolean }) => writes.push(() => setDoc(reference, data, options)),
    delete: (reference: Reference) => writes.push(() => deleteDoc(reference)),
    commit: () => Promise.all(writes.map((write) => write()))
  };
}

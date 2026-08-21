import type { User } from 'firebase/auth';
import { get, ref, runTransaction, update } from 'firebase/database';
import { realtimeDb } from './firebase';

export function fallbackClientId(uid: string): string {
  let hash = 0;
  for (const character of uid) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return String(100000 + (hash % 900000));
}

export async function ensureClientId(user: User): Promise<string> {
  const profileRef = ref(realtimeDb, `users/${user.uid}`);
  const existingSnapshot = await get(profileRef);
  const existingId = existingSnapshot.val()?.clientId;
  if (existingId) return String(existingId);

  const counterRef = ref(realtimeDb, 'counters/clientIds/lastId');
  const counterResult = await runTransaction(counterRef, (currentValue) => {
    const lastId = typeof currentValue === 'number' ? currentValue : 99999;
    return Math.max(lastId + 1, 100000);
  });
  if (!counterResult.committed) throw new Error('Client ID counter was not committed.');

  const assignedId = String(counterResult.snapshot.val());
  await update(profileRef, {
    userId: user.uid,
    email: user.email || '',
    emailVerified: user.emailVerified,
    clientId: assignedId
  });

  return assignedId;
}

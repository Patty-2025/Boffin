import { createHash, randomInt } from 'crypto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

const storePath = process.env.EMAIL_VERIFICATION_STORE || path.join(process.cwd(), '.data', 'email-verification-codes.json');
const codeLifetimeMs = 10 * 60 * 1000;
const resendCooldownMs = 60 * 1000;
const maxAttempts = 5;

type VerificationRecord = { hash: string; expiresAt: number; attempts: number; lastSentAt: number };
type VerificationStore = Record<string, VerificationRecord>;

function hash(value: string) { return createHash('sha256').update(value).digest('hex'); }

async function loadStore(): Promise<VerificationStore> {
  try { return JSON.parse(await readFile(storePath, 'utf8')) as VerificationStore; }
  catch { return {}; }
}

async function saveStore(store: VerificationStore) {
  await mkdir(path.dirname(storePath), { recursive: true });
  await writeFile(storePath, JSON.stringify(store), 'utf8');
}

export async function issueVerificationCode(email: string) {
  const store = await loadStore();
  const existing = store[email];
  if (existing && Date.now() - existing.lastSentAt < resendCooldownMs) {
    throw new Error('RESEND_COOLDOWN');
  }
  const code = randomInt(100000, 1000000).toString();
  store[email] = { hash: hash(code), expiresAt: Date.now() + codeLifetimeMs, attempts: 0, lastSentAt: Date.now() };
  await saveStore(store);
  return code;
}

export async function verifyCode(email: string, code: string) {
  const store = await loadStore();
  const record = store[email];
  if (!record || record.expiresAt < Date.now() || record.attempts >= maxAttempts) {
    delete store[email];
    await saveStore(store);
    return false;
  }
  record.attempts += 1;
  const valid = hash(code) === record.hash;
  if (valid || record.attempts >= maxAttempts) delete store[email];
  await saveStore(store);
  return valid;
}

export const verificationLimits = { codeLifetimeMs, maxAttempts, resendCooldownMs };

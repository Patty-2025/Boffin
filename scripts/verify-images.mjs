// scripts/verify-images.mjs
// Verifies every PNG/JPG in public/ has a valid 8-byte magic signature.
// Exits 0 if all valid, 1 if any are corrupted.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC_DIR = join(ROOT, 'public');

const PNG_SIG = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const JPG_SIG = Buffer.from([0xFF, 0xD8, 0xFF]);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

let total = 0;
let bad = 0;
const badList = [];

for (const file of walk(PUBLIC_DIR)) {
  const lower = file.toLowerCase();
  if (!lower.endsWith('.png') && !lower.endsWith('.jpg') && !lower.endsWith('.jpeg')) continue;
  total++;
  const buf = readFileSync(file);
  const sig = buf.subarray(0, 8);
  let expected;
  if (lower.endsWith('.png')) expected = PNG_SIG;
  else expected = JPG_SIG; // check first 3 bytes for JPG

  const isPng = sig.subarray(0, 8).equals(PNG_SIG);
  const isJpg = sig.subarray(0, 3).equals(JPG_SIG);
  if (!isPng && !isJpg) {
    bad++;
    const rel = relative(ROOT, file);
    const head = Array.from(buf.subarray(0, 16))
      .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
      .join(' ');
    badList.push(`  ${rel}  size=${buf.length}  head=${head}`);
  }
}

console.log(`Scanned: ${total} PNG/JPG files in public/`);
console.log(`Corrupted: ${bad}`);
if (bad > 0) {
  console.log('\nCorrupted files (first 16 bytes shown):');
  for (const line of badList) console.log(line);
  process.exit(1);
} else {
  console.log('All PNG/JPG files have valid magic-byte signatures.');
  process.exit(0);
}

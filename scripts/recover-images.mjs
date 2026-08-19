// Recover corrupted images from assistbridge.online.
// Strategy: SERIAL downloads, large backoff on 429, prioritize critical images.
// Validates every download's magic bytes before writing.

import { readFile, writeFile, stat } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '..', 'public');
const ORIGIN = 'https://assistbridge.online';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const PROGRESS_FILE = resolve(__dirname, '..', 'recover-progress.log');

const MAGIC = {
  png:  [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  jpg:  [0xff, 0xd8, 0xff],
  jpeg: [0xff, 0xd8, 0xff],
  gif:  [0x47, 0x49, 0x46, 0x38],
  ico:  [0x00, 0x00, 0x01, 0x00],
};

function checkMagic(buf, ext) {
  const kind = ext.toLowerCase().replace(/^\./, '');
  if (kind === 'webp') {
    return buf.length >= 12 &&
      buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50;
  }
  const want = MAGIC[kind];
  if (!want) return true;
  if (buf.length < want.length) return false;
  for (let i = 0; i < want.length; i++) if (buf[i] !== want[i]) return false;
  return true;
}

async function isCurrentlyCorrupt(filePath) {
  try {
    const st = await stat(filePath);
    if (st.size < 16) return true;
    const head = (await readFile(filePath)).subarray(0, 16);
    return !checkMagic(head, filePath.split('.').pop());
  } catch {
    return true;
  }
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile()) yield p;
  }
}

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico']);

// Priority order — critical footer/favicon files first
const PRIORITY = [
  /next\/img\/logos\/(DMCA|moneyback|money-back)/i,
  /next\/img\/logos\/(payments|apple-store|boffinglobal)/i,
  /favicon/i,
  /apple-touch-icon|android-chrome/i,
  /next\/img\//i,
  /w3t_/i,
  /profiles\//i,
];

function priorityOf(p) {
  const rel = p.replace(/\\/g, '/');
  for (let i = 0; i < PRIORITY.length; i++) {
    if (PRIORITY[i].test(rel)) return i;
  }
  return PRIORITY.length;
}

function log(line) {
  const ts = new Date().toISOString().slice(11, 19);
  const out = `[${ts}] ${line}`;
  console.log(out);
  // also append to file so progress survives pipe buffering issues
  try { writeFile(PROGRESS_FILE, out + '\n', { flag: 'a' }); } catch {}
}

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchOne(url, { maxAttempts = 6 } = {}) {
  let lastErr = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const resp = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'image/*,*/*;q=0.8' } });
      if (resp.status === 200) {
        return Buffer.from(await resp.arrayBuffer());
      }
      if (resp.status === 429 || resp.status === 403) {
        const retryAfter = parseInt(resp.headers.get('retry-after') || '0', 10);
        const waitMs = retryAfter > 0 ? retryAfter * 1000 : 30_000 + Math.floor(Math.random() * 10_000);
        log(`  429/403 attempt ${attempt}/${maxAttempts} → wait ${(waitMs/1000).toFixed(1)}s`);
        await sleep(waitMs);
        lastErr = new Error(`status ${resp.status}`);
        continue;
      }
      if (resp.status >= 500) {
        const waitMs = 5_000 + Math.floor(Math.random() * 5_000);
        log(`  ${resp.status} attempt ${attempt}/${maxAttempts} → wait ${(waitMs/1000).toFixed(1)}s`);
        await sleep(waitMs);
        lastErr = new Error(`status ${resp.status}`);
        continue;
      }
      throw new Error(`permanent ${resp.status}`);
    } catch (e) {
      lastErr = e;
      if (attempt < maxAttempts) {
        const waitMs = 5_000 + Math.floor(Math.random() * 5_000);
        log(`  net err ${e.message} attempt ${attempt}/${maxAttempts} → wait ${(waitMs/1000).toFixed(1)}s`);
        await sleep(waitMs);
      }
    }
  }
  throw lastErr || new Error('exhausted');
}

async function main() {
  const targets = [];
  for await (const p of walk(PUBLIC_DIR)) {
    const ext = p.slice(p.lastIndexOf('.')).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) continue;
    if (await isCurrentlyCorrupt(p)) targets.push(p);
  }
  targets.sort((a, b) => priorityOf(a) - priorityOf(b));
  log(`Found ${targets.length} corrupt/missing images, sorted by priority.`);
  if (targets.length === 0) { log('Nothing to do.'); return; }

  let ok = 0, fail = 0, skipped = 0;
  for (let i = 0; i < targets.length; i++) {
    const localPath = targets[i];
    const rel = relative(PUBLIC_DIR, localPath).replace(/\\/g, '/');
    const url = `${ORIGIN}/${rel}`;
    log(`[${i+1}/${targets.length}] ${rel}`);
    try {
      const buf = await fetchOne(url);
      if (!checkMagic(buf.subarray(0, 16), localPath.split('.').pop())) {
        log(`  REJECTED bad magic (${buf.length} bytes)`);
        skipped++;
        continue;
      }
      if (buf.length < 50) { log(`  REJECTED too small (${buf.length} B)`); skipped++; continue; }
      await writeFile(localPath, buf);
      log(`  OK ${buf.length} bytes`);
      ok++;
    } catch (e) {
      log(`  FAIL: ${e.message}`);
      fail++;
    }
  }
  log(`DONE ok=${ok} skipped=${skipped} fail=${fail}`);
}

main().catch((e) => { log(`FATAL ${e.message}`); process.exit(1); });

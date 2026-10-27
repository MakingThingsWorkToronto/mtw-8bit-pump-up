#!/usr/bin/env node
// Register one discovery run's picks as candidates in the soundtrack library (skill: mtw-music-discovery).
//   node .claude/skills/mtw-music-discovery/scripts/register-candidates.mjs --records <records/x.json> --run <run-id>
//        --label "<what Matt reads at /m/soundtrack in MTW Studio>" --method similar|taste|trending|popular|editors
//        [--basis <track id>] [--request <request id>] [--queries "q1; q2"] [--read <n tracks read>]
//        [--why <json file: { "<pixabay id>": "why it fits" }>, else each record's own "why"] [--ids 1,2,3 (keep only these, in this order)]
//        [--limit 50] [--min 75] [--max 240] [--dry]
// It filters (already in the library, vocals, seasonal, out of length, unreadable), downloads each kept track's audio
// from Pixabay's CDN into wiki/soundtrack-library/assets/ (never over an existing file), adds it to sources.json as
// status "candidate" with its full credit, and records the run in discovery.json (closing --request). Then run
// soundtrack.mjs build to profile the new tracks.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let root = path.dirname(fileURLToPath(import.meta.url));
while (!existsSync(path.join(root, 'AGENTS.md'))) { const up = path.dirname(root); if (up === root) throw new Error('repo root not found'); root = up; }
const lib = path.join(root, 'wiki', 'soundtrack-library');
const args = process.argv.slice(2), arg = (k, d = null) => { const i = args.indexOf(`--${k}`); return i > -1 ? args[i + 1] : d; };
const recordsFile = arg('records'), run = arg('run'), label = arg('label'), method = arg('method');
if (!recordsFile || !run || !label || !method) { console.error('need --records, --run, --label and --method'); process.exit(2); }
const limit = +arg('limit', 50), min = +arg('min', 75), max = +arg('max', 240), dry = args.includes('--dry');
const why = arg('why') ? JSON.parse(readFileSync(path.resolve(root, arg('why')), 'utf8')) : {};
const onlyIds = arg('ids') ? arg('ids').split(',').map((s) => s.trim()) : null;

const sourcesFile = path.join(lib, 'sources.json'), discoveryFile = path.join(lib, 'discovery.json');
const sources = JSON.parse(readFileSync(sourcesFile, 'utf8'));
const discovery = existsSync(discoveryFile) ? JSON.parse(readFileSync(discoveryFile, 'utf8'))
  : { about: 'Music discovery requests and runs (skill: mtw-music-discovery). Requests come from the Find similar button at /m/soundtrack in MTW Studio; each run lists the candidates it added to sources.json. Process: wiki/site/music-discovery.md.', requests: [], runs: [] };
if (discovery.runs.some((r) => r.id === run)) { console.error(`run ${run} is already recorded`); process.exit(2); }
const recFile = path.resolve(root, recordsFile);
let records = JSON.parse(readFileSync(recFile, 'utf8')).records;
if (onlyIds) records = onlyIds.map((id) => records.find((r) => r.id === id) || { id, error: 'not in the records file' });

const have = new Set(sources.tracks.map((t) => t.id));
// Instrumentals only: the site's music sits under narration-free motion. Seasonal music dates a page.
const VOCAL = /\b(vocals?|voice|singing|singer|sung|choir|lyrics|acapella|a cappella|rapper vocals|female vocal|male vocal)\b/i;
const SEASONAL = /\b(christmas|xmas|halloween|santa|jingle bells|new year)\b/i;
const slug = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60).replace(/-$/, '');
const kept = [], skipped = [];
for (const r of records) {
  const id = `pixabay-${r.id}`;
  // Pixabay files some songs under a "Vocal" genre with no vocal keyword: check the genres too.
  const text = `${r.title} ${r.keywords || ''} ${r.theme || ''} ${(r.genre || []).join(' ')}`;
  const reason = r.error ? r.error : have.has(id) ? 'already in the library' : kept.some((k) => k.id === r.id) ? 'duplicate'
    : !r.title || !r.artist || !r.audio || !r.source ? 'missing title, artist, page or audio'
    : r.vocalTag || VOCAL.test(text) ? 'vocals in its tags' : SEASONAL.test(text) ? 'seasonal'
    : r.seconds && (r.seconds < min || r.seconds > max) ? `length ${r.seconds}s outside ${min}-${max}s` : null;
  if (reason) skipped.push(`${r.id} ${r.title || ''}: ${reason}`); else if (kept.length < limit) kept.push(r); else skipped.push(`${r.id} ${r.title}: over the limit of ${limit}`);
}

const added = [];
for (const [i, r] of kept.entries()) {
  const id = `pixabay-${r.id}`, file = `${id}-${slug(r.title)}.mp3`, dest = path.join(lib, 'assets', file);
  const download = new URL(r.audio).searchParams.get('filename') || path.basename(new URL(r.audio).pathname);
  if (!dry && !existsSync(dest)) {
    const res = await fetch(r.audio, { headers: { 'user-agent': 'Mozilla/5.0 (MTW soundtrack library)' } });
    if (!res.ok || !/audio/.test(res.headers.get('content-type') || '')) { skipped.push(`${r.id} ${r.title}: audio download ${res.status}`); continue; }
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    await new Promise((ok) => setTimeout(ok, 300));
  }
  const genre = (r.genre[0] || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const fits = why[r.id] || r.why || [r.genre.join(', '), r.moods].filter(Boolean).join('; ');
  sources.tracks.push({ id, file, download, provider: 'Pixabay', title: r.title, artist: r.artist, source: r.source,
    license: 'Pixabay Content License', licenseUrl: 'https://pixabay.com/service/license-summary/', genre, published: r.published,
    status: 'candidate',
    discovery: { run, rank: i + 1, basis: arg('basis'), why: fits, cid: !!r.cid, moods: r.moods, seconds: r.seconds,
      popularity: { views: r.views, downloads: r.downloads, likes: r.likes } } });
  added.push(id);
  console.log(`${dry ? 'would add' : 'added'} ${id}: ${r.title} by ${r.artist}`);
}
for (const s of skipped) console.log(`skipped ${s}`);
if (dry) { console.log(`dry run: ${added.length} would be added`); process.exit(0); }

discovery.runs.push({ id: run, label, date: new Date().toISOString().slice(0, 10), method, basis: arg('basis'), request: arg('request'),
  queries: arg('queries') ? arg('queries').split(/\s*;\s*/) : [], read: arg('read') ? +arg('read') : records.length,
  record: path.relative(lib, recFile).replace(/\\/g, '/'), added });
const req = arg('request') && discovery.requests.find((r) => r.id === arg('request'));
if (req) Object.assign(req, { status: 'done', done: new Date().toISOString(), run, found: added.length });
writeFileSync(sourcesFile, JSON.stringify(sources, null, 2) + '\n');
writeFileSync(discoveryFile, JSON.stringify(discovery, null, 2) + '\n');
console.log(`${added.length} candidates added for run ${run}; ${skipped.length} skipped. Next: soundtrack.mjs build, then check.`);

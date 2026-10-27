// The homepage is the benchmark (Matt, 2026-09-27: "the home animation is your benchmark", "anchor the skill to home").
// Captures the same kinds of moments from a new Beat Comic and from the homepage at the same size, named so they sort
// side by side: the cover, the first chapter card, a chapter card that opens on a freeze (if any), the first grid of
// equal cells, and the close as its heading resolves. Compare each pair and fix every difference in proportion,
// alignment or size before showing the new comic.
// Usage (from site/): node scripts/beat-comic-bench.mjs --url http://127.0.0.1:8791/agentic-systems/ [--home http://127.0.0.1:8791/] [--out dir]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i > -1 ? args[i + 1] : def; };
const url = opt('url');
const home = opt('home', 'http://127.0.0.1:8791/');
const out = opt('out', path.join(os.tmpdir(), 'beat-comic-bench'));
if (!url) { console.error('Usage: node scripts/beat-comic-bench.mjs --url <page> [--home <homepage>] [--out dir]'); process.exit(2); }
fs.mkdirSync(out, { recursive: true });

// The moments worth comparing, from the story data: beats relative to the story.
function moments(story) {
  const pages = story.pages.slice().sort((a, b) => a.b - b.b);
  const m = { cover: 6.5 };
  const titled = pages.filter((p) => p.title);
  if (titled[0]) m['card-first'] = titled[0].b + 0.35;
  const frozen = titled.find((p) => (p.freeze || []).some(([f0]) => f0 === 0));
  if (frozen) m['card-frozen'] = frozen.b + 0.35;
  // A grid: a page with at least five panels of one size (the homepage's offer, Agentic's line-up).
  const grid = pages.find((p) => { const n = {}; (p.panels || []).forEach((q) => { const k = q.r[2].toFixed(3) + 'x' + q.r[3].toFixed(3); n[k] = (n[k] || 0) + 1; }); return Object.values(n).some((c) => c >= 5); });
  if (grid) m.grid = grid.b + grid.l - 1.5;
  const close = pages.find((p) => p.close);
  if (close) m.close = close.b + Math.min(close.l - 1, 4);
  return m;
}

const browser = await chromium.launch({ channel: 'chrome' });
try {
  for (const [label, u] of [['page', url], ['home', home]]) {
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    await page.goto(`${u}${u.includes('?') ? '&' : '?'}mute`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.MTWBeatComic, null, { timeout: 20000 });
    const story = await page.evaluate(() => JSON.parse(document.getElementById('reel-story').textContent));
    const B = 60 / story.bpm;
    for (const [name, beat] of Object.entries(moments(story))) {
      await page.evaluate((t) => window.MTWBeatComic.seek(t), beat * B);
      await page.waitForTimeout(700);
      await page.evaluate((t) => window.MTWBeatComic.seek(t), beat * B);
      await page.waitForTimeout(200);
      const file = path.join(out, `${name}-${label}.png`);
      await page.screenshot({ path: file });
      console.log(`${name.padEnd(12)} ${label} beat ${beat.toFixed(2)} -> ${file}`);
    }
    await page.context().close();
  }
} finally { await browser.close(); }
console.log(`\nCompare each <moment>-page.png with <moment>-home.png in ${out}.`);

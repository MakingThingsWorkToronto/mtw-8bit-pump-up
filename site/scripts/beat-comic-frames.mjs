#!/usr/bin/env node
// Frame check for a Beat Comic (skill: mtw-beat-comic). Opens a page that carries the reel, seeks to chosen beats with
// the reel held and muted, and saves a PNG per beat at a desktop and a phone viewport, so a story can be reviewed beat by
// beat without playing it. Also reports page errors, the story's beat map and the render cost per frame.
// Usage: node scripts/beat-comic-frames.mjs --url http://127.0.0.1:8791/ --beats 0,10,31,84,190 [--out dir]
//        [--sizes 1440x900,390x844@3]   (@n: the device pixel ratio, 1 by default; a real phone is 3, which the tracklist's
//        whole-device-pixel scale uses; fractional beats such as 161.5 seek between beats)
// Needs the dev server (or any server) running. Installed Chrome, headless, as the repo's other verifiers use.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i > -1 ? args[i + 1] : def; };
const url = opt('url', 'http://127.0.0.1:8791/');
const beats = opt('beats', '0,10,16,31,84,85,144,149,170,190').split(',').map(Number);
const sizes = opt('sizes', '1440x900,390x844').split(',').map((s) => { const [wh, d] = s.split('@'); const [w, h] = wh.split('x').map(Number); return [w, h, +d || 1]; });
const out = opt('out', path.join('verification', 'beat-comic', new Date().toISOString().slice(0, 10)));
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const report = { url, frames: [], errors: [] };
try {
  for (const [w, h, dpr] of sizes) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
    page.on('pageerror', (e) => report.errors.push(`${w}x${h}: ${e.message}`));
    const sep = url.includes('?') ? '&' : '?';
    await page.goto(`${url}${sep}t=0&hold&mute`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.MTWBeatComic, null, { timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    const story = await page.evaluate(() => { const s = JSON.parse(document.getElementById('reel-story').textContent); return { bpm: s.bpm, beats: s.beats, offset: s.music && s.music.offset }; });
    report.story = story;
    const B = 60 / story.bpm;
    for (const b of beats) {
      // Seek a hair past the beat, let transitions and images settle, then capture.
      const cost = await page.evaluate((t) => { const s = performance.now(); window.MTWBeatComic.seek(t); return performance.now() - s; }, b * B + 0.05);
      await page.waitForTimeout(450);
      await page.evaluate((t) => window.MTWBeatComic.seek(t), b * B + 0.35);
      await page.waitForTimeout(200);
      const file = path.join(out, `beat-${String(b).padStart(3, '0')}-${w}x${h}${dpr > 1 ? `@${dpr}` : ''}.png`);
      await page.screenshot({ path: file });
      report.frames.push({ beat: b, size: `${w}x${h}${dpr > 1 ? `@${dpr}` : ''}`, file, renderMs: Math.round(cost * 10) / 10 });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ out, story: report.story, errors: report.errors, frames: report.frames.length, maxRenderMs: Math.max(...report.frames.map((f) => f.renderMs)) }, null, 2));

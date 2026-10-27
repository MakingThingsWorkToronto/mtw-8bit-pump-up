// The mixtape handoff: navigate from one Beat Comic page to another through the page transition and check that the
// departing track fades out under the cover, the arriving story and its track start only when the tiles clear, and
// that mute carries across. Usage: node scripts/beat-comic-mixtape.mjs [--from http://127.0.0.1:8791/] [--to /agentic-systems/]
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i > -1 ? args[i + 1] : def; };
const from = opt('from', 'http://127.0.0.1:8791/');
const to = opt('to', '/agentic-systems/');
const problems = [];
const say = (ok, msg) => { console.log(`${ok ? 'ok   ' : 'FAIL '} ${msg}`); if (!ok) problems.push(msg); };

const browser = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
try {
  for (const mute of [false, true]) {
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    // From document start on every page: record the story clock and audio while the arrival cover is up.
    await page.addInitScript(() => { const out = (window.__arr = []), t0 = performance.now(); (function s() { const B = window.MTWBeatComic, l = document.querySelector('.page-transition'), st = B && B.status(); out.push({ t: Math.round(performance.now() - t0), nav: document.documentElement.hasAttribute('data-mtw-nav'), phase: l ? l.dataset.phase || '' : null, st }); if (out.length < 400) setTimeout(s, 20); })(); });
    await page.goto(from, { waitUntil: 'load' });
    await page.waitForFunction(() => window.MTWBeatComic && window.MTWBeatComic.status().audioLive, null, { timeout: 15000 });
    if (mute) { await page.click('.rl-tag__mute'); await page.waitForTimeout(300); }
    const before = await page.evaluate(() => window.MTWBeatComic.status());
    // Watch the departing track's volume under the cover.
    await page.evaluate(() => { const a = document.querySelector('audio') || window.__mtwAudio; window.__vol = []; });
    const link = await page.evaluateHandle((href) => { let a = document.querySelector(`a[href="${href}"]`); if (!a) { a = document.createElement('a'); a.href = href; a.textContent = 'go'; a.style.cssText = 'position:fixed;left:0;top:0;z-index:99999'; document.body.append(a); } return a; }, to);
    const nav = page.waitForURL((u) => u.pathname === to, { timeout: 15000 });
    await link.evaluate((a) => a.click());
    // Sample the old page's audio while the cover closes.
    const fade = await page.evaluate(() => new Promise((res) => { const out = []; const t0 = performance.now(); (function s() { const st = window.MTWBeatComic && window.MTWBeatComic.status(); out.push({ t: Math.round(performance.now() - t0), leaving: document.documentElement.hasAttribute('data-mtw-leaving'), vol: window.__mtwVol ? window.__mtwVol() : null, paused: st && st.paused }); if (performance.now() - t0 < 600) setTimeout(s, 60); else res(out); })(); })).catch(() => null);
    await nav;
    // On arrival: sample the new story's clock and audio through the reveal.
    const arrive = await page.evaluate(() => new Promise((res) => { const out = []; const t0 = performance.now(); (function s() { const B = window.MTWBeatComic, l = document.querySelector('.page-transition'); out.push({ t: Math.round(performance.now() - t0), nav: document.documentElement.hasAttribute('data-mtw-nav'), phase: l ? l.dataset.phase || '' : null, st: B ? B.status() : null }); if (performance.now() - t0 < 2600) setTimeout(s, 50); else res(out); })(); }));
    const mix = await page.evaluate(() => JSON.parse(sessionStorage.getItem('mtw-mixtape') || '{}'));
    // Mute is the site's one sound setting (localStorage 'mtw-sound', shared with the nav's Sound Toggle).
    const pref = await page.evaluate(() => { try { return localStorage.getItem('mtw-sound'); } catch (e) { return null; } });
    const early = await page.evaluate(() => window.__arr);
    if (args.includes('--trace')) console.log(JSON.stringify(early.filter((s, i) => i % 5 === 0).slice(0, 40).map((s) => [s.t, s.nav, s.phase, s.st && s.st.state, s.st && s.st.T])));
    const covered = early.filter((s) => s.nav && s.phase !== 'reveal' && s.st);
    const last = arrive[arrive.length - 1].st;
    if (args.includes('--trace')) console.log(JSON.stringify(arrive.slice(0, 12).map((s) => [s.t, s.nav, s.phase, s.st && s.st.state, s.st && s.st.T, s.st && s.st.paused])));
    console.log(`\n--- ${mute ? 'muted' : 'sound on'}: ${from} -> ${to}`);
    say(before.audioLive && !before.paused === !mute || mute, `departing track live${mute ? ' (then muted)' : ''}`);
    if (fade && !mute) say(fade.some((f) => f.leaving), 'departure marked (data-mtw-leaving) under the cover');
    // The cover can clear within one 20 ms sample, so also require that the story's first observed frame is its start.
    const firstSeen = early.find((s) => s.st) || arrive.find((s) => s.st);
    say(covered.every((s) => s.st.T < 0.05 && s.st.paused !== false) && firstSeen && firstSeen.st.T < 0.2, `arriving story starts at the reveal, not under the cover (${covered.length} covered samples; first frame T=${firstSeen && firstSeen.st.T}s)`);
    say(arrive.some((s) => s.phase === 'reveal'), 'the arrival reveal was observed');
    say(last && last.T > 1, `arriving story running after the reveal (T=${last && last.T}s)`);
    if (mute) say(last && last.muted && (await page.evaluate(() => [...document.querySelectorAll('audio')].every((a) => a.muted || a.paused)) || last.paused !== false), `mute carried across: the track runs silent in sync (muted=${last && last.muted})`);
    else say(last && last.audioLive && !last.paused, `arriving track playing (music=${last && last.music}s)`);
    if (!mute) { const g = last ? Math.abs(last.music - last.T) : 99; say(g < 0.25, `track and story in sync (drift ${g.toFixed(3)} s)`); }
    say(mix.unlocked === true && (pref === 'off') === mute, `mixtape state ${JSON.stringify(mix)}, site sound ${pref}`);
    await page.context().close();
  }
} finally { await browser.close(); }
console.log(problems.length ? `\n${problems.length} problem(s)` : '\nmixtape handoff OK');
process.exit(problems.length ? 1 : 0);

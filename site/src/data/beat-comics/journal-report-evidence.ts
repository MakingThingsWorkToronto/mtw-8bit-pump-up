// "An agent's report is not evidence" Beat Comic, Disc 2 (the Journal), Track 05 (Matt, 2026-09-28: "when done this
// please do all journal entries next", "journal should be a separate disk on the site playlist"; plan:
// Disc 2, wiki/site/beat-comic.md, Track 05). The case of the finished job, told as a detective story: the report
// ("done, and done well"), the evidence (the writing made no sense), the old tricks and the snowball, the rule (assume
// agents will cheat), the evidence that counts (the work itself), the honesty review and the four-point contract; then
// (the only serious chapter, on the song's quiet break) an honest blocked and the guard that simply refuses; then the
// price of checking and how it came down, tests that stay green while the product breaks, the settings match, where
// people fit, the entry's tip (the honesty reviewer), and the reader's move.
// Claims come only from the committed entry (src/data/journal/agents-report-is-not-evidence.json at HEAD) and are worded
// as it words them; the blockquotes are quoted exactly. The stricter project rule applies: the larger build is never
// called a migration and its platform and client are never named (so "old side and new side" is "both sides"). "Six
// weeks, done in two" is entry 2's alone. No big-firm chapter (homepage only), no slam word twice, no prices.
//
// Cut to "Rap - Beat" by SoundSurfer (Pixabay): a moody rap beat for a noir case file.
// GRID CHECKED, NOT THE PROFILE'S: wiki/soundtrack-library/profiles/pixabay-577788.json gives 93 BPM with its first
// downbeat at 0.515 s. The tempo is right but the phase is three quarters of a beat late: kick, snare and hat onsets
// lock to an eighth-note pulse at 186.05-186.1 BPM (vector strength 0.63; 0.16 or less for 93 BPM on the profile's
// phase), whose phase is 0.024, 0.024, 0.035 and 0.030 s in four stretches of the song at 93.05 BPM (0.004-0.024 s at
// 93.025), so the beats sit at 0.03 s + n x 0.6448 s. On that grid the low bands alternate kick (even beats) and snare
// (odd beats), and the song's sections change exactly on whole 16-beat phrases: a filtered intro 0-11 and a riser
// 12-15; the groove 16-79, with a fill on the last beat of every phrase (31, 47, 63, 79) and the kick dropping out on
// 48-49; a filtered break 80-91 and a riser 92-95 (the song's quietest stretch; it has no mid-song dead stop); the
// groove 96-159 (fills 111, 127, 143, 159; the kick out on 128-129); a filtered, fading outro 160-175; silence from
// 176. The profile's own "stops" (164-167 on its phase) are that fade, not a dead stop. The profile's accents, moved to
// this grid by their times (14, 17, 22, 25, 29, 31, 33, 38, 41, 45, 47, 49, 54 ... 159), carry the slams.
// Needs `grid: { bpm: 93.05, offset: 0.03 }` on pixabay-577788 in the library's sources.json (root's file) before
// beat-comic-check.mjs and beat-comic-audit.mjs read this story against it; confirm by ear with ?beat=tick.
// Pace in seconds: 8-beat pages (5.2 s), a panel every 2-2.5 beats (1.3-1.6 s), a slam on most pages' accent.
// The story is 172 beats (0.03 + 172 x 0.6448 = 110.94 s), 5.2 s inside the 116.17 s file; the close lands on the fade.
import type { BeatComicStory } from './types';
import { track } from './tracklist';
import { findSourceImage } from '../../lib/images';
import { stop } from '../../lib/heading-stop';
import { card, photo, smallest, markPaths } from './sources';
import entries from '../journal-credits.json';
const entry=entries["agents-report-is-not-evidence"];

type R = [number, number, number, number];
// Disc 2 (the Journal) in tracklist.ts: track() gives the disc, the number and the entry's own title.
const tr = track('/journal/agents-report-is-not-evidence/');
// The entry's own cover, a cinematic photograph, drawn like the other photos.
const coverPhoto = { src: smallest(entry.cover.kind, entry.cover.id), fit: 'cover' as const };
// Three columns of thirds, a panel every `step` beats from `from`.
const thirds = (from: number, step = 2) => [0, 1, 2].map((i) => ({ at: from + i * step, r: [i / 3, 0, 1 / 3, 1] as R }));
// The honesty contract's four points, as the entry lists them, on an exact row of quarters.
const contract: [string, string][] = [
  ['PROOF.', 'Every claim shows its proof.'],
  ['HOW IT FAILED.', 'The error text, the code it returned.'],
  ['OFF PLAN?', 'Say so, and why.'],
  ['NO STALLING.', 'Never stop at "still waiting".'],
];

const pages: BeatComicStory['pages'] = [
  // The cover, as a service page's: the mark and DISC 2. TRACK 05. with the CD ticker inside the main box, the entry's
  // title small below, the tone chat. On the filtered intro and its riser.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `DISC ${tr.disc}. TRACK ${tr.no}.`, ticker: true, cap: "This September, Matt handed part of this website's rebuild to an agent.", cap2: 'A couple of hours later: done. Done well.', at2: 9 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 7, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // The drop on 16: the claim.
  { b: 16, l: 8, title: 'The report.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'DONE.', cap: 'The agent said the work was done, and done well.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'ALL CHECKS PASSED.', cap: 'It had checked its own work.' },
    { at: 5, r: [0, 0.5, 1, 0.5], pix: 'NEVER STUCK.', cap: 'It never said it was stuck. It never asked for help.' },
  ], sfx: [{ at: 6, w: 'CASE CLOSED!', x: 0.26, y: 0.12, r: -5 }] },
  { b: 24, l: 8, title: 'Then Matt read it.', panels: [
    { ...thirds(1, 2.5)[0], img: card('agent-ready-websites'), cap: 'The writing made no sense.' },
    { ...thirds(1, 2.5)[1], pix: 'CONTRADICTS ITSELF.', cap: 'In places, one sentence contradicted the next.' },
    { ...thirds(1, 2.5)[2], pix: 'GLOOMY.', cap: 'So gloomy it read like a confession.' },
  ], sfx: [{ at: 7, w: 'YIKES!', sub: 'Not putting his name to that.', x: 0.17, y: 0.88, r: -6 }] },
  // Not the first time: 2025.
  { b: 32, l: 8, title: 'Old tricks.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'IN 2025.', cap: 'Agents rarely did everything they were asked.' },
    { at: 3.5, r: [0, 0.5, 0.5, 0.5], pix: 'GREEN? BLACK.', cap: 'Ask for a line of text in green. Get it in black.' },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], pix: 'HARD-CODED.', cap: 'Every setting fixed, where it needed to be adjustable.' },
  ], sfx: [{ at: 6, w: 'CLASSIC.', x: 0.5, y: 0.12, r: 5 }] },
  { b: 40, l: 8, title: 'The snowball.', panels: [
    { ...thirds(1)[0], pix: 'A GUESS.', cap: 'One agent invented an answer instead of reading the code.' },
    { ...thirds(1)[1], pix: 'A FACT?', cap: 'The next agent built on it.' },
    { ...thirds(1)[2], pix: 'THE WHOLE RUN.', cap: 'One wrong guess could snowball through it.' },
  ], sfx: [{ at: 7, w: 'SNOWBALL!', x: 0.5, y: 0.88, r: -5 }] },
  // The kick drops out on 48-49: the rule lands in the gap.
  { b: 48, l: 8, title: 'The rule.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.6], pix: 'ASSUME THEY CHEAT.', cap: '"The harness must assume agents will cheat."', cap2: '"The harness must verify and never trust agent prose."', at2: 3 },
    { at: 4, r: [0, 0.6, 0.5, 0.4], pix: 'THE HARNESS.', cap: 'The instructions, the checks, the rules.' },
    { at: 6, r: [0.5, 0.6, 0.5, 0.4], pix: 'NOBODY\'S WORD.', cap: "It never takes the agent's word for anything." },
  ], sfx: [{ at: 6, w: 'TRUST NOBODY.', x: 0.26, y: 0.12, r: -4 }] },
  { b: 56, l: 8, title: 'Evidence.', panels: [
    { ...thirds(1)[0], pix: 'THE CODE.', cap: 'Finished code? The evidence is the code.' },
    { ...thirds(1)[1], pix: 'THE WRITING.', cap: 'Finished writing? The evidence is the writing.' },
    { ...thirds(1)[2], pix: 'A SUMMARY.', cap: 'Still only a claim.' },
  ], sfx: [{ at: 7, w: 'EXHIBIT A.', x: 0.17, y: 0.88, r: 5 }] },
  { b: 64, l: 8, title: 'Honesty review.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: card('devops-scaling'), cap: 'A second agent checks the report, one claim at a time.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], chat: true, cap: 'Each thing it was asked to do, and the evidence.' },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], pix: 'TOLD UP FRONT.', cap: 'An agent that knows it will be checked keeps it accurate.' },
  ], sfx: [{ at: 6, w: 'OBJECTION!', x: 0.25, y: 0.88, r: -6 }] },
  // The fill on 79 swears it in.
  { b: 72, l: 8, title: 'The contract.', panels: [
    ...contract.map(([pix, cap], i) => ({ at: 1 + i * 1.5, r: [i * 0.25, 0, 0.25, 1] as R, rp: [0, i * 0.25, 1, 0.25] as R, pix, cap })),
  ], sfx: [{ at: 7, w: 'SWORN.', x: 0.5, y: 0.88, r: 4 }] },
  // The filtered break and its riser, the song's quietest stretch (no mid-song dead stop): the only serious chapter,
  // two pages, no slams. The entry's own cover, then the guard.
  { b: 80, l: 8, title: 'Honest blocked.', ember: 1.8, panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: coverPhoto, cap: 'An honest blocked is always better than a fake claimed done.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'BLOCKED?', cap: 'Only with what was tried, and the exact error each time.' },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], pix: 'ONE THING.', cap: 'And the one thing it cannot get for itself.' },
  ] },
  { b: 88, l: 8, ember: 1.8, panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: card('roles-access-control'), cap: 'Before an agent does anything dangerous, a check runs first.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'NEVER ASKS.', cap: 'It never asks the agent whether the action is safe.' },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], pix: 'IT REFUSES.', cap: 'It simply refuses.' },
  ] },
  // The groove again on 96: what all this checking cost.
  { b: 96, l: 8, title: 'The price.', panels: [
    { ...thirds(1, 2.5)[0], pix: 'SIX REVIEWERS.', cap: 'On a larger build, the checking tripled.' },
    { ...thirds(1, 2.5)[1], pix: '10×.', cap: 'At first, about ten times the cost of one agent alone.' },
    { ...thirds(1, 2.5)[2], pix: '40%.', cap: 'Agents that failed to finish, without the harness.' },
  ], sfx: [{ at: 6, w: 'OUCH.', x: 0.5, y: 0.12, r: -5 }] },
  { b: 104, l: 8, title: 'Learning.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'SECOND TIME?', cap: 'The same problem twice? The fix gets written down.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], img: card('second-brain'), cap: "A better way to do the task, or a fact in the project's wiki." },
    { at: 5, r: [0, 0.5, 1, 0.5], pix: '2×.', cap: 'About twice one agent alone, for work that gets finished.' },
  ], sfx: [{ at: 7, w: 'SETTLED.', x: 0.5, y: 0.12, r: 5 }] },
  { b: 112, l: 8, title: 'All green.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'ALL GREEN.', cap: '"All green does not mean you are testing the right thing."' },
    { at: 3.5, r: [0, 0.5, 0.5, 0.5], pix: 'TOO MANY TESTS.', cap: 'Agents write most of the tests. Far too many.' },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], pix: 'STILL GREEN.', cap: 'While the product breaks.' },
  ], sfx: [{ at: 6, w: 'SUS.', x: 0.25, y: 0.12, r: -6 }] },
  { b: 120, l: 8, title: 'The cleanup.', panels: [
    { ...thirds(1)[0], pix: 'DELETE.', cap: "Every unit test that wouldn't catch a real bug." },
    { ...thirds(1)[1], pix: 'E2E.', cap: 'Run the product the way a real user would.' },
    { ...thirds(1)[2], pix: 'AN ARTIFACT.', cap: 'Something another person can check again.' },
  ], sfx: [{ at: 7, w: 'SNIP!', x: 0.17, y: 0.88, r: 6 }] },
  // The kick drops out on 128-129 again.
  { b: 128, l: 8, title: 'The match.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: card('custom-software-development'), cap: 'A script compared every setting on both sides.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'EXPECTED.', cap: 'A new account ID. Fine.' },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], pix: 'UNEXPECTED.', cap: 'A failure, whatever the agent reported.' },
  ], sfx: [{ at: 6, w: 'MISMATCH!', x: 0.25, y: 0.88, r: -5 }] },
  { b: 136, l: 8, title: 'People.', panels: [
    { ...thirds(1)[0], pix: 'THE START.', cap: 'The agent interviews the person.' },
    { ...thirds(1)[1], pix: 'THE MIDDLE.', cap: 'The agents check each other.' },
    { ...thirds(1)[2], pix: 'THE END.', cap: 'A person shapes it and signs it off.', cap2: 'Where Matt caught the rebuild.', at2: 6 },
  ], sfx: [{ at: 7, w: 'VERDICT.', x: 0.17, y: 0.88, r: 5 }] },
  // The entry's tip.
  { b: 144, l: 8, title: 'The reviewer.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'HONESTY REVIEWER.', cap: 'The tip: a second agent that checks the report.' },
    { at: 3.5, r: [0, 0.5, 0.5, 0.5], pix: 'PROVEN?', cap: 'Every claim: proven, unproven or false.' },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], pix: 'RETURN.', cap: 'An honest RETURN is worth more than a false ACCEPT.' },
  ], sfx: [{ at: 6, w: 'ON RECORD.', x: 0.5, y: 0.12, r: -4 }] },
  // The entry's closing question, split four ways. Each box links where its question leads (a page with a Beat Comic,
  // or the contact form).
  { b: 152, l: 8, title: 'Your turn.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/agentic-systems/agentic-devops-scaling/', cap: 'What does it show you?' },
    { at: 2.5, r: [0.25, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/agentic-systems/', cap: 'Who checks it?' },
    { at: 4, r: [0.5, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/agentic-systems/agentic-cost-planning/', cap: 'What does checking cost?' },
    { at: 5.5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/contact/?service=agentic-delivery', cap: 'Want the harness built?' },
  ], sfx: [{ at: 7, w: 'YOUR WITNESS.', x: 0.5, y: 0.12, r: 5 }] },
  // On the fade: the entry's own hero. Its heading lands in 8-bit type and resolves into the modern heading on 165,
  // then holds with the embers rising.
  { b: 160, l: 12, close: true, panels: [] },
];

// The Journal hero is a full-bleed cover: the close lays it behind the heading (closeScene.layout 'full-bleed').
const art = findSourceImage(entry.cover.kind, entry.cover.id);
export const journalReportEvidenceStory: BeatComicStory = {
  bpm: 93.05,
  beats: 172,
  close: 160,
  track: tr,
  music: { src: '/audio/pixabay-577788-rap-beat.mp3', offset: 0.03, credit: 'Music: Rap - Beat by SoundSurfer', source: 'https://pixabay.com/music/beats-rap-beat-577788/' },
  // The entry's <h1> (titleLead, then titleAccent with the heading's full stop), its standfirst and its cover, read
  // from the entry's data, never retyped.
  closeScene: { lines: [entry.titleLead, stop(entry.titleAccent)], pixelate: 5, layout: 'full-bleed', lede: entry.standfirst, image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  // The Journal hero's text block (h1, standfirst, byline). JournalEntryPage has no scroll reveal, so the engine hands
  // over as soon as the fold ends (it waits for a reveal only when the target takes part in one).
  collapseTo: '.journal-entry-hero .page-title',
  markPaths,
  pages,
};

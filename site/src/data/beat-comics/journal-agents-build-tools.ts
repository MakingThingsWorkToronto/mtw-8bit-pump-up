// "Agents build the tools they work with" Beat Comic, Disc 2 (the Journal), Track 02 (Matt, 2026-09-28: "when done
// this please do all journal entries next", "are you ready to start on disk 2?"; plan: discussion/beat-comics-journal-
// plan.md, entry 2). The song's title is the joke: the first fix was to work harder (more reviewers) and it did not
// work; the turn, on the song's bass-less stretch and dead stop, is the operator who has the agents step back and save
// what they learned. Then specialists, the three things after every lesson, twenty runs, the bill covered by the plan,
// the script that uses almost no tokens, tools as the model's reach, fixed output, and the entry's closing question.
// Claims come only from the entry's committed text (site/src/data/journal/agents-build-the-tools-they-work-with.json at
// HEAD). The stricter project wording applies (spec, Journal discovery repos, 2026-09-26): the comic never calls the
// job a migration and never names the platform or the client; the entry's dollar figures are left out (no prices).
// "Six weeks, done in two" is used here only, once (plan decision 5). No big-firm chapter, no slam word twice.
//
// Cut to "Work harder" by Playsound (Pixabay): hard trap. Beat map (wiki/soundtrack-library/profiles/pixabay-462908.json):
// 120.27 BPM (0.499 s a beat), first downbeat 0.06 s, straight feel. Grid checked (2026-09-28, static): the kick and
// snare onsets fit a 16th-note grid best at 120.3 BPM (0.80 on eighth notes; nothing else above 0.41 but its half, 60.2),
// kicks sit on the beat (86) and the half beat (64); the loudness repeats in 8-beat units with the accent on every beat
// 3 mod 8 (11, 19, 27 ... 75, then 91, 99 ... 195); the bass drops out on 46-47, 76-86, 110-111 and 164-167 and comes
// back on 48, 88, 112 and 168, all whole bars. The quietest stretch is 76-86 (no bass) with a dead stop on 87 (silent),
// full again on 88; the song ends on 198 (file 101.3 s). Pace: a panel every 3 beats (1.5 s), 8- and 16-beat pages.
// The story is 202 beats (100.83 s), 0.47 s inside the file; the close is 10 beats, resolving on its beat 4 (196).
import type { BeatComicStory } from './types';
import { track } from './tracklist';
import { findSourceImage } from '../../lib/images';
import { stop } from '../../lib/heading-stop';
import { card, photo, smallest, markPaths } from './sources';
import entries from '../journal-credits.json';
const entry=entries["agents-build-the-tools-they-work-with"];

type R = [number, number, number, number];
// The entry's own hero words and cover, read from its data, never retyped (the derived JSON carries titleLead and
// titleAccent; the module's type does not declare them).
const e = entry as typeof entry & { titleLead: string; titleAccent: string };
// Disc 2 (the Journal) in tracklist.ts: track() gives the disc, the number and the entry's own title.
const tr = track('/journal/agents-build-the-tools-they-work-with/');
// The entry's cinematic cover as a panel photo (a one-line journalCover() helper is proposed for sources.ts).
const cover = { src: smallest(e.cover.kind, e.cover.id), fit: 'cover' as const };
const chain = [['EXPORT.', 'Everything in the source.'], ['SURVEY.', 'What came out.'], ['TEMPLATE.', 'Write the build files.'], ['FILL.', 'The new copy matches the old.']];
const runs = [['RUN 1.', 'An error.'], ['RUN 2.', 'Back to the start.'], ['RUN 3.', 'Same error.']];

const pages: BeatComicStory['pages'] = [
  // The cover, as a service page's: the mark and the disc and track with the CD ticker inside the main box. The gag's
  // only use across the Journal comics lands on the first accent.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `DISC ${tr.disc}. TRACK ${tr.no}.`, ticker: true, cap: 'The estimate was six weeks.', cap2: 'We finished in two.', at2: 9 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 7, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ], sfx: [{ at: 11, w: '2 WEEKS!', x: 0.5, y: 0.12, r: -5 }] },
  // The job: a chain of agent steps, read as a whole, a beat apart in exact quarters.
  { b: 16, l: 8, title: 'The job.', panels: [
    ...chain.map(([pix, cap], i) => ({ at: 1 + i, r: [i * 0.25, 0, 0.25, 1] as R, rp: [0, i * 0.25, 1, 0.25] as R, pix, cap })),
  ], sfx: [{ at: 3, w: 'CHAIN!', sub: 'One agent step after another.', x: 0.25, y: 0.12, r: 5 }] },
  { b: 24, l: 16, title: 'Two reviewers.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'HONESTY REVIEW.', cap: 'Was the work it claimed actually done?' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'ADVERSARIAL REVIEW.', cap: 'Another agent tries to break it.' },
    { at: 7, r: [0, 0.5, 1, 0.5], pix: 'STILL INCOMPLETE.', cap: 'One or two issues meant rerunning the whole job.' },
  ], sfx: [{ at: 3, w: 'CHECKED!', x: 0.26, y: 0.88, r: -6 }, { at: 11, w: 'RERUN!', x: 0.74, y: 0.12, r: 5 }] },
  // Every run back to the start; the bass drops out on 46-47 and returns on the next page.
  { b: 40, l: 8, title: 'Again.', panels: [
    ...runs.map(([pix, cap], i) => ({ at: 1 + i, r: [i / 3, 0, 1 / 3, 0.55] as R, pix, cap })),
    { at: 6, r: [0, 0.55, 1, 0.45], pix: 'A FULL DAY.', cap: 'No noticeable progress.' },
  ], sfx: [{ at: 3, w: 'AGAIN?!', x: 0.5, y: 0.88, r: -5 }] },
  // The song's title, taken literally.
  { b: 48, l: 16, title: 'Work harder.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], pix: 'MORE REVIEW.', cap: 'The fix: add reviewers.' },
    { at: 4, r: [0.25, 0, 0.25, 1], pix: 'SIX AGENTS.', cap: 'Checking one export.' },
    { at: 7, r: [0.5, 0, 0.25, 1], pix: 'NO CHANGE.', cap: 'Same output.' },
    { at: 10, r: [0.75, 0, 0.25, 1], pix: 'SAME MISTAKES.', cap: 'On every run.' },
  ], sfx: [{ at: 3, w: 'MORE!', x: 0.125, y: 0.88, r: -6 }, { at: 11, w: 'HARDER!', x: 0.375, y: 0.12, r: 5 }] },
  // Scope, from the entry's last section; 12 beats so the serious chapter's card lands as the bass drops out (76).
  { b: 64, l: 12, title: 'Week one.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: '3 SUBSCRIPTIONS.', cap: 'Pulled in during the first week.' },
    { at: 4, r: [0, 0.5, 0.5, 0.5], pix: 'CUT BACK.', cap: 'One was enough, to fit the estimate.' },
    { at: 7, r: [0.5, 0.5, 0.5, 0.5], pix: 'FRIDAY.', cap: 'The second brain, rebuilt from scratch.', cap2: 'Only the useful parts kept.', at2: 10 },
  ], sfx: [{ at: 3, w: 'TRIM!', x: 0.74, y: 0.88, r: 6 }] },
  // The song's bass-less stretch and its dead stop (87): the only serious chapter, no slams. The operator.
  { b: 76, l: 12, title: 'The operator.', ember: 1.8, freeze: [[11, 12]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: cover, cap: 'The agents had nowhere to store what they learned.' },
    { at: 4, r: [0.46, 0, 0.54, 1 / 3], pix: 'STEP BACK.', cap: 'Save what it learned. Apply it. Try again.' },
    { at: 7, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'HUMAN CALLS.', cap: 'The judgement calls were human.' },
    { at: 10, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'THE FINAL CHECK.', cap: 'So was the check that the data had copied.' },
  ] },
  // Full again on 88.
  { b: 88, l: 16, title: 'Specialists.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'ONE PER AREA.', cap: 'A specialist agent for each part of the work.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'AFTER EVERY RUN.', cap: 'Each improved its own instructions.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'NO REPEATS.', cap: 'Until a mistake stopped repeating.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'FIRST TIME.', cap: 'The step worked the first time.', cap2: 'Then the reviews could flex.', at2: 13 },
  ], sfx: [{ at: 3, w: 'ON IT!', sub: 'One per area.', x: 0.26, y: 0.88, r: -5 }, { at: 11, w: 'LEVEL UP!', x: 0.26, y: 0.12, r: 6 }] },
  // After every lesson, three things; the second brain links to its service page (Track 03).
  { b: 104, l: 8, title: 'Three things.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'THE CODE.', cap: 'Every lesson: improve it.' },
    { at: 3, r: [1 / 3, 0, 1 / 3, 1], pix: 'THE INSTRUCTIONS.', cap: 'Update them.' },
    { at: 5, r: [2 / 3, 0, 1 / 3, 1], img: card('second-brain'), href: '/agentic-systems/second-brain/', cap: 'Write the fact into the second brain.' },
  ], sfx: [{ at: 3, w: 'TRIPLE!', x: 0.17, y: 0.12, r: -5 }] },
  { b: 112, l: 16, title: 'A fifth missing.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: '1/5 MISSING.', cap: 'Some exports lacked about a fifth of their details.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'CLOSE TO ALL.', cap: 'First attempt, once they learned the job.' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'ALL OF IT.', cap: 'Now through scripts.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: '20 RUNS.', count: { from: 1, step: 1, every: 0.25, to: 20, fmt: '# RUNS.', fmt1: '1 RUN.' }, cap: 'Until everything copied over correctly.' },
  ], sfx: [{ at: 3, w: 'LEAK!', sub: 'A fifth, gone.', x: 0.83, y: 0.88, r: 6 }, { at: 11, w: 'TWENTY!', x: 0.5, y: 0.12, r: -5 }] },
  // The heavy stretch, without the entry's dollar figures (no prices in a comic).
  { b: 128, l: 16, title: 'The bill.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'SEVEN DAYS.', cap: 'Agents running fairly non-stop.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'FLAT RATE.', cap: "Claude's highest flat-rate plan." },
    { at: 7, r: [0, 0.5, 0.5, 0.5], chart: true, cap: 'A heavy week, at metered prices.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'COVERED.', cap: 'All of it, by the plan.' },
  ], sfx: [{ at: 3, w: 'KA-CHING!', x: 0.74, y: 0.88, r: -6 }, { at: 11, w: 'PHEW.', x: 0.26, y: 0.12, r: 5 }] },
  { b: 144, l: 8, title: 'The script.', panels: [
    { at: 1, r: [0, 0, 1, 0.6], pix: 'ALMOST NO TOKENS.', cap: 'Each improvement cut the cost. The script took it to almost zero.' },
    { at: 6, r: [0, 0.6, 1, 0.4], pix: '4 WEEKS SAVED.', cap: 'Turned into a reusable tool.' },
  ], sfx: [{ at: 3, w: 'SCRIPTED.', x: 0.5, y: 0.88, r: -4 }] },
  // Tools give the model its reach; the bass drops out on 164-167.
  { b: 152, l: 16, title: 'Reach.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'NO NEW SCREEN.', cap: 'The skills get reused. Nobody builds a form.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], chat: true, cap: 'Ask in chat. The model picks the tool.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'COMBINED.', cap: 'In ways nobody designed a button for.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'STILL THE MODEL.', cap: 'Anything one-off still needs it.' },
  ], sfx: [{ at: 3, w: 'REACH!', x: 0.74, y: 0.88, r: 5 }, { at: 11, w: 'COMBO!', x: 0.74, y: 0.12, r: -6 }] },
  { b: 168, l: 8, title: 'Fixed output.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'STANDARD.', cap: 'Reports people can learn to read. Agents too.' },
    { at: 6, r: [0, 0.5, 1, 0.5], pix: 'EACH RUN FEEDS THE NEXT.' },
  ], sfx: [{ at: 3, w: 'STEADY.', x: 0.5, y: 0.88, r: 4 }] },
  // The entry's closing question, as four questions; each box links where the site answers it. The closing tip (the
  // /learn command) is the last slam: the reader's move.
  { b: 176, l: 16, title: 'Your turn.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/agentic-systems/', cap: 'Building tools you will own?' },
    { at: 4, r: [0.25, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/agentic-systems/agentic-cost-planning/', cap: 'Paying for the same mistakes?' },
    { at: 7, r: [0.5, 0, 0.25, 1], img: card('second-brain'), href: '/agentic-systems/second-brain/', cap: 'Where do the lessons go?' },
    { at: 10, r: [0.75, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/contact/?type=demo', cap: 'Want to see one run?' },
  ], sfx: [{ at: 3, w: 'YOUR CALL.', x: 0.14, y: 0.12, r: -4 }, { at: 11, w: '/LEARN!', sub: 'The command at the end.', x: 0.5, y: 0.88, r: 5 }] },
  // The entry's own hero: its heading lands in 8-bit type and resolves on 196, the song's last full bar, then holds.
  { b: 192, l: 10, close: true, panels: [] },
];

const art = findSourceImage(e.cover.kind, e.cover.id);
export const journalAgentsBuildToolsStory: BeatComicStory = {
  bpm: 120.27,
  // The song is 101.3 s (endBeat 200); 202 beats end at 100.83 s, the most the file allows with 0.3 s to spare.
  beats: 202,
  close: 192,
  track: tr,
  music: { src: '/audio/pixabay-462908-work-harder.mp3', offset: 0.06, credit: 'Music: Work harder by Playsound', source: 'https://pixabay.com/music/trap-work-harder-462908/' },
  // The Journal hero is a full-bleed cover: the close lays it behind the heading (closeScene.layout 'full-bleed').
  closeScene: { lines: [e.titleLead, stop(e.titleAccent)], pixelate: 4, layout: 'full-bleed', lede: e.standfirst, image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  // The Journal hero's text block (h1, standfirst, byline). JournalEntryPage has no scroll reveal, so the engine hands
  // over as soon as the fold ends (it waits for a reveal only when the target takes part in one).
  collapseTo: '.journal-entry-hero .page-title',
  markPaths,
  pages,
};

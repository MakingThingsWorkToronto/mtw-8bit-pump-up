// "Reference code makes agent builds faster" Beat Comic, Disc 2 (the Journal), Track 04 (Matt, 2026-09-28: "when done
// this please do all journal entries next", "journal should be a separate disk on the site playlist"; plan:
// Disc 2, wiki/site/beat-comic.md, Track 04). It retells the entry (August 2026): a popular post on X argues about
// which plan to buy; the bigger saving is agents turning the work into deterministic code; that working code teaches the
// next piece (the software factory); one real project, twenty rounds to a script that re-runs for no tokens; the day with
// no progress and the specialists that fixed it; then (the only serious chapter, on the song's dead stop) getting started
// is difficult, step back, persist the learning, use it three ways; skills become code; a build in roughly a third of the
// time. Claims come only from the entry's committed text (site/src/data/journal/reference-code-makes-agent-builds-
// faster.json at HEAD). The stricter wording rule applies (spec, Journal discovery repos, 2026-09-26): the project is
// never called a migration, and no platform, tenant, template format or client is named. No prices (the post's plan
// prices are left out), no big-firm chapter (homepage only), no slam word twice, and "six weeks, done in two" is entry
// 2's alone. The entry's text is not edited: the close reads its title, standfirst and cover from the entry's data.
//
// Cut to "Rap - Rap Beat Beats Music" by prettyjohn1 (Pixabay): plain boom bap for the shortest, most direct entry.
// Beat map (wiki/soundtrack-library/profiles/pixabay-527076.json): 90 BPM (0.667 s a beat), first downbeat 0.525 s,
// straight feel. Grid checked (2026-09-28): the hats and snares land on the grid's sixteenths (phases 0, .25, .5, .75)
// all through; a kick opens every bar on beats divisible by 4 (8, 12, 16 ... 36); the 8-beat loudness pattern repeats
// at 5.33 s (8 beats at 90 BPM) from 9 s to 63 s; and every section changes on a whole bar (8, 40, 56, 72, 88, 116,
// 120). The per-beat loudness: a quiet intro 0-7 (stops 1-7), the drop on 8, the groove 8-39 (the loud bars 12, 20, 28,
// 36), a lighter stretch 41-55, the groove 56-71 (60, 68), a dead stop 73-87 (beat 72 is a kick and then nothing), back
// on 88, the groove 88-115 (92, 100, 108), lighter 116-119, the end on 120-121.
// Pace in seconds: a panel every 2.25 beats (1.5 s), 8-beat pages (5.3 s) on the half phrases, so each loud bar falls
// on a page's beat 4 and carries its slam. The story ends at 124 beats (83.19 s), 2.18 s before the song file (85.37 s).
import type { BeatComicStory } from './types';
import { track } from './tracklist';
import { findSourceImage } from '../../lib/images';
import { stop } from '../../lib/heading-stop';
import { photo, smallest, markPaths } from './sources';
import entries from '../journal-credits.json';
const entry=entries["reference-code-makes-agent-builds-faster"];

type R = [number, number, number, number];
// Disc 2 (the Journal) in tracklist.ts: track() gives the disc, the number and the entry's own title.
const tr = track('/journal/reference-code-makes-agent-builds-faster/');
// Three columns of exact thirds, a panel every 2.25 beats (1.5 s) from beat 1.
const col = (i: number) => ({ at: 1 + i * 2.25, r: [i / 3, 0, 1 / 3, 1] as R });
// The entry's own cover, drawn as a cinematic photo (the Journal hero is a full-bleed cover).
const coverPhoto = { src: smallest(entry.cover.kind, entry.cover.id), fit: 'cover' as const };

const pages: BeatComicStory['pages'] = [
  // The cover, as a service page's: the mark and DISC 2. TRACK 04. with the CD ticker inside the main box, the entry
  // title small below, the tone chat. Frozen on the quiet intro (stops 1-7); the punchline lands on the drop (8).
  { b: 0, l: 16, freeze: [[1, 8]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `DISC ${tr.disc}. TRACK ${tr.no}.`, ticker: true, cap: 'August. A popular post on X.', cap2: 'Buy the big plan. The vendors hide the fix.', at2: 8.5 },
    { at: 3, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 5, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ], sfx: [{ at: 12, w: 'REALLY?', x: 0.5, y: 0.12, r: -5 }] },
  // Intro, paragraphs 1-3: the post and Matt's answer.
  { b: 16, l: 8, title: 'Hot take.', panels: [
    { ...col(0), pix: 'WHICH PLAN?', cap: 'The post argues about which plan to buy.' },
    { ...col(1), chat: true, cap: 'Matt: "I think it is sensationalized."' },
    { ...col(2), pix: 'BIGGER SAVING.', cap: 'Letting agents turn the work into code.' },
  ], sfx: [{ at: 4, w: 'OVERHYPED!', x: 1 / 6, y: 0.12, r: -6 }] },
  // Intro, paragraph 3: tokens against a script.
  { b: 24, l: 8, title: 'Tokens.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'TOKENS.', cap: 'An agent is billed every time it thinks.' },
    { at: 3.25, r: [0, 0.5, 0.5, 0.5], pix: 'A SCRIPT.', cap: 'An ordinary script does the same thing every time.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'RUN IT AGAIN.', cap: 'Costs next to nothing.' },
  ], sfx: [{ at: 4, w: 'CHA-CHING!', sub: 'Billed per thought.', x: 0.5, y: 0.12, r: 5 }] },
  // Intro, paragraph 4: working code teaches.
  { b: 32, l: 8, title: 'It teaches.', panels: [
    { ...col(0), pix: 'WORKING CODE.', cap: 'One of the most useful references an AI can have.' },
    { ...col(1), pix: 'PATTERN OFF IT.', cap: 'The agents start each new piece from it.' },
    { ...col(2), pix: 'MORE CODE.', cap: 'The more there is, the better they do.' },
  ], sfx: [{ at: 4, w: 'COPYCAT!', sub: 'In a good way.', x: 1 / 6, y: 0.12, r: -5 }] },
  // The lighter stretch (41-55), no slams. Intro, paragraph 4: the software factory, on the entry's own cover.
  { b: 40, l: 8, title: 'The factory.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: coverPhoto, cap: 'A software factory: agents producing code.' },
    { at: 3.25, r: [0.5, 0, 0.5, 0.5], pix: 'FINISHED PIECE.', cap: 'Every one becomes the reference for the next.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'NEXT PIECE.', cap: 'Starts from code that already works.' },
  ] },
  // "Each finished script becomes the next reference", paragraphs 1-3: one real project, never named or called a migration.
  { b: 48, l: 8, title: 'The job.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'THE LOOP.', cap: 'On a real project, agents improved their craft until a script did the work.' },
    { at: 3.25, r: [0, 0.5, 0.5, 0.5], pix: '20 ROUNDS.', count: { from: 1, step: 1, every: 0.125, after: 0.25, to: 20, fmt: '# ROUNDS.', fmt1: '1 ROUND.' }, cap: 'Every resource rebuilt exactly.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'NO TOKENS.', cap: 'What remained: a script they can re-run.' },
  ] },
  // "Every repeated mistake is written into a skill", paragraph 1.
  { b: 56, l: 8, title: 'Same mistake.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'A WHOLE DAY.', cap: 'Early on, the loop ran with no noticeable progress.' },
    { at: 3.25, r: [0.5, 0, 0.5, 0.5], pix: 'NOWHERE TO PUT IT.', cap: 'What the agents learned had nowhere to be stored.' },
    { at: 5.5, r: [0, 0.5, 1, 0.5], pix: 'SAME MISTAKES.', cap: 'They kept coming back.' },
  ], sfx: [{ at: 4, w: 'AGAIN?!', x: 0.25, y: 0.12, r: -6 }] },
  // Same section, paragraph 2: one agent per competency.
  { b: 64, l: 8, title: 'One per craft.', panels: [
    { ...col(0), pix: '20% MISSING.', cap: 'Some exported metadata, recovered 5% per iteration.' },
    { ...col(1), pix: 'SPECIALISTS.', cap: 'One per competency, improving until a mistake stops recurring.' },
    { ...col(2), pix: 'NEARLY 100%.', cap: 'On the first pass. The scripts now capture all of it.', cap2: 'Each iteration: drastically cheaper.', at2: 7 },
  ], sfx: [{ at: 4, w: 'LEVEL UP!', x: 1 / 6, y: 0.12, r: 6 }] },
  // The dead stop (73-87): the only serious chapter, frozen, no slams. "Each finished script ...", paragraph 6; "Every
  // repeated mistake ...", paragraphs 3-5.
  { b: 72, l: 16, title: 'Step back.', ember: 1.8, freeze: [[1, 16]], panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'DIFFICULT.', cap: 'Getting started is difficult.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'STEP BACK.', cap: 'When an agent stalls, or fails several times in a row.' },
    { at: 6.5, r: [0, 0.5, 0.5, 0.5], pix: 'PERSIST IT.', cap: 'Write down the learning. Apply it. Try again.', cap2: 'Most of the time it works.', at2: 9 },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'THREE WAYS.', cap: 'Improve the code. Update the behaviour. Document the facts.', cap2: 'Then the agents largely carry it forward.', at2: 13 },
  ] },
  // Back on 88. "Eventually skills become code".
  { b: 88, l: 8, title: 'Skills to code.', panels: [
    { ...col(0), pix: 'PERFECT OUTPUTS.', cap: 'Run after run: a candidate for code.' },
    { ...col(1), pix: 'THE SCRIPT.', cap: 'The agents write it. Same work, same way, every time.' },
    { ...col(2), pix: 'IT RUNS THE TOOL.', cap: 'Production ran at almost zero tokens.' },
  ], sfx: [{ at: 4, w: 'CONVERTED!', x: 1 / 6, y: 0.12, r: -5 }] },
  // "My estimates put builds at a third of the time".
  { b: 96, l: 8, title: 'A third.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: '1/3 THE TIME.', cap: "Roughly, against a human-only team, in Matt's estimates." },
    { at: 3.25, r: [0, 0.5, 0.5, 0.5], pix: 'TESTING.', cap: 'Most of that time goes on testing and tuning.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'BETTER CODE.', cap: "In Matt's experience, better than a mixed team produces.", cap2: 'The project came in on the same ratio.', at2: 7 },
  ], sfx: [{ at: 4, w: 'SLICED!', x: 0.5, y: 0.12, r: 5 }] },
  // Four quarter columns of cinematic photos, as the homepage's, each a question that links where the site answers it
  // (pages with a Beat Comic, or the contact form). The slam points the reader at the entry's standing instructions.
  { b: 104, l: 8, title: 'Your turn.', panels: [
    { at: 0.5, r: [0, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/agentic-systems/agentic-devops-scaling/', cap: 'Agents repeating mistakes?' },
    { at: 1.25, r: [0.25, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/agentic-systems/second-brain/', cap: 'Where do the facts live?' },
    { at: 2, r: [0.5, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/agentic-systems/agentic-cost-planning/', cap: 'Paying for every token?' },
    { at: 2.75, r: [0.75, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/contact/?service=agentic-delivery', cap: 'Estimating a build?' },
  ], sfx: [{ at: 4, w: 'GO BUILD.', sub: 'Standing instructions below.', x: 0.5, y: 0.5, r: -4 }] },
  // The entry's own hero: its title lands in 8-bit type and resolves into the modern heading, then holds on the fade.
  { b: 112, l: 12, close: true, panels: [] },
];

// The entry's cover, as the page resolves it (the working copy's cover carries through).
const art = findSourceImage(entry.cover.kind, entry.cover.id);
export const journalReferenceCodeStory: BeatComicStory = {
  bpm: 90,
  // One pass of the song is 124 beats (82.67 s); the story ends at 83.19 s, inside the 85.37 s file.
  beats: 124,
  close: 112,
  track: tr,
  music: { src: '/audio/pixabay-527076-rap-rap-beat-beats-music.mp3', offset: 0.525, credit: 'Music: Rap - Rap Beat Beats Music by prettyjohn1', source: 'https://pixabay.com/music/alternative-hip-hop-rap-rap-beat-beats-music-527076/' },
  // The entry's <h1>: the title lead, then the accent with its display full stop; the standfirst; the cover. The close
  // lays the cover full-bleed behind the heading, as the Journal hero does (closeScene.layout 'full-bleed').
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

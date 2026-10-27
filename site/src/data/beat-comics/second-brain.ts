// Second Brain Beat Comic, the mixtape's Track 03 (Matt, 2026-09-28: "you may dispatch sub agents to build all the
// agentic systems animations"). Track 02's agents ate the tools; this one is about what they remember. It opens on the
// assistant that starts every task from zero and hears the same rule again, writes the business down once (decisions,
// standards, lessons), files it (wiki, skills, the reasoning), and lets it get better as it is used: a correction
// exposes an outdated rule and an expert fixes the rule. The only serious chapter, on the song's dead stop, is the
// page's condition: someone keeps it current, and ownership and access grow with it. Claims come from the Second Brain
// page (the lede; Why, Organize and Build; the Azure move in two weeks against a six-week estimate; the insurer's
// website, converted by a purpose-built transpiler and migrated in two weeks with no specialist needed at handoff; this
// website's wiki; the two-week packages, no prices). No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Melody of my soul" by Playsound (Pixabay), an even, warm beat for a page about steady upkeep.
// Beat map (wiki/soundtrack-library/profiles/pixabay-462905.json): 90 BPM (0.667 s a beat), first downbeat 0.275 s,
// straight feel; a pickup to beat 4, then 16-beat phrases on 4, 20, 36 ... 116; accents 5, 9, 15, 21, 25, 31, 41, 47,
// 53, 57, 69, 73, 79, 85, 89, 95, 101, 105, 109, 111, 117, 121, 125, 127; softer bars 64-68 and 82-84; a dead stop on
// 98-99 and back, loudest, on 101; the last section 100-131; the song ends on 133. 136 beats = 1:31.
// Pace in seconds: a panel about every 1.5 s = 2.25 beats; pages of 8-16 beats.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

const tr = track('/agentic-systems/second-brain/');

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: the track ticker inside the main box. The one nod to Track 02 is here.
  { b: 0, l: 8, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: very hungry agents.', cap2: 'Now: what they remember.', at2: 4 },
    { at: 3, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 5, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // The repeated input, played for laughs.
  { b: 8, l: 12, title: 'Day one. Again.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'NEW TASK.', cap: 'The assistant says hello. Warmly.' },
    { at: 3.25, r: [0.5, 0, 0.5, 0.5], chat: true, cap: 'You explain how your business works.' },
    { at: 5.5, r: [0, 0.5, 0.5, 0.5], pix: 'NEXT TASK.', cap: 'You explain it again.' },
    { at: 7.75, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'Same rule. Same correction. Again.' },
  ], sfx: [{ at: 7, w: 'DEJA VU!', sub: 'Heard this one.', x: 0.5, y: 0.5, r: -5 }] },
  { b: 20, l: 8, title: 'Write it down.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], img: card('second-brain'), cap: 'So write it down. Once.' },
    { at: 2.75, r: [0.5, 0, 0.5, 0.5], pix: 'DECISIONS.', cap: 'What was decided.' },
    { at: 5, r: [0.5, 0.5, 0.5, 0.5], pix: 'STANDARDS.', cap: 'What good looks like here.' },
  ], sfx: [{ at: 5, w: 'NOTED.', x: 0.26, y: 0.88, r: 6 }] },
  { b: 28, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], pix: 'LESSONS.', cap: 'The useful ones, kept.' },
    { at: 2.25, r: [0.5, 0, 0.5, 1], pix: 'THE NEXT TASK.', cap: 'Starts with the context.', cap2: 'Not from zero.', at2: 5 },
  ], sfx: [{ at: 3, w: 'REMEMBERED!', x: 0.26, y: 0.88, r: -6 }] },
  // The page's Organize panel.
  { b: 36, l: 16, title: 'Filing system.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 0.5], pix: 'WIKI.', cap: 'Facts and procedures.' },
    { at: 3.25, r: [1 / 3, 0, 1 / 3, 0.5], pix: 'SKILLS.', cap: 'Repeatable ways of working.' },
    { at: 5.5, r: [2 / 3, 0, 1 / 3, 0.5], pix: 'THE WHY.', cap: 'Decisions keep the reasoning.' },
    { at: 7.75, r: [0, 0.5, 0.5, 0.5], pix: 'CURRENT.', cap: 'Clear what is current, and who can change it.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'Not a folder called FINAL v2.' },
  ], sfx: [{ at: 5, w: 'FILED!', x: 0.74, y: 0.88, r: -5 }, { at: 11, w: 'SORTED.', x: 0.26, y: 0.12, r: 6 }] },
  // It gets better as it is used.
  { b: 52, l: 8, title: 'Red pen.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'DRAFT.', cap: 'An agent drafts a proposal.' },
    { at: 2.75, r: [0.5, 0, 0.5, 0.5], pix: 'CORRECTED.', cap: 'You fix it.' },
    { at: 5, r: [0.5, 0.5, 0.5, 0.5], pix: 'OLD RULE.', cap: 'The fix exposes an outdated rule.' },
  ], sfx: [{ at: 5, w: 'SCRIBBLE!', x: 0.26, y: 0.88, r: 7 }] },
  { b: 60, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], pix: 'RULE UPDATED.', cap: 'An expert updates the rule.' },
    { at: 2.5, r: [0.5, 0, 0.5, 1], chart: true, cap: 'The next proposal starts from better instructions.', cap2: 'Used more. Gets better.', at2: 5.5 },
  ] },
  // Proof, from the page's Examples panel, worded as the page words it.
  { b: 68, l: 16, title: 'Case files.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'AZURE MOVE.', cap: 'A six-week estimate.', cap2: 'Delivered in two.', at2: 4 },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'TRANSPILER.', cap: "A national insurer's website, converted and migrated in two weeks." },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'NO SPECIALIST.', cap: 'Needed at handoff.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'THIS SITE.', cap: 'Claude and Codex continue work from its wiki.', cap2: 'Matt reviews.', at2: 12 },
  ], sfx: [{ at: 5, w: 'FAST-FORWARD!', x: 0.74, y: 0.88, r: -5 }, { at: 11, w: 'HANDED OFF.', x: 0.26, y: 0.12, r: 5 }] },
  // The setup for the serious bit.
  { b: 84, l: 8, title: 'Left alone.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'NOBODY OWNS IT.', cap: 'A brain nobody keeps current.' },
    { at: 3, r: [0.5, 0, 0.5, 1], pix: 'JUST A FOLDER.', cap: 'With opinions from last year.' },
  ], sfx: [{ at: 5, w: 'DUSTY.', x: 0.26, y: 0.88, r: -6 }] },
  // The dead stop: the only serious chapter, no slams. The motion holds on 98-99.
  { b: 92, l: 8, title: 'Straight up.', ember: 1.8, freeze: [[6, 8]], panels: [
    { at: 0.5, r: [0, 0, 0.46, 1], img: card('team-modernization'), cap: 'This part matters.' },
    { at: 2.5, r: [0.46, 0, 0.54, 0.5], pix: 'AN EXPERT.', cap: 'Keeps the knowledge current as the work changes.' },
    { at: 4.5, r: [0.46, 0.5, 0.54, 0.5], pix: 'AN OWNER.', cap: 'Ownership and access grow with it.' },
  ] },
  // Back, loudest, on 101: a single-panel gag.
  { b: 100, l: 4, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'STILL HERE.', cap: 'Next task. The context is already there.' },
  ], sfx: [{ at: 1, w: 'RECALL!', x: 0.8, y: 0.8, r: 7 }] },
  // The page's packaged offers (no prices).
  { b: 104, l: 12, title: 'Start small.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.4], pix: 'TWO WEEKS.', cap: 'A second brain around one useful workflow.', cap2: 'Then decide how far to take it.', at2: 9 },
    { at: 2.75, r: [0, 0.4, 0.5, 0.6], pix: 'SHAREPOINT ONLINE.', cap: 'For teams working in Microsoft 365.' },
    { at: 5, r: [0.5, 0.4, 0.5, 0.6], pix: 'CLAUDE CODE / CODEX.', cap: 'For teams building with Claude Code or Codex.' },
  ], sfx: [{ at: 5, w: 'PACKAGED.', x: 0.74, y: 0.14, r: 5 }, { at: 7, w: 'SCOPED.', x: 0.26, y: 0.88, r: -6 }] },
  // The reader's move: each starting point links somewhere on the site.
  { b: 116, l: 8, title: 'Your turn.', panels: [
    { at: 0.5, r: [0, 0, 0.25, 1], img: photo('starting-point-rework'), cap: 'The work you keep explaining?', href: '/contact/?service=second-brain' },
    { at: 1.5, r: [0.25, 0, 0.25, 1], img: photo('starting-point-m365-ai'), cap: 'Working in Microsoft 365?', href: '/traditional-systems/information-governance-ai-readiness/' },
    { at: 2.5, r: [0.5, 0, 0.25, 1], img: photo('starting-point-custom-agents'), cap: 'Building with Claude Code or Codex?', href: '/agentic-systems/agentic-team-modernization/' },
    { at: 3.5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-cloud-security'), cap: 'Want to see one in use?', href: '/contact/?service=second-brain&type=demo' },
  ], sfx: [{ at: 5, w: 'TEACH IT.', x: 0.5, y: 0.5, r: -4 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds. Nine beats,
  // the longest close the song allows (it ends on 133, 89.7 s): 133 beats end at 88.94 s. It resolves on beat 4 (5 in a
  // 12-beat close, 3 in an 8).
  { b: 124, l: 9, close: true, panels: [] },
];

const art = findSourceImage('service-hero', 'second-brain-translucent-cortex');
export const secondBrainStory: BeatComicStory = {
  bpm: 90,
  beats: 133,
  close: 124,
  track: tr,
  music: { src: '/audio/pixabay-462905-melody-of-my-soul.mp3', offset: 0.275, credit: 'Music: Melody of my soul by Playsound', source: 'https://pixabay.com/music/beats-melody-of-my-soul-462905/' },
  closeScene: { lines: ['Second', 'Brain.'], pixelate: 4, lede: 'Give AI the context to carry work forward with less input from you. Your decisions, standards and useful lessons stay available for the next task, with experts keeping them current.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};

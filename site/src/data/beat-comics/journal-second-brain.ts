// "A second brain needs an owner to build it" Beat Comic, Disc 2 (the Journal), Track 01 (Matt, 2026-09-28: "journal
// should be a separate disk on the site playlist", "when done this please do all journal entries next"). The entry
// covers December 2025. It retells the entry: the pitch (fund one? yes, then who owns it), what a second brain is,
// the owner's first week and the order Matt keeps (discuss, decide, then distil), the loop that makes it smarter as it
// is used, the strata (decision A, C reverses A, T changes C) and the fix (correct in place, git keeps the history, a
// hook flags a layer), then (the only serious chapter, on the song's near-silent breakdown) the guardian: assumptions
// got in, the brain is rebuilt from its facts, and the operator has to know the work. After it: nine notes about tone
// rolled back, facts in the wiki and behaviour in the skills, too many skills for Copilot's tool limit, no imports,
// Copilot anchored to the brain, documents made by interview (this entry too), Agentic Context Infrastructure, brains
// that prompt us, and the entry's closing question as "Your turn.". Claims come only from the committed entry
// (src/data/journal/second-brain-needs-an-owner.json at HEAD) and its cover; Matt's words are quoted only where the
// entry prints them as a blockquote. No client names, no prices, no big-firm chapter (homepage only), no slam word
// twice. Canadian spelling in the comic's own words (behaviour, judgement).
//
// Cut to "Funky Boulevard" by PineAppleMusic (Pixabay): warm, busy funk for a brain that gets better as it is used,
// with a long near-silent breakdown for the guardian.
// Beat map (wiki/soundtrack-library/profiles/pixabay-189919.json): 95 BPM (0.632 s a beat), first downbeat 0.34 s,
// straight feel. Grid checked statically (no browser, so not by ear): the onset comb scores 95 BPM far above 90, 100,
// 71.25 and 126.67 (361 against 138-261; 190 is the same grid's eighths), and the loudness sections change on whole
// bars (the breakdown 68-80, a half-level rebuild 84-95, full from 96-100, a one-bar dip 128, the end on 164). One doubt
// for the ear: the kick and snare onsets sit half a beat off this phase (at 0.656 s they score kick 99 / snare 121
// against 73 / 71 at 0.34 s). If `?beat=tick` confirms the kick on the "and", the fix is the library grid's offset
// 0.656 s (same beat numbers, half a beat later); no page moves.
// Per-beat loudness: groove 4-67 (accents 6, 9, 14, 17, 22, 25, 30, 33, 35, 38, 41, 43, 45, 46, 49, 54, 57, 59, 61,
// 65); the breakdown 68-83 (stops 69, 71, 73, 75, 79, 81); the rebuild 84-99; full again 100-163 (accents 102, 105,
// 107, 110, 113, 118, 121, 126, 134, 137, 139, 142, 145, 150, 153, 155, 157, 161, 163); the song ends on 164.
// Pace in seconds: a panel about every 1.6 s = 2.5 beats, 8-beat pages (5.1 s) on the half phrases, 16 for the
// guardian. 168 beats end at 106.45 s, 2.2 s before the 108.67 s file; the close holds on the song's end.
import type { BeatComicStory } from './types';
import { track } from './tracklist';
import { findSourceImage } from '../../lib/images';
import { stop } from '../../lib/heading-stop';
import { card, photo, smallest, markPaths } from './sources';
import entries from '../journal-credits.json';
const entry=entries["second-brain-needs-an-owner"];

type R = [number, number, number, number];
// Disc 2 (the Journal) in tracklist.ts: track() gives the disc, the number and the entry's own title.
const tr = track('/journal/second-brain-needs-an-owner/');
// The entry's own cover, a cinematic photo drawn `cover` (the same shape as card() and photo()).
const cover = { src: smallest(entry.cover.kind, entry.cover.id), fit: 'cover' as const };
const strata: [string, string][] = [['DECISION A.', 'Recorded.'], ['DECISION C.', 'Reverses A.'], ['DECISION T.', 'Changes C.']];
const order = ['DISCUSS.', 'DECIDE.', 'DISTIL.'];

const pages: BeatComicStory['pages'] = [
  // The cover, as a service page's: the mark and the Disc 2 track with the CD ticker inside the main box, the entry's
  // title small below, the tone chat. Its captions are the entry's opening lines.
  { b: 0, l: 12, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `DISC ${tr.disc}. TRACK ${tr.no}.`, ticker: true, cap: 'The first one took about a month.', cap2: 'The one behind this site: three days.', at2: 4 },
    { at: 3, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 5, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ], sfx: [{ at: 6, w: 'BOOT UP!', x: 0.8, y: 0.12, r: 6 }] },
  { b: 12, l: 8, title: 'What it is.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], img: card('second-brain'), cap: 'Shared facts your AI assistants read before they answer.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'IN YOUR LANGUAGE.', cap: 'With your exceptions written down.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], chat: true, cap: 'Claude, Codex and both Copilots can work from one.' },
  ], sfx: [{ at: 5, w: 'READ FIRST!', x: 0.26, y: 0.88, r: -5 }] },
  { b: 20, l: 8, title: 'The ask.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'FUND ONE?', cap: 'Should we fund a second brain?', cap2: 'Yes.', at2: 1.75 },
    { at: 3.5, r: [0, 0.5, 1, 0.5], pix: 'IT ALSO NEEDS AN OWNER.', cap: 'Then Matt asks who is going to own it.' },
  ], sfx: [
    { at: 2, w: 'APPROVED!', x: 0.8, y: 0.14, r: 5 },
    { at: 5, w: 'GULP.', sub: 'Who, exactly?', x: 0.84, y: 0.86, r: -6 },
  ] },
  { b: 28, l: 8, title: 'Week one.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: '1 WEEK.', cap: 'At least, of a skilled subject matter expert.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'THE EXCEPTIONS.', cap: 'The judgement calls.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'THE MEETING.', cap: 'Decided there. Never written up.' },
  ], sfx: [{ at: 5, w: 'HOMEWORK.', x: 0.26, y: 0.12, r: -5 }] },
  { b: 36, l: 8, title: 'The order.', panels: [
    ...order.map((w, i) => ({ at: 0.5 + i * 1.5, r: [i / 3, 0, 1 / 3, 0.6] as R, rp: [0, i * 0.2, 1, 0.2] as R, pix: w })),
    { at: 5, r: [0, 0.6, 1, 0.4], pix: 'THEN THE BRAIN.', cap: 'An assumption that goes in early causes drift.' },
  ], sfx: [{ at: 7, w: 'IN THAT ORDER.', x: 0.8, y: 0.9, r: 4 }] },
  { b: 44, l: 8, title: 'The loop.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'EVERY RUN LOGS.', cap: 'What worked. What failed.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'SKILL FIXED FIRST.', cap: 'The next run is better for it.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'Smarter as it is used.' },
  ], sfx: [{ at: 5, w: 'LEARNED!', x: 0.26, y: 0.88, r: 6 }] },
  // The strata, drawn as layers: each decision lands on top of the last.
  { b: 52, l: 8, title: 'Strata.', panels: [
    ...strata.map(([w, c], i) => ({ at: 0.5 + i * 1.5, r: [0, i * 0.25, 1, 0.25] as R, pix: w, cap: c })),
    { at: 5.5, r: [0, 0.75, 1, 0.25], pix: 'ALL THREE STAY.', cap: 'Nothing says which one is current.' },
  ], sfx: [{ at: 7, w: 'WHICH ONE?!', x: 0.8, y: 0.88, r: -5 }] },
  { b: 60, l: 8, title: 'Fix it in place.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'REPLACE IT.', cap: 'A new decision replaces the old one where it sits.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'HISTORY KEPT.', cap: 'Version control keeps the history.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'THE HOOK.', cap: 'A small check flags a write that adds a layer.', cap2: 'Copy it: end of the entry.', at2: 7 },
  ], sfx: [{ at: 5, w: 'CORRECTED.', x: 0.26, y: 0.88, r: -6 }] },
  // The breakdown: the only serious chapter, no slams. The motion holds through the near-silence (69-81).
  { b: 68, l: 16, title: 'The guardian.', ember: 1.8, freeze: [[1, 13]], panels: [
    { at: 0.5, r: [0, 0, 0.46, 1], img: cover, cap: "People trust a second brain's answers." },
    { at: 3.5, r: [0.46, 0, 0.54, 1 / 3], pix: 'ASSUMPTIONS GOT IN.', cap: 'Matt has rebuilt a brain from scratch a few times.' },
    { at: 6.5, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'REBUILT FROM FACTS.', cap: 'Easier than chasing a contradiction.' },
    { at: 9.5, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'GUARDIANS OF THE TRUTH.', cap: '"This is human judgement not mechanical operations."', cap2: 'The operator knows the work.', at2: 13 },
  ] },
  // The rebuild (half level, no accents, so no slams): the same thing happens to skills.
  { b: 84, l: 8, title: 'Nine notes.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: '9 CORRECTIONS.', cap: 'About tone, to one skill, in one afternoon.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], chart: true, cap: 'Each reasonable. Worse with every addition.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'ROLLED BACK.', cap: 'Now a change replaces a line.' },
  ] },
  { b: 92, l: 8, title: 'The split.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 0.5], pix: 'WIKI: FACTS.', cap: 'The wiki holds facts.' },
    { at: 2.5, r: [0.5, 0, 0.5, 0.5], pix: 'SKILLS: BEHAVIOUR.', cap: 'Agents, skills, commands, workflows, hooks.' },
    { at: 5, r: [0, 0.5, 1, 0.5], pix: 'NORTH STAR.', cap: 'Every repo gets one. Agents focus on work that moves it.' },
  ] },
  // Full again on 100: skills cost context.
  { b: 100, l: 8, title: 'Skills cost.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'TOOL LIMIT.', cap: 'Too many skills loaded into GitHub Copilot.', cap2: 'Tools disabled to get back under.', at2: 4 },
    { at: 3, r: [0, 0.5, 1, 0.5], pix: 'ONLY WHAT IT USES.', cap: 'Now only the skills a build actually uses.' },
  ], sfx: [
    { at: 2, w: 'OVERLOAD!', x: 0.84, y: 0.14, r: 6 },
    { at: 5, w: 'TRIMMED.', x: 0.84, y: 0.88, r: -5 },
  ] },
  { b: 108, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], pix: 'NO IMPORTS.', cap: 'Read third-party skills for ideas. Build your own.' },
    { at: 2.5, r: [0.5, 0, 0.5, 1], pix: 'YOUR PROCEDURES.', cap: 'The skills worth writing.', cap2: 'No training run has seen them.', at2: 5.5 },
  ], sfx: [{ at: 5, w: 'HOMEMADE.', x: 0.26, y: 0.88, r: -6 }] },
  { b: 116, l: 8, title: 'Anchor it.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'READ ALL OF SHAREPOINT?', cap: 'Microsoft 365 clients often ask.' },
    { at: 2.5, r: [0.5, 0, 0.5, 0.5], pix: 'IT CAN.', cap: 'Everything, faithfully.', cap2: 'Mess included.', at2: 4 },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], pix: 'ANCHORED.', cap: 'Point it at an authoritative index in the brain.' },
  ], sfx: [{ at: 5, w: 'MESS!', x: 0.26, y: 0.88, r: 7 }] },
  { b: 124, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], pix: 'INTERVIEWS.', cap: 'The AI asks. A person answers, reviews and approves.' },
    { at: 3, r: [0.5, 0, 0.5, 1], pix: 'THIS ENTRY TOO.', cap: 'Answered over several rounds.', cap2: 'Reviewed before it went anywhere.', at2: 5.5 },
  ], sfx: [{ at: 2, w: 'ASK AWAY!', x: 0.26, y: 0.12, r: -5 }] },
  { b: 132, l: 8, title: 'Infrastructure.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'AGENTIC CONTEXT INFRASTRUCTURE.', small: true, cap: 'Facts, skills and hooks every agent reads before it acts.' },
    { at: 3, r: [0, 0.5, 0.5, 0.5], pix: 'ONE BRAIN.', cap: 'A small team.' },
    { at: 5, r: [0.5, 0.5, 0.5, 0.5], pix: 'DOZENS.', cap: 'An enterprise.' },
  ], sfx: [{ at: 7, w: 'SCALE UP!', x: 0.74, y: 0.88, r: 5 }] },
  { b: 140, l: 8, title: "What's next.", panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'ARMS AND LEGS.', cap: 'In Teams, Slack and Discord.' },
    { at: 3, r: [0.5, 0, 0.5, 1], chat: true, cap: 'Second brains that prompt us.' },
  ], sfx: [
    { at: 2, w: 'PING!', x: 0.26, y: 0.12, r: -6 },
    { at: 5, w: 'HELLO?', x: 0.74, y: 0.88, r: 5 },
  ] },
  // The entry's closing question, as four starting points; each box links where the site answers it.
  { b: 148, l: 8, title: 'Your turn.', panels: [
    { at: 0.5, r: [0, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/contact/?service=second-brain', cap: 'Who knows the work?' },
    { at: 2, r: [0.25, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/agentic-systems/second-brain/', cap: 'Can you give them the first week?' },
    { at: 3.5, r: [0.5, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/traditional-systems/information-governance-ai-readiness/', cap: 'Copilot reading all of SharePoint?' },
    { at: 5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/roles-access-control/', cap: 'What may each brain hold?' },
  ], sfx: [{ at: 7, w: 'OVER TO YOU.', x: 0.5, y: 0.12, r: -4 }] },
  // The entry's own hero: its title lands in 8-bit type and resolves into the modern heading on 161, then holds while
  // the song ends (164) and plays on.
  { b: 156, l: 12, close: true, panels: [] },
];

// The close repeats the entry's hero, read from its data (never retyped): the h1 as JournalEntryPage renders it (the
// lead, then the accent with its full stop), the standfirst and the cover. The close lays the cover full-bleed behind
// the heading, as the Journal hero does (closeScene.layout 'full-bleed').
const art = findSourceImage(entry.cover.kind, entry.cover.id);
export const journalSecondBrainStory: BeatComicStory = {
  bpm: 95,
  beats: 168,
  close: 156,
  track: tr,
  music: { src: '/audio/pixabay-189919-funky-boulevard.mp3', offset: 0.34, credit: 'Music: Funky Boulevard by PineAppleMusic', source: 'https://pixabay.com/music/funk-funky-boulevard-189919/' },
  closeScene: { lines: [entry.titleLead ?? entry.title, stop(entry.titleAccent ?? '')], pixelate: 5, layout: 'full-bleed', lede: entry.standfirst, image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  // The Journal hero's text block (h1, standfirst, byline). JournalEntryPage has no scroll reveal, so the engine hands
  // over as soon as the fold ends (it waits for a reveal only when the target takes part in one).
  collapseTo: '.journal-entry-hero .page-title',
  markPaths,
  pages,
};

// Journal Beat Comic: "Standardize document generation quality with a rubric", Disc 2, Track 03 (Matt, 2026-09-28:
// "journal should be a separate disk on the site playlist", then "are you ready to start on disk 2?"). The entry covers
// July 2026. The story retells the entry: a team's standard documents drafted in a chat look finished until someone
// reads them; a yes-or-no rubric per document type; (the only serious chapter, on the song's breakdown) nothing is
// invented, content outranks structure, and a person sends it; the generator interviews the person first (reverse
// prompting); the answers write the draft; the model checks its own draft before anyone reads it; a problem seen twice
// becomes a rule, shared across types; fewer changes; the two files in the entry's tip; then the reader's move.
// Claims come only from the entry's committed text (src/data/journal/every-generated-document-needs-a-rubric.json);
// no client names, no prices, no invented numbers. No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Funk Music" by bearstockmusic (Pixabay). Beat map (wiki/soundtrack-library/profiles/pixabay-603572.json):
// 104 BPM (0.577 s a beat), first downbeat 0.3 s, straight feel. Grid checked (2026-09-28, from the profile's per-beat
// loudness and onsets): the loud section repeats its per-beat loudness exactly on 16-beat periods (80-95 = 96-111, and
// the same figures return 84 beats later at 164-195), the middle section repeats on 16 (128-143 = 144-159), and the
// section changes land on bars (the breakdown 64, the drop 80, the second peak 164), so 104 BPM holds with no drift.
// Kick, snare and hat onsets fall on the beat and the half beat, about 0.03 s ahead of the grid (inaudible; offset
// kept). The song: near silent 0-28 (dips on 19 and 27), a fill on 29 into the groove 32-63 (loud on the first two
// beats of each bar); the breakdown 64-79, the quietest stretch after the intro (dips 67, 70); the loud section 80-111
// (accents 80, 85, 88, 92, 96, 101, 104, 108); a break with a dead stop on 114; the middle section 116-159 (129, 148);
// a dip on 162, the second peak 164-195 (161, 164, 169, 172, 176, 180, 185, 188, 192, 195); the fade 196-212; silence
// from 213. Pace in seconds: a panel every 2.5-3 beats (1.4-1.7 s), 12- and 16-beat pages.
// The story ends at 214 beats (123.76 s), 0.61 s before the 124.37 s song file; the close starts on 204, in the fade.
//
// Disc 2: track() gives the disc, so the ticker reads "DISC 2 * TRACK 03" and the cover's main box "DISC 2. TRACK 03.";
// the close lays the entry's cover full-bleed behind the heading (closeScene.layout 'full-bleed'), as the Journal hero
// does. collapseTo is the hero's text block, `.journal-entry-hero .page-title` (h1, standfirst, byline).
import type { BeatComicStory } from './types';
import { track } from './tracklist';
import { findSourceImage } from '../../lib/images';
import { stop } from '../../lib/heading-stop';
import { card, photo, smallest, markPaths } from './sources';
import entries from '../journal-credits.json';
const entry=entries["every-generated-document-needs-a-rubric"];

type R = [number, number, number, number];
const tr = track('/journal/every-generated-document-needs-a-rubric/');
// The entry's own cover photograph (a cinematic photo, drawn `cover`), from the entry's data.
const coverImg = { src: smallest(entry.cover.kind, entry.cover.id), fit: 'cover' as const };
const checks = ['BLIND READ.', 'BREAK IT.', 'LINE BY LINE.'];

const pages: BeatComicStory['pages'] = [
  // The cover, as a service page's: the mark and the track with the CD ticker in the main box, the entry title small
  // below, the tone chat. The song is near silent to 28: no slams.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `DISC ${tr.disc}. TRACK ${tr.no}.`, ticker: true, cap: 'Most of what an organization writes, it has written before.', cap2: 'Only the details change.', at2: 9 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 7, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // Still quiet, frozen on the dips at 19 and 27.
  { b: 16, l: 12, title: 'Looks finished.', freeze: [[3, 4], [11, 12]], panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], chat: true, cap: 'Someone opens a chat and types a request.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'LOOKS FINISHED.', cap: 'Back comes a draft.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'QUICK. CHEAP.', cap: 'As many as the team likes.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'DONE?', cap: 'Nobody has read one yet.' },
  ] },
  // The band arrives on 29.
  { b: 28, l: 12, title: 'The read.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'THEN SOMEONE READS THEM.', cap: 'The drafts fail in the same ways.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'INVENTED FACTS.', cap: 'Facts nobody supplied.' },
    { at: 6.5, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'TANGENTS.', cap: 'Sections that wander off.' },
    { at: 9, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'ONE TOPIC.', cap: 'Whole pages circling it.' },
  ], sfx: [
    { at: 2, w: 'RED PEN!', x: 0.86, y: 0.12, r: -6 },
    { at: 4, w: 'REWRITE!', x: 0.5, y: 0.12, r: 5 },
  ] },
  { b: 40, l: 8, title: 'From zero.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'NOTHING CARRIED.', cap: 'Every draft starts from zero.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'EVERY REVIEWER.', cap: 'Starts rewriting.' },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'Cheap, until someone counts the review time.' },
  ], sfx: [{ at: 5, w: 'RECOUNT!', sub: 'Review time and tokens.', x: 0.25, y: 0.88, r: -5 }] },
  // The standard: a rubric, and the entry's own examples.
  { b: 48, l: 16, title: 'The rubric.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'YES OR NO.', cap: 'A rubric: each line a question a reviewer can answer yes or no.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'ONE CHANGE.', cap: 'Does it carry exactly one?' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'STEP 14.', cap: 'At two in the morning, do they know what to do?' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'SMALL VS LARGE.', cap: 'A smaller model, tested fairly.' },
  ], sfx: [
    { at: 0, w: 'CHECK!', x: 0.5, y: 0.88, r: -5 },
    { at: 12, w: 'FAIR FIGHT!', sub: 'Quality against cost.', x: 0.5, y: 0.12, r: 5 },
  ] },
  // The breakdown, the song's quietest stretch: the only serious chapter, no slams, frozen on the dips at 67 and 70.
  { b: 64, l: 16, title: 'Nothing invented.', ember: 1.8, freeze: [[3, 4], [6, 7]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: coverImg, cap: 'The model never fills a gap with something plausible.' },
    { at: 4, r: [0.46, 0, 0.54, 1 / 3], pix: 'WHAT IS MISSING.', cap: 'The section says so, and who owes it.' },
    { at: 7, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'CONTENT FIRST.', cap: 'A draft that fails one content question is not ready.' },
    { at: 11, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'A PERSON SENDS IT.', cap: 'The model never does.' },
  ] },
  // The drop on 80.
  { b: 80, l: 16, title: 'The interview.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'REVERSE PROMPTING.', cap: 'The model interviews the person.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'ANSWERED ALREADY.', cap: 'Whatever the organization already holds.' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], chat: true, cap: 'We suggest this, because of that.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'SECONDS.', cap: 'A suggested answer, drawn from the last one.' },
  ], sfx: [
    { at: 0, w: 'FLIP!', sub: 'The model asks.', x: 0.5, y: 0.88, r: 6 },
    { at: 8, w: 'ASKED!', sub: 'Only what no page can answer.', x: 0.5, y: 0.12, r: -5 },
  ] },
  { b: 96, l: 16, title: 'The draft.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'ANSWERS IN.', cap: 'Each section filled from an answer or a named source.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'BY WEDNESDAY.', cap: 'We proceed with the first option, unless told otherwise.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'A POSITION.', cap: 'An open decision, agreed with one word.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: '10TH = 1ST.', cap: 'The tenth, written as carefully as the first.' },
  ], sfx: [
    { at: 0, w: 'DRAFTED!', x: 0.5, y: 0.88, r: -6 },
    { at: 8, w: 'SAME AGAIN!', sub: 'Same sections, same test.', x: 0.5, y: 0.12, r: 5 },
    { at: 12, w: 'DEAL!', sub: 'Agreed in one word.', x: 0.25, y: 0.12, r: -4 },
  ] },
  // The break: frozen on the dead stop at 114.
  { b: 112, l: 16, title: 'Self-check.', freeze: [[2, 3]], panels: [
    ...checks.map((w, i) => ({ at: 1 + i * 2.5, r: [i / 3, 0, 1 / 3, 0.5] as R, pix: w, ...(i ? {} : { cap: 'The model grades its own draft, more than once.' }) })),
    { at: 8.5, r: [0, 0.5, 1, 0.5], pix: '2 QUESTIONS.', cap: 'Once, it mentioned two questions, and stopped.', cap2: 'Now the reply asks them.', at2: 12.5 },
  ], sfx: [
    { at: 4, w: 'GRADED!', sub: 'Like a strict colleague.', x: 0.5, y: 0.88, r: 5 },
    { at: 8, w: 'OOPS!', sub: 'Never asked.', x: 0.83, y: 0.12, r: -6 },
  ] },
  { b: 128, l: 16, title: 'Corrections.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'WHAT CHANGED.', cap: 'What the reviewer still changes is the most useful part.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'TWICE = A RULE.', cap: 'So it cannot appear a third time.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'HEADING + TABLE.', cap: 'Nothing else, and it passed every section check.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'SAY WHAT TO DO.', cap: 'Now every table says what to do with it.' },
  ], sfx: [
    { at: 1, w: 'HOLD ON!', sub: 'Same problem, second time.', x: 0.5, y: 0.88, r: -5 },
    { at: 8, w: 'BUSTED!', sub: 'A heading and a table.', x: 0.75, y: 0.12, r: 6 },
  ] },
  { b: 144, l: 16, title: 'Shared.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'SHARED RUBRIC.', cap: 'When a second type needs a rule, every type is held to it.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'ADD.', cap: 'A type can add questions.' },
    { at: 6.5, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'STRICTER.', cap: 'Or make a shared one stricter.' },
    { at: 9, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'NEVER WAIVE.', cap: 'Never waive one.' },
  ], sfx: [{ at: 4, w: 'INHERITED!', sub: 'Each new type starts there.', x: 0.5, y: 0.12, r: -5 }] },
  // The second peak from 164.
  { b: 160, l: 16, title: 'Fewer changes.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'THE NEXT ONE.', cap: 'Checked for everything caught on the last.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'FEWER CHANGES.', cap: 'Over time, the reviewer asks for fewer.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'ALREADY RULES.', cap: 'The ones they used to ask for.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'JUDGEMENT.', cap: 'Their time moves to what only they can give.' },
  ], sfx: [
    { at: 4, w: 'LEARNED!', sub: 'From the last one.', x: 0.25, y: 0.88, r: 5 },
    { at: 12, w: 'DIALLED IN!', sub: 'Not rewritten.', x: 0.25, y: 0.12, r: -5 },
  ] },
  // The entry's tip: the two files the reader can copy.
  { b: 176, l: 16, title: 'Two files.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'THE GENERATOR.', cap: 'One skill for one document type.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'THE RUBRIC.', cap: 'The shared one every type is held to.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'COPY THEM.', cap: 'Both are in the entry, ready to save.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'ADAPT IT.', cap: 'To the document your team writes most.' },
  ], sfx: [
    { at: 0, w: 'COPY THAT!', x: 0.5, y: 0.88, r: -5 },
    { at: 9, w: 'SAVED!', sub: 'Two files.', x: 0.5, y: 0.12, r: 6 },
    { at: 12, w: 'YOURS!', sub: 'Your document, your rubric.', x: 0.25, y: 0.88, r: -4 },
  ] },
  // The reader's move: the entry's closing question. Each box links where the site answers it (a page with a Beat
  // Comic, or the contact form).
  { b: 192, l: 12, title: 'Your turn.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], img: card('team-modernization'), href: '/agentic-systems/agentic-team-modernization/', cap: 'Which document do you rewrite most?' },
    { at: 3.5, r: [0.25, 0, 0.25, 1], img: card('devops-scaling'), href: '/agentic-systems/agentic-devops-scaling/', cap: 'What would its rubric ask?' },
    { at: 6, r: [0.5, 0, 0.25, 1], img: card('second-brain'), href: '/agentic-systems/second-brain/', cap: 'Where do its answers live?' },
    { at: 8.5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/contact/?service=team-modernization', cap: 'Build the first generator?' },
  ], sfx: [{ at: 3, w: 'PICK ONE!', x: 0.5, y: 0.88, r: 5 }] },
  // On the fade: the entry's own hero. Its heading lands in 8-bit type and resolves into the modern heading on 208, then
  // holds.
  { b: 204, l: 10, close: true, panels: [] },
];

const art = findSourceImage(entry.cover.kind, entry.cover.id);
export const journalRubricStory: BeatComicStory = {
  bpm: 104,
  // One pass of the song is 216 beats, but the file ends at 124.37 s: 214 beats end 0.61 s before it.
  beats: 214,
  close: 204,
  track: tr,
  music: { src: '/audio/pixabay-603572-funk-music.mp3', offset: 0.3, credit: 'Music: Funk Music by bearstockmusic', source: 'https://pixabay.com/music/funk-funk-music-603572/' },
  // The entry's hero, read from its data: the h1 (titleLead, then titleAccent with its heading stop), the standfirst,
  // the cover. A 10-beat close resolves on beat 4 (round(5 x 10 / 12)).
  closeScene: { lines: [entry.titleLead ?? entry.title, stop(entry.titleAccent)], pixelate: 4, layout: 'full-bleed', lede: entry.standfirst, image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  // The Journal hero is a full-bleed cover with no .page-art: the stage folds into the hero's text block (h1,
  // standfirst, byline), as About Matt folds into its full-bleed hero's text.
  collapseTo: '.journal-entry-hero .page-title',
  markPaths,
  pages,
};

// Agentic Team Modernization Beat Comic, the mixtape's Track 04 (Matt, 2026-09-28: "you may dispatch sub agents to build
// all the agentic systems animations"). The Task Field story as mischief: work has changed before (the fax, the retyped
// letter), then one AI rollout for every team, which lands differently in a legal practice, a sales team, a foundation
// and a utility; the work is sorted task by task (people, AI prepares, automated), the cost of a mistake decides which
// (the only serious chapter, on the song's dead stop), an accurate draft can still miss, AI brings new work of its own,
// routines go on repeat with exceptions sent to a person, and a rematch against the old process decides how far to go.
// Claims come from the page (its lede, the four role examples, How Work Changes, Human Taste & Judgement, Repeat and
// Automate, How Matt can help) and its Task Field models (the departed and AI-created tasks); no numbers, no client
// names, no prices. No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Comic Trouble in the Village - Mischief Background" by DesiFreeMusic (Pixabay), a playful, straight-feel romp.
// Beat map (wiki/soundtrack-library/profiles/pixabay-451178.json): 103.82 BPM (0.578 s a beat), first downbeat 0.045 s;
// an intro to 16, the build with accents on 19 and 23; a dip 25-27, back on 28 (accent 30); full 32-55 (accent 38, a dip
// 41-43); a dead stop 56-63; full 64-79; stutter stops on 81 and 83; full 84-107; a breakdown 108-115 (stops 109, 111,
// 115); the loudest section 116-127 (accents 116, 118, 120, 124); quiet 128-135; full 136-151 (accents 136, 148); the song
// ends on 152 (89.95 s). The story is 155 beats (ends 89.62 s).
// Pace in seconds: a panel about every 1.5 s = 2.5 beats; pages of 8-12 beats (4.6-6.9 s).
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

const tr = track('/agentic-systems/agentic-team-modernization/');
// The "Your turn." photos link to the pages this page itself sends readers to (its Redesign the Work links).
const start = (id: string, href: string) => ({ img: photo(id), href });

const pages: BeatComicStory['pages'] = [
  // The cover, as Track 02's: the track ticker inside the main box, the page title small below, the tone line.
  { b: 0, l: 8, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: the agents got a brain.', cap2: 'Now: they meet your team.', at2: 4 },
    { at: 3, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 5, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // Homage: work has changed before (the departed tasks in the page's Task Field models).
  { b: 8, l: 8, title: 'Old jobs.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'FAX.', cap: 'Quote sheets. By fax.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'RETYPED.', cap: 'Dictated letters, typed again.' },
    { at: 5, r: [0, 0.5, 0.5, 0.5], pix: 'PAPER FILES.', cap: 'Carried from desk to desk.' },
    { at: 7, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'Work has changed before.' },
  ], sfx: [{ at: 6, w: 'RETIRED.', sub: 'Nobody misses the fax.', x: 0.5, y: 0.12, r: -5 }] },
  // The build: one rollout for everyone.
  { b: 16, l: 8, title: 'Enter AI.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: photo('starting-point-custom-agents'), cap: 'Then the memo: AI for every team.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'SAME ROLLOUT.', cap: 'Legal, sales, grants, crews.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'SAME RESULT?', cap: 'Not quite.' },
  ], sfx: [{ at: 3, w: 'ROLLOUT!', x: 0.26, y: 0.88, r: -6 }, { at: 7, w: 'ONE SIZE!', sub: 'Fits nobody.', x: 0.76, y: 0.12, r: 6 }] },
  // The dip, then back on 28: one gag.
  { b: 24, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], pix: "HOW'S IT GOING?", cap: 'Three months later.' },
    { at: 4, r: [0.5, 0, 0.5, 1], pix: 'IT DEPENDS.', cap: 'On which team you ask.' },
  ], sfx: [{ at: 6, w: 'SHRUG.', x: 0.26, y: 0.88, r: -5 }] },
  // The page's four role examples: an exact 2 x 2 grid of halves.
  { b: 32, l: 12, title: 'Four teams.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'LEGAL.', cap: 'Approval stays with the professional.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'SALES.', cap: 'A person decides what to promise.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'FOUNDATION.', cap: 'Programme leaders decide the awards.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'UTILITY.', cap: 'Operations decides when crews are released.' },
  ], sfx: [{ at: 6, w: 'DIFFERENT!', sub: 'Every one.', x: 0.5, y: 0.5, r: -4 }] },
  { b: 44, l: 12, title: 'Task by task.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 0.5], pix: 'PEOPLE.', cap: 'Judgement.' },
    { at: 3.5, r: [1 / 3, 0, 1 / 3, 0.5], pix: 'AI PREPARES.', cap: 'Drafts, for someone to review.' },
    { at: 6, r: [2 / 3, 0, 1 / 3, 0.5], pix: 'AUTOMATED.', cap: 'Bounded routines, with checks.' },
    { at: 8.5, r: [0, 0.5, 1, 0.5], pix: 'COST OF A MISTAKE.', cap: 'It decides which.' },
  ], sfx: [{ at: 8, w: 'TRIAGED.', x: 0.84, y: 0.5, r: 5 }] },
  // The dead stop: the only serious chapter, no slams. The motion holds while the song is silent.
  { b: 56, l: 8, title: 'For real.', ember: 1.8, freeze: [[0, 7]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('team-modernization'), cap: 'No jokes for a second.' },
    { at: 3, r: [0.46, 0, 0.54, 0.5], pix: 'THE WORK.', cap: 'Start with what people do and decide.' },
    { at: 5.5, r: [0.46, 0.5, 0.54, 0.5], pix: 'THE COST.', cap: 'And what a mistake would cost.' },
  ] },
  // Back on 64: human taste and judgement.
  { b: 64, l: 8, title: 'The draft.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'ACCURATE.', cap: 'The draft checks out.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'MISSED IT.', cap: 'It missed what the client needs.' },
    { at: 6, r: [0.5, 0.5, 0.5, 0.5], pix: 'SEND IT BACK.', cap: 'Make returning work easy.' },
  ], sfx: [{ at: 5, w: 'NOPE.', x: 0.26, y: 0.88, r: -6 }] },
  { b: 72, l: 8, panels: [
    { at: 0, r: [0, 0, 1 / 3, 1], pix: 'THE REVIEWER.', cap: 'Needs the sources, the context and the time.' },
    { at: 2.5, r: [1 / 3, 0, 1 / 3, 1], pix: 'APPROVED.', cap: 'Kept apart from the drafts.' },
    { at: 5, r: [2 / 3, 0, 1 / 3, 1], pix: 'SAME FIX AGAIN?', cap: 'A rule is missing. Or an example is weak.' },
  ], sfx: [{ at: 5, w: 'TASTE!', sub: 'Still human.', x: 0.5, y: 0.12, r: 5 }] },
  // The stutter stops on 81 and 83: one gag.
  { b: 80, l: 4, freeze: [[1, 2], [3, 4]], panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'NEW TASKS.', cap: 'Surprise: AI adds work.', cap2: 'Not in the brochure.', at2: 2 },
  ] },
  // The work AI creates (the page's "plan the new work too", and the Task Field's AI-created tasks).
  { b: 84, l: 12, title: 'The new work.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'CHECK SOURCES.', cap: 'Every draft, against its sources.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'MAINTAIN.', cap: 'Instructions and examples, kept current.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'FAILURES.', cap: 'Someone handles what breaks.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], img: card('cost-planning'), cap: 'Count review and upkeep in the cost.' },
  ], sfx: [{ at: 8, w: 'HOMEWORK!', sub: 'AI brought some.', x: 0.5, y: 0.5, r: -5 }, { at: 11, w: 'COUNTED.', x: 0.76, y: 0.12, r: 6 }] },
  { b: 96, l: 12, title: 'On repeat.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'CLEAR INPUTS.', cap: 'A routine, done the same way.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'CLEAR RESULT.', cap: 'Everyone agrees what acceptable looks like.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], img: card('devops-scaling'), cap: 'Then it runs on its own, with checks.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'NEW RECIPIENT?', cap: 'Unusual cases go to a person.' },
  ], sfx: [{ at: 4, w: 'LOOPED.', x: 0.5, y: 0.5, r: 5 }, { at: 10, w: 'EXCEPTION!', sub: 'Human, please.', x: 0.26, y: 0.12, r: -6 }] },
  // The breakdown: the rematch is set up; the motion stutters on the stops.
  { b: 108, l: 8, title: 'The rematch.', freeze: [[1, 2], [3, 4], [7, 8]], panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'OLD PROCESS.', cap: 'In one corner: how it was done.' },
    { at: 4, r: [0.5, 0, 0.5, 1], pix: 'NEW PROCESS.', cap: 'In the other: review and upkeep included.' },
  ] },
  // The loudest section: the bout, on the accents.
  { b: 116, l: 8, panels: [
    { at: 0, r: [0, 0, 1 / 3, 1], pix: 'COMPARE.', cap: 'Finished work, old way against new.' },
    { at: 2.5, r: [1 / 3, 0, 1 / 3, 1], pix: 'UPKEEP.', cap: 'Review and maintenance counted.' },
    { at: 5, r: [2 / 3, 0, 1 / 3, 1], pix: 'VERDICT.', cap: 'Then decide whether to automate more.' },
  ], sfx: [{ at: 0, w: 'DING DING!', x: 0.17, y: 0.88, r: -6 }, { at: 4, w: 'SCORECARD!', x: 0.5, y: 0.88, r: 5 }] },
  { b: 124, l: 4, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'AUTOMATE MORE?', cap: 'Only where it won.' },
  ], sfx: [{ at: 0, w: 'KNOCKOUT!', x: 0.8, y: 0.8, r: 7 }] },
  // The quiet stretch: the offer, from How Matt can help.
  { b: 128, l: 8, title: 'One role.', ember: 1.4, panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'ONE ROLE.', cap: 'Map its tasks, one by one.' },
    { at: 3.5, r: [0.5, 0, 0.5, 1], pix: 'ONE WORKFLOW.', cap: 'Redesign it, test it, compare it.' },
  ] },
  { b: 136, l: 8, title: 'Your turn.', panels: [
    { at: 0.5, r: [0, 0, 0.25, 1], ...start('starting-point-rework', '/agentic-systems/agentic-devops-scaling/'), cap: 'Same fix, every week?' },
    { at: 1.5, r: [0.25, 0, 0.25, 1], ...start('starting-point-m365-ai', '/agentic-systems/second-brain/'), cap: 'Policies in SharePoint?' },
    { at: 2.5, r: [0.5, 0, 0.25, 1], ...start('starting-point-cloud-security', '/traditional-systems/information-governance-ai-readiness/'), cap: 'Who can AI reach?' },
    { at: 3.5, r: [0.75, 0, 0.25, 1], ...start('starting-point-custom-agents', '/agentic-systems/agentic-cost-planning/'), cap: 'What will it cost to run?' },
  ], sfx: [{ at: 5, w: 'OVER TO YOU.', x: 0.5, y: 0.86, r: -4 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  // Eleven beats, the longest close the song allows (the file ends at 89.95 s; 155 beats end at 89.62 s): it resolves on
  // beat 5.
  { b: 144, l: 11, close: true, panels: [] },
];

const art = findSourceImage('service-hero', 'team-modernization-team');
export const teamModernizationStory: BeatComicStory = {
  bpm: 103.82,
  beats: 155,
  close: 144,
  track: tr,
  music: { src: '/audio/pixabay-451178-comic-trouble-in-the-village-mischief-background.mp3', offset: 0.045, credit: 'Music: Comic Trouble in the Village – Mischief Background by DesiFreeMusic', source: 'https://pixabay.com/music/happy-childrens-tunes-comic-trouble-in-the-village-mischief-background-451178/' },
  closeScene: { lines: ['Agentic Team', 'Modernization.'], pixelate: 5, lede: 'AI changes a legal practice differently from a sales team, a foundation or a utility. Start with the work people do, the decisions they carry and what a mistake would cost.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};

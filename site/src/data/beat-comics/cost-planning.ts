// Agentic Cost Planning Beat Comic, the mixtape's Track 05 (Matt, 2026-09-28: "you may dispatch sub agents to build all
// the agentic systems animations"). The token bill as a circus nobody budgeted for: the acts (model use, tools, retries,
// review), one quota for every role, the cheap run that was redone, the retry loop, then the fixes from the page:
// allowances by role with development counted as R&D, cost per accepted result checked with evals, retry limits and
// escalation, one view of usage and outcomes, and the decision to raise, improve or stop. The only serious chapter sits
// on the song's dead stop and carries Matt's forecast, attributed as his (flat rates giving way to usage pricing; never a
// vendor announcement). Claims come from the Agentic Cost Planning page and wiki/site/content.md; no numbers, no client
// names, no prices. One nod to Track 02 ("The tools got eaten."). No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "The Creepy Circus" by AstronautFlute (Pixabay).
// Beat map (wiki/soundtrack-library/profiles/pixabay-521971.json): the analyser's 130 BPM grid (0.4615 s a beat), first
// downbeat 0.08 s. Every even beat is louder than the odd beat after it and every hit is on an even beat, so the felt
// pulse is the oom-pah on even beats (65 BPM half time); the story keeps the 130 grid and puts slams on even beats. A
// quiet intro to 31; the build 32-63 (hits 42-56); the groove 64-137 (dips 72-75 and 104-107, the peak on 124); a dip
// 138-143; a dead stop 154-159; the loudest section 160-191; softer 192-207; loud 208-221, a stop on 222-223; 224-271
// (hits 230, 252, 256, 264); the song ends on 277 (129.34 s). The story is 279 beats (ends 128.84 s).
// Pace in seconds: a panel about every 3.5 beats (1.6 s); pages of 12-16 beats (5.5-7.4 s).
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

const tr = track('/agentic-systems/agentic-cost-planning/');

type R = [number, number, number, number];
// The acts on the bill: the page's "model use, tools, failed attempts and review".
const acts = ['MODEL USE.', 'TOOLS.', 'RETRIES.', 'REVIEW.'];

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: the track ticker inside the main box, over the quiet intro.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: the agents went to work.', cap2: 'Now: somebody pays.', at2: 10 },
    { at: 5, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 8, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  { b: 16, l: 16, title: 'The big top.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'ROLL UP!', cap: 'The greatest show in software.' },
    { at: 4.5, r: [0, 0.5, 0.5, 0.5], img: photo('starting-point-custom-agents'), cap: 'The agents take the ring.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], pix: 'FLAT RATE.', cap: 'One price a seat. Says the plan.' },
  ], sfx: [{ at: 12, w: 'HONK!', sub: 'Enter the clowns.', x: 0.74, y: 0.14, r: -6 }] },
  // The build: every act is billed.
  { b: 32, l: 16, title: 'The acts.', panels: [
    { at: 1, r: [0, 0, 1, 0.4], pix: "TONIGHT'S ACTS.", cap: 'Every one of them is billed.' },
    ...acts.map((t, i) => ({ at: 4 + i * 2, r: [i * 0.25, 0.4, 0.25, 0.6] as R, rp: [(i % 2) * 0.5, 0.4 + Math.floor(i / 2) * 0.3, 0.5, 0.3] as R, pix: t })),
  ], sfx: [{ at: 12, w: 'JUGGLE!', x: 0.5, y: 0.18, r: -5 }, { at: 14, w: 'DROPPED ONE!', sub: 'Try again.', x: 0.5, y: 0.88, r: 6 }] },
  { b: 48, l: 16, title: 'Who pays?', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], chart: true, cap: 'The tools got eaten. The bill came later.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: 'INVOICE.', cap: 'Nobody budgeted for the show.' },
    { at: 8, r: [0, 0.5, 0.5, 0.5], pix: 'WHO SPENT IT?', cap: 'Nobody can say which role.' },
    { at: 11.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'WORTH IT?', cap: 'Nobody can say that either.' },
  ], sfx: [{ at: 4, w: 'YIKES!', sub: 'Who approved this?', x: 0.26, y: 0.88, r: -6 }, { at: 8, w: 'GASP!', x: 0.76, y: 0.14, r: 6 }] },
  { b: 64, l: 16, title: 'One ticket.', panels: [
    { at: 1, r: [0, 0, 1, 0.4], pix: 'ONE QUOTA.', cap: 'The same allowance for every role.' },
    { at: 4.5, r: [0, 0.4, 0.5, 0.6], pix: 'THE EXPERT.', cap: 'Out of budget by Wednesday.' },
    { at: 8, r: [0.5, 0.4, 0.5, 0.6], pix: 'EVERYONE ELSE.', cap: 'Barely touched theirs.' },
  ], sfx: [{ at: 12, w: 'TIGHTROPE!', sub: 'One size fits nobody.', x: 0.5, y: 0.18, r: -4 }, { at: 14, w: 'SQUEEZE!', x: 0.5, y: 0.88, r: 6 }] },
  { b: 80, l: 16, title: 'By role.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'THE BUILDER.', cap: 'Experts explore, assemble context and test.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: 'R&D.', cap: 'Development spend. Not automatically waste.' },
    { at: 8, r: [0, 0.5, 0.5, 0.5], pix: 'THE REGULAR.', cap: 'Runs the proven workflow. A different job.' },
    { at: 11.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'NEED MORE?', cap: 'Difficult work gets an approval path.' },
  ], sfx: [{ at: 6, w: 'BALANCE!', x: 0.76, y: 0.88, r: 5 }, { at: 14, w: 'ALLEZ-OOP!', x: 0.26, y: 0.12, r: -6 }] },
  { b: 96, l: 16, title: 'The real price.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'CHEAP RUN.', cap: 'A low token bill.', cap2: 'Redone twice.', at2: 4 },
    { at: 7.5, r: [0.5, 0, 0.5, 0.5], pix: 'ACCEPTED.', cap: 'Count what it took to produce work your team accepts.' },
    { at: 11, r: [0.5, 0.5, 0.5, 0.5], pix: 'EVALS.', cap: 'Real tasks check that cheaper runs still meet the standard.' },
  ], sfx: [{ at: 6, w: 'SPLAT!', sub: 'Do it again.', x: 0.76, y: 0.88, r: 6 }, { at: 14, w: 'NO FREE LUNCH.', x: 0.26, y: 0.12, r: -5 }] },
  // The peak: the runaway loop, then the net under it.
  { b: 112, l: 12, title: 'The loop.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'RETRY.', cap: 'It failed.' },
    { at: 3, r: [1 / 3, 0, 1 / 3, 1], pix: 'RETRY.', cap: 'It failed again.' },
    { at: 5, r: [2 / 3, 0, 1 / 3, 1], pix: 'RETRY.', cap: 'Still spending.' },
  ], sfx: [{ at: 6, w: 'WHIRL!', x: 0.5, y: 0.12, r: 7 }, { at: 8, w: 'MERRY-GO-ROUND!', sub: 'Paid by the lap.', x: 0.5, y: 0.5, r: -5 }] },
  { b: 124, l: 12, title: 'Safety net.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'RETRY LIMIT.', cap: 'Set before a loop spends the budget.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: 'ESCALATE.', cap: 'Then a specialist, or a person.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], img: card('devops-scaling'), cap: 'A failed check decides the next move.' },
  ], sfx: [{ at: 4, w: 'BRAKES!', x: 0.76, y: 0.88, r: 6 }, { at: 10, w: 'CAUGHT.', sub: 'Net holds.', x: 0.26, y: 0.12, r: -5 }] },
  // The dip before the stop: one gag.
  { b: 136, l: 8, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'CLOWN CAR.', cap: 'How many agents fit in one budget?', cap2: 'Fewer than you think.', at2: 4 },
  ] },
  // The dead stop: the only serious chapter, no slams. Matt's forecast, attributed as his.
  { b: 144, l: 16, title: 'No clowning.', ember: 1.8, freeze: [[10, 16]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('cost-planning'), cap: 'Makeup off. The numbers stay.' },
    { at: 5, r: [0.46, 0, 0.54, 0.5], pix: 'FLAT RATES.', cap: "Matt's forecast: they give way to usage pricing." },
    { at: 10, r: [0.46, 0.5, 0.54, 0.5], pix: 'PLAN AHEAD.', cap: 'For prices and limits that change.' },
  ] },
  // Back on 160, the loudest section: the reporting.
  { b: 160, l: 16, title: 'One view.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], chart: true, cap: 'Usage and outcomes from your tools, in one view.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: 'THE GAPS.', cap: 'Marked, not hidden.' },
    { at: 8, r: [0, 0.5, 0.5, 0.5], pix: 'NEAR THE LIMIT.', cap: 'Which roles approach their allowances.' },
    { at: 11.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'AGAIN AND AGAIN.', cap: 'Where corrections recur.' },
  ], sfx: [{ at: 4, w: 'SPOTLIGHT!', x: 0.26, y: 0.88, r: -6 }, { at: 12, w: 'TA-DA!', x: 0.76, y: 0.14, r: 6 }] },
  { b: 176, l: 16, title: 'The call.', panels: [
    { at: 1, r: [0, 0, 1, 1 / 3], pix: 'RAISE IT.', cap: 'An allowance that is too tight.' },
    { at: 4.5, r: [0, 1 / 3, 1, 1 / 3], pix: 'IMPROVE IT.', cap: 'Instructions that keep needing correction.' },
    { at: 8, r: [0, 2 / 3, 1, 1 / 3], pix: 'STOP IT.', cap: 'Work the results do not justify.' },
  ], sfx: [{ at: 4, w: 'DRUMROLL!', x: 0.8, y: 0.15, r: 5 }, { at: 12, w: 'DECIDED.', x: 0.8, y: 0.5, r: -4 }] },
  // The softer section: the page's deliverables.
  { b: 192, l: 16, title: 'What you receive.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'ALLOWANCES.', cap: 'What each role can spend, and how to approve more.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: 'TRACKING PLAN.', cap: 'Usage by role, workflow and stage.' },
    { at: 8, r: [0, 0.5, 0.5, 0.5], pix: 'THE REAL COST.', cap: 'What useful work costs, retries and review included.' },
    { at: 11.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'LIMITS.', cap: 'When a retry stops and a person takes over.' },
  ] },
  // Loud again, to the stop on 222-223.
  { b: 208, l: 16, title: 'Worth it?', freeze: [[14, 16]], panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'BIG SPEND.', cap: 'A costly development run.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'NEW SKILL.', cap: 'It may leave a skill the team reuses.' },
    { at: 9, r: [0.5, 0.5, 0.5, 0.5], pix: 'SAME SPEND?', cap: 'On a familiar task, it points to a problem.' },
  ], sfx: [{ at: 4, w: 'BRAVO!', sub: 'Reusable.', x: 0.76, y: 0.88, r: 5 }, { at: 12, w: 'HMM.', x: 0.26, y: 0.12, r: -6 }] },
  { b: 224, l: 16, title: 'Three acts.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'NEW WORKFLOW.', cap: 'Allow for exploration and attempts that fail.' },
    { at: 5, r: [1 / 3, 0, 1 / 3, 1], pix: 'ROUTINE REPORT.', cap: 'Small inefficiencies grow with volume.' },
    { at: 9, r: [2 / 3, 0, 1 / 3, 1], pix: 'MIGRATION.', cap: 'A higher cost can be justified. It still needs a limit.' },
  ], sfx: [{ at: 6, w: 'THREE RINGS!', x: 0.17, y: 0.12, r: -5 }] },
  { b: 240, l: 12, title: 'Bring one.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'ONE WORKFLOW.', cap: 'Bring one workflow and the roles involved.' },
    { at: 5, r: [0.5, 0, 0.5, 1], mark: true, pix: 'THE EVIDENCE.', cap: 'Matt helps define useful results, allowances and the evidence to decide.' },
  ] },
  // Each starting point links to where that question is answered on the site.
  { b: 252, l: 16, title: 'Your turn.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-rework'), cap: 'One quota for every role?', href: '/contact/?service=cost-planning' },
    { at: 3, r: [0.25, 0, 0.25, 1], img: photo('starting-point-custom-agents'), cap: 'A workflow that keeps retrying?', href: '/agentic-systems/agentic-devops-scaling/' },
    { at: 5, r: [0.5, 0, 0.25, 1], img: photo('starting-point-cloud-security'), cap: 'Agents redoing the same work?', href: '/agentic-systems/second-brain/' },
    { at: 7, r: [0.75, 0, 0.25, 1], img: photo('starting-point-m365-ai'), cap: 'Roles using AI unevenly?', href: '/agentic-systems/agentic-team-modernization/' },
  ], sfx: [{ at: 12, w: 'STEP RIGHT UP.', x: 0.5, y: 0.86, r: -4 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  // Eleven beats, the longest close the song allows (the file ends at 129.34 s; 279 beats end at 128.84 s, where 280
  // ran to 129.31 s): it resolves on beat 5.
  { b: 268, l: 11, close: true, panels: [] },
];

const art = findSourceImage('service-hero', 'cost-planning');
export const costPlanningStory: BeatComicStory = {
  bpm: 130,
  beats: 279,
  close: 268,
  track: tr,
  music: { src: '/audio/pixabay-521971-the-creepy-circus.mp3', offset: 0.08, credit: 'Music: The Creepy Circus by AstronautFlute', source: 'https://pixabay.com/music/circus-the-creepy-circus-521971/' },
  closeScene: { lines: ['Agentic Cost', 'Planning.'], pixelate: 5, lede: 'Give each role the AI budget its work needs. Understand what you spend developing a workflow, what it costs to run, and whether the results justify doing more.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};

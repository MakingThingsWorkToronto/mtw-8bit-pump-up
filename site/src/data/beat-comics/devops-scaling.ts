// Agentic DevOps & Scaling Beat Comic, the mixtape's Track 06 (Matt, 2026-09-28: "you may dispatch sub agents to build
// all the agentic systems animations"). The drift: a workflow that works on one expert's laptop, then has to hold at the
// scale of the organization. It works on my laptop; everyone wants it; every copy drifts; then skills, checks that act,
// experts first and a tested handover, Microsoft 365 Copilot where the team already works, and (the only serious
// chapter, on the song's dead stops) an owner, a boundary and a budget. Claude Code, Codex and GitHub Copilot are the
// pit crew; the team still drives. Claims come from the Agentic DevOps & Scaling page (skills carry instructions,
// examples and checks; a failed check retries, escalates or stops for a person; useful failures become regression
// cases; role quotas; the insurer's website converted by a purpose-built transpiler and migrated in two weeks with no
// specialist needed at handoff; the task, knowledge and authority for Copilot; owner, access boundary and budget; a new
// model or a wider audience is a reason to test again). No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Symphonic Drift Phonk 03" by vjgalaxy (Pixabay): drift phonk for the drift from one laptop to everyone.
// Beat map (wiki/soundtrack-library/profiles/pixabay-436822.json): 126 BPM (0.476 s a beat), first downbeat 0.335 s,
// straight feel; a quiet intro 0-15, a build 16-31 (accent 31), a middle 32-47, a dip 48-62, the drop on 63; the full
// section 64-127 (accents 71, 74, 77, 79, 87, 90, 95, 101, 103, 106, 109, 111, 125); the breakdown 128-142 with dead
// stops on 137-138 and 141-142, back on 143; loud 144-159 (accent 153); a middle 160-175; a fade 176-190, the drop on
// 191; the full section 192-255 (accents every two beats or so); the song ends on 258. 260 beats = 2:04.
// Pace in seconds: a panel about every 1.5 s = 3 beats; 16-beat pages (7.6 s) on the phrases, 8 before the close.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
const tr = track('/agentic-systems/agentic-devops-scaling/');
const crew = ['CLAUDE CODE.', 'CODEX.', 'GITHUB COPILOT.'];
const lap = ['BUILD.', 'CHECK.', 'HAND OVER.', 'SCALE.'];

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's and Track 02's: the mark and TRACK 06. with the CD ticker inside the main box.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: it worked on one laptop.', cap2: 'Now: everyone wants it.', at2: 9 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 7, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // The build: one expert, one good result.
  { b: 16, l: 16, title: 'Works for me.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'ONE EXPERT.', cap: 'One engineer with Claude Code.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], chart: true, cap: 'The first result is genuinely useful.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'TESTED.', cap: 'A defined change, checked before it merged.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'WORKS ON MY LAPTOP.', cap: 'Famous last words.' },
  ], sfx: [{ at: 15, w: 'CERTIFIED!', sub: 'By one laptop.', x: 0.5, y: 0.12, r: -5 }] },
  { b: 32, l: 16, title: 'Roll it out.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'GREAT. NOW EVERYONE.', cap: 'Then the rest of the organization heard about it.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'WHICH PROMPT?', cap: 'Nobody wrote it down.' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'WHAT CONTEXT?', cap: 'It lived in one chat.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], chat: true, cap: 'Can you just send me yours?' },
  ], sfx: [{ at: 10, w: 'COPY-PASTE!', x: 0.5, y: 0.12, r: 5 }] },
  // The dip before the drop: every copy drifts.
  { b: 48, l: 16, title: 'The drift.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], img: card('team-modernization'), cap: 'Everyone got a copy of the prompt.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'SAME PROMPT.', cap: 'Same task, next person.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'NEW ANSWER.', cap: 'Nobody could say which one was right.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'NO CHECKS.', cap: 'Nothing said what a good result must do.' },
  ], sfx: [{ at: 15, w: 'DRIFT!', sub: 'Every copy a little further off.', x: 0.26, y: 0.88, r: -6 }] },
  // The full section, on the drop.
  { b: 64, l: 16, title: 'Skills, not prompts.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'SKILL.', cap: 'Instructions, examples and checks, in one place.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], img: card('second-brain'), cap: 'Kept in shared knowledge, not one chat.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'REVIEWED.', cap: "An expert's correction changes the shared source." },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'PICK IT UP.', cap: 'The next person, or agent, starts from there.' },
  ], sfx: [{ at: 7, w: 'PACKED!', x: 0.26, y: 0.12, r: -6 }, { at: 15, w: 'REUSED!', x: 0.74, y: 0.88, r: 5 }] },
  // The page's three outcomes of a failed check, as three slams.
  { b: 80, l: 16, title: 'Checks that act.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], pix: 'TESTS.', cap: 'Tests check what it does.' },
    { at: 4, r: [0.25, 0, 0.25, 1], pix: 'EXPERTS.', cap: 'Experts judge if it is useful.' },
    { at: 7, r: [0.5, 0, 0.25, 1], pix: 'FAILED CHECK.', cap: 'Then something happens.' },
    { at: 10, r: [0.75, 0, 0.25, 1], pix: 'REGRESSION.', cap: 'Useful failures become regression cases.' },
  ], sfx: [
    { at: 7, w: 'RETRY!', sub: 'Within its allowance.', x: 0.125, y: 0.88, r: -6 },
    { at: 10, w: 'ESCALATE!', sub: 'To a specialist.', x: 0.375, y: 0.12, r: 5 },
    { at: 15, w: 'STOP.', sub: 'A person decides.', x: 0.625, y: 0.88, r: -4 },
  ] },
  { b: 96, l: 16, title: 'Experts first.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'ROOM TO BUILD.', cap: "Experts develop and test within their role's quota." },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'SOMEONE ELSE.', cap: 'Then someone else runs it, exceptions and all.' },
    { at: 7, r: [0, 0.5, 1, 0.5], pix: 'NO SPECIALIST.', cap: "A national insurer's website content: converted by a purpose-built transpiler, migrated in two weeks.", cap2: 'Needed at handoff.', at2: 11 },
  ], sfx: [
    { at: 5, w: 'TRIAL RUN!', x: 0.26, y: 0.12, r: -5 },
    { at: 10, w: 'TAG!', sub: "You're it.", x: 0.74, y: 0.12, r: 7 },
    { at: 15, w: 'PROVEN.', x: 0.5, y: 0.12, r: -4 },
  ] },
  // The fill before the breakdown: where the team already works.
  { b: 112, l: 16, title: 'Scale it.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'MICROSOFT 365 COPILOT.', cap: 'For a team in Microsoft 365, the workflow reaches people there.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'THE TASK.', cap: 'What it does.' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'THE KNOWLEDGE.', cap: 'What it needs.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'THE AUTHORITY.', cap: 'What users should be able to do.' },
  ], sfx: [{ at: 13, w: 'PROMOTED!', sub: 'From laptop to tenant.', x: 0.5, y: 0.12, r: 5 }] },
  // The breakdown and its dead stops: the only serious chapter, no slams. The picture links to Information Governance.
  { b: 128, l: 16, title: 'No drift.', ember: 1.8, freeze: [[9, 11], [13, 15]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('information-governance'), href: '/traditional-systems/information-governance-ai-readiness/', cap: 'Who can build an agent, and what it can reach.' },
    { at: 4, r: [0.46, 0, 0.54, 1 / 3], pix: 'AN OWNER.', cap: 'Someone answers for every workflow.' },
    { at: 7, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'A BOUNDARY.', cap: 'It reaches only what it should.' },
    { at: 11, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'A BUDGET.', cap: 'Judged by accepted results, not token use alone.' },
  ] },
  // Back on 143: the delivery team.
  { b: 144, l: 16, title: 'The pit crew.', panels: [
    ...crew.map((c, i) => ({ at: 1 + i, r: [i / 3, 0, 1 / 3, 0.5] as R, rp: [0, i * (0.5 / 3), 1, 0.5 / 3] as R, pix: c })),
    { at: 6, r: [0, 0.5, 1, 0.5], pix: 'THE TEAM DECIDES.', cap: 'Agents make a defined change. The team decides what changes, and when it is ready.', cap2: 'The agents are the pit crew.', at2: 11 },
  ], sfx: [{ at: 9, w: 'PIT STOP!', x: 0.5, y: 0.12, r: -5 }] },
  { b: 160, l: 16, title: 'Test again.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'NEW MODEL.', cap: 'A new model ships.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'TEST AGAIN.', cap: 'Every check, again.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'WIDER AUDIENCE.', cap: 'Another team wants in.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'AND AGAIN.', cap: 'A new model or a wider audience is a reason to test again.' },
  ], sfx: [{ at: 14, w: 'DEJA VU!', x: 0.26, y: 0.12, r: 6 }] },
  // The fade, then the drop on 191: the drift, held.
  { b: 176, l: 16, title: 'Hold the line.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 0.6], pix: 'ONE LAPTOP.', cap: 'Proven with an expert.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 0.6], pix: 'ONE TEAM.', cap: 'Run by someone else.' },
    { at: 7, r: [2 / 3, 0, 1 / 3, 0.6], pix: 'THE ORGANIZATION.', cap: 'Same skills. Same checks.' },
    { at: 10, r: [0, 0.6, 1, 0.4], chart: true, cap: 'Owners, access and budgets at every step.' },
  ], sfx: [{ at: 15, w: 'GRIP!', sub: 'No drift at scale.', x: 0.5, y: 0.12, r: -5 }] },
  // The full section: the loop lands on the accents.
  { b: 192, l: 16, title: 'Every lap.', panels: [
    ...lap.map((w, i) => ({ at: 1 + i * 2, r: [i * 0.25, 0, 0.25, 0.6] as R, rp: [(i % 2) * 0.5, Math.floor(i / 2) * 0.3, 0.5, 0.3] as R, pix: w })),
    { at: 11, r: [0, 0.6, 1, 0.4], pix: 'EVERY CHANGE.', cap: 'The same loop, every time.' },
  ], sfx: [{ at: 15, w: 'VROOM!', x: 0.5, y: 0.12, r: 6 }] },
  { b: 208, l: 16, title: 'The dashboard.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], chart: true, cap: 'Accepted results.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'FAILURES.', cap: 'Reviewed with the results.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'HUMAN EFFORT.', cap: "People's time counts too." },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'TOKEN USE.', cap: 'Counted alongside, not alone.' },
  ], sfx: [{ at: 7, w: 'TALLY!', x: 0.74, y: 0.12, r: -5 }, { at: 15, w: 'AUDITED.', x: 0.26, y: 0.88, r: 5 }] },
  { b: 224, l: 16, title: 'Your turn.', panels: [
    // Each box links where its question leads (Matt, 2026-09-28: "link those to something on the site").
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/contact/?service=agentic-delivery', cap: 'An expert already getting results?' },
    { at: 4, r: [0.25, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/contact/?service=agentic-delivery&type=call', cap: 'A workflow bound for Copilot?' },
    { at: 7, r: [0.5, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/information-governance-ai-readiness/', cap: 'Who can build an agent?' },
    { at: 10, r: [0.75, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/agentic-systems/agentic-cost-planning/', cap: 'What does it cost to run?' },
  ], sfx: [{ at: 11, w: 'YOUR LAP.', x: 0.5, y: 0.12, r: -4 }, { at: 15, w: 'GREEN LIGHT!', x: 0.5, y: 0.88, r: 5 }] },
  { b: 240, l: 8, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'ONE WORKFLOW.', cap: 'Start with one that already helps an expert.', cap2: 'Then scale it.', at2: 3 },
  ], sfx: [{ at: 7, w: 'LIGHTS OUT!', x: 0.8, y: 0.8, r: -5 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  { b: 248, l: 12, close: true, panels: [] },
];

const art = findSourceImage('service-hero', 'devops-scaling');
export const devopsScalingStory: BeatComicStory = {
  bpm: 126,
  beats: 260,
  close: 248,
  track: tr,
  music: { src: '/audio/pixabay-436822-symphonic-drift-phonk-03.mp3', offset: 0.335, credit: 'Music: Symphonic Drift Phonk 03 by vjgalaxy', source: 'https://pixabay.com/music/upbeat-symphonic-drift-phonk-03-436822/' },
  closeScene: { lines: ['Agentic DevOps &', 'Scaling.'], pixelate: 5, lede: 'Turn the work your experts can do with AI into a capability the wider team can use. Keep the context, the quality checks and the judgment that made the first result useful.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};

// Roles & Access Control Beat Comic, the mixtape's Track 09 (Matt, 2026-09-28: "these are all insane. please do
// traditional systems now."). The bouncer at the door: nobody gets in without being on the list, and the list has an
// owner. Staff, guests, apps and agents knock; the list was written once and never checked; board papers open to the
// whole team, the app with its own key through the side door, the guest's plus one, old access nobody removed; then (the
// only serious chapter, on the song's breakdown) the person leaves and the app they set up keeps its reach. The fix is the
// page's own: groups for routine access, an owner for every group and for the data behind automated membership, a new
// audience in its own library and group, one approved brief with a recipient, purpose and review date, the identity and
// reach of every app and agent, and a review cadence. Claims come from the Roles & Access Control page (its lede, the six
// panels, the offers and deliverables, and Work With Us: the 6,000-user Entra access model). No big-firm chapter (homepage
// only), no slam word twice; one nod to Track 08 on the cover.
//
// Cut to "LEMMINO [FREE RAP BEAT]" by KRIM3S (Pixabay): a bass-heavy, very dynamic rap beat for the door.
// Grid: the library profile reads 100.41 BPM, but on that grid the per-beat loudness repeats every 21 beats. The onsets
// (hats on a 0.196 s sixteenth grid, 925 of 1,148 onsets within 25 ms; intro kicks every 1.568 s) and the loudness both
// repeat every 16 beats at 76.535 BPM (0.784 s a beat, first downbeat 0.041 s), a trap beat in half time. This story is
// cut to that grid (Track 02's tempo: a panel every 2 beats, 8-beat pages).
// On it: a near-silent intro 0-15; soft kicks on every other beat 16-30 (the knocks at the door) and a riser on 31; the
// drop on 32; the full section 32-79 in a 16-beat loop (accents on beats 4, 11 and 14 of each loop: 36, 43, 46 ...); a
// quiet breakdown 80-95 with a riser on 95; back on 96 to 159 (accents 100, 107, 110 ... 158); a quiet outro 160-175;
// silence from 176, and the file ends at 144.43 s. 172 beats = 2:15, ending 9.5 s before the file does.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
const tr = track('/traditional-systems/roles-access-control/');
const cadence = ['MEMBERSHIP.', 'SHARING.', 'APP GRANTS.'];
const agreed = ['RECIPIENT.', 'PURPOSE.', 'REVIEW DATE.'];

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's and the service pages': the mark and TRACK 09. with the CD ticker inside the main box.
  // The intro is near silent; the cover stutters on 1-3.
  { b: 0, l: 8, freeze: [[1, 3]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: the classics answered back.', cap2: 'Now: who gets in.', at2: 4 },
    { at: 3, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 5, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // Homage, on the quiet intro: the door and the list.
  { b: 8, l: 8, title: 'The door.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: card('roles-access-control'), cap: 'Every system has a door.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'THE ROPE.', cap: 'Roles and permissions. A classic.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'NO LIST. NO ENTRY.', cap: 'Nobody gets in without being on the list.' },
  ] },
  // The kicks on every other beat are the knocks.
  { b: 16, l: 8, title: 'Knock knock.', freeze: [[3, 4]], panels: [
    { at: 0.5, r: [0, 0, 1 / 3, 1], pix: 'STAFF.', cap: 'People who need the right information to work.' },
    { at: 2.5, r: [1 / 3, 0, 1 / 3, 1], pix: 'GUESTS.', cap: 'An external adviser, for one brief.' },
    { at: 4.5, r: [2 / 3, 0, 1 / 3, 1], pix: 'APPS.', cap: 'Some act for a person. Some act alone.' },
  ], sfx: [{ at: 6, w: 'KNOCK KNOCK.', sub: 'Who is it?', x: 0.5, y: 0.88, r: -5 }] },
  { b: 24, l: 8, freeze: [[5, 6]], panels: [
    { at: 0, r: [0, 0, 0.5, 1], pix: 'AGENTS.', cap: 'Then the agents showed up.' },
    { at: 2.5, r: [0.5, 0, 0.5, 1], chat: true, cap: 'Are we on the list?', cap2: 'Good question.', at2: 5 },
  ], sfx: [{ at: 7, w: 'BZZT.', x: 0.5, y: 0.12, r: 6 }] },
  // The drop: the list, and everything wrong with it.
  { b: 32, l: 8, title: 'The list.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'THE LIST.', cap: 'Who and what can reach your information.' },
    { at: 2.5, r: [0, 0.5, 0.5, 0.5], pix: 'WRITTEN ONCE.', cap: 'At launch.' },
    { at: 4.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'CHECKED NEVER.', cap: 'It still works. Probably.' },
  ], sfx: [{ at: 0, w: 'DOORS OPEN!', x: 0.26, y: 0.88, r: -6 }, { at: 4, w: 'SAYS WHO?', x: 0.74, y: 0.12, r: 5 }] },
  { b: 40, l: 8, title: 'Convenient.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'BOARD PAPERS.', cap: 'Shared with the whole team.' },
    { at: 2.5, r: [0.5, 0, 0.5, 0.5], pix: 'EASIER.', cap: 'Wider access always is.' },
    { at: 4.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'UNTIL IT ISN\'T.', cap: 'A new tool can open whatever they can.' },
  ], sfx: [{ at: 3, w: 'OOPS.', x: 0.26, y: 0.88, r: -5 }, { at: 6, w: 'OVERSHARED!', x: 0.74, y: 0.12, r: 6 }] },
  { b: 48, l: 8, title: 'The side door.', panels: [
    { at: 0.5, r: [0, 0, 1 / 3, 1], pix: 'APP REGISTRATION.', cap: 'An app gets an identity.' },
    { at: 2.5, r: [1 / 3, 0, 1 / 3, 1], pix: 'SERVICE PRINCIPAL.', cap: 'And permissions of its own.' },
    { at: 4.5, r: [2 / 3, 0, 1 / 3, 1], img: photo('starting-point-custom-agents'), cap: 'Agents, too.' },
  ], sfx: [{ at: 4, w: 'SIDE DOOR!', sub: 'No queue.', x: 0.5, y: 0.88, r: -6 }] },
  { b: 56, l: 8, title: 'Plus one.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 0.5], pix: 'ONE ADVISER.', cap: 'Invited for one brief.' },
    { at: 2.5, r: [0.5, 0, 0.5, 0.5], pix: 'SHARE.', cap: 'Who could share it on.' },
    { at: 4.5, r: [0, 0.5, 1, 0.5], pix: 'PLUS ONE.', cap: 'And their plus one. And theirs.' },
  ], sfx: [{ at: 3, w: 'FORWARDED!', x: 0.26, y: 0.12, r: -6 }, { at: 6, w: 'GATECRASH!', x: 0.5, y: 0.88, r: 5 }] },
  { b: 64, l: 8, title: 'New role.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], img: card('team-modernization'), cap: 'Someone changes role.' },
    { at: 2.5, r: [0.5, 0, 0.5, 0.5], pix: 'NEW ACCESS.', cap: 'Added for the new job.' },
    { at: 4.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'OLD ACCESS.', cap: 'Never removed.', cap2: 'Collector\'s edition.', at2: 6.5 },
  ], sfx: [{ at: 4, w: 'STACKED!', x: 0.26, y: 0.88, r: -5 }] },
  { b: 72, l: 8, title: 'Reorg.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'WHY IS THIS SHARED?', cap: 'The first question of every reorganization.' },
    { at: 2.5, r: [0, 0.5, 0.5, 0.5], pix: 'NOBODY KNOWS.', cap: 'Whoever shared it moved on.' },
    { at: 4.5, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'Permissions, piling up.' },
  ], sfx: [{ at: 3, w: 'HUH?', x: 0.74, y: 0.12, r: 6 }, { at: 6, w: 'SEARCH PARTY!', x: 0.5, y: 0.12, r: -4, len: 2 }] },
  // The breakdown: the only serious chapter, still (the song's quiet 81-94), no slams.
  { b: 80, l: 16, title: 'The other key.', ember: 1.8, freeze: [[1, 15]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: photo('starting-point-cloud-security'), cap: 'Someone leaves the team.' },
    { at: 4, r: [0.46, 0, 0.54, 1 / 3], pix: 'REMOVED.', cap: 'From the team, and its groups.' },
    { at: 7, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'THE APP STAYS.', cap: 'It has an identity of its own.' },
    { at: 10, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'SAME REACH.', cap: 'Removing a person does not change what a separate application identity can reach.', cap2: 'Review it. Agents included.', at2: 13 },
  ] },
  // Back on 96: the fix, from the page.
  { b: 96, l: 8, title: 'Groups.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'SECURED BY GROUPS.', cap: 'Routine access to Teams and SharePoint, through groups.' },
    { at: 2.5, r: [0, 0.5, 0.5, 0.5], pix: 'NEW ROLE?', cap: 'A change of membership.' },
    { at: 4.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'SHARING?', cap: 'Individual sharing stays deliberate.' },
  ], sfx: [{ at: 0, w: 'BOUNCE!', x: 0.26, y: 0.88, r: -6 }, { at: 4, w: 'SORTED.', x: 0.74, y: 0.12, r: 5 }] },
  { b: 104, l: 8, title: 'Owners.', panels: [
    { at: 0.5, r: [0, 0, 1 / 3, 1], pix: 'EVERY GROUP.', cap: 'Has an owner.' },
    { at: 2.5, r: [1 / 3, 0, 1 / 3, 1], pix: 'WHO REVIEWS IT.', cap: 'As teams change.' },
    { at: 4.5, r: [2 / 3, 0, 1 / 3, 1], pix: 'THE DATA TOO.', cap: 'Automated membership needs an owner for the job and department data behind it.' },
  ], sfx: [{ at: 3, w: 'SIGNED.', x: 0.17, y: 0.88, r: -5 }, { at: 6, w: 'ACCOUNTABLE!', x: 0.5, y: 0.12, r: 5 }] },
  // The callback: the board papers get their own room.
  { b: 112, l: 8, title: 'Own room.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'BOARD PAPERS.', cap: 'Remember them?' },
    { at: 2.5, r: [0.5, 0, 0.5, 0.5], pix: 'OWN LIBRARY.', cap: 'A new audience gets its own boundary.' },
    { at: 4.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'OWN GROUP.', cap: 'Not wider access for the whole team.' },
  ], sfx: [{ at: 4, w: 'VELVET ROPE!', x: 0.26, y: 0.88, r: -6 }] },
  { b: 120, l: 8, title: 'Read only.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'ONE APPROVED BRIEF.', cap: 'The adviser reads it. The board papers stay restricted.' },
    ...agreed.map((w, i) => ({ at: 2.5 + i * 1.5, r: [i / 3, 0.5, 1 / 3, 0.5] as R, rp: [0, 0.5 + i * (0.5 / 3), 1, 0.5 / 3] as R, pix: w })),
  ], sfx: [{ at: 3, w: 'LOOK, DON\'T SHARE.', x: 0.8, y: 0.12, r: -5 }, { at: 6, w: 'TESTED!', sub: 'People and apps.', x: 0.5, y: 0.88, r: 5 }] },
  { b: 128, l: 8, title: 'Name the key.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], img: card('power-platform-logic-apps'), cap: 'Every app and agent.' },
    { at: 2.5, r: [0.5, 0, 0.5, 0.5], pix: 'WHICH IDENTITY.', cap: 'Named.' },
    { at: 4.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'WHAT IT CAN REACH.', cap: 'And who approved it.' },
  ], sfx: [{ at: 4, w: 'ID, PLEASE.', x: 0.26, y: 0.88, r: -6 }] },
  { b: 136, l: 8, title: 'On the calendar.', panels: [
    ...cadence.map((w, i) => ({ at: 0.5 + i * 1.5, r: [i / 3, 0, 1 / 3, 0.6] as R, rp: [0, i * 0.2, 1, 0.2] as R, pix: w })),
    { at: 5, r: [0, 0.6, 1, 0.4], chart: true, cap: 'A review cadence, with an owner who can act on the findings.' },
  ], sfx: [{ at: 6, w: 'RECHECKED!', x: 0.5, y: 0.12, r: 5 }] },
  // The page's two offers and its receipt.
  { b: 144, l: 8, title: 'How Matt can help.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 0.5], pix: 'DESIGN THE ACCESS MODEL.', cap: 'For Copilot, agents or a new audience.' },
    { at: 2.5, r: [0.5, 0, 0.5, 0.5], pix: 'REVIEW ACCESS FOR AI.', cap: 'Who and what can reach sensitive content today.' },
    { at: 4.5, r: [0, 0.5, 1, 0.5], pix: '6,000.', cap: 'Internal and external users, in one Entra access model Matt designed.' },
  ], sfx: [{ at: 4, w: 'VETTED.', x: 0.26, y: 0.12, r: -5 }] },
  { b: 152, l: 8, title: 'Your turn.', panels: [
    // One image kind per scene: four cinematic photos, each once; each box links where its question leads, to the page
    // itself, never a #section (landing scrolled folds the comic away, out of the 8-bit experience).
    { at: 0.5, r: [0, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/traditional-systems/information-governance-ai-readiness/', cap: 'Copilot on the way?' },
    { at: 2, r: [0.25, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/contact/?service=roles-access', cap: 'Guests nobody reviews?' },
    { at: 3.5, r: [0.5, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/data-migrations/m365-migrations/', cap: 'Access to plan for a move?' },
    { at: 5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/traditional-systems/information-governance-ai-readiness/', cap: 'What can your agents reach?' },
  ], sfx: [{ at: 6, w: 'NEXT!', x: 0.5, y: 0.88, r: -4 }] },
  // The page's own hero, on the quiet outro: its heading lands in 8-bit type and resolves into the modern heading, then
  // holds.
  { b: 160, l: 12, close: true, panels: [] },
];

// The hero image as the page resolves it (a Roles & Access Control image, or the Traditional Systems shield until then).
const art = (() => { try { return findSourceImage('service-hero', 'roles-access-control'); } catch { return findSourceImage('service-hero', 'traditional-systems-shield'); } })();
export const rolesAccessControlStory: BeatComicStory = {
  bpm: 76.535,
  beats: 172,
  close: 160,
  track: tr,
  music: { src: '/audio/pixabay-481598-lemmino-free-rap-beat.mp3', offset: 0.041, credit: 'Music: LEMMINO [FREE RAP BEAT] by KRIM3S', source: 'https://pixabay.com/music/rap-lemmino-free-rap-beat-481598/' },
  closeScene: { lines: ['Roles & Access', 'Control.'], pixelate: 5, lede: 'People need the right information to work; guests, applications and agents need clear limits. Matt helps you design and review access across Microsoft 365 and Azure, so a new tool or a change of role does not leave permissions to chance.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};

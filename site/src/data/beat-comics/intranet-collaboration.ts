// Intranet & Collaboration Beat Comic, the mixtape's Track 12 (Matt, 2026-09-28: "these are all insane. please do
// traditional systems now"). The wonder: the intranet nobody visits becomes the one everybody opens first. A ghost town
// (stale news, search that finds everything but the file, everyone asking in Teams chat instead), the maze (sites with no
// owner, Teams over here and the files over there), Copilot answering from whatever it can reach, then Matt's way: ask
// the people who will use it, plan Teams and SharePoint as one system, (the only serious chapter, on the song's
// breakdown) give Copilot a current, owned, reviewed source, build the hub, a home for each department and search,
// launch with what people come for and check it is used. Claims come from the Intranet & Collaboration page (its lede,
// "Where work lives", "Built for adoption" and "How Matt can help"): the Nielsen Norman Group Intranet Design Annual,
// the Step Two Platinum Innovation award and the 125+ sites in 14 months are the page's own. No big-firm chapter
// (homepage only), no slam word twice.
//
// Recut 2026-09-28 to "Urban Poetry" by Pumpupthemind (Pixabay): the first song, "The World Is Full Of Wonders" by Ziggy,
// was withdrawn because it carries in-audio advertising (Matt: "we will have to change audio here as i did not realize it
// contains in audio advertising"). Urban Poetry is the library's closest match: the same 95 BPM, bright and straight.
// Beat map (wiki/soundtrack-library/profiles/pixabay-189615.json): 95 BPM (0.632 s a beat), first downbeat 0.565 s,
// straight feel. Grid checked: the per-beat loudness repeats exactly every 16 beats from 16 to 159, and every onset
// (kick, snare, hat) sits on the same two phases of the 95 BPM grid in the song's first, middle and last thirds (94.5
// and 95.5 smear them), so the detected tempo is right. The table's sections fall on multiples of 16 (the profile's
// phrase list starts at 8; the table wins). A quiet intro 0-10, a build 11-15 (accent 15); the groove 16-79 with an
// accent on the fourth beat of every other bar (19, 23, 27, 30, 35 ... 78); the breakdown 80-90 (the song's quietest
// stretch, no dead stop anywhere after the intro), a build 91-95; the groove 96-159 (accents 99 ... 158); the fade 159-160
// in a 104.33 s file. No freezes: the song never stops dead. So One system. moves before the breakdown (planning Teams
// and SharePoint together precedes the build) and Your turn. gets 16 beats to choose a question. The story is 163 beats
// (103.5 s, 0.8 s before the file ends); the last phrase and the fade play under the held close.
// Pace in seconds: a panel about every 1.5 s = 2.5 beats; 8-beat pages (5 s) and 16-beat pages on the phrases.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

const tr = track('/traditional-systems/intranet-collaboration/');
const T3 = 1 / 3;

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: the mark and TRACK 12. with the CD ticker inside the main box, over the quiet intro;
  // the build's accent on 15 asks the empty intranet if anyone is there.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: the intranet nobody opened.', cap2: 'Now: the one everybody opens first.', at2: 9 },
    { at: 5.5, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 8, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ], sfx: [{ at: 15, w: 'ANYONE?', sub: 'Hello?', x: 0.5, y: 0.12, r: -5 }] },
  // The groove: the intranet nobody visits.
  { b: 16, l: 16, title: 'Ghost town.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], img: card('intranet-collaboration'), cap: 'There is an intranet. Somewhere.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'NEWS: VINTAGE.', cap: 'The top story is older than the coffee machine.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'SEARCH.', cap: 'It finds everything except the file.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], chat: true, cap: 'So everyone asks in Teams chat instead.' },
  ], sfx: [
    { at: 7, w: 'TUMBLEWEED!', sub: 'Past the news.', x: 0.26, y: 0.12, r: -6 },
    { at: 11, w: 'CRICKETS.', x: 0.74, y: 0.12, r: 5 },
    { at: 14, w: 'ECHO!', sub: 'Echo. Echo.', x: 0.5, y: 0.88, r: -4 },
  ] },
  { b: 32, l: 16, title: 'The maze.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'OWNER: NOBODY.', cap: 'Sites made for reasons nobody remembers.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'TEAMS OVER HERE.', cap: 'The conversation happens in Teams.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'FILES OVER THERE.', cap: 'The files sit in SharePoint, somewhere else.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'LOST.', cap: 'Nobody knows where work belongs.' },
  ], sfx: [
    { at: 7, w: 'SPLIT!', sub: 'Two worlds.', x: 0.74, y: 0.12, r: 6 },
    // On the phrase's last accent (46), low: it is still up when the next card flashes on 48.
    { at: 14, w: 'SCAVENGER HUNT!', sub: 'For one policy.', x: 0.5, y: 0.88, r: -5 },
  ] },
  // Copilot finds what it can reach (the song has no dead stop here, so no freeze).
  { b: 48, l: 8, title: 'Ask Copilot.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'ASK COPILOT.', cap: 'Where is the current policy?' },
    { at: 3.5, r: [0.5, 0, 0.5, 1], chat: true, cap: 'It found several. None current.' },
  ], sfx: [{ at: 7, w: 'YIKES!', x: 0.26, y: 0.88, r: -6 }] },
  // One gag.
  { b: 56, l: 8, panels: [
    { at: 1, r: [0, 0, 1, 1], pix: 'OLD IN. OLD OUT.', cap: 'Copilot answers from the content it can reach.', cap2: 'Including the draft nobody deleted.', at2: 4.5 },
  ], sfx: [{ at: 3, w: 'STALE!', sub: 'Served fresh.', x: 0.8, y: 0.12, r: 6 }, { at: 6, w: 'RESET.', x: 0.5, y: 0.88, r: -4 }] },
  // The turn: Matt's way starts with people.
  { b: 64, l: 8, title: 'Ask people.', panels: [
    { at: 1, r: [0, 0, T3, 1], pix: 'ASK PEOPLE.', cap: 'Matt interviews the people who will use it.' },
    { at: 3.5, r: [T3, 0, T3, 1], pix: 'WHAT CAN YOU NOT FIND?', cap: 'The intranet is planned around the answer.' },
    { at: 6, r: [2 * T3, 0, T3, 1], chart: true, cap: 'Content needs, by audience.' },
  ], sfx: [{ at: 3, w: 'LISTEN.', x: 1 / 6, y: 0.88, r: -5 }] },
  // Planned as one system before anything is built; LINKED! leaves before the serious chapter's card (len 2).
  { b: 72, l: 8, title: 'One system.', panels: [
    { at: 1, r: [0, 0, T3, 1], pix: 'TEAMS.', cap: 'Where the conversation happens.' },
    { at: 3.5, r: [T3, 0, T3, 1], pix: 'SHAREPOINT.', cap: 'The files and pages behind it.' },
    { at: 6, r: [2 * T3, 0, T3, 1], pix: 'ONE SYSTEM.', cap: 'Planned together, with navigation between them.' },
  ], sfx: [{ at: 3, w: 'HIGH FIVE!', sub: 'Teams, meet SharePoint.', x: 1 / 6, y: 0.88, r: -6 }, { at: 6, w: 'LINKED!', x: 0.5, y: 0.12, r: 5, len: 2 }] },
  // The breakdown 80-90, the song's quietest stretch, and its build 91-95: the only serious chapter, no slams.
  { b: 80, l: 16, title: 'Straight talk.', ember: 1.8, panels: [
    { at: 2, r: [0, 0, 0.46, 1], img: card('second-brain'), cap: 'Copilot and SharePoint agents answer from what they can reach.' },
    { at: 5, r: [0.46, 0, 0.54, T3], pix: 'A CURRENT POLICY.', cap: 'Something reliable to work from.' },
    { at: 8, r: [0.46, T3, 0.54, T3], pix: 'AN OWNER.', cap: 'Someone keeps each source maintained.' },
    { at: 11, r: [0.46, 2 * T3, 0.54, T3], pix: 'A REVIEW.', cap: 'Answers are checked before they become records.' },
  ] },
  // The groove back on 96: the build.
  { b: 96, l: 8, title: 'Build it.', panels: [
    { at: 1, r: [0, 0, T3, 1], pix: 'THE HUB.', cap: 'News and the documents people use most.' },
    { at: 3.5, r: [T3, 0, T3, 1], pix: 'A HOME FOR EACH DEPARTMENT.', cap: 'Each site with a purpose and an owner.' },
    { at: 6, r: [2 * T3, 0, T3, 1], pix: 'SEARCH THAT FINDS IT.', cap: 'Each person sees only what they may see.' },
  ], sfx: [{ at: 3, w: 'STRUM!', sub: 'Back on.', x: 1 / 6, y: 0.12, r: -5 }, { at: 7, w: 'HOME!', sub: 'For every department.', x: 0.5, y: 0.88, r: 5 }] },
  // Launch, then the check on the phrase's third accent (115). No dead stop here, so no freeze.
  { b: 104, l: 16, title: 'Launch day.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'NEWS.', cap: 'Launch with what people come for.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'THE DOCUMENTS.', cap: 'The ones they use most.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'TRAINING BY ROLE.', cap: 'With real examples.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'Then check that it is used.', cap2: 'The tab everybody opens first.', at2: 11 },
  ], sfx: [
    { at: 3, w: 'LAUNCH!', x: 0.74, y: 0.88, r: -5 },
    { at: 6, w: 'TA-DA!', x: 0.26, y: 0.12, r: 6 },
    { at: 11, w: 'TRAFFIC!', sub: 'Actual humans.', x: 0.26, y: 0.88, r: -4 },
  ] },
  // The record, from the page's "Built for adoption".
  { b: 120, l: 8, title: 'The record.', panels: [
    { at: 1, r: [0, 0, T3, 1], pix: 'DESIGN ANNUAL.', cap: 'A law firm intranet in the Nielsen Norman Group Intranet Design Annual.' },
    { at: 3.5, r: [T3, 0, T3, 1], pix: 'PLATINUM.', cap: 'A search solution with a Step Two Platinum Innovation award.' },
    { at: 6, r: [2 * T3, 0, T3, 1], pix: '125+ SITES.', cap: 'For a foundation, in 14 months. On time, under budget.' },
  ], sfx: [{ at: 3, w: 'BRAVO!', x: 1 / 6, y: 0.88, r: -5 }, { at: 6, w: 'ENCORE!', x: 0.5, y: 0.12, r: 5 }] },
  // Four cinematic photos, each once; each box links where its question leads. A whole phrase, to choose one.
  { b: 128, l: 16, title: 'Your turn.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/contact/?service=intranet-collaboration', cap: 'An intranet nobody opens?' },
    { at: 2.5, r: [0.25, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/information-governance-ai-readiness/', cap: 'Sites with no owner?' },
    { at: 4, r: [0.5, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/agentic-systems/second-brain/', cap: 'Copilot quoting old drafts?' },
    { at: 5.5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/data-migrations/m365-migrations/', cap: 'Content still on a file share?' },
  ], sfx: [{ at: 7, w: 'YOUR MOVE.', x: 0.5, y: 0.12, r: -4 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds while the
  // song's last phrase and its fade (159-160) play under it.
  { b: 144, l: 19, close: true, panels: [] },
];

// The hero image as the page resolves it (its own figure falls back to the Traditional Systems shield).
const art = (() => { try { return findSourceImage('service-hero', 'intranet-collaboration'); } catch { return findSourceImage('service-hero', 'traditional-systems-shield'); } })();
export const intranetCollaborationStory: BeatComicStory = {
  bpm: 95,
  beats: 163,
  close: 144,
  track: tr,
  music: { src: '/audio/pixabay-189615-urban-poetry.mp3', offset: 0.565, credit: 'Music: Urban Poetry by Pumpupthemind', source: 'https://pixabay.com/music/beats-urban-poetry-189615/' },
  closeScene: { lines: ['Intranet &', 'Collaboration.'], pixelate: 8, lede: 'An intranet earns its place when people go there to find news, documents and each other. Matt designs and builds SharePoint and Teams intranets, and organizes the content behind them so Copilot and agents can use it too.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};

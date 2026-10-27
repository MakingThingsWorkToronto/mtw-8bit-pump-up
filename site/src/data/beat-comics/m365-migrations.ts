// M365 Migrations Beat Comic, the mixtape's Track 17 (Matt, 2026-09-28: "Do the same for Data & Migration. this is
// baller."). The menagerie: every source system arrives with its own act (file shares, SharePoint Server, another
// tenant, PST archives, and six more), and the easy way (just copy it) loses the versions, the links and the access; so
// the acts are tamed: what must survive is agreed and mapped, representative content is rehearsed with its exceptions,
// AI-assisted scripts are reviewed before production, access is reviewed rather than carried over, mail gets its own
// plan, a legacy system is reverse-engineered; then (the only serious chapter, on the song's quietest breakdown) the
// audience, your team, has to find, trust and use its information; the leap (cutover on the song's dead stop); the proof.
// Claims come from the M365 Migrations page (files, versions, sharing links and permissions behave differently; business
// fields, versions, links and access carry meaning a simple file copy misses; test representative content, including
// exceptions the tool cannot handle; custom scripts built and tested with AI assistance, reviewed before production; the
// national insurer's legacy content system reverse-engineered for its migration and automated tests; review access rather
// than carry old sharing decisions; the wrong people cannot open sensitive content; the Entra ID model for 6,000 internal
// and external users; the self-service PST upload with automated Exchange Online import, handed over to internal IT;
// when people stop changing the source; an early transfer shrinks the cutover window; what the tool can rerun and
// recover, a rollback not assumed for every path; a file count does not prove the migration is complete; every
// exception an owner; the sponsor's view and Power BI dashboards; the Sources Migrated list; the Migrations Delivered
// projects: 3 TB into SharePoint Online for a foundation, tenant consolidation preserving site structure and permission
// mapping, the Aconex tool with configurable field mappings, Quip with a custom tool, a file-share modernization on time
// and under budget with search and staff training, tenant consolidations with minimal disruption; "content your team can
// find and trust on the first day"). No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Dark Circus" by TOP_SUE (Pixabay): a dark circus waltz for the menagerie of source systems.
// The library profile (wiki/soundtrack-library/profiles/pixabay-480944.json) reads 134.37 BPM, and its accents drift
// against that grid (every 2.93 beats, slipping a beat about every 40). The onsets fix the true grid at 140 BPM in 3/4
// (0.429 s a beat), first downbeat 0.335 s: kicks, snares and hats all peak at 140.00 BPM, the kicks repeat every three
// beats (not two or four), the phase holds in every quarter of the song, and the loudness rows of 12 line up column for
// column; proposed as the track's checked `grid` for the library. Read at full time; bars of three, phrases of 12.
// On that grid: a near-silent intro 0-23; a sting on 24, quiet 29-41; the band on 42; the waltz 48-95 (an accent on
// every downbeat); a dip 96-119 (stops 99-101, 113, 116, 119); a build with stops 126-127 and the drop on 131; loud
// 132-179; the quietest breakdown 180-203 (stops 181-185, 191-197, 203); the waltz 204-251; a build to 255 and a dead
// stop 258-269, back on 270; loud to the end; the song ends on 320 (138.95 s). The story is 312 beats (ends 134.05 s).
// Pace in seconds: a panel about every 1.3-1.5 s = 3-3.5 beats (one bar); 12-beat pages (5.1 s) on the phrases.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
const tr = track('/data-migrations/m365-migrations/');
// The acts on the page's Sources Migrated list (src/data/migration-sources.ts) not already on stage, shortened to fit.
const alsoAppearing = ['ACONEX.', 'STELLENT.', 'GOOGLE DRIVE.', 'DROPBOX.', 'EVERNOTE.', 'QUIP.'];

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: the mark and TRACK 17. with the CD ticker inside the main box, over the quiet intro.
  { b: 0, l: 24, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'The circus is leaving town.', cap2: 'Every act is coming with it.', at2: 11 },
    { at: 5, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 8, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // The sting on 24, then the quiet 29-41 while the acts are announced; the band arrives on 42.
  { b: 24, l: 24, title: 'The menagerie.', freeze: [[5, 18]], panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: card('m365-migrations'), cap: 'Everything moves into Microsoft 365.' },
    { at: 5, r: [0.5, 0, 0.5, 0.25], pix: 'FILES.', cap: 'From shares and cloud drives.' },
    { at: 9, r: [0.5, 0.25, 0.5, 0.25], pix: 'SITES.', cap: 'From SharePoint Server.' },
    { at: 13, r: [0.5, 0.5, 0.5, 0.25], pix: 'TEAMS.', cap: 'From another tenant.' },
    { at: 17, r: [0.5, 0.75, 0.5, 0.25], pix: 'MAIL.', cap: 'From PST archives.' },
  ], sfx: [
    { at: 0, w: 'ROAR!', x: 0.5, y: 0.88, r: -6 },
    { at: 18, w: 'CRACK!', sub: 'Enter the tamer.', x: 0.25, y: 0.12, r: 5 },
    { at: 21, w: 'HUP!', x: 0.25, y: 0.88, r: -5 },
  ] },
  // The waltz: an accent on every downbeat.
  { b: 48, l: 12, title: 'Wild ones.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'THE FILE SHARE.', cap: 'Folders inside folders inside folders.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'THE OLD SERVER.', cap: 'SharePoint Server, customized for years.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'THE OTHER TENANT.', cap: 'Sites, OneDrive and Teams, in the wrong place.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'THE PST.', cap: 'Years of email, in archive files.' },
  ], sfx: [{ at: 3, w: 'GROWL!', x: 0.5, y: 0.12, r: -5 }, { at: 9, w: 'STAMPEDE!', x: 0.5, y: 0.5, r: 6 }] },
  // The rest of the Sources Migrated list: an exact 3 x 2 grid of thirds, landing like a bill of acts.
  { b: 60, l: 12, title: 'Also appearing.', panels: [
    ...alsoAppearing.map((s, i) => ({ at: 1 + i * 1.5, r: [(i % 3) / 3, Math.floor(i / 3) * 0.5, 1 / 3, 0.5] as R, pix: s, small: true })),
  ], sfx: [{ at: 9, w: 'SIX MORE!', sub: 'Ten acts in all.', x: 0.5, y: 0.5, r: -5 }] },
  { b: 72, l: 12, title: 'The easy way.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'JUST COPY IT.', cap: 'How hard can it be?' },
    { at: 4.5, r: [0, 0.5, 0.5, 0.5], pix: 'DRAG.', cap: 'Select all.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], pix: 'DROP.', cap: 'Done by lunch.' },
  ], sfx: [{ at: 3, w: 'EASY PEASY!', x: 0.5, y: 0.12, r: 5 }, { at: 9, w: 'WHEE!', x: 0.5, y: 0.75, r: -6 }] },
  { b: 84, l: 12, title: 'The catch.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'VERSIONS?', cap: 'The copy missed them.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 1], pix: 'LINKS?', cap: 'Still pointing at the old place.' },
    { at: 7, r: [2 / 3, 0, 1 / 3, 1], pix: 'ACCESS?', cap: "Anyone's guess." },
  ], sfx: [{ at: 6, w: 'EEK!', x: 1 / 3, y: 0.12, r: -6 }, { at: 9, w: 'BITTEN!', sub: 'A plain copy misses the meaning.', x: 2 / 3, y: 0.88, r: 5 }] },
  // The dip: the turn, on the stops 99-101.
  { b: 96, l: 12, title: 'The taming.', freeze: [[3, 6]], panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], img: card('migration-planning'), cap: 'The copy is the easy part.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'WHAT MUST SURVIVE?', cap: 'Fields, versions, links and access.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], pix: 'MAPPED.', cap: 'Agreed first, then mapped to the destination.' },
  ] },
  { b: 108, l: 12, title: 'Practice ring.', freeze: [[5, 6], [8, 9], [11, 12]], panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'TEST.', cap: 'Representative content first.' },
    { at: 4.5, r: [1 / 3, 0, 1 / 3, 1], pix: 'EXCEPTIONS.', cap: 'The ones the tool cannot handle.' },
    { at: 8, r: [2 / 3, 0, 1 / 3, 1], pix: 'SCRIPTED.', cap: 'Custom scripts do what the tool does not.' },
  ], sfx: [{ at: 9, w: 'ONCE MORE!', x: 0.5, y: 0.88, r: -5 }] },
  // The build, the stops 126-127, and the drop on 131.
  { b: 120, l: 12, freeze: [[6, 8]], panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'NO STANDARD IMPORT?', cap: 'Some sources need more.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'AI-ASSISTED.', cap: 'Scripts and tests, built with AI.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], pix: 'REVIEWED.', cap: 'By Matt, before production.' },
  ], sfx: [{ at: 11, w: 'CANNONBALL!', x: 0.5, y: 0.12, r: 6 }] },
  // Loud 132-179: the acts, tamed one by one.
  { b: 132, l: 12, title: 'The knife act.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'OLD SHARING.', cap: 'Decided years ago, by someone.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'FRESH START.', cap: 'Access is reviewed, not carried over.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'GROUPS.', cap: 'Mapped to what the destination needs.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'NO PEEKING.', cap: 'Tested: the wrong people cannot open it.' },
  ], sfx: [{ at: 3, w: 'THWACK!', x: 0.5, y: 0.5, r: -6 }, { at: 9, w: 'BULLSEYE!', x: 0.5, y: 0.5, r: 5 }] },
  { b: 144, l: 12, title: 'The strongman.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: '6,000 USERS.', cap: 'Internal and external, in one Entra ID model.' },
    { at: 4.5, r: [0, 0.5, 0.5, 0.5], pix: 'ROLE-BASED.', cap: 'Role-based and dynamic groups.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], pix: 'APP ACCESS.', cap: 'App registrations, mapped too.' },
  ], sfx: [{ at: 3, w: 'HEAVE-HO!', x: 0.5, y: 0.5, r: 5 }, { at: 9, w: 'FLEX!', x: 0.25, y: 0.88, r: -6 }] },
  { b: 156, l: 12, title: 'Mail call.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'PST.', cap: 'Email archive files.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 1], pix: 'SELF-SERVICE.', cap: 'People upload their own archives.' },
    { at: 7, r: [2 / 3, 0, 1 / 3, 1], pix: 'EXCHANGE ONLINE.', cap: 'Imported automatically.', cap2: 'Handed over to IT.', at2: 10 },
  ], sfx: [{ at: 3, w: 'UPLOADED!', x: 1 / 3, y: 0.88, r: -5 }, { at: 9, w: 'SPECIAL DELIVERY!', x: 2 / 3, y: 0.12, r: 5 }] },
  { b: 168, l: 12, title: 'The escape act.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'REVERSE-ENGINEERED.', cap: "A national insurer's legacy content system, with AI." },
    { at: 4.5, r: [0, 0.5, 0.5, 0.5], pix: 'SCRIPTS.', cap: 'Its migration, built from what was learned.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], pix: 'TESTS.', cap: 'Automated, built alongside.' },
  ], sfx: [{ at: 3, w: 'HOCUS POCUS!', x: 0.5, y: 0.12, r: -5 }, { at: 9, w: 'ESCAPED!', x: 0.5, y: 0.88, r: 6 }] },
  // The quietest breakdown: the only serious chapter, no slams. The motion holds on the stops.
  { b: 180, l: 24, title: 'The audience.', ember: 1.8, freeze: [[1, 3], [4, 6], [11, 12], [13, 15], [16, 18], [23, 24]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('team-modernization'), cap: 'The audience is your team.' },
    { at: 5, r: [0.46, 0, 0.54, 1 / 3], pix: 'FIND IT.', cap: 'People need to find their information after the move.' },
    { at: 10, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'TRUST IT.', cap: 'And trust what they find.' },
    { at: 15, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'USE IT.', cap: 'From the first day.' },
  ] },
  // Back on 204: before the leap.
  { b: 204, l: 12, title: 'Before the leap.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'RERUN?', cap: 'What can the tool run again?' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'RECOVER?', cap: 'What can it put back?' },
    { at: 7, r: [0, 0.5, 1, 0.5], pix: 'CHECK FIRST.', cap: 'A rollback cannot be assumed for every path.' },
  ], sfx: [{ at: 7, w: 'CHALK UP!', x: 0.5, y: 0.12, r: 5 }] },
  { b: 216, l: 12, title: 'Set the date.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'EARLY COPY.', cap: 'An early transfer, where incremental copying works.' },
    { at: 4.5, r: [1 / 3, 0, 1 / 3, 1], pix: 'SMALL WINDOW.', cap: 'So the cutover window shrinks.' },
    { at: 8, r: [2 / 3, 0, 1 / 3, 1], pix: 'CUTOVER DAY.', cap: 'When people stop changing the source.' },
  ], sfx: [{ at: 3, w: 'HEAD START!', x: 1 / 3, y: 0.88, r: -5 }, { at: 9, w: 'CIRCLED!', x: 2 / 3, y: 0.12, r: 6 }] },
  // The page's Migrations Delivered projects.
  { b: 228, l: 12, title: 'On tour.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: '3 TB.', cap: 'File shares into SharePoint Online, for a foundation.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'TENANTS MERGED.', cap: 'Site structure and permission mapping preserved.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'FIELD MAPPINGS.', cap: 'A purpose-built tool for Aconex documents.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'CUSTOM TOOL.', cap: 'Quip documents, into Microsoft 365.' },
  ], sfx: [{ at: 3, w: 'NEXT TOWN!', x: 0.5, y: 0.12, r: -5 }, { at: 9, w: 'APPLAUSE!', x: 0.5, y: 0.5, r: 5 }] },
  { b: 240, l: 12, panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'ON TIME.', cap: 'A file-share modernization.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 1], pix: 'UNDER BUDGET.', cap: 'With search and staff training.' },
    { at: 7, r: [2 / 3, 0, 1 / 3, 1], pix: 'MINIMAL DISRUPTION.', cap: 'Tenant consolidations, for the people using them.' },
  ], sfx: [{ at: 3, w: 'TOURING!', x: 1 / 3, y: 0.88, r: -6 }, { at: 6, w: 'SOLD OUT!', x: 2 / 3, y: 0.12, r: 5 }] },
  // The trapeze: the content freeze on the build, mid-air on the dead stop 258-269, the catch on 270.
  { b: 252, l: 24, title: 'The leap.', freeze: [[6, 18]], panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'CONTENT FREEZE.', cap: 'People stop changing the source.', cap2: 'Yes, everyone.', at2: 5 },
    { at: 9, r: [0, 0.5, 0.5, 0.5], pix: 'LET GO.', cap: 'Of the old system.' },
    { at: 18, r: [0.5, 0.5, 0.5, 0.5], pix: 'CAUGHT.', cap: 'Everyone starts in the destination.' },
  ], sfx: [
    { at: 3, w: 'HUSH!', x: 0.5, y: 0.88, r: -4 },
    { at: 18, w: 'SWOOP!', x: 0.5, y: 0.12, r: 6 },
    { at: 21, w: 'NAILED IT!', x: 0.25, y: 0.88, r: -5 },
  ] },
  { b: 276, l: 12, title: 'The count.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'FILE COUNT: OK.', cap: 'A file count does not prove it is complete.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'EXPECTED VS ARRIVED.', cap: 'Expected content, compared with the result.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'NO ORPHANS.', cap: 'Every exception gets an owner.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'The sponsor sees progress, and the decisions still needed.' },
  ], sfx: [{ at: 3, w: 'NOT SO FAST!', x: 0.5, y: 0.5, r: -5 }, { at: 9, w: 'RECONCILED!', x: 0.25, y: 0.88, r: 6 }] },
  { b: 288, l: 12, title: 'Your turn.', panels: [
    // Each box links where its question leads (Matt, 2026-09-28: "link those to something on the site").
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/contact/?service=m365-migrations', cap: 'A deadline and a source system?' },
    { at: 3.5, r: [0.25, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/roles-access-control/', cap: 'Who should see what, after?' },
    { at: 6, r: [0.5, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/contact/?service=m365-migrations&type=call', cap: 'Moving between tenants?' },
    { at: 8.5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/data-migrations/migration-planning/', cap: 'Not sure what moves?' },
  ], sfx: [{ at: 9, w: 'CURTAIN CALL!', x: 0.5, y: 0.12, r: -4 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  { b: 300, l: 12, close: true, panels: [] },
];

// The hero image as the page resolves it: the M365 Migrations hero, or the Data & Migrations flow standing in.
const art = (() => { try { return findSourceImage('service-hero', 'm365-migrations'); } catch { return findSourceImage('service-hero', 'data-migrations-flow'); } })();
export const m365MigrationsStory: BeatComicStory = {
  // The checked grid (140 BPM, 3/4, first downbeat 0.335 s), not the library profile's detected 134.37 BPM.
  bpm: 140,
  // The song file ends at 138.95 s; 312 beats end at 134.05 s, inside it.
  beats: 312,
  close: 300,
  track: tr,
  music: { src: '/audio/pixabay-480944-dark-circus.mp3', offset: 0.335, credit: 'Music: Dark Circus by TOP_SUE', source: 'https://pixabay.com/music/circus-dark-circus-480944/' },
  closeScene: { lines: ['M365', 'Migrations.'], pixelate: 5, lede: 'Your team needs to find, trust and use its information after the move. Plan the content, permissions and changeover together. Matt combines Microsoft 365 migration experience with AI-assisted tooling for sources that need more than a standard import.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};

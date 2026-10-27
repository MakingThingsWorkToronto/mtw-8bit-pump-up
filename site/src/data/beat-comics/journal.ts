// The Journal's Beat Comics (Disc 2 of the site playlist; skill: mtw-beat-comic), by entry slug. JournalEntryPage.astro
// renders the entry's comic over its hero when it has one and nothing otherwise, so an entry gets its comic by being
// added here (and to Disc 2 in tracklist.ts), never by editing its page. Matt, 2026-09-28: "when done this please do all
// journal entries next", "journal should be a separate disk on the site playlist".
import type { BeatComicStory } from './types';
import { journalSecondBrainStory } from './journal-second-brain';
import { journalAgentsBuildToolsStory } from './journal-agents-build-tools';
import { journalRubricStory } from './journal-rubric';
import { journalReferenceCodeStory } from './journal-reference-code';
import { journalReportEvidenceStory } from './journal-report-evidence';

export const journalComics: Record<string, BeatComicStory> = {
  'second-brain-needs-an-owner': journalSecondBrainStory,
  'agents-build-the-tools-they-work-with': journalAgentsBuildToolsStory,
  'every-generated-document-needs-a-rubric': journalRubricStory,
  'reference-code-makes-agent-builds-faster': journalReferenceCodeStory,
  'agents-report-is-not-evidence': journalReportEvidenceStory,
};

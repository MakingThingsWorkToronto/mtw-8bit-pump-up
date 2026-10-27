// Headings end with a full stop (Matt, 2026-09-26; discussion/spec.md "Heading full stops"): page and section
// headings, names used as titles, and Journal headings. Where a heading is rendered from data that is also used
// elsewhere (library and tour titles, page <title>, Journal entry data), the stop is added here, where the heading
// is displayed, so the data and metadata keep their own wording. Step and card sentences do not use this.
// A missing value renders nothing: Astro evaluates slot fallbacks eagerly, so `<slot>{stop(title)}</slot>` runs
// even when the slot is filled and `title` was never passed (DiagramTour crashed this way on 2026-09-26).
export function stop(text: string | null | undefined): string {
  if (text == null) return '';
  const t = String(text).trimEnd();
  return t === '' || /[.?!]$/.test(t) ? t : `${t}.`;
}

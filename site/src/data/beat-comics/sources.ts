// Shared sources for Beat Comic stories (skill: mtw-beat-comic): small image variants to pixelate, and the MTW mark's
// geometry (src/components/BrandMark.astro, mark-v2) for pixel drawing.
import { findSourceImage } from '../../lib/images';

// Pixelation sources: one small variant per image is plenty, since panels resolve to 6 px pixels at most.
export const smallest = (kind: string, id: string) => {
  const i = findSourceImage(kind, id);
  const set = (i.srcset || '').split(',').map((s) => s.trim().split(/\s+/)).filter((p) => p[0])
    .map(([u, w]) => ({ u, w: parseInt(w) || 9999 })).sort((a, b) => a.w - b.w);
  return (set.find((s) => s.w >= 640) || set[set.length - 1] || { u: i.src }).u;
};
export const hero = (id: string) => ({ src: smallest('service-hero', id), fit: 'contain' });
export const photo = (id: string) => ({ src: smallest('starting-points', id), fit: 'cover' });
// A service's cinematic photograph: its overview-card photo (`card-<service>`, all 14 services), drawn `cover`. Use it
// wherever a label (a caption or a name bar) sits on a box: a hologram (`hero`, `contain`) is letterboxed small inside
// its box and the label covers most of what shows (Matt, 2026-09-28: "some box images are hidden behind labels because
// we use the holo not the cinematic, so we ne never see it"). Takes 'second-brain' or 'card-second-brain'.
export const card = (id: string) => ({ src: smallest('overview-cards', id.startsWith('card-') ? id : `card-${id}`), fit: 'cover' as const });


export const markPaths = {
  outline: 'M 5.0,138.5 L 48.5,17.0 L 50.5,18.0 L 58.0,39.5 L 67.0,16.5 L 111.5,135.0 L 58.0,101.5 L 5.0,138.5 Z M 15.5,126.0 L 58.0,96.5 L 102.5,124.0 L 67.0,28.5 L 58.0,52.5 L 48.5,29.0 L 16.5,117.0 L 13.5,126.0 L 15.5,126.0 Z M 23.0,115.5 L 34.5,81.0 L 43.0,77.5 L 38.0,96.5 L 58.0,82.5 L 79.0,95.5 L 73.5,79.0 L 81.0,79.5 L 94.5,113.0 L 92.0,113.5 L 58.0,91.5 L 23.0,115.5 Z',
  m: 'M 79.0,75.5 L 72.0,74.5 L 67.0,63.5 L 63.0,73.5 L 54.0,73.5 L 49.0,63.5 L 44.0,74.5 L 36.5,75.0 L 49.0,41.5 L 58.0,64.5 L 67.5,42.0 L 79.0,75.5 Z',
};

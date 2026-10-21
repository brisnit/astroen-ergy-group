import type { ImageMetadata } from 'astro';
import heroPlant from '../assets/photos/hero-plant.jpg';
import technician from '../assets/photos/technician.jpg';
import rooftop from '../assets/photos/rooftop-hvac.jpg';
import campus from '../assets/photos/campus.jpg';
import commercial from '../assets/photos/commercial.jpg';

/**
 * Lifestyle image manifest.
 *
 * Final images go in src/assets/lifestyle/ under the exact `file` names below (a .png or .jpg
 * with the same basename is also accepted). They are detected at build time, so a missing file
 * is never referenced. Until a file arrives, its slot shows the listed fallback, a licensed
 * existing photo (see docs/photo-credits.md).
 *
 * All imagery is illustrative. Alt text describes what is pictured; it never presents the people
 * or places as Astro staff, clients, offices or projects.
 */

export type SlotName =
  | 'home-hero'
  | 'about-collaboration'
  | 'building-life'
  | 'healthcare-life'
  | 'education-life'
  | 'commercial-life'
  | 'field-assessment'
  | 'performance-review';

interface Fallback {
  src: ImageMetadata;
  alt: string;
  /** CSS object-position for this particular photo. */
  focal: string;
}

export interface ManifestEntry {
  file: string;
  placement: string;
  aspect: '16:9' | '4:3';
  /** CSS object-position that keeps the primary subject in frame when cropped. */
  focal: string;
  /** Alt text for the final image, matching its generation prompt. */
  alt: string;
  fallback: Fallback;
}

export const manifest: Record<SlotName, ManifestEntry> = {
  'home-hero': {
    file: 'astro-home-hero.webp',
    placement: 'Homepage hero, right column (bleeds to the viewport edge on desktop)',
    aspect: '16:9',
    focal: '72% 45%',
    alt: 'Two facilities engineers reviewing building system data on a tablet beside rooftop mechanical equipment',
    fallback: { src: heroPlant, alt: 'Mechanical room with insulated hot-water piping, valves and circulation pumps', focal: '50% 50%' },
  },
  'about-collaboration': {
    file: 'astro-about-collaboration.webp',
    placement: 'About page hero',
    aspect: '4:3',
    focal: '55% 45%',
    alt: 'Facilities professionals discussing building drawings around a table in a bright meeting room',
    fallback: { src: technician, alt: 'Technician in a hard hat and high-visibility coat inspecting piping and valves in a pump room', focal: '38% 50%' },
  },
  'building-life': {
    file: 'astro-building-life.webp',
    placement: 'Full-width lifestyle band on the About page (and the homepage once the final image arrives)',
    aspect: '16:9',
    focal: '50% 55%',
    alt: 'People working and talking in a bright, comfortable building atrium filled with daylight',
    fallback: { src: commercial, alt: 'Modern three-story commercial office building with a metal and glass facade', focal: '50% 62%' },
  },
  'healthcare-life': {
    file: 'astro-healthcare-life.webp',
    placement: 'Healthcare industry page and homepage industry pathway',
    aspect: '4:3',
    focal: '50% 45%',
    alt: 'A nurse and a physician talking in a bright, calm hospital corridor with natural light',
    fallback: { src: rooftop, alt: 'Rows of condensing units on a commercial building rooftop', focal: '50% 50%' },
  },
  'education-life': {
    file: 'astro-education-life.webp',
    placement: 'Education industry page and homepage industry pathway',
    aspect: '4:3',
    focal: '50% 50%',
    alt: 'Students studying together at tables in a daylit university learning space',
    fallback: { src: campus, alt: 'Red-brick university academic building facing a landscaped plaza', focal: '50% 55%' },
  },
  'commercial-life': {
    file: 'astro-commercial-life.webp',
    placement: 'Industries page commercial section and homepage industry pathway',
    aspect: '4:3',
    focal: '50% 50%',
    alt: 'Colleagues working together in a well-lit open-plan office with large windows',
    fallback: { src: commercial, alt: 'Modern three-story commercial office building with a metal and glass facade', focal: '50% 60%' },
  },
  'field-assessment': {
    file: 'astro-field-assessment.webp',
    placement: 'Energy audits and design/build page heroes; homepage solutions section',
    aspect: '4:3',
    focal: '40% 50%',
    alt: 'A technician wearing a hard hat and safety glasses inspects a pump and valve assembly with a facilities manager',
    fallback: { src: technician, alt: 'Technician in a hard hat and high-visibility coat inspecting piping and valves in a pump room', focal: '38% 50%' },
  },
  'performance-review': {
    file: 'astro-performance-review.webp',
    placement: 'Monitoring & verification page hero (and the homepage monitoring section once the final image arrives)',
    aspect: '4:3',
    focal: '45% 50%',
    alt: 'An energy engineer reviewing equipment performance trends on a laptop in a building operations office',
    fallback: { src: heroPlant, alt: 'Mechanical room with insulated hot-water piping, valves and circulation pumps', focal: '50% 50%' },
  },
};

/* Final images present at build time. Missing files simply don't appear in this map. */
const available = import.meta.glob<{ default: ImageMetadata }>('../assets/lifestyle/*.{webp,png,jpg,jpeg}', { eager: true });

const EXT_PREFERENCE = ['webp', 'png', 'jpg', 'jpeg'];

function findArrived(file: string): ImageMetadata | null {
  const base = file.replace(/\.[a-z]+$/i, '');
  for (const ext of EXT_PREFERENCE) {
    const hit = available[`../assets/lifestyle/${base}.${ext}`];
    if (hit) return hit.default;
  }
  return null;
}

export interface ResolvedImage {
  src: ImageMetadata;
  alt: string;
  focal: string;
  arrived: boolean;
  file: string;
}

/**
 * Returns the final image when it has arrived, otherwise its fallback.
 * Pass `allowFallback: false` where the fallback would duplicate another photo on the same page;
 * the slot then renders nothing until the final image exists.
 */
export function resolveImage(slot: SlotName, { allowFallback = true } = {}): ResolvedImage | null {
  const entry = manifest[slot];
  const final = findArrived(entry.file);
  if (final) return { src: final, alt: entry.alt, focal: entry.focal, arrived: true, file: entry.file };
  if (!allowFallback) return null;
  return { src: entry.fallback.src, alt: entry.fallback.alt, focal: entry.fallback.focal, arrived: false, file: entry.file };
}

/** Build-time status, used by docs tooling and for a quick check: `arrived` per slot. */
export const imageStatus = (Object.keys(manifest) as SlotName[]).map((slot) => ({
  slot,
  file: manifest[slot].file,
  placement: manifest[slot].placement,
  aspect: manifest[slot].aspect,
  arrived: Boolean(findArrived(manifest[slot].file)),
}));

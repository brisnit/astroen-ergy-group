# Lifestyle image sources

Drop the final images here using these exact names:

- astro-home-hero.webp
- astro-about-collaboration.webp
- astro-building-life.webp
- astro-healthcare-life.webp
- astro-education-life.webp
- astro-commercial-life.webp
- astro-field-assessment.webp
- astro-performance-review.webp

A `.png` or `.jpg` with the same basename also works. Run `npm run images:webp` to make a real
WebP conversion (with sharp) next to it. The site picks up whatever is here on the next build;
until then each slot uses the fallback listed in `src/data/images.ts`.

Prompts and crop guidance: `docs/lifestyle-image-prompts.md`.

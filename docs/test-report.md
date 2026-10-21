# Test report

**Date:** 2026-10-20 · **Build:** production, tested locally on Node 24 and headless Chrome. (Originally tested on the Node adapter; after the move to `@astrojs/vercel`, the bundled Vercel function was re-tested directly against every server route.)

## Summary

| Area | Result |
|---|---|
| Unit and integration tests (`npm test`) | 24 / 24 pass |
| Type check (`astro check`) | 0 errors, 0 warnings |
| Browser interaction tests | 24 / 24 pass |
| Page sweep: 17 URLs × 3 widths (360, 768, 1440 px) | No console errors, no horizontal overflow, one H1 per page, no heading-level skips, no images without alt text, no duplicate IDs |
| Internal links | 43 unique links checked, 0 broken, all `#anchors` exist |
| Legacy redirects | 15 / 15 return 301 to the intended page |
| Lighthouse (mobile emulation) | Performance 99–100, Accessibility 100, Best Practices 100, SEO 100 (search results pages score 66 for SEO because they are `noindex` on purpose) |
| Core Web Vitals (lab) | LCP 1.4–2.0 s, CLS 0–0.024, TBT 0 ms |
| Colour contrast | All text pairs meet AA (lowest 5.48:1); form borders 3.88:1 |

## What was verified

**A visitor can find the right service and contact Astro.** The homepage "What are you trying to improve?" list links each goal to a service. Every service page has a "Discuss your building" button that opens the contact form with that service already selected (tested: `/contact/?topic=energy-audits` preselects the topic).

**A school or hospital visitor can find relevant information.** The nav, homepage "Who we help", homepage industry grid and footer all link to `/industries/education/` and `/industries/healthcare/`. Search for "Do you work with schools?" ranks the education page first, and "hospital" ranks the healthcare page first. Industry pages carry the building type into the form.

**Search** (automated tests in `tests/search.test.ts`):
- All six suggested natural-language questions return the intended page first.
- Keywords and synonyms: "hospital", "rebates", "m&v", "k-12", "phone number".
- Misspellings: "asessment" is corrected to "assessment", and "equst" finds eQUEST.
- No-results: "pizza recipe" and stopword-only queries return nothing, and the no-results page offers suggestions, browse links and contact.
- Query cleaning: control characters, a 200-character cap, non-string input, and markup in queries.
- Works without JavaScript (server-rendered results), and URLs are shareable (`/search/?q=…`).

**AI answers** (no API key was available, so the live model was not called):
- Without a key, `/api/ask` returns `unconfigured` and the page says so while still showing results (tested in the browser and the unit tests).
- Questions with no relevant content never reach the model (`no_context`).
- Against a local mock of the Messages API (`tests/ask-mock.test.ts`):
  - The request has the expected shape: model, JSON-schema output, low effort, refusal fallback header, no tools.
  - Citations map to site URLs, and unknown citation IDs are dropped.
  - Injection text in the question is escaped and cannot break the prompt structure.
  - An answer that introduces "25%" is replaced with an "isn't covered" response.
  - Refusals and malformed output degrade to "unavailable".
- Input limits: wrong type returns 400, an oversized body 413, a non-JSON body 415, GET 405, and too many requests 429.

**Contact form:**
- Required-field and format validation runs inline in the browser and again on the server, with an error summary that links to each field.
- Text that looks like an account number is refused, while ordinary phone numbers are allowed.
- Honeypot, time-trap and rate-limit checks all work.
- With no delivery integration, the form shows "Your message was not sent" plus the phone number, and the entries are kept. It never shows a fake success message (tested with and without JavaScript).
- An unreachable webhook is reported as failed.
- Cross-site form POSTs are rejected with 403.

**Accessibility and interaction:**
- The skip link is the first Tab stop and moves focus to the main content.
- The disclosure submenus open with Enter, close with Escape, and return focus to the toggle.
- The header search panel opens and focuses its input.
- The mobile menu opens, its submenus expand inline, and Escape closes it.
- The header CTA is visible at 360 px.
- Anchored headings are not hidden under the sticky header.
- `prefers-reduced-motion` disables smooth scrolling and animations.
- FAQ deep links (`/#faq-funding`) and legacy phase links open the relevant accordion.
- Touch targets are at least 24 px (WCAG 2.2 AA); most controls are 44 px or more.

**SEO:**
- Each page has a unique title and description, a canonical URL, Open Graph and Twitter tags, `sitemap-index.xml` (search pages excluded) and `robots.txt` (search and API disallowed).
- JSON-LD: Organization, WebSite with SearchAction, BreadcrumbList, Service on service pages, and FAQPage on the homepage.

## Not verified, or still to do

- **Live AI answers:** they need `ANTHROPIC_API_KEY`. Answer quality, latency and cost with the real model are untested. Review real answers after launch (see `docs/ai-search-setup.md` §8).
- **Contact delivery:** no Resend or webhook credentials were available, so a real successful send has not been tested.
- **Real assistive technology:** no testing was done with VoiceOver, NVDA or JAWS. Semantics, labels and live regions were checked in code and through Lighthouse and axe rules only.
- **Real devices and browsers:** only headless Chrome was used. Safari and Firefox, and real iOS and Android devices, have not been tested.
- **Field performance:** the Lighthouse figures are lab measurements on localhost. Real-world Core Web Vitals depend on hosting and CDN, so measure again after deployment.
- **Business facts:** the address, phone, services, Eco-1, PPN and funding partners are source-derived and unconfirmed. See `docs/content-verification.md`.
- **Hosting:** the site was not deployed. Production `SITE_URL`, HTTPS and the DNS cut-over from the legacy (compromised) site still need to be done.

## Visual refinement (2026-10-21)

Re-tested after the white-first redesign, lifestyle image slots and motion system, using the production Vercel build served through a local stand-in for Vercel routing:
- Unit tests 24/24 pass and type check is clean. Browser interaction tests 24/24 pass, and motion tests 16/16 pass:
  - With JavaScript disabled, all 45 animated elements are visible.
  - With reduced motion, nothing is hidden and the process line is static.
  - Stages reveal in sequence after the connecting line draws, and the M&V chart draws once with its "Illustrative only" caption kept.
  - Hover effects carry no leftover stagger delay, and the header gains its border and shadow after scrolling.
- Page sweep across 18 URLs at 360, 768 and 1440 px, with real scrolling and motion on: no console errors, no broken image requests, no horizontal overflow, no reveal elements stuck hidden, and 43 links and all anchors valid.
- Lighthouse (mobile emulation) on home, About, healthcare and contact: Performance 99–100, Accessibility 100, Best Practices 100, SEO 100, colour-contrast audit passed, CLS 0 after preloading the main font.
- Background share at 1440 px (footer included as dark): home 66% white, 27% dark, 5% teal, 2% pale. Inner pages range from 51–73% white; the About page also has a 12% photo band.
- Image pipeline: a test PNG named `astro-education-life.png` was converted to a real VP8 WebP by `npm run images:webp`, picked up by the build (`data-image-final="true"`, output files named `astro-education-life.*`), then removed.
- About hero report: on the live site the image loaded and decoded in both Chrome and WebKit at desktop and mobile widths, so the empty rectangle could not be reproduced. The frame now sizes its `<picture>` explicitly (`display: block; height: 100%`) and uses a neutral pale-gray backing instead of beige.

Not verified: Firefox; Safari on real iOS devices (WebKit was tested headless); screen readers; final generated images, because none have been supplied yet.

## Warm palette (2026-10-21)

Terracotta #C56848, copper #96482F, amber #E8B44D, peach #F8E3D7 and coral #E78F78 were added with fixed roles (documented in `src/styles/global.css`). Contrast was measured for every pairing in use:

| Use | Pair | Ratio |
|---|---|---|
| Warm small text: captions, icons, labels | Copper on white / peach | 6.43 / 5.19 |
| Peach panels | Navy text on peach | 13.76 |
| Search highlights | Navy text on amber tint | 8.98 or more |
| Process markers, chart details on dark | Coral on dark teal | 6.07 |
| Principle numerals, loop icon on dark | Amber on dark teal | 7.82 |
| Graphic accents only (dashes, rules, rings) | Terracotta on white / peach | 3.85 / 3.11 (non-text, 3:1 minimum) |

Not used, because they fail AA for text: terracotta as text, white text on terracotta (3.85), amber or coral on white, and amber on the teal band (3.30). The primary button is still teal with white text (6.26). Lighthouse colour-contrast passed on home, About, Funding, Approach and search, with an accessibility score of 100 on each.

## Brand restyle (2026-10-21)

Style-only restyle to the AstroEnergy Group brand: teal and flare tokens, Sora with IBM Plex Mono, pill buttons, and the Flux Star logo. All animation hooks and scripts are unchanged.
- Unit tests 24/24, interaction tests 24/24, and motion tests 16/16 all pass. The motion tests cover the process line drawing, staged reveals, the M&V chart drawing, no-JavaScript and reduced-motion visibility, the header scroll state, FAQ expansion and card hover timing.
- Style checks 21/21:
  - The header, CTA, fonts, eyebrow and H1 sizes match the spec.
  - Goal rows hover to teal-deep, and industry cards lift 4px with the teal shadow.
  - The Federal card is solid teal and the Verify number is flare-light.
  - The FAQ "+" rotates 45° when open, and the CTA panel is teal with a 36px radius.
  - At 375 px there is no horizontal scroll and every tap target is at least 44 px.
- Page sweep across 18 URLs at 360, 768 and 1440 px: no console errors, broken images, overflow or broken links.
- Lighthouse: Accessibility 100 with colour-contrast passing on every page tested, Performance 97–99, CLS 0.

# Test report

**Date:** 2026-10-20 · **Build:** production (`npm run build` and `npm start`), tested locally on Node 24 and headless Chrome.

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

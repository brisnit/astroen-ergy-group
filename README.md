# Astro Energy Group website

The rebuilt website for Astro Energy Group: building energy assessments, energy modeling, integrated design/build, Eco-1 monitoring and verification, and funding and incentive support.

Built with [Astro](https://astro.build) 7 and TypeScript. Deployed on Vercel with `@astrojs/vercel`. Content pages are prerendered static HTML. Search, the contact form and AI answers run as a Vercel Function.

## Quick start

```bash
npm install
cp .env.example .env     # optional: add API keys (see docs/ai-search-setup.md)
npm run dev              # http://localhost:4321
```

Production (Vercel):

`npm run build` writes `.vercel/output` (Vercel's Build Output API): static pages and assets in `static/`, and one function serving `/search/`, `/contact/`, `/api/ask` and `/api/contact`. Pushing to `main` deploys. In the Vercel project settings, the Framework Preset should be **Astro** and **Output Directory must not be overridden** (see `docs/ai-search-setup.md` §6). Set environment variables in Vercel → Settings → Environment Variables.

To run the production build locally, use `vercel dev` (Vercel CLI); `npm run dev` is enough for most work.

Checks:

```bash
npm test                 # search, contact and AI-answer tests
npm run check            # TypeScript and Astro diagnostics
```

## Structure

```
src/
  data/            All site copy, in typed objects shared by the pages and search
    solutions.ts   Five service pages and the ASHRAE audit-level table
    industries.ts  Industry overview, healthcare and education pages
    approach.ts    Five-step process and the delivery-model phases
    company.ts     Company details, About, Contact copy and FAQs
    home.ts        Homepage goals and suggested questions
    nav.ts         Navigation
    redirects.mjs  Legacy URL redirects
  lib/
    search*.ts     Keyword search engine and passage index
    ask.ts         AI answer service (Claude), with its grounding guards
    contact.ts     Form validation and delivery (Resend or webhook)
  components/      Header, footer, Ask Astro form, process steps, M&V diagram…
  layouts/         Base layout (SEO, structured data) and the service page template
  pages/           Routes, including api/ask.ts and api/contact.ts
docs/
  research/competitor-research.md   Competitor research, with sources and implications
  content-verification.md           What Astro must confirm before launch, and legacy redirects
  ai-search-setup.md                Configuring AI answers and contact delivery
  test-report.md                    What was tested and what remains
  photo-credits.md                  Image sources and licences
tests/                              node:test suites
```

## Editing content

Change the text in `src/data/`. The page and the search index both update on the next build. Please keep to the content rules in `docs/content-verification.md`: no savings figures, guarantees, client names or credentials unless Astro has verified them.

## Configuration

| Variable | Purpose |
|---|---|
| `SITE_URL` | Canonical origin for links, sitemap and Open Graph |
| `ANTHROPIC_API_KEY` | Turns on AI answers in search (optional; keyword search works without it) |
| `ASTRO_AI_MODEL`, `ASK_RATE_LIMIT_PER_MIN` | Optional AI tuning |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact delivery via email, or… |
| `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET` | …contact delivery via webhook |

Until a contact delivery option is configured, the form tells visitors their message was not sent and shows the office phone number.

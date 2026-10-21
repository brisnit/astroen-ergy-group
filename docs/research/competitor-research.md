# Competitor Website Research: Energy Services

## Method and date

- **Date:** 2026-10-20
- **Method:** I fetched each site's starting URL and 2 to 3 internal pages with an automated fetch tool that converts HTML to text. The notes below describe that extracted text. They do not describe the rendered visual design, so layout, colour, imagery and interactive behaviour were not assessed. Page content was treated as source data only.
- **Purpose:** To inform an original redesign for Astro Energy Group. Nothing here should be copied. What competitors can do says nothing about what Astro can do.

---

## 1. Ameresco (energy efficiency)

### Source URLs
- https://www.ameresco.com/energy-efficiency/
- https://www.ameresco.com/portfolio-item/tacoma-public-schools/
- https://www.ameresco.com/contact-us/

### Observed
- **Positioning:** A short benefit tagline built on three outcomes: consumption, cost and carbon. The body presents the firm as a turnkey provider and stresses financing and budget-neutral options. It frames cost as a barrier the firm removes.
- **Navigation:** A large mega-menu. "Solutions" has three groups (Power Infrastructure, about 11 items; Building & Public Infrastructure, about 9; Financial Options, about 7). "Industries" lists sectors (federal, healthcare, higher ed, K-12 and others). Company, Resources, Investors, Impact, Careers and Contact are separate. Investor relations has a deep submenu of its own.
- **Service explanation:** Brief and high-level. Detail lives on separate service pages. Acronyms (ESPC, PACE, LEED, ENERGY STAR) appear with little or no explanation. Financing sits in the navigation as its own category, alongside the technical solutions.
- **Project evidence:** The service page shows three case-study cards (title and subtitle, no metrics) with "Load more". The Tacoma case study has a client name, a headline, a narrative, two client and executive pull-quotes (one is repeated in the body), and two large stat callouts (a percentage and a dollar value). It ends with boilerplate, a legal "Safe Harbor" disclaimer and related-project cards. No project photo appeared in the extracted body.
- **Conversion:** A toll-free vanity phone number (click-to-call), an "online form" link and an office-locations link. The contact page contains no form of its own and links out to one. It states no inquiry types and no expected response time.
- **Search:** A header search toggle.
- **Accessibility and usability:** A heading hierarchy is present, but the tagline and the H1 are out of order. No skip link was seen. Image titles look like filenames, so alt-text quality is uncertain. Social icons have descriptive labels.

---

## 2. Legence (solutions)

### Source URLs
- https://www.wearelegence.com/solutions
- https://www.wearelegence.com/case-studies
- https://www.wearelegence.com/contact-us
- https://www.wearelegence.com/services/energy-savings-performance-contracts

### Observed
- **Positioning:** The headline leads with company heritage (a founding year) plus a trademarked "stackable" solutions idea. It speaks to commercial and industrial owners and promises lower operating cost and better reliability.
- **Navigation:** Four groups: About (including Brands, Sustainability and Case Studies), Solutions (four delivery phases: engineering/design, program management, installation, maintenance), Investors (a separate subdomain), and top-level Insights, Media, Careers and Contact. Header search icon.
- **Service explanation:** Services are organised by **delivery phase**, not by building type. The solutions page lists about 110 service links, and the list repeats, so the same links appear more than once. The ESPC service page is a template shell: it never defines the term, has several empty "no items found" sections, and has no process, evidence or FAQ. Jargon (O+M, BAS, retro-commissioning) goes unexplained.
- **Project evidence:** The case-study index has 17 cards on one page, with no filters and no pagination. Each card shows an image, a sector label, the client, the location, an optional summary and a "Read More" button. About 7 cards include a metric (tons of carbon, annual savings, MW, square feet). Most have no quantified result, and a few have no summary.
- **Conversion:** The contact form asks only for name and email, with no inquiry type. Its confirmation promises a reply "soon", with no timeframe. The page lists no phone number or street address. Its only email address is for acquisitions.
- **Accessibility and usability:** Heading use is inconsistent, with some titles in bold text rather than headings. The repeated link lists add length for keyboard and screen-reader users. Alt text could not be verified.

---

## 3. AESC

### Source URLs
- https://www.aesc-inc.com/
- https://aesc-inc.com/grfs-program?hsLang=en

### Observed
- **Positioning:** An aspirational, future-focused headline. The firm presents itself as an energy and climate advisor to utilities and large facilities, naming efficiency, electrification, load flexibility and DERs.
- **Navigation:** Minimal: logo, "Contact Us" and a list of six utility **programs**. No services, sectors or about menu was visible in the extracted content.
- **Service explanation:** Six program cards, each with a thumbnail and one to three sentences. They are dense with jargon ("pay-for-performance", "downstream", "DR"). The GRFS (an SDG&E program) page defines "aggregator", expands pop-NMEC and site-NMEC without explaining them in plain terms, and does not define "deemed rebates". It covers eligibility and incentive method in prose and gives no numbered steps. Technical detail is pushed to PDFs: a rulebook, a manual, an M&V plan and enrollment checklists.
- **Project evidence:** None. No case studies, metrics or client logos appeared. The program page carries a funding disclaimer saying funds are first-come, first-served and that savings vary.
- **Conversion:** "Contact Us" buttons go to a third-party marketing tracking URL, not a contact page. The program page lists email links for its aggregators, plus a Carlsbad, CA mailing address and a phone number. It also has an interest form for aggregators.
- **Search:** None observed.
- **Accessibility and usability:** A skip-to-content link is present on the program page. The home page has a logical H1/H2 order with linked H3/H4 titles. Some alt text is filename-style. Legal links point to a different (parent) company domain.

---

## Patterns observed (cross-site)

1. **Jargon is rarely explained.** All three sites use acronyms (ESPC, NMEC, BAS, DR, PACE) with little or no plain-language definition.
2. **Navigation is split by audience.** Large firms organise by solution and industry, or by delivery phase. Only Ameresco gives financing its own navigation category.
3. **Evidence is thin or uneven.** Where metrics exist, they are a few large figures in callouts. Baselines, methods and measurement periods are not stated. Case-study indexes lack filters.
4. **Contact paths are weak.** The forms are minimal or off-page, none route by inquiry type, and none state a response time. One site sends its CTA through a third-party tracking link.
5. **Template drift.** Empty sections, repeated link lists and filename alt text suggest content managed at scale with little upkeep.
6. **Search is in the header** on the two larger sites. Neither showed a results page in the extracted content.
7. **Accessibility is inconsistent.** Only one page had a skip link, and heading order varied.

---

## Design implications for Astro (recommendations)

*These are recommendations, not findings. Competitor capabilities are not evidence of Astro capabilities. Every Astro claim, metric and credential must come from Astro's own verified material.*

1. **Explain each service in plain language first.** For each service (ASHRAE audit levels, eQUEST modeling, design/build, Eco-1 M&V, funding support), open with a short "what it is / who it's for / what you get" block, then give the technical detail. Use a glossary or inline definitions (an `<abbr>` with its expansion on first use) for ASHRAE, M&V, NMEC and similar terms.
2. **Show the process as numbered steps.** Present the audit → model → design/build → verify → fund journey as an ordered, accessible list (`<ol>`). No competitor page reviewed did this. It also suits a small firm offering an integrated service.
3. **Offer two ways into the site.** Use a short top level such as Services, Sectors (hospitals, K-12, colleges, commercial, industrial, federal), Projects, Funding & Incentives, About and Contact. That lets visitors browse by need or by building type without a mega-menu.
4. **Make funding a destination of its own.** Plainly explain how incentive and funding support works, including eligibility caveats. Add a disclaimer that incentives change and results vary, and do not promise specific dollar amounts.
5. **Make project evidence honest and structured.** Use one case-study template: sector, building, scope, approach, and results *with baseline, method and period stated*. Add a client quote only with permission, and leave a field blank rather than invent it. Make the index filterable by sector and service. Write real alt text for project photos.
6. **Remove friction from contact.** Build a single on-site form with an inquiry-type selector (audit, modeling, M&V, funding, general) and an optional building-type field. Add a visible phone number and email, a stated response expectation if Astro can commit to one, and a clear confirmation message. Avoid third-party redirect CTAs.
7. **Keep it small and well maintained.** Have fewer, complete pages, never empty template sections, and never repeat link lists. Site search is optional at this size. Clear navigation and a good 404 page matter more.
8. **Build in accessibility.** Include a skip link, one H1 per page, a logical heading order, descriptive alt text, visible focus states, labelled form fields with inline errors, and the WCAG 2.2 AA contrast ratio.
9. **Make local presence count.** Being a San Diego-area firm sets Astro apart from the national firms. Use local location and service-area cues, but only where they are factual.

---

## Limitations

- I worked from extracted page text only. Visual design, responsiveness, motion and actual keyboard behaviour were not tested, and alt text and skip links could not always be confirmed.
- AESC's site header and navigation were not captured on the home page, so its navigation structure is inferred from the program page.
- Ameresco's online form, which is linked off-page, was not fetched, so its fields are unknown.
- I reviewed only a few pages per site, and they may not be typical of each site as a whole. The content reflects what was live on 2026-10-20.

---

## How these recommendations were applied

*Added after implementation, to record decisions.*

| Recommendation | Applied in the build |
|---|---|
| 1. Plain language first | Every service page follows the same order: problem, who it's for, what the work involves, what you receive, how it connects. Each page has a "Key terms" panel (ASHRAE, ECM, commissioning, M&V, EUI, BAS and others). |
| 2. Numbered process | Assess → Prioritize → Plan → Implement → Verify appears on the homepage, Solutions overview, industry pages and Our Approach, as an `<ol>`. Our Approach also lists every activity in Astro's five-phase delivery model, transcribed from the legacy flowchart images. |
| 3. Two ways in | Primary navigation is Solutions, Industries, Our Approach, About and Search, as the project brief specified. |
| 4. Funding as a destination | A dedicated Funding & Incentive Support page, plus a homepage section, both with a plain "What to expect" note. No amounts, approval or "budget-neutral" claims. |
| 5. Honest project evidence | **Not built.** No verified Astro case studies exist in the source material; the legacy "Projects" page is a list of service types. A case-study template should be added only when real, approved projects are supplied (see `docs/content-verification.md`). |
| 6. Contact friction | One on-site form: four required fields, optional area of interest, building type, phone and location, with the service or industry carried in from the page the visitor came from. No response-time promise, because none is verified. |
| 7. Small and maintained | 14 pages including Contact and Search; no thin pages. Commercial, industrial and federal facilities are sections of the Industries page rather than separate pages, because the source material does not support more. |
| 8. Accessibility | Skip link, one H1 per page, logical headings, visible focus, labelled fields with inline errors and an error summary, WCAG AA contrast (measured), reduced-motion support. Lighthouse accessibility score: 100 on every page tested. |
| 9. Local presence | The El Cajon / San Diego County location appears on About, Contact and in the footer. It is source-derived and listed for confirmation. |

**Where the build differs from this research:** the research suggested site search was optional at this size. The project brief makes "Ask Astro" search a core feature, so it was built as one: it works as ordinary keyword search with or without the AI layer.

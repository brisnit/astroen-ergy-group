# Content migration and verification list

**Audit date:** 2026-10-20 · **Source:** http://www.astroenergygroup.com/ (16 internal pages reachable from the home page)

This list is for Astro Energy Group to work through **before launch**. Each item shows where it appears on the new site and what to confirm. Nothing on the new public pages is invented; everything is either from the legacy site (rewritten) or general industry definitions (such as what ASHRAE audit levels mean). However, the legacy site appears to date from around 2013–2014, so even source-derived content needs to be confirmed as current.

Status key:
- **Shown — confirm**: on the public site now, taken from the legacy site. Confirm it is still accurate.
- **Withheld**: deliberately left off public pages until confirmed. Can be added once verified.
- **Excluded**: removed and should not return.

---

## 1. Must confirm before launch

| # | Item | Legacy source | Where it appears now | Status | What to confirm |
|---|---|---|---|---|---|
| 1 | Office address: 603 S. Marshall Ave., El Cajon, CA 92020 | Footer of every page | Footer, About, Contact, structured data | Shown — confirm | The legacy contact page says "San Diego, CA 92020" while the footer says "El Cajon". 92020 is an El Cajon ZIP code, so El Cajon was used. Confirm the address is current, and whether it is a public office or mailing address only. |
| 2 | Office phone: 619-442-9686 | "For information call" on every page | Header CTA band, footer, Contact, search, structured data | Shown — confirm | Confirm it is answered and should be public. |
| 3 | General email address | None published | Not shown | Withheld | The legacy site lists only personal addresses (rick@, dave@). Provide a shared inbox (for example info@) if one should be public. Do not publish personal addresses without consent. |
| 4 | Leadership: Rick Moreno (President), Dave Jarrett (CEO) | Footer, contact page, "C-Suite" page | Not shown | Withheld | Confirm current titles and whether they should be named. Dave Jarrett's bio says he joined as CEO in September 2013; confirm the bio is current and approved before republishing it. Personal mobile numbers on the legacy contact page should not be republished. |
| 5 | Logo | Low-resolution green raster wordmark; a round star "ASTRO Energy Group" mark visible only inside a flowchart image | Interim typographic wordmark ("Astro / Energy Group") and an "A" favicon | Proposal | No usable vector logo was available. The interim treatment invents no new symbol. Supply original logo files (SVG or high-resolution PNG) to replace it. |
| 6 | Contact form delivery | Legacy form used a third-party form widget | `/contact/` | Not connected | Configure Resend or a webhook (see `docs/ai-search-setup.md` §5). Until then the form truthfully tells visitors their message was **not** sent and gives the phone number. |
| 7 | Eco-1 product availability | `page16.html` | Monitoring & Verification page, homepage, search | Shown — confirm | Confirm Eco-1 is still offered under that name, that it is Astro's own system, and that the capabilities described (power-quality readings including phase amperage, voltage and power factor; equipment-level load disaggregation; per-equipment energy and cost reporting) are current. |
| 8 | Preferred Provider Network | `delivery.html` | Design/Build page, Our Approach | Shown — confirm | Confirm the PPN still exists, and still uses competitive selection and training on the delivery model. |
| 9 | Funding partners, including private equity investor groups | Home page, `funding.html` | Funding page, homepage, FAQ | Shown — confirm | Confirm Astro still works with funding partners. Copy is deliberately limited to "explore financing options" with no approval or terms promised. |
| 10 | Services list (audits, eQUEST modeling, design/build, commissioning, program/project management, M&V, incentive documentation) | Several pages | Solutions pages | Shown — confirm | Confirm every service is still offered. |
| 11 | Industries served: hospitals, schools, colleges, commercial, industrial, federal | Home page | Industries pages | Shown — confirm | Confirm these sectors. Industry pages describe common concerns and how services apply; they do not claim projects in any sector. Replace with sector experience only when documented. |
| 12 | Geography / service area | PPN "resources across the nation" | Not shown. Copy says "based in El Cajon… tell us where your facilities are" | Withheld | Confirm where Astro works (San Diego County, California, nationwide?). |
| 13 | Supply-side review (utility rate structure and on-site generation options) | `audits.html` | Energy Audits page, "What the work involves" | Shown — confirm | Confirm this is still part of the assessment service. |
| 14 | Project Delivery Model phases and activities | Five flowchart images (conceptualization, design, construction documents, construction, closeout) | Our Approach, phase by phase | Shown — confirm | Transcribed from images. Confirm the activities still reflect current practice. |
| 15 | Photography | — | All pages | Proposal | Eight lifestyle slots (`src/data/images.ts`) currently show licensed stock fallbacks (Unsplash and Pexels; see `docs/photo-credits.md`) until generated images are supplied (`docs/lifestyle-image-prompts.md`). The footer labels all photography as illustrative. Generated or stock images must never be described as Astro staff, clients, offices or projects. Replace with Astro's own photography when available, with permission. One stock image (an identifiable NIH building) was deliberately not used. |

## 2. Withheld claims (do not publish without evidence)

These appeared on the legacy site but are not stated as fact on the new site, because they are savings, financial, contractual or historical claims that need current evidence.

| Legacy claim | Legacy page | Why withheld | What would allow it |
|---|---|---|---|
| "Short term paybacks between 3 – 5 years" | `funding.html` | Payback/savings promise | Documented project results with method, baseline and period |
| "No capital appropriation required and no net increase in operating cost" | About (`page9.html`) | Implies zero upfront cost / budget neutrality | Verified financing terms, stated with conditions |
| "Investment grade funding" through Preferred Provider funding groups | `funding.html` | Financing promise | Named, current funding relationships and terms |
| "Guaranteed Savings Performance Contract Execution" | `projects.html`, `page14.html` | Guaranteed savings | Current contract offering and legal review |
| Integrated design/build "provides a guaranteed maximum price" | `delivery.html` | Contractual promise | Now stated as "pricing structure, including whether a GMP applies, is defined in each project agreement" |
| eQUEST example: "166 Btu/sf/yr goal… exceeded… beyond ASHRAE 90.1-2010… 12 models… payback of 5 years or less" | `equest.html` | Project result without client, date or verification | A documented, approved case study |
| "eQUEST is now updated for the new CA Title 24 Code requirements" | `equest.html` | Dated and unverified tool claim (current Title 24 compliance uses other approved software) | Confirmation of the current modeling and compliance toolset |
| "ECO-1 system provides 22 different power quality readings" | `page16.html` | Specific product specification | Current product data sheet (the general capability is shown) |
| "Best in class" technical, design and construction professionals | Home page | Unsupported superlative | Not recommended even with evidence |
| "Fast track development, speed to savings" | Home page | Schedule/savings promise | Restated as "compress the schedule where practical" |
| "AEG has broad experience and technology in monitoring and verification" | `funding.html` | Experience claim without evidence | Documented projects |
| Astro Mechanical Contractors: established July 1960, ~25 trucks, ~60 employees | About (`page9.html`) | Belongs to a related company; must not be presented as Astro Energy Group's history | Confirmation of the corporate relationship, and approval to describe it as an affiliate |
| Chula Vista Electric Co.: "since 1925", 24/7 emergency response, clients for 40+ years | About (`page9.html`) | Same: a related company's history and credentials | As above |
| "Astro Enterprises is a group of companies" providing mechanical and electrical subcontracting, building systems service and maintenance, site and utilities construction | About (`page9.html`) | Affiliation and capabilities not confirmed for Astro Energy Group | Confirmation of the group structure and which entity delivers which service |
| Dave Jarrett biography (45 years' experience, Dignity Health, prior roles, USN, degrees) | `page11.html` | Leadership details need confirmation and consent | Approved current bio |

## 3. Excluded from the old site

- **Injected spam links:** 883 unique external links to unrelated sites (pharmacy, dating, jewellery, home services and others) were embedded across 15 of the 16 pages, typically in a hidden block. None were carried over. This suggests the legacy site or its hosting was compromised; Astro should check the old server before decommissioning it, and make sure the domain's DNS points only to the new site.
- **Injected text:** "instagram resetting followers", "prada vegan bag" and "prada ocean review" appeared in page footers. Removed.
- **Duplicate pages:** `projects.html` and `page14.html` ("Projects-2") repeat the same service list. Consolidated into the Solutions pages.
- **Empty phase pages:** the five phase pages contained only a flowchart image each. Their content now appears as text on Our Approach.
- **Inconsistent naming:** "Astro Enterprises" (used for the PPN and contracts on `delivery.html`) vs "Astro Energy Group". The new site uses Astro Energy Group throughout. Confirm whether "Astro Enterprises" should appear anywhere.

## 4. Legacy URL redirects

All are permanent (301) redirects, implemented in `src/data/redirects.mjs` and tested.

| Legacy URL | New URL | Basis |
|---|---|---|
| `/index.html` | `/` | Home (served directly) |
| `/audits.html` | `/solutions/energy-audits/` | Same content |
| `/equest.html` | `/solutions/energy-modeling/` | Same content |
| `/delivery.html` | `/solutions/design-build/` | Design/build, PPN, contracts |
| `/funding.html` | `/solutions/funding-incentives/` | Same content |
| `/page16.html` (Eco-1) | `/solutions/monitoring-verification/` | Same content |
| `/projects.html`, `/page14.html` | `/solutions/` | Pages listed service types, not projects |
| `/page9.html` (About) | `/about/` | Same content |
| `/page11.html` (C-Suite) | `/about/` | Closest page; leadership withheld |
| `/contactus.html` | `/contact/` | Same purpose |
| `/conceptualizationphase.html` | `/approach/#phase-conceptualization` | Phase detail opens automatically |
| `/designphase.html` | `/approach/#phase-design` | As above |
| `/constructiondocuments.html` | `/approach/#phase-construction-documents` | As above |
| `/construction.html` | `/approach/#phase-construction` | As above |
| `/closeout.html` | `/approach/#phase-closeout` | As above |

Legacy URLs not found on the old site (for example `/about.html`) are not redirected; they return the 404 page, which offers search.

## 5. Content added that is not from the legacy site

All of it is general and non-promotional, and none of it makes claims about Astro:

- Plain-language definitions of ASHRAE, ASHRAE audit levels 1–3, ECM, baseline, demand, EUI, ASHRAE 90.1, commissioning, LEAN, BIM, BAS, M&V, power factor, utility incentives and incentive reservations.
- A description of eQUEST as a widely used simulation tool built on the DOE-2 engine, not Astro software.
- Common concerns for healthcare and education facilities, and "questions worth discussing" lists.
- FAQs whose answers restate the service content and state plainly that Astro does not quote savings or guarantee outcomes in advance.
- Process copy (what happens after you contact Astro) that promises no response time.

If any of these do not reflect how Astro works, edit them in `src/data/`.

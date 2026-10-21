# Ask Astro search: setup and operation

Ask Astro is the site search. It always works as keyword search. When an Anthropic API key is configured, it also shows a short AI answer, written only from the site's own content, above the results.

**Current status:** keyword search is live and tested. **AI answers are not yet active: they need an `ANTHROPIC_API_KEY`.** Without it, the answer panel says "AI answers aren't available right now" and the search results still appear. Nothing simulates an AI answer.

## 1. How it works

```
Visitor query ─▶ /search/?q=…  (server-rendered, shareable URL, works without JavaScript)
                    │
                    ├─▶ keyword search over approved content  ─▶ results list (always shown)
                    │
                    └─▶ browser calls POST /api/ask
                          ├─ validate, size-limit, rate-limit
                          ├─ retrieve top passages (same search engine)
                          ├─ no relevant passages? ─▶ "no_context" (model not called)
                          ├─ no API key? ─▶ "unconfigured"
                          └─ Claude: question + passages ─▶ JSON {answerable, answer, cite, followups}
                                ├─ citations checked against the passages sent
                                ├─ links, markdown and over-long text removed
                                ├─ money or % figures not in the cited passages ─▶ answer replaced
                                └─ rendered as plain text with links to the cited pages
```

| Part | File |
|---|---|
| Content collection (pages and search share it) | `src/data/*.ts` |
| Passage index: one passage per page section, FAQ, phase, key-terms block | `src/lib/search-index.ts` |
| Keyword search: BM25 ranking, stemming, synonyms, typo tolerance, partial-word matching, highlighted snippets | `src/lib/search.ts` |
| AI answers: prompt, structured output, guards, cache | `src/lib/ask.ts` |
| API endpoint | `src/pages/api/ask.ts` |
| Search page and answer panel UI | `src/pages/search.astro` |
| Rate limits | `src/lib/limiters.ts`, `src/lib/rate-limit.ts` |

**Retrieval type:** lexical (BM25) with synonym expansion and typo correction, not vector embeddings. The site has 84 passages, so lexical retrieval with synonyms covers natural-language questions well (see the tests). If the content grows a lot, embedding-based (hybrid) retrieval could be added in `search.ts` without changing the API.

## 2. Turning on AI answers

1. Create an API key at https://platform.claude.com (Anthropic Console), ideally in a workspace with a monthly spend limit.
2. Set environment variables on the server (never in client code or the repository):

   ```bash
   ANTHROPIC_API_KEY=sk-ant-...
   # optional
   ASTRO_AI_MODEL=claude-opus-5-5     # default
   ASK_RATE_LIMIT_PER_MIN=8           # per visitor IP, default 8
   ```

3. Redeploy (Vercel → Deployments → Redeploy), because environment variable changes only apply to new deployments.
4. Check: search for "What does Eco-1 monitor?". An answer with source links should appear above the results. Then search for something off-topic, such as "pizza recipe". There should be no AI answer, and the page should say nothing matches.

## 3. Model and request settings

- **Model:** `claude-opus-5-5` by default. Set `ASTRO_AI_MODEL` to use another model, for example `claude-haiku-5-5` for lower cost and latency. Re-test answer quality after any change.
- **Effort:** `low`. Answers are 2–4 sentences from supplied passages, so deep reasoning isn't needed.
- **Structured output:** a JSON schema (`answerable`, `answer`, `cite`, `followups`), so the server can check every citation.
- **Refusal fallback:** enabled (`fallbacks: "default"`, beta `server-side-fallback-2026-07-01`). If the primary model declines a request, the API retries on a fallback model within the same call. If every model declines, the panel shows "We couldn't generate an answer" and the results remain.
- **Timeouts:** 25 s server-side with one retry; 30 s in the browser.
- **No tools and no web access** are given to the model. It sees only the passages retrieved from this site.
- **Cache:** identical questions are answered from an in-memory cache for 1 hour (up to 200 entries).

## 4. Answer boundaries (enforced in code, not only in the prompt)

| Rule | How it is enforced |
|---|---|
| Use only approved site content | Only retrieved site passages are sent; no tools or web access |
| No answer when the site has nothing relevant | The model is not called when retrieval finds no relevant passage |
| Cite sources | Citations must match passages actually sent, otherwise the answer is marked unsupported and the closest pages are shown instead |
| Never invent savings, prices or guarantees | Prompt rules, plus a server check that replaces any answer containing money or percentage figures not present in its cited passages |
| Not an engineer or financial adviser | Prompt rules, plus a disclaimer under every answer and in the footer |
| Don't collect sensitive data | No account or email needed; the UI asks visitors not to enter account numbers; the model is told never to ask for them |
| Treat input and content as untrusted | The question and passages are XML-escaped inside delimited tags (tested against injection attempts). The answer is rendered with `textContent`, and only same-site relative links are rendered |
| Abuse limits | 2 KB request limit, 200-character query limit, JSON-only, per-IP rate limit (HTTP 429), and the server-side cache |

## 5. Contact form delivery (separate from search)

The contact form needs one delivery integration. Without one, visitors are told their message was **not sent** and given the phone number.

**Option A: Resend email**

```bash
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=team@your-domain.com        # comma-separate for several
CONTACT_FROM_EMAIL="Astro Website <web@your-verified-domain.com>"
```

**Option B: webhook** (CRM, Zapier, Make, a serverless function)

```bash
CONTACT_WEBHOOK_URL=https://...
CONTACT_WEBHOOK_SECRET=long-random-string    # sent as X-Webhook-Secret
```

The webhook receives JSON: `type`, `submittedAt`, `name`, `email`, `organization`, `improve`, `topic`, `buildingType`, `phone`, `location`. Any non-2xx response is shown to the visitor as "not sent".

Spam protection: a hidden honeypot field, a minimum time-to-submit check, a 5-per-10-minutes per-IP limit, and Astro's built-in cross-site POST protection (`security.checkOrigin`).

## 6. Deployment notes

- Hosting is Vercel, through `@astrojs/vercel`. `astro build` writes `.vercel/output` (Build Output API), which Vercel deploys as is.
- **Vercel project settings:** Framework Preset **Astro**; Build Command `astro build` (also set in `vercel.json`); **Output Directory override off**. A `dist` or `dist/client` override makes Vercel serve a folder without the function, which is what caused the earlier 404.
- Content pages are prerendered static HTML. Only `/search/`, `/contact/` and `/api/*` run in the function (Node.js runtime, 30 s max duration, set in `astro.config.mjs`).
- Set `SITE_URL` to the production origin so canonical links, the sitemap and Open Graph tags are correct.
- Rate limits and the answer cache are in memory, per function instance. Vercel runs several instances, so limits are approximate. For strict limits, use a shared store (for example Upstash Redis) or Vercel Firewall rate-limiting rules on `/api/ask` and `/api/contact`.
- Vercel sets `X-Forwarded-For`, which the rate limiter uses to identify visitors.

## 7. Updating content

Edit the objects in `src/data/`. The page and the search index both update on the next build, so there is nothing separate to re-index. Add `keywords` to a section to help search find it by synonyms or abbreviations. Then run `npm test`; the search tests check that the suggested questions still find the right pages.

## 8. Remaining configuration and checks

- [ ] Add `ANTHROPIC_API_KEY` in production and run the checks in §2.
- [ ] Review 20–30 real answers once live: grounding, tone, and whether any should have said "not covered".
- [ ] Set a spend limit on the Anthropic workspace.
- [ ] Configure contact delivery (§5) and send a test inquiry.
- [ ] Decide whether to log search queries (none are logged now). If you start, update the privacy notice.

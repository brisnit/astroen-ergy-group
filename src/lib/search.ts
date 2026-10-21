import { passages as allPassages, type Passage } from './search-index.ts';

/**
 * Keyword search over approved site content.
 * BM25 ranking on section-level passages, with:
 *  - light stemming, so "audits" matches "audit";
 *  - synonym expansion, so "hvac" finds mechanical systems and "money" finds funding;
 *  - typo tolerance, so "asessment" still finds "assessment";
 *  - prefix matching on the final word, so partial queries return results.
 * This is the ground truth for both the search page and the AI answer's retrieval.
 */

export const MAX_QUERY_LENGTH = 200;

const STOPWORDS = new Set(
  `a an and are as at be been but by can could did do does doing for from had has have how i if in into is it its
  me my of on or our ours should so than that the their them then there these they this those to too us was we
  were what when where which who whom why will with would you your yours about any some also just please tell
  help want need get like know does many much more most very really thing things kind type sort way ways out
  up over off again further once here all both each few other such only own same s t don't im i'm we're
  best good great top nice new use using used make made lot lots`.split(/\s+/),
);

/** Normalizes text so documents and queries tokenize identically. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .replace(/\beco[\s-]?1\b/g, ' eco1 ')
    .replace(/\bm\s*&\s*v\b/g, ' mv ')
    .replace(/\bk[\s-]?12\b/g, ' k12 ')
    .replace(/\bdesign[\s/-]?build\b/g, ' designbuild ')
    .replace(/\bheating,? ventilation,? (and )?air[\s-]conditioning\b/g, ' hvac ')
    .replace(/\bmodelling\b/g, 'modeling')
    .replace(/&/g, ' and ');
}

/** A deliberately small suffix stemmer. Applied identically to documents and queries. */
export function stem(word: string): string {
  let w = word;
  if (w.length <= 3) return w;
  if (w.endsWith('ies') && w.length > 4) return w.slice(0, -3) + 'y';
  if (w.endsWith('ing') && w.length > 5) {
    w = w.slice(0, -3);
    if (/(.)\1$/.test(w) && !/(ll|ss)$/.test(w)) w = w.slice(0, -1);
    return w;
  }
  if (w.endsWith('ed') && w.length > 4) {
    w = w.slice(0, -2);
    if (/(.)\1$/.test(w) && !/(ll|ss)$/.test(w)) w = w.slice(0, -1);
    return w;
  }
  if (/(ss|us|is)$/.test(w)) return w;
  if (/(sh|ch|x|z)es$/.test(w)) return w.slice(0, -2);
  if (w.endsWith('s')) return w.slice(0, -1);
  return w;
}

export function tokenize(text: string, keepStopwords = false): string[] {
  return normalize(text)
    .split(/[^a-z0-9]+/)
    .filter((t) => t && (keepStopwords || !STOPWORDS.has(t)))
    .map(stem);
}

/** Query word -> related index words. Keys and values are stemmed at load. */
const SYNONYM_SOURCE: Record<string, string[]> = {
  bill: ['utility', 'cost', 'billing'],
  bills: ['utility', 'cost', 'billing'],
  cost: ['bill', 'utility', 'expense'],
  expensive: ['cost'],
  price: ['cost', 'pricing'],
  pricing: ['cost', 'price'],
  hvac: ['mechanical', 'heating', 'cooling', 'ventilation', 'chiller', 'air'],
  ac: ['cooling', 'mechanical'],
  aircon: ['cooling', 'mechanical'],
  chiller: ['mechanical', 'plant', 'cooling'],
  boiler: ['heating', 'mechanical', 'plant'],
  school: ['education', 'k12', 'district', 'campus'],
  k12: ['school', 'education'],
  district: ['school', 'education'],
  college: ['education', 'campus', 'university'],
  university: ['education', 'campus', 'college'],
  campus: ['education', 'college', 'university'],
  hospital: ['healthcare', 'medical', 'clinic'],
  medical: ['healthcare', 'hospital'],
  clinic: ['healthcare', 'hospital'],
  money: ['funding', 'financing', 'capital'],
  finance: ['funding', 'financing', 'capital'],
  financing: ['funding', 'capital'],
  loan: ['funding', 'financing'],
  pay: ['funding', 'financing'],
  afford: ['funding', 'financing', 'budget'],
  capital: ['funding', 'financing'],
  grant: ['funding', 'incentive'],
  rebate: ['incentive', 'utility'],
  incentive: ['rebate'],
  mv: ['measurement', 'verification', 'monitoring'],
  verify: ['verification', 'monitoring'],
  working: ['verification', 'performance', 'monitoring'],
  eco1: ['monitoring', 'analytics'],
  meter: ['metering', 'monitoring'],
  sensor: ['monitoring', 'metering'],
  data: ['analytics', 'monitoring'],
  audit: ['assessment'],
  assessment: ['audit'],
  evaluation: ['assessment', 'audit'],
  inspection: ['assessment', 'condition'],
  model: ['modeling', 'simulation', 'equest'],
  simulation: ['modeling', 'equest'],
  old: ['aging', 'deferred', 'renewal', 'replacement'],
  aging: ['deferred', 'renewal', 'replacement', 'old'],
  ageing: ['aging', 'deferred', 'renewal'],
  replace: ['replacement', 'upgrade', 'renewal'],
  upgrade: ['retrofit', 'improvement', 'replacement'],
  retrofit: ['upgrade', 'improvement'],
  construction: ['designbuild', 'build'],
  contractor: ['designbuild', 'construction'],
  commission: ['commissioning'],
  contact: ['contact', 'discuss'],
  phone: ['contact', 'call'],
  call: ['contact', 'phone'],
  email: ['contact'],
  save: ['savings', 'reduce'],
  savings: ['reduce', 'cost'],
  government: ['federal', 'public'],
  municipal: ['public', 'federal'],
  factory: ['industrial', 'manufacturing'],
  manufacturing: ['industrial'],
  office: ['commercial'],
  retail: ['commercial'],
  process: ['approach', 'phase', 'step'],
  steps: ['approach', 'phase', 'process'],
  timeline: ['schedule', 'phase'],
  location: ['based', 'cajon', 'diego'],
  where: ['location'],
};

const SYNONYMS = new Map<string, string[]>();
for (const [k, vs] of Object.entries(SYNONYM_SOURCE)) {
  const key = stem(normalize(k).trim());
  const values = vs.map((v) => stem(normalize(v).trim()));
  SYNONYMS.set(key, [...new Set([...(SYNONYMS.get(key) ?? []), ...values])]);
}

/* ---------------- Index ---------------- */

interface IndexedPassage {
  passage: Passage;
  /** Weighted term frequency. */
  tf: Map<string, number>;
  length: number;
}

const FIELD_WEIGHTS = { pageTitle: 1.5, heading: 2.5, keywords: 2, text: 1 };

function indexPassage(p: Passage): IndexedPassage {
  const tf = new Map<string, number>();
  const add = (text: string, weight: number) => {
    for (const t of tokenize(text)) tf.set(t, (tf.get(t) ?? 0) + weight);
  };
  add(p.pageTitle, FIELD_WEIGHTS.pageTitle);
  add(p.heading, FIELD_WEIGHTS.heading);
  add(p.keywords.join(' '), FIELD_WEIGHTS.keywords);
  add(p.text, FIELD_WEIGHTS.text);
  const length = [...tf.values()].reduce((a, b) => a + b, 0);
  return { passage: p, tf, length };
}

const indexed = allPassages.map(indexPassage);
const avgLength = indexed.reduce((a, d) => a + d.length, 0) / Math.max(indexed.length, 1);
const docFreq = new Map<string, number>();
for (const d of indexed) for (const t of d.tf.keys()) docFreq.set(t, (docFreq.get(t) ?? 0) + 1);
const vocabulary = [...docFreq.keys()];

const idf = (term: string) => {
  const n = docFreq.get(term) ?? 0;
  return Math.log(1 + (indexed.length - n + 0.5) / (n + 0.5));
};

/* ---------------- Query expansion ---------------- */

/** Damerau-Levenshtein distance with an early exit above `max`. */
export function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin > max) return max + 1;
  }
  return d[a.length][b.length];
}

interface QueryTerm {
  term: string;
  weight: number;
  /** The query word this term came from, for highlighting and "did you mean". */
  source: string;
  kind: 'exact' | 'synonym' | 'fuzzy' | 'prefix';
}

function closestTerm(token: string): string | null {
  if (token.length < 4) return null;
  const max = token.length >= 7 ? 2 : 1;
  let best: string | null = null;
  let bestDist = max + 1;
  let bestDf = 0;
  for (const v of vocabulary) {
    if (v.length < 3) continue;
    const dist = editDistance(token, v, max);
    const df = docFreq.get(v) ?? 0;
    if (dist < bestDist || (dist === bestDist && dist <= max && df > bestDf)) {
      best = v;
      bestDist = dist;
      bestDf = df;
    }
  }
  return bestDist <= max ? best : null;
}

export function expandQuery(query: string): { terms: QueryTerm[]; corrections: Map<string, string> } {
  const rawTokens = normalize(query)
    .split(/[^a-z0-9]+/)
    .filter((t) => t && !STOPWORDS.has(t));
  const terms: QueryTerm[] = [];
  const corrections = new Map<string, string>();
  const push = (t: QueryTerm) => {
    const existing = terms.find((x) => x.term === t.term);
    if (existing) existing.weight = Math.max(existing.weight, t.weight);
    else terms.push(t);
  };

  rawTokens.forEach((raw, i) => {
    const token = stem(raw);
    const isLast = i === rawTokens.length - 1;
    const known = docFreq.has(token);
    if (known) push({ term: token, weight: 1, source: raw, kind: 'exact' });

    for (const syn of SYNONYMS.get(token) ?? []) {
      if (docFreq.has(syn)) push({ term: syn, weight: 0.6, source: raw, kind: 'synonym' });
    }

    if (!known && !SYNONYMS.has(token)) {
      const fixed = closestTerm(token);
      if (fixed) {
        push({ term: fixed, weight: 0.85, source: raw, kind: 'fuzzy' });
        corrections.set(raw, fixed);
        for (const syn of SYNONYMS.get(fixed) ?? []) {
          if (docFreq.has(syn)) push({ term: syn, weight: 0.5, source: raw, kind: 'synonym' });
        }
      }
    }

    // Partial last word ("assess" while typing "assessment").
    if (isLast && raw.length >= 3) {
      for (const v of vocabulary) {
        if (v !== token && v.startsWith(raw)) push({ term: v, weight: 0.45, source: raw, kind: 'prefix' });
      }
    }
  });

  return { terms, corrections };
}

/* ---------------- Ranking ---------------- */

export interface ScoredPassage {
  passage: Passage;
  score: number;
  matched: string[];
}

export interface SnippetPart {
  text: string;
  mark: boolean;
}

export interface PageResult {
  pageId: string;
  title: string;
  category: Passage['category'];
  url: string;
  heading: string;
  snippet: SnippetPart[];
  score: number;
}

export interface SearchResponse {
  query: string;
  /** Query with typo corrections applied, when any were made. */
  correctedQuery?: string;
  results: PageResult[];
  /** Best passages across all pages, used for AI answer retrieval. */
  passages: ScoredPassage[];
}

const K1 = 1.2;
const B = 0.75;

function scorePassages(terms: QueryTerm[]): ScoredPassage[] {
  if (!terms.length) return [];
  const sources = new Set(terms.map((t) => t.source));
  const scored: ScoredPassage[] = [];
  for (const d of indexed) {
    let score = 0;
    const matched: string[] = [];
    const matchedSources = new Set<string>();
    for (const q of terms) {
      const f = d.tf.get(q.term);
      if (!f) continue;
      const norm = f * (K1 + 1) / (f + K1 * (1 - B + B * (d.length / avgLength)));
      score += q.weight * idf(q.term) * norm;
      matched.push(q.term);
      matchedSources.add(q.source);
    }
    if (score > 0) {
      // Reward passages that cover more of the visitor's distinct words.
      const coverage = matchedSources.size / sources.size;
      scored.push({ passage: d.passage, score: score * (0.5 + coverage), matched });
    }
  }
  return scored.sort((a, b) => b.score - a.score);
}

function sentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [text];
}

/** Builds a highlighted snippet as plain-text parts; rendering code escapes them. */
export function buildSnippet(text: string, matched: string[], maxLength = 220): SnippetPart[] {
  const terms = new Set(matched);
  const all = sentences(text);
  let bestIdx = 0;
  let best = -1;
  all.forEach((s, i) => {
    const hits = tokenize(s).filter((t) => terms.has(t)).length;
    if (hits > best) {
      best = hits;
      bestIdx = i;
    }
  });
  let snippet = all[bestIdx] ?? '';
  for (let i = bestIdx + 1; i < all.length && snippet.length + all[i].length < maxLength; i++) snippet += ' ' + all[i];
  if (snippet.length > maxLength) snippet = snippet.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';

  const parts: SnippetPart[] = [];
  for (const chunk of snippet.split(/(\b[\w’'-]+\b)/)) {
    if (!chunk) continue;
    const isWord = /^[\w’'-]+$/.test(chunk);
    const mark = isWord && !STOPWORDS.has(chunk.toLowerCase()) && tokenize(chunk).some((t) => terms.has(t));
    const last = parts[parts.length - 1];
    if (last && last.mark === mark) last.text += chunk;
    else parts.push({ text: chunk, mark });
  }
  return parts;
}

export function cleanQuery(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_QUERY_LENGTH);
}

export function search(input: string, limit = 8): SearchResponse {
  const query = cleanQuery(input);
  const { terms, corrections } = expandQuery(query);
  const scored = scorePassages(terms);

  const byPage = new Map<string, ScoredPassage[]>();
  for (const s of scored) {
    const list = byPage.get(s.passage.pageId) ?? [];
    list.push(s);
    byPage.set(s.passage.pageId, list);
  }

  const results: PageResult[] = [];
  for (const list of byPage.values()) {
    const [top, ...rest] = list;
    const bonus = rest.slice(0, 3).reduce((a, s) => a + s.score, 0) * 0.15;
    const p = top.passage;
    results.push({
      pageId: p.pageId,
      title: p.pageTitle,
      category: p.category,
      url: p.url,
      heading: p.heading,
      snippet: buildSnippet(p.text, top.matched),
      score: top.score + bonus,
    });
  }
  results.sort((a, b) => b.score - a.score);

  let correctedQuery: string | undefined;
  if (corrections.size) {
    correctedQuery = query.replace(/[A-Za-z0-9’'-]+/g, (w) => {
      const fixed = corrections.get(w.toLowerCase());
      return fixed ?? w;
    });
  }

  return { query, correctedQuery, results: results.slice(0, limit), passages: scored.slice(0, 12) };
}

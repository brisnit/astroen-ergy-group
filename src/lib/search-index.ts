import { allPages } from '../data/index.ts';
import { faqs } from '../data/company.ts';
import { phases, steps } from '../data/approach.ts';
import { auditLevels } from '../data/solutions.ts';
import type { Page } from '../data/types.ts';

/** One searchable unit of approved site content: usually a page section. */
export interface Passage {
  /** Stable id: `<pageId>#<sectionId>`. */
  id: string;
  pageId: string;
  pageTitle: string;
  category: Page['category'];
  heading: string;
  /** Link target, including the section anchor when there is one. */
  url: string;
  text: string;
  keywords: string[];
}

const join = (parts: (string | undefined)[]) => parts.filter(Boolean).join(' ');

function pagePassages(page: Page): Passage[] {
  const base = { pageId: page.id, pageTitle: page.title, category: page.category };
  const out: Passage[] = [
    {
      ...base,
      id: `${page.id}#intro`,
      heading: page.title,
      url: page.url,
      text: join([page.lede, page.description]),
      keywords: page.keywords ?? [],
    },
  ];
  for (const s of page.sections) {
    out.push({
      ...base,
      id: `${page.id}#${s.id}`,
      heading: s.heading,
      url: `${page.url}#${s.id}`,
      text: join([...(s.body ?? []), ...(s.list ?? [])]),
      // Page keywords are added at low weight so a section still relates to its page topic.
      keywords: [...(s.keywords ?? []), ...(page.keywords ?? []).slice(0, 4)],
    });
  }
  if (page.terms?.length) {
    out.push({
      ...base,
      id: `${page.id}#terms`,
      heading: 'Key terms',
      url: `${page.url}#terms`,
      text: page.terms.map((t) => `${t.term}: ${t.definition}`).join(' '),
      keywords: ['definition', 'what is', 'meaning', 'glossary'],
    });
  }
  return out;
}

function buildPassages(): Passage[] {
  const passages = allPages.flatMap(pagePassages);

  for (const f of faqs) {
    passages.push({
      id: `faq#${f.id}`,
      pageId: 'home',
      pageTitle: 'Frequently asked questions',
      category: 'Home',
      heading: f.question,
      url: `/#faq-${f.id}`,
      text: f.answer.join(' '),
      keywords: ['faq', 'question', ...(f.keywords ?? [])],
    });
  }

  passages.push({
    id: 'energy-audits#audit-levels-table',
    pageId: 'energy-audits',
    pageTitle: 'Energy Audits & Assessments',
    category: 'Solutions',
    heading: 'Comparing ASHRAE Level 1, 2 and 3 audits',
    url: '/solutions/energy-audits/#audit-levels',
    text: auditLevels
      .map((l) => `${l.level}, ${l.name}. Best for: ${l.bestFor} Involves: ${l.involves} You receive: ${l.receive}`)
      .join(' '),
    keywords: ['ashrae level', 'compare audits', 'audit comparison'],
  });

  passages.push({
    id: 'approach#steps',
    pageId: 'approach',
    pageTitle: 'Our Approach',
    category: 'Approach',
    heading: 'Assess, prioritize, plan, implement, verify',
    url: '/approach/#steps',
    text: steps.map((s) => `${s.name}: ${s.summary} ${s.detail}`).join(' '),
    keywords: ['process', 'steps', 'how it works', 'engagement'],
  });

  for (const p of phases) {
    passages.push({
      id: `approach#${p.id}`,
      pageId: 'approach',
      pageTitle: 'Our Approach',
      category: 'Approach',
      heading: `${p.name} phase`,
      url: `/approach/#${p.id}`,
      text: `${p.summary} Activities include: ${p.activities.join(', ')}. ${p.gate}`,
      keywords: ['project delivery model', 'phase'],
    });
  }

  return passages;
}

export const passages: Passage[] = buildPassages();

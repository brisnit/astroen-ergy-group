/**
 * Shared content model. Every public page and the Ask Astro search index read
 * from these objects, so a wording change here updates both the page and search.
 */

export interface Term {
  term: string;
  definition: string;
}

export interface Section {
  /** Stable id, used as the HTML anchor and the search passage id suffix. */
  id: string;
  heading: string;
  /** Short paragraphs. Keep each to two or three sentences. */
  body?: string[];
  list?: string[];
  /** Extra words that should help search find this section (synonyms, abbreviations). */
  keywords?: string[];
}

export interface Page {
  /** Stable id used for search results and cross-links. */
  id: string;
  url: string;
  /** Visible H1. */
  title: string;
  /** Short label for navigation, cards and search result badges. */
  label: string;
  /** <title> tag. Unique per page. */
  metaTitle: string;
  /** Meta description and search-result fallback snippet. */
  description: string;
  /** One- or two-sentence introduction under the H1. */
  lede: string;
  category: 'Solutions' | 'Industries' | 'Approach' | 'About' | 'Contact' | 'Home';
  keywords?: string[];
  sections: Section[];
  terms?: Term[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string[];
  /** Page the answer points to for more detail. */
  link?: { href: string; label: string };
  keywords?: string[];
}

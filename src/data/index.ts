import type { Page } from './types.ts';
import { solutionPages, solutionsOverview } from './solutions.ts';
import { industriesOverview, industryPages } from './industries.ts';
import { approach } from './approach.ts';
import { about, contactPage } from './company.ts';
import { home } from './home.ts';

export type * from './types.ts';

/** Every public content page, in navigation order. Shared by page templates, search and the sitemap. */
export const allPages: Page[] = [
  home,
  solutionsOverview,
  ...solutionPages,
  industriesOverview,
  ...industryPages,
  approach,
  about,
  contactPage,
];

export const pageById = (id: string): Page => {
  const page = allPages.find((p) => p.id === id);
  if (!page) throw new Error(`Unknown page id: ${id}`);
  return page;
};

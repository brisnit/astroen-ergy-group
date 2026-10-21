import type { Faq, Page } from './types.ts';

/**
 * Company facts. Everything here comes from the legacy site and is marked in
 * docs/content-verification.md as "confirm before launch". Items that could not be
 * presented as fact (leadership bios, affiliated companies' histories, payback and
 * savings figures) are deliberately left out of public pages.
 */
export const company = {
  name: 'Astro Energy Group',
  shortName: 'Astro',
  // Legacy footer lists El Cajon; the legacy contact page lists "San Diego, CA 92020".
  // 92020 is an El Cajon ZIP code. CONFIRM before launch.
  address: {
    street: '603 S. Marshall Ave.',
    city: 'El Cajon',
    region: 'CA',
    postalCode: '92020',
    country: 'US',
  },
  // Legacy "For information call" office number. CONFIRM before launch.
  phone: '619-442-9686',
  phoneHref: 'tel:+16194429686',
  // No general inbox was published on the legacy site; only personal addresses.
  // Leave null until a shared address (e.g. info@) is confirmed.
  email: null as string | null,
  areaDescription: 'San Diego County, California',
};

export const about: Page = {
  id: 'about',
  url: '/about/',
  title: 'About Astro Energy Group',
  label: 'About',
  metaTitle: 'About Astro Energy Group | Building Energy Technologies, El Cajon, CA',
  description:
    'Astro Energy Group evaluates existing buildings and central utility plants, then plans, designs and builds energy efficiency projects with verification built in.',
  lede: 'Astro Energy Group is an energy technologies company that helps organizations plan, design and build energy efficiency projects for existing buildings.',
  category: 'About',
  keywords: ['about', 'company', 'who are you', 'aeg', 'location', 'where are you', 'el cajon', 'san diego'],
  sections: [
    {
      id: 'what-we-do',
      heading: 'What we do',
      body: [
        'We evaluate the built environment: buildings of any type and use, and the central utility plants that serve them. Our multi-discipline analyses look at the current condition and operating efficiency of existing building systems.',
        'From there, we develop projects using a LEAN integrated design/build approach, with financing options where a project needs them, to upgrade aging equipment, building envelopes and technologies, or to implement energy conservation measures.',
      ],
    },
    {
      id: 'outcomes',
      heading: 'What we focus on improving',
      list: [
        'The life of building systems.',
        'How energy use is analyzed, and the solutions that follow.',
        'Integrated building controls.',
        'Monitoring of building system performance.',
        'Operations and productivity.',
        'Financial performance of the facility.',
      ],
    },
    {
      id: 'principles',
      heading: 'How we work',
      list: [
        'Start with evidence: a baseline and an honest look at existing conditions, before recommending solutions.',
        'Keep one coordinated team from planning through verification.',
        'Give owners a decision point at the end of each phase.',
        'Measure results after the work is done, not just before.',
      ],
    },
    {
      id: 'location',
      heading: 'Where we are',
      body: [
        'Astro Energy Group is based in El Cajon, California, in San Diego County. If your facilities are elsewhere, tell us where they are and we will discuss whether and how we can help.',
      ],
      keywords: ['service area', 'locations', 'do you work in', 'california', 'nationwide'],
    },
  ],
};

export const contactPage: Page = {
  id: 'contact',
  url: '/contact/',
  title: 'Discuss your building',
  label: 'Contact',
  metaTitle: 'Contact Astro Energy Group | Discuss Your Building',
  description: 'Tell Astro Energy Group about your building and what you want to improve. A short form, no obligation.',
  lede: 'Tell us a little about your building and what you want to improve. A few details are enough to start a useful conversation.',
  category: 'Contact',
  keywords: ['contact', 'phone', 'call', 'email', 'address', 'talk to someone', 'get in touch', 'consultation', 'quote', 'proposal', 'speak with an engineer'],
  sections: [
    {
      id: 'direct',
      heading: 'Call or write to us',
      body: [
        `Office phone: ${company.phone}.`,
        `Mailing address: ${company.address.street}, ${company.address.city}, ${company.address.region} ${company.address.postalCode}.`,
      ],
      keywords: ['phone number', 'telephone', 'address', 'office', 'call', 'reach'],
    },
    {
      id: 'what-happens-next',
      heading: 'What happens next',
      list: [
        'We read your inquiry and reach out using the contact details you provide.',
        'We discuss your buildings, your goals and any constraints such as budget cycles or occupied spaces.',
        'If it makes sense to continue, we suggest a sensible first step, such as an assessment, and agree on scope before any work begins.',
      ],
    },
    {
      id: 'privacy',
      heading: 'What not to send',
      body: [
        'Please do not include utility account numbers, passwords or other sensitive information in the form. If detailed data is useful later, we will arrange a secure way to share it.',
      ],
    },
  ],
};

export const faqs: Faq[] = [
  {
    id: 'rising-bills',
    question: 'Where should we start if our energy bills keep increasing?',
    answer: [
      'Usually with a utility billing analysis and an energy audit at the level that fits the decision you face. Together they establish a baseline and show where energy and cost are going.',
      'Monitoring with Eco-1 can add detail on when and where energy is used, sometimes revealing operational fixes that cost little or nothing.',
    ],
    link: { href: '/solutions/energy-audits/', label: 'Energy audits & assessments' },
    keywords: ['high bills', 'costs going up', 'start', 'first step'],
  },
  {
    id: 'audit-vs-modeling',
    question: 'What is the difference between an energy audit and energy modeling?',
    answer: [
      'An audit looks at the building as it is today: how it uses energy, the condition of its systems and which measures look promising. Modeling looks forward, simulating how the building would perform with different combinations of measures so you can compare options before choosing.',
    ],
    link: { href: '/solutions/energy-modeling/#audit-vs-modeling', label: 'Audit or modeling' },
  },
  {
    id: 'aging-equipment',
    question: 'Can you help us plan upgrades for aging equipment?',
    answer: [
      'Yes. An infrastructure assessment identifies systems that are degrading and supports capital renewal decisions. Modeling can compare replacement options, and integrated design/build can carry the chosen upgrades through design, construction and commissioning.',
    ],
    link: { href: '/solutions/design-build/', label: 'Integrated design/build' },
    keywords: ['old equipment', 'replace', 'end of life', 'capital renewal'],
  },
  {
    id: 'guaranteed-savings',
    question: 'Will you tell us how much we will save?',
    answer: [
      'Not before we understand your building. Audits and modeling estimate the effect of specific measures, and monitoring and verification measure actual performance afterwards. We do not quote savings or guarantee outcomes up front.',
    ],
    link: { href: '/solutions/monitoring-verification/', label: 'Monitoring & verification' },
    keywords: ['guarantee', 'savings estimate', 'how much', 'roi', 'payback'],
  },
  {
    id: 'funding',
    question: 'What funding options should we discuss?',
    answer: [
      'Astro works with funding partners, including private equity investor groups, and helps identify and document utility and tax incentives. What is available depends on your project, your utility and each funder’s review, so we discuss options once we understand the project.',
    ],
    link: { href: '/solutions/funding-incentives/', label: 'Funding & incentive support' },
    keywords: ['finance', 'pay', 'capital', 'rebate'],
  },
  {
    id: 'location',
    question: 'Do you work in our area?',
    answer: [
      'Astro is based in El Cajon, California, in San Diego County. Tell us where your facilities are and we will discuss whether and how we can support them.',
    ],
    link: { href: '/contact/', label: 'Discuss your building' },
  },
];

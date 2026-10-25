export const site = {
  name: 'Asci Labs',
  tagline: 'Physics · Computation · Curiosity',
  description:
    'Asci Labs is an independent scholarly publication of technical research essays and curiosity-driven exploratory writing in physics and computation.',
  author: 'amanasci',
  authorUrl: 'https://amanasci.github.io/',
  volume: 'Volume I',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/archive', label: 'Archive' },
    { href: '/about', label: 'About' },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];

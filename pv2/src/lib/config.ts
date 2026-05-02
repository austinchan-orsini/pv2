export const Site = {
  name: 'Austin Chan-Orsini',
  description: 'Software developer building cool things on the internet.',
  url: 'https://austinchanorsini.dev',
  repo: {
    commitBaseUrl: 'https://github.com/austinchanorsini/commit/',
    url: 'https://github.com/austinchanorsini',
  },
  out: {
    github: 'https://github.com/austinchanorsini',
    linkedin: 'https://linkedin.com/in/austinchanorsini',
    email: 'achanorsini@gmail.com',
    calcom: 'https://cal.com/austin',
  },
  seo: {
    author: 'Austin Chan-Orsini',
    location: { city: 'Your City', region: 'Your Region' },
  },
  tags: ['software', 'developer', 'portfolio', 'typescript', 'react'],
};

export type NavItem = {
  title: string;
  href: string;
  external?: boolean;
};

export const mainNavItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Projects', href: '/projects' },
];

export const moreNavItems: NavItem[] = [
  { title: 'Blog', href: '/posts' },
  { title: 'GitHub', href: 'https://github.com/austinchanorsini', external: true },
];

export const socialLinks = [
  { href: Site.out.github, text: 'GitHub', external: true },
  { href: Site.out.linkedin, text: 'LinkedIn', external: true },
];

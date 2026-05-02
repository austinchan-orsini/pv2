export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: { url: string; alt: string };
  links?: { label: string; url: string; icon?: string }[];
  featured?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  description?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  url?: string;
};

// ─── Fill in your actual data below ──────────────────────────────────────────

export const experiences: Experience[] = [
  { company: 'Your Company', role: 'Software Engineer', period: '2024 – Present', url: 'https://example.com' },
  { company: 'Previous Co.', role: 'Junior Developer', period: '2022 – 2024' },
];

export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    description: 'A short description of your first project. Replace with your actual project.',
    date: '2024-01-01',
    tags: ['React', 'TypeScript'],
    featured: true,
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    description: 'Another project you built. Replace with your actual project details.',
    date: '2023-06-01',
    tags: ['Python', 'FastAPI'],
    featured: true,
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    description: 'Yet another cool project. Describe what it does and what you learned.',
    date: '2023-01-01',
    tags: ['Go', 'PostgreSQL'],
  },
];

export const posts: Post[] = [
  { slug: 'first-post', title: 'My First Post', publishedAt: '2024-03-01' },
  { slug: 'second-post', title: 'Thoughts on TypeScript', publishedAt: '2024-01-15' },
];

export const featuredProjects = projects.filter((p) => p.featured);

export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: { url: string; alt: string };
  links?: { label: string; url: string; icon?: string }[];
  featured?: boolean;
  // Detail page content
  longDescription?: string;
  features?: { iconName: string; title: string; description: string }[];
  stats?: { label: string; value: number; suffix?: string }[];
  codeSnippet?: { lang: string; filename: string; code: string };
  gradientVars?: [string, string, string, string];
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

// ─── Experience ───────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  { company: 'Your Company', role: 'Software Engineer', period: '2024 – Present', url: 'https://example.com' },
  { company: 'Previous Co.', role: 'Junior Developer', period: '2022 – 2024' },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'devpulse',
    title: 'DevPulse',
    description:
      'A real-time GitHub activity dashboard that turns raw webhooks into team insights — commits, PRs, and code churn at a glance.',
    date: '2024-11-01',
    tags: ['TypeScript', 'React', 'GitHub API', 'Drizzle ORM'],
    featured: true,
    gradientVars: ['--ctp-blue', '--ctp-mauve', '--ctp-sapphire', '--ctp-lavender'],
    longDescription:
      "DevPulse started as a weekend hack to stop refreshing GitHub's activity feed. It ingests push events via GitHub Apps webhooks, stores them in a lightweight SQLite database with Drizzle ORM, and surfaces them in a React dashboard with sparkline charts. I learned a lot about GitHub's webhook delivery guarantees along the way — and why you always need idempotency keys.",
    stats: [
      { label: 'Lines of Code', value: 847 },
      { label: 'Commits', value: 42 },
      { label: 'Weeks', value: 6 },
      { label: 'Stars', value: 23 },
    ],
    features: [
      {
        iconName: 'chart',
        title: 'Activity Heatmap',
        description: "Visual calendar heatmap of commits and PRs over the past year, inspired by GitHub's contribution graph.",
      },
      {
        iconName: 'refresh',
        title: 'Real-Time Webhooks',
        description: 'Push events arrive via GitHub Apps webhooks with <200 ms end-to-end latency — no polling needed.',
      },
      {
        iconName: 'trophy',
        title: 'Team Leaderboard',
        description: 'Ranks contributors by commits, lines changed, and PR review velocity over any configurable time window.',
      },
      {
        iconName: 'download',
        title: 'CSV Export',
        description: 'One-click export of any date range for importing into spreadsheets or BI tools.',
      },
    ],
    codeSnippet: {
      lang: 'typescript',
      filename: 'webhook.ts',
      code: `// Ingests push events delivered by GitHub Apps
export async function handlePushEvent(payload: GitHubPushEvent) {
  const commits = payload.commits.map((c) => ({
    sha:       c.id.slice(0, 7),
    message:   c.message.split("\\n")[0],
    additions: c.added.length,
    deletions: c.removed.length,
    author:    c.author.name,
    timestamp: new Date(c.timestamp),
  }));

  await db.transaction(async (tx) => {
    await tx.insert(commitsTable).values(commits).onConflictDoNothing();
    await tx
      .update(reposTable)
      .set({ lastPushed: new Date() })
      .where(eq(reposTable.fullName, payload.repository.full_name));
  });

  await invalidateCache(\`repo:\${payload.repository.id}:activity\`);
}`,
    },
    links: [
      { label: 'View on GitHub', url: 'https://github.com/austinchanorsini', icon: 'github' },
    ],
  },

  {
    slug: 'quicknote',
    title: 'Quicknote',
    description:
      'A keyboard-first desktop note app built on Electron and SQLite FTS5 — open it, type, and find anything in under 10 ms.',
    date: '2024-07-01',
    tags: ['TypeScript', 'Electron', 'SQLite', 'React'],
    featured: true,
    gradientVars: ['--ctp-sapphire', '--ctp-sky', '--ctp-teal', '--ctp-blue'],
    longDescription:
      'I got frustrated with note apps that are slow, require an internet connection, or lock you into a proprietary format. Quicknote is entirely local, uses SQLite FTS5 for instant full-text search, and stores everything as plain Markdown files you can open anywhere. The Electron shell is deliberately thin — all heavy logic lives in a Web Worker to keep the UI smooth at 60 fps.',
    stats: [
      { label: 'Lines of Code', value: 1284 },
      { label: 'Commits', value: 31 },
      { label: 'Weeks', value: 3 },
      { label: 'Search (ms)', value: 8, suffix: 'ms' },
    ],
    features: [
      {
        iconName: 'search',
        title: 'Instant Search',
        description: 'Full-text search powered by SQLite FTS5 — results appear as you type with sub-10 ms query latency.',
      },
      {
        iconName: 'file',
        title: 'Markdown Native',
        description: 'Every note is a plain .md file. Edit in Quicknote or any text editor — your data is always yours.',
      },
      {
        iconName: 'keyboard',
        title: 'Keyboard-Driven',
        description: 'Every action has a shortcut. Power users can navigate, create, and switch notes without touching the mouse.',
      },
      {
        iconName: 'cloudoff',
        title: 'Offline-First',
        description: 'Zero network dependency. All data is local SQLite. Works on a plane, a cabin, anywhere.',
      },
    ],
    codeSnippet: {
      lang: 'typescript',
      filename: 'search.ts',
      code: `// Full-text search over the SQLite FTS5 index
export async function searchNotes(query: string): Promise<Note[]> {
  if (!query.trim()) return getRecentNotes(50);

  return db.all<Note>(
    \`SELECT n.*,
            snippet(notes_fts, 1, '<mark>', '</mark>', '…', 20) AS excerpt
     FROM   notes_fts
     JOIN   notes n ON n.id = notes_fts.rowid
     WHERE  notes_fts MATCH ?
     ORDER  BY rank
     LIMIT  50\`,
    [query],
  );
}`,
    },
    links: [
      { label: 'View on GitHub', url: 'https://github.com/austinchanorsini', icon: 'github' },
    ],
  },

  {
    slug: 'trackmate',
    title: 'TrackMate',
    description:
      'A habit tracker that visualizes your consistency with a GitHub-style streak calendar and sends personalized digest emails each week.',
    date: '2024-03-01',
    tags: ['Python', 'FastAPI', 'React', 'PostgreSQL'],
    featured: false,
    gradientVars: ['--ctp-green', '--ctp-teal', '--ctp-sapphire', '--ctp-sky'],
    longDescription:
      'TrackMate came from tracking my own habits in a spreadsheet and wanting something nicer to look at. I built the backend in FastAPI with PostgreSQL (timezone-aware date handling is surprisingly tricky) and a React frontend with a custom SVG heatmap calendar. The weekly digest email uses Resend with a Handlebars template that adapts its tone based on your streak performance.',
    stats: [
      { label: 'Lines of Code', value: 2391 },
      { label: 'Commits', value: 67 },
      { label: 'Weeks', value: 8 },
      { label: 'Habits Tracked', value: 340 },
    ],
    features: [
      {
        iconName: 'flame',
        title: 'Streak Calendar',
        description: 'A 52-week SVG heatmap showing daily habit completion with intensity shading — satisfying to fill in.',
      },
      {
        iconName: 'bell',
        title: 'Smart Reminders',
        description: 'Configurable push notifications that adapt timing based on when you historically complete each habit.',
      },
      {
        iconName: 'chartline',
        title: 'Streak Analytics',
        description: 'Tracks current and longest streaks, completion rate, and day-of-week patterns per habit.',
      },
      {
        iconName: 'mail',
        title: 'Weekly Digest',
        description: 'A personalized email each Monday summarizing last week and projecting this week — tone shifts based on your streak.',
      },
    ],
    codeSnippet: {
      lang: 'python',
      filename: 'habits.py',
      code: `# Streak computation with timezone-aware dates
@router.get("/habits/{habit_id}/streak")
async def get_streak(
    habit_id: int,
    tz: str = Query("UTC"),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Entry.date)
        .where(Entry.habit_id == habit_id)
        .order_by(Entry.date.desc())
        .limit(365)
    )
    dates = [r.date for r in result.scalars().all()]
    return {
        "current": compute_streak(dates, tz),
        "longest": longest_streak(dates),
    }`,
    },
    links: [
      { label: 'View on GitHub', url: 'https://github.com/austinchanorsini', icon: 'github' },
    ],
  },
];

export const posts: Post[] = [
  { slug: 'first-post', title: 'My First Post', publishedAt: '2024-03-01' },
  { slug: 'second-post', title: 'Thoughts on TypeScript', publishedAt: '2024-01-15' },
];

export const featuredProjects = projects.filter((p) => p.featured);

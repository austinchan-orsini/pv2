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
    slug: 'gh-job-alerts',
    title: 'GH Job Alerts',
    description:
      'A self-hosted Discord bot (with optional SMS) that pings you the instant a new role is posted to a GitHub job-board repo — no more refreshing README tables.',
    date: '2026-06-01',
    tags: ['JavaScript', 'Node.js', 'Discord.js', 'Twilio'],
    featured: true,
    gradientVars: ['--mint', '--butter', '--coral', '--mark'],
    longDescription:
      "I kept missing new listings on the job-board repos I was tracking because I'd forget to refresh the page. GH Job Alerts polls those repos every 10 minutes, diffs the markdown tables between commits, and fires an alert the moment a row is added — over Discord slash commands or, if you self-host with a Twilio account, straight to your phone as a text.",
    features: [
      {
        iconName: 'bell',
        title: 'Discord + SMS Alerts',
        description: 'Add the official bot to your server for zero-setup alerts, or self-host with a GitHub token and optional Twilio account for SMS.',
      },
      {
        iconName: 'refresh',
        title: '10-Minute Polling',
        description: 'Checks every tracked repo on a 10-minute cycle and diffs commits against the last-seen SHA — no missed pushes.',
      },
      {
        iconName: 'chart',
        title: 'Web Dashboard',
        description: 'A dashboard for managing which repos, branches, and files you\'re tracking across multiple servers.',
      },
      {
        iconName: 'file',
        title: 'Multi-Format Parsing',
        description: 'Handles several different markdown job-table formats used across popular job-board repos.',
      },
    ],
    codeSnippet: {
      lang: 'javascript',
      filename: 'poller.js',
      code: `async function pollRepo(repo) {
  const { id, owner, name, branch, file_path, last_sha, label } = repo;
  const repoSlug = \`\${owner}/\${name}\`;

  const latestSha = await getLatestCommitSha(owner, name, branch, file_path);
  if (!latestSha) return 0;

  if (!last_sha) {
    console.log(\`[\${repoSlug}] First run — recording baseline SHA \${latestSha.slice(0, 7)}\`);
    if (!DRY_RUN) updateLastSha(id, latestSha);
    return 0;
  }

  if (latestSha === last_sha) return 0;

  const [beforeContent, afterContent] = await Promise.all([
    getFileAtSha(owner, name, file_path, last_sha).catch(() => ""),
    getFileAtSha(owner, name, file_path, latestSha),
  ]);

  const beforeHashes = new Set(extractJobsFromFile(beforeContent, repoSlug).map((j) => j.hash));
  const afterJobs = extractJobsFromFile(afterContent, repoSlug);
  const newJobs = afterJobs.filter((j) => !beforeHashes.has(j.hash));
}`,
    },
    links: [
      { label: 'View on GitHub', url: 'https://github.com/austinchan-orsini/gh-job-alerts', icon: 'github' },
    ],
  },

  {
    slug: 'streak',
    title: 'Streak',
    description:
      'A 75 Hard tracking web app — daily task cards, a 75-day progress heatmap, and a satisfying tap-to-complete animation for every habit.',
    date: '2026-06-01',
    tags: ['TypeScript', 'React', 'Vite', 'Tailwind CSS'],
    featured: true,
    gradientVars: ['--butter', '--coral', '--mark', '--mint'],
    longDescription:
      "Streak is a web app for running the 75 Hard challenge — six core daily rules, and one reset back to day one if you miss any of them. I built it because the spreadsheet I was using to track my own run wasn't fun to look at. It's got custom task support on top of the core six, a 75-day heatmap calendar, and a little confetti burst every time a task (or a whole day) gets checked off.",
    features: [
      {
        iconName: 'flame',
        title: '75-Day Streak Tracking',
        description: 'Tracks the six core 75 Hard rules day by day, with a reset back to day one on any miss.',
      },
      {
        iconName: 'trophy',
        title: 'Daily Task Cards',
        description: 'Check off the core rules or your own custom tasks, with a springy tap animation on completion.',
      },
      {
        iconName: 'chart',
        title: 'Calendar Heatmap',
        description: 'A 75-day grid that fills in as you go, so you can see the whole run at a glance.',
      },
      {
        iconName: 'chartline',
        title: 'Synced Progress',
        description: 'Sign in and your history syncs to the cloud, so your streak follows you across devices.',
      },
    ],
    codeSnippet: {
      lang: 'typescript',
      filename: 'useDailyTasks.ts',
      code: `const toggleTask = (taskId: string, el: HTMLElement | null) => {
  setState((current) => {
    const currentTasks = [...initialTasks, ...current.customTasks];
    const existing = current.history[dateKey] || {};
    const progressForDay = ensureDayProgress(currentTasks, existing);
    const task = currentTasks.find((item) => item.id === taskId);
    if (!task) return current;

    const currentState = progressForDay[taskId] || defaultTaskState(task);
    const nextState = { ...currentState };
    let becameDone = false;

    if (task.kind === 'check') {
      nextState.value = !Boolean(currentState.value);
      becameDone = Boolean(nextState.value);
    } else {
      const numeric = Number(currentState.value || 0);
      if (numeric >= (task.target ?? 0)) {
        nextState.value = 0;
      } else {
        nextState.value = numeric + 1;
        becameDone = nextState.value >= (task.target ?? 0);
      }
    }

    progressForDay[taskId] = nextState;
    if (becameDone) burstAt(el);

    return { ...current, history: { ...current.history, [dateKey]: progressForDay } };
  });
};`,
    },
    links: [
      { label: 'View on GitHub', url: 'https://github.com/austinchan-orsini/streak', icon: 'github' },
      { label: 'Live Demo', url: 'https://streak-pied.vercel.app', icon: 'external' },
    ],
  },

  {
    slug: 'zetamac',
    title: 'Zetamac Tracker',
    description:
      'A Chrome extension that logs every question you solve in Zetamac, the mental-math game — operation type, time-to-solve, and carry/borrow detection.',
    date: '2025-11-01',
    tags: ['JavaScript', 'Chrome Extension', 'Manifest V3'],
    featured: false,
    gradientVars: ['--coral', '--mark', '--mint', '--butter'],
    longDescription:
      "I wanted to know which arithmetic I was actually slow at instead of just watching my Zetamac score go up. This extension hooks into the game, classifies every question by operation and whether it involves a carry or borrow, times how long each one takes to answer, and stores the session history in Chrome's storage APIs. The logging and storage side is done; the analytics dashboard to actually make sense of the data is still a work in progress.",
    features: [
      {
        iconName: 'chart',
        title: 'Question Logging',
        description: 'Captures every arithmetic question and result as you play, classified by operation type.',
      },
      {
        iconName: 'keyboard',
        title: 'Time-to-Solve Tracking',
        description: 'Times how long each problem takes to answer and flags carry/borrow operations.',
      },
      {
        iconName: 'cloudoff',
        title: 'Local Session Storage',
        description: "Session history persists across games using Chrome's storage APIs — no server needed.",
      },
      {
        iconName: 'chartline',
        title: 'Analytics (In Progress)',
        description: 'Visualization of long-term performance trends is under active development.',
      },
    ],
    codeSnippet: {
      lang: 'javascript',
      filename: 'content.js',
      code: `function saveGameHistory() {
  const scoreText = findScoreElement()?.textContent?.trim() || "";
  const match = scoreText.match(/\\d+/);
  const score = match ? parseInt(match[0], 10) : 0;

  if (score === 0) return;  // ignore empty games

  const gameData = {
    timestamp: Date.now(),
    score,
    solved: window.solvedQuestions.map(q => ({
      a: q.a,
      b: q.b,
      operation: q.operation,
      time: q.time,
      carry: q.carry,
      borrow: q.borrow,
      table1: q.table1,
      table2: q.table2
    })),
    duration: window.solvedQuestions.reduce((sum, q) => sum + q.time, 0),
    avg: window.solvedQuestions.length
      ? window.solvedQuestions.reduce((sum, q) => sum + q.time, 0) /
        window.solvedQuestions.length
      : null
  };
}`,
    },
    links: [
      { label: 'View on GitHub', url: 'https://github.com/austinchan-orsini/zetamac', icon: 'github' },
    ],
  },

  {
    slug: 'padly',
    title: 'Padly',
    description:
      'A student housing platform for finding and posting off-campus sublets — built with my team, VibeCoders, for a software engineering class.',
    date: '2026-04-01',
    tags: ['Full-Stack', 'Team Project', 'SWE Course'],
    featured: false,
    gradientVars: ['--mark', '--mint', '--butter', '--coral'],
    longDescription:
      "Padly was a semester-long team project for my software engineering class, built with my team VibeCoders. It's a platform for students to find and post off-campus sublets — browse listings near campus, post your own place, and connect with the other side of the sublet without digging through a dozen scattered group chats. [more detail on the exact stack + my specific contributions to come]",
    features: [
      {
        iconName: 'search',
        title: 'Sublet Listings',
        description: 'Browse and filter short-term sublets near campus.',
      },
      {
        iconName: 'file',
        title: 'Post a Listing',
        description: 'Post your own place with photos, pricing, and lease-length details.',
      },
      {
        iconName: 'trophy',
        title: 'Team Project',
        description: 'Built end-to-end with my SWE class team, VibeCoders, over a semester.',
      },
    ],
  },

  {
    slug: 'nibl',
    title: 'Nibl',
    description:
      'A cooking app I\'m building on the side — recipe discovery and meal planning. Private repo, still early.',
    date: '2026-07-01',
    tags: ['Personal Project', 'Work in Progress'],
    featured: false,
    gradientVars: ['--coral', '--mint', '--mark', '--butter'],
    longDescription:
      "Nibl is a personal side project — a cooking app for recipe discovery and meal planning. It's still early and living in a private repo while I figure out the shape of it, so consider this card a placeholder until it's further along.",
    features: [
      {
        iconName: 'file',
        title: 'Recipe Discovery',
        description: 'Find and save recipes worth cooking again.',
      },
      {
        iconName: 'chart',
        title: 'Meal Planning',
        description: 'Plan out meals for the week ahead.',
      },
    ],
  },

  {
    slug: 'facial-recognition',
    title: 'Facial Recognition',
    description:
      'An experiment in real-time facial detection and recognition. Placeholder card — write-up coming once there\'s more to show.',
    date: '2026-08-01',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    featured: false,
    gradientVars: ['--butter', '--mark', '--coral', '--mint'],
    longDescription:
      "This is a placeholder for a facial recognition project I'm still working through — real-time face detection, landmarks, and matching against a small known-faces database. Details and a real write-up go here once it's further along.",
    features: [
      {
        iconName: 'search',
        title: 'Face Detection',
        description: 'Real-time detection from a webcam feed.',
      },
      {
        iconName: 'chart',
        title: 'Recognition',
        description: 'Matching detected faces against a small known-faces database.',
      },
    ],
  },
];

export const posts: Post[] = [
  { slug: 'first-post', title: 'My First Post', publishedAt: '2024-03-01' },
  { slug: 'second-post', title: 'Thoughts on TypeScript', publishedAt: '2024-01-15' },
];

export const featuredProjects = projects.filter((p) => p.featured);

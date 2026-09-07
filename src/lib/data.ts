export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: { url: string; alt: string };
  screenshots?: { url: string; alt: string }[];
  screenshotAspect?: string;
  stackedMedia?: boolean;
  links?: { label: string; url: string; icon?: string }[];
  featured?: boolean;
  // Detail page content
  longDescription?: string;
  realWorldValue?: string;
  features?: { title: string; description: string }[];
  heroBadge?: { label: string; value: number; suffix?: string };
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
  location?: string;
  url?: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  location?: string;
  gpa?: string;
  coursework?: string[];
  url?: string;
};

export type LeadershipRole = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
};

// ─── Education ──────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    school: 'Boston College',
    degree: 'B.S. in Computer Science and Mathematics',
    period: 'Expected May 2028',
    location: 'Chestnut Hill, MA',
    gpa: '3.6/4.0',
    coursework: ['Data Structures & Algorithms', 'Operating Systems', 'Networks', 'Software Engineering'],
    url: 'https://www.bc.edu',
  },
];

// ─── Experience ─────────────────────────────────────────────────────────────
// Most recent first — the home page shows the first 3.

export const experiences: Experience[] = [
  {
    company: 'Liberty Mutual',
    role: 'Software Engineer Intern',
    period: 'May 2026 – Jul 2026',
    location: 'Boston, MA',
    url: 'https://www.libertymutual.com',
    bullets: [
      'Built end-to-end AWS RDS snapshot infrastructure using KMS encryption, enabling database recovery/recreation',
      'Shipped a Python microservice on AWS ECS with Datadog APM, reducing debugging time by 23%',
      'Containerized application tests with Docker, resolving dependency conflicts that cut CI build failure rate by 72%',
      'Improved DevOps workflows, restoring code-quality reporting across 39 repos by debugging GitHub Actions CI/CD',
    ],
  },
  {
    company: 'Boston College Physics Department',
    role: 'Undergraduate Research Fellow',
    period: 'Sep 2025 – Feb 2026',
    location: 'Chestnut Hill, MA',
    url: 'https://www.bc.edu/bc-web/schools/mcas/departments/physics.html',
    bullets: [
      'Automated 2D bilayer simulation pipelines with Python and Bash to generate training data for ML models',
      'Trained a PyTorch CNN to identify structural patterns relating to superconductivity, achieving 73% accuracy',
    ],
  },
  {
    company: 'NYC Department of Design and Construction',
    role: 'Software Engineer Intern',
    period: 'Jun 2025 – Aug 2025',
    location: 'Queens, NY',
    url: 'https://www.nyc.gov/ddc',
    bullets: [
      'Engineered an Angular internal contract dashboard integrated with a REST API, reducing load time by 42%',
      'Debugged API data with Postman and SQL stored procedures, ensuring 100% consistency across backend and UI',
    ],
  },
  {
    company: 'Flora Health',
    role: 'Data & Analytics Intern',
    period: 'May 2025 – Aug 2025',
    location: 'Part-Time, Remote',
    bullets: [
      'Streamlined Alteryx workflows to clean multi-source healthcare campaign data, improving data consistency',
      'Built an AI-powered NLP summarizer linking pharma news with campaign metrics, reducing reporting time 60%',
    ],
  },
];

// ─── Leadership & Involvement ───────────────────────────────────────────────

export const leadership: LeadershipRole[] = [
  {
    org: 'AWS Cloud Club',
    role: 'Co-Founder; Core Team',
    period: 'Jan 2026 – Present',
    bullets: [
      "Co-founded BC's AWS Cloud Club from scratch, growing to 40+ active members within the first semester",
      'Organized hands-on workshops covering EC2, S3, Lambda, and IAM, giving students practical cloud experience',
    ],
  },
  {
    org: 'Computer Science Society',
    role: 'Technology Team Lead',
    period: 'Feb 2025 – Present',
    bullets: [
      'Led a cross-functional student open-source team, establishing code review standards for production deployments',
      'Built bccss.dev + Hack the Heights (React/Next.js, Tailwind), improving performance & attracting 200+ students',
    ],
  },
];

// ─── Technical Skills ───────────────────────────────────────────────────────

export const technicalSkills = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java', 'C/C++', 'HTML/CSS'],
  Frameworks: ['React', 'Next.js', 'Node.js', 'Django', 'React Native', 'Angular', 'Express.js', 'Tailwind'],
  Tools: ['Git', 'AWS', 'Docker', 'Snowflake', 'Datadog', 'Postman', 'Expo'],
  Certifications: ['AWS Certified Cloud Practitioner'],
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'job-pulse',
    title: 'Job Pulse',
    description:
      'A Discord bot (with optional SMS) that watches GitHub job-board repos like SimplifyJobs and pings you the instant a new role is posted. No more refreshing README tables hoping to catch one before it fills up.',
    date: '2026-06-01',
    tags: ['JavaScript', 'Node.js', 'Discord.js', 'Twilio', 'SQLite', 'Express'],
    featured: true,
    gradientVars: ['--mint', '--butter', '--coral', '--mark'],
    image: { url: '/projects/jobpulse/demo.png', alt: 'Job Pulse Discord bot posting new internship alerts from SimplifyJobs and Peak in a #job-alerts channel' },
    screenshots: [
      { url: '/projects/jobpulse/desc.png', alt: 'Job Pulse\'s Discord app profile: "Get alerted when jobs are posted to github repos so you can get rejected faster!"' },
      { url: '/projects/jobpulse/demo.png', alt: 'Job Pulse Discord bot posting new internship alerts from SimplifyJobs and Peak in a #job-alerts channel' },
    ],
    screenshotAspect: '367 / 576',
    longDescription:
      "Boards like SimplifyJobs/Summer2026-Internships and speedyapply/2027-SWE-College-Jobs are just markdown tables in a GitHub README, updated by maintainers dozens of times a day. There's no RSS feed, no API, and the best roles fill up within hours of posting. Job Pulse watches the underlying repo instead of the page: it polls for new commits, diffs the job table to find rows that weren't there before, and pushes an alert the moment one appears, over a shared Discord bot you can add to your own server in one click, or SMS and a web dashboard if you self-host.",
    features: [
      {
        title: 'One-click Discord bot',
        description: 'Add the shared bot to your server and run /subscribe repo:<repo>; alerts for new postings show up in your channel automatically, no hosting required.',
      },
      {
        title: 'Self-hosted SMS',
        description: 'Run your own instance to get alerts as texts via Twilio, plus your own independent copy of the multi-server Discord bot.',
      },
      {
        title: '10-minute polling with dedup',
        description: 'Checks watched repos on a cron schedule (default every 10 minutes), diffs the README against the last commit, and skips anything already seen in the SQLite database.',
      },
      {
        title: 'Web dashboard',
        description: 'Add or pause repos, trigger a manual poll, and view recent alerts from a small Express-served dashboard.',
      },
      {
        title: 'Multi-format parsing',
        description: 'Handles both the SimplifyJobs and SpeedyApply markdown table formats used across popular internship and new-grad boards.',
      },
    ],
    links: [
      { label: 'View on GitHub', url: 'https://github.com/austinchan-orsini/gh-job-alerts', icon: 'github' },
    ],
  },

  {
    slug: 'streak',
    title: 'Streak',
    description:
      'A 75 Hard tracking web app: a daily checklist for the core rules plus your own custom tasks, a color-coded calendar, and a confetti burst every time you check something off.',
    date: '2026-07-01',
    tags: ['TypeScript', 'React', 'Firebase', 'Framer Motion'],
    featured: true,
    gradientVars: ['--butter', '--coral', '--mark', '--mint'],
    image: { url: '/projects/streak/daily-progress.png', alt: 'Streak daily progress screen with core tasks and custom tasks side by side' },
    screenshots: [
      { url: '/projects/streak/landing.png', alt: 'Streak landing page: "build the habit, every single day"' },
      { url: '/projects/streak/daily-progress.png', alt: 'Daily progress screen showing core tasks and custom tasks with a completion bar' },
      { url: '/projects/streak/calendar.png', alt: 'Calendar view color-coded by day: purple for a perfect day, green for core tasks done' },
      { url: '/projects/streak/edit.png', alt: 'Edit day modal for going back and updating a past day’s checklist' },
    ],
    screenshotAspect: '1917 / 867',
    stackedMedia: true,
    longDescription:
      "Streak is a web app for running the 75 Hard challenge: two workouts, a gallon of water, 10 pages, sticking to your diet, and a progress photo, every day for 75 days straight. I built it because the spreadsheet I was using to track my own run wasn't fun to look at. On top of the six core rules you can add your own tasks with their own cadence, tag workouts by type, and go back and edit any past day from the calendar. It's backed by Firebase, so your run follows you across devices instead of living in one browser tab.",
    realWorldValue:
      "Habit trackers live or die on whether you actually open them the next day, and most people fall off 75 Hard, or any streak, not because the rules are hard, but because they lose track of where they stand. A calendar you can scan in two seconds, progress that follows you from your phone to your laptop, and a small hit of feedback when you check something off are the difference between a tracker you keep using and a spreadsheet you abandon by week two. It's also a full product rather than just a UI: real auth, sync, and persistence through Firebase, which is a different problem than laying out a checklist.",
    features: [
      {
        title: 'Core tasks plus your own',
        description: 'The six 75 Hard rules are built in, and you can add custom tasks on top: daily, weekdays only, or whatever cadence you set.',
      },
      {
        title: 'Tap to complete, with confetti',
        description: 'Checking off a task fires a canvas-confetti burst, and clearing every task for the day triggers a bigger celebration.',
      },
      {
        title: 'Workout tagging',
        description: 'Tag each workout with a type: run, gym, yoga, swim, hike, and a handful more, or add your own.',
      },
      {
        title: 'Calendar heatmap',
        description: 'A full month view color-coded by how the day went, so you can see your whole run, and any misses, at a glance.',
      },
      {
        title: 'Edit past days',
        description: 'Forgot to log something? Open any day from the calendar and update its checklist after the fact.',
      },
      {
        title: 'Synced with Firebase',
        description: 'Sign in and your progress follows you across devices instead of living in one browser tab.',
      },
    ],
    links: [
      { label: 'View on GitHub', url: 'https://github.com/austinchan-orsini/streak', icon: 'github' },
      { label: 'Live Demo', url: 'https://streak-pied.vercel.app', icon: 'external' },
    ],
  },

  {
    slug: 'zetamac',
    title: 'Zetamac Stats Tracker',
    description:
      'A Chrome extension with 200+ installs that injects a full analytics dashboard into Zetamac, the mental-math game: per-operation breakdowns, carry/borrow detection, and score history charts.',
    date: '2026-01-01',
    tags: ['JavaScript', 'Chrome Extension', 'Manifest V3', 'Chart.js'],
    featured: false,
    gradientVars: ['--coral', '--mark', '--mint', '--butter'],
    image: { url: '/projects/zetamac/overview.png', alt: 'Zetamac Stats Tracker overview panel showing games played, average score, top scores, and a score history chart' },
    screenshots: [
      { url: '/projects/zetamac/overview.png', alt: 'Overview tab: lifetime games played, average score, last game, top 3 scores, and a score-history chart with running average' },
      { url: '/projects/zetamac/subtraction.png', alt: 'Subtraction tab: average response time compared between problems that require borrowing and problems that don’t' },
      { url: '/projects/zetamac/division.png', alt: 'Division tab: average response time for every divisor, color-coded green to red from fastest to slowest' },
    ],
    heroBadge: { label: 'Chrome Users', value: 200, suffix: '+' },
    longDescription:
      "I wanted to know which arithmetic I was actually slow at instead of just watching my Zetamac score go up. This started as a content script that logs every question and answer, and grew into a full stats dashboard the extension injects right next to the game: an overview with lifetime and rolling-window views, separate tabs for each operation, and color-coded breakdowns down to the individual number (which divisors trip me up, which times tables are automatic, whether a subtraction problem needs borrowing). It's live on the Chrome Web Store with 200+ installs.",
    realWorldValue:
      "Most people practicing mental math just watch a single score go up or down. There's no way to tell if you're actually improving or just having a good day. Turning that into structured data, down to the specific operation and number, is what makes practice targeted instead of random: you can see you're consistently slow on ÷9 or borrow-heavy subtraction and drill exactly that instead of guessing. It's also a real example of shipping a browser extension end-to-end: reading and reacting to a third-party page's DOM, persisting state locally, and getting it in front of 200+ real users on the Chrome Web Store instead of leaving it as a script only I ever ran.",
    features: [
      {
        title: 'Stats panel right in the page',
        description: "Injects a panel next to the game itself: games played, average score, last game, top 3 scores, and you can flip between lifetime stats and just your last 10 or 50 games.",
      },
      {
        title: 'Score history chart',
        description: "A Chart.js bar chart of every game you've played with a running average line drawn through it, so you can actually tell if you're improving.",
      },
      {
        title: 'Broken down by operation',
        description: 'Separate tabs for +, −, ×, ÷ show your average time on every specific number, color-coded green to red. Turns out I\'m just bad at dividing by 9.',
      },
      {
        title: 'Carry and borrow detection',
        description: 'Every addition and subtraction problem gets tagged by whether it needed a carry or borrow, with the average time for each side by side.',
      },
      {
        title: 'Everything stays local',
        description: 'No account, no backend. Games are saved with chrome.storage.local and never leave your browser.',
      },
    ],
    links: [
      { label: 'Add to Chrome', url: 'https://chromewebstore.google.com/detail/zetamac-stats-tracker/jeciaodfiphpofecfoldellkdlhlmffh', icon: 'chrome' },
      { label: 'View on GitHub', url: 'https://github.com/austinchan-orsini/zetamac', icon: 'github' },
    ],
  },

  {
    slug: 'padly',
    title: 'Padly',
    description:
      'A Google-authenticated housing marketplace for Boston College students: map-based listings, real-time chat, and roommate matching, built with a 9-person team for a software engineering course.',
    date: '2026-04-01',
    tags: ['Django', 'Python', 'Django Channels', 'Team Project'],
    featured: false,
    gradientVars: ['--mark', '--mint', '--butter', '--coral'],
    image: { url: '/projects/padly/listings.jpg', alt: 'Padly listings page with a map of nearby sublets and a filterable list view' },
    screenshots: [
      { url: '/projects/padly/home.jpg', alt: 'Padly landing page: "Find a place near campus," rentals and subleases near Boston College' },
      { url: '/projects/padly/listings.jpg', alt: 'Listings page with a MapLibre map of nearby sublets alongside a filterable list view' },
      { url: '/projects/padly/roommates.png', alt: 'Roommate matching page with group posts, match percentage, and a message-lead button' },
      { url: '/projects/padly/messages.png', alt: 'Real-time messaging inbox between roommate matches' },
      { url: '/projects/padly/dashboard.png', alt: 'Account dashboard with listings, conversations, saved people, and a document library' },
    ],
    screenshotAspect: '8 / 5',
    stackedMedia: true,
    longDescription:
      "Padly was a semester-long team project for my software engineering course (CSCI3356): a housing and subletting marketplace for Boston College students, built by a 9-person team over 269 commits. It's Google-OAuth-only with no password fallback, with role-based access for students, realtors, moderators, support, and admins; real-time chat over WebSockets via Django Channels; verified-address listings geocoded through the Geoapify API and browsable on a map; and a full moderation and reporting pipeline behind it, backed by roughly 440 automated tests. My own commits were a small slice of that, mostly the listing-creation form fields and fixes to the dashboard and profile toggle, while the team collectively built out auth, messaging, moderation, and the test suite.",
    realWorldValue:
      "Off-campus subletting at BC mostly happens through sprawling Facebook groups and group chats with no verification: no way to know if a listing address is real, who you're actually messaging, or whether a \"landlord\" is who they say they are. Padly ties every account to a Google-verified BC identity, geocodes listings against a real address before they go live, and gives moderators an actual reporting and investigation workflow instead of hoping people self-police a group chat. Trust and verification at that scale is the kind of infrastructure problem a class project doesn't usually get to touch, which is what made it worth a team's whole semester.",
    features: [
      {
        title: 'Google-OAuth-only accounts',
        description: 'No password fallback, with role-based access for students, realtors, moderators, support, and admins.',
      },
      {
        title: 'Real-time chat',
        description: 'Built on Django Channels and Daphne with a custom WebSocket consumer that only lets listing participants message each other.',
      },
      {
        title: 'Verified-address listings',
        description: 'Addresses are geocoded through the Geoapify API and browsable on a MapLibre map, with a list-view fallback.',
      },
      {
        title: 'Roommate matching',
        description: 'Post or browse roommate group listings with a match score, and message a lead directly from the post.',
      },
      {
        title: 'Moderation and reporting',
        description: 'Reviews, reports, and an admin investigation workspace with full audit logging behind every action.',
      },
      {
        title: 'Tested and CI-gated',
        description: 'About 440 backend tests plus a Playwright end-to-end suite, run in GitHub Actions alongside linting and migration-drift checks.',
      },
    ],
    links: [
      { label: 'View on GitHub', url: 'https://github.com/CSCI3356-Spring2026/Vibecoders', icon: 'github' },
    ],
  },

  {
    slug: 'nibl',
    title: 'Nibl',
    description:
      'A cooking app I\'m building on the side: recipe discovery and meal planning. Private repo, still early.',
    date: '2026-07-01',
    tags: ['Personal Project', 'Work in Progress'],
    featured: false,
    gradientVars: ['--coral', '--mint', '--mark', '--butter'],
    longDescription:
      "Nibl is a personal side project: a cooking app for recipe discovery and meal planning. It's still early and living in a private repo while I figure out the shape of it, so consider this card a placeholder until it's further along.",
    features: [
      {
        title: 'Recipe Discovery',
        description: 'Find and save recipes worth cooking again.',
      },
      {
        title: 'Meal Planning',
        description: 'Plan out meals for the week ahead.',
      },
    ],
  },

  {
    slug: 'facial-recognition',
    title: 'Facial Recognition',
    description:
      'An experiment in real-time facial detection and recognition. Placeholder card: write-up coming once there\'s more to show.',
    date: '2026-08-01',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    featured: false,
    gradientVars: ['--butter', '--mark', '--coral', '--mint'],
    longDescription:
      "This is a placeholder for a facial recognition project I'm still working through: real-time face detection, landmarks, and matching against a small known-faces database. Details and a real write-up go here once it's further along.",
    features: [
      {
        title: 'Face Detection',
        description: 'Real-time detection from a webcam feed.',
      },
      {
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

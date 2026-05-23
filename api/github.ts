import type { VercelRequest, VercelResponse } from '@vercel/node';

const USERNAME = 'austinchan-orsini';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const eventsRes = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=30`,
      { headers }
    );

    if (!eventsRes.ok) {
      return res.status(eventsRes.status).json({ error: 'GitHub API error' });
    }

    const events = await eventsRes.json() as {
      type: string;
      repo: { name: string };
      payload: { commits?: { message: string; sha: string }[]; head?: string };
      created_at: string;
    }[];

    const pushEvents = events
      .filter((e) => e.type === 'PushEvent')
      .slice(0, 5);

    const commits = await Promise.all(
      pushEvents.map(async (e) => {
        // use inline commits if present, otherwise fetch by head SHA
        const inlineCommit = e.payload.commits?.[0];
        if (inlineCommit) {
          return {
            message: inlineCommit.message.split('\n')[0].slice(0, 72),
            repo: e.repo.name.replace(`${USERNAME}/`, ''),
            repoUrl: `https://github.com/${e.repo.name}`,
            sha: inlineCommit.sha.slice(0, 7),
            date: e.created_at,
          };
        }

        const sha = e.payload.head;
        if (!sha) return null;

        try {
          const commitRes = await fetch(
            `https://api.github.com/repos/${e.repo.name}/commits/${sha}`,
            { headers }
          );
          if (!commitRes.ok) return null;
          const commit = await commitRes.json() as { commit: { message: string }; sha: string };
          return {
            message: commit.commit.message.split('\n')[0].slice(0, 72),
            repo: e.repo.name.replace(`${USERNAME}/`, ''),
            repoUrl: `https://github.com/${e.repo.name}`,
            sha: sha.slice(0, 7),
            date: e.created_at,
          };
        } catch {
          return null;
        }
      })
    );

    return res.json(commits.filter(Boolean));
  } catch (err) {
    console.error('GitHub API error:', err);
    return res.status(500).json({ error: 'Failed to fetch GitHub activity' });
  }
}

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

    // The public events feed is unreliable (often empty even with recent
    // pushes), so pull the most recently pushed repos and read each one's
    // latest commit directly instead.
    const reposRes = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      { headers }
    );

    if (!reposRes.ok) {
      return res.status(reposRes.status).json({ error: 'GitHub API error' });
    }

    const repos = await reposRes.json() as {
      name: string;
      fork: boolean;
      default_branch: string;
      pushed_at: string;
    }[];

    const topRepos = repos.filter((r) => !r.fork).slice(0, 3);

    const commits = await Promise.all(
      topRepos.map(async (repo) => {
        try {
          const commitRes = await fetch(
            `https://api.github.com/repos/${USERNAME}/${repo.name}/commits/${repo.default_branch}`,
            { headers }
          );
          if (!commitRes.ok) return null;

          const commit = await commitRes.json() as {
            sha: string;
            html_url: string;
            commit: { message: string };
            stats?: { additions: number; deletions: number };
          };

          return {
            message: commit.commit.message.split('\n')[0].slice(0, 72),
            repo: repo.name,
            repoUrl: `https://github.com/${USERNAME}/${repo.name}`,
            commitUrl: commit.html_url,
            sha: commit.sha.slice(0, 7),
            date: repo.pushed_at,
            additions: commit.stats?.additions,
            deletions: commit.stats?.deletions,
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

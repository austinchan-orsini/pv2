import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  const data = await res.json() as { access_token?: string; error?: string; error_description?: string };
  console.log('token response:', JSON.stringify(data));
  if (!data.access_token) throw new Error(data.error_description ?? data.error ?? 'No access token');
  return data.access_token;
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  console.log('CLIENT_ID:', CLIENT_ID ? CLIENT_ID.slice(0, 6) + '...' : 'MISSING');
  console.log('CLIENT_SECRET:', CLIENT_SECRET ? CLIENT_SECRET.slice(0, 6) + '...' : 'MISSING');

  try {
    const access_token = await getAccessToken();

    // Try currently playing first
    const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    console.log('currently-playing status:', nowRes.status);

    if (nowRes.status === 200) {
      const now = await nowRes.json() as {
        is_playing: boolean;
        item: { name: string; artists: { name: string }[]; album: { images: { url: string }[] }; external_urls: { spotify: string } };
      };
      console.log('currently-playing item:', now.item?.name ?? 'null');
      if (now.item) {
        return res.json({
          isPlaying: now.is_playing,
          title: now.item.name,
          artist: now.item.artists.map((a) => a.name).join(', '),
          albumImageUrl: now.item.album.images[0]?.url ?? null,
          songUrl: now.item.external_urls.spotify,
        });
      }
    }

    // Fall back to recently played
    const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const recent = await recentRes.json() as {
      items: { track: { name: string; artists: { name: string }[]; album: { images: { url: string }[] }; external_urls: { spotify: string } } }[];
    };

    console.log('recently-played status:', recentRes.status);
    console.log('recently-played raw:', JSON.stringify(recent));

    const track = recent.items?.[0]?.track;
    if (!track) {
      return res.status(404).json({ error: 'No tracks found', debug: recent });
    }

    return res.json({
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      albumImageUrl: track.album.images[0]?.url ?? null,
      songUrl: track.external_urls.spotify,
    });
  } catch (err) {
    console.error('Spotify API error:', err);
    return res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
}

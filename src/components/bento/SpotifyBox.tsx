import { useEffect, useState } from 'react';
import { IconMusic, IconPlayerPlay } from '@tabler/icons-react';

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string | null;
  songUrl: string;
}

export default function SpotifyBox() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/spotify')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: SpotifyTrack) => setTrack(data))
      .catch(() => setError(true));
  }, []);

  return (
    <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg">
      <h3 className="text-text mb-3 flex items-center gap-2 text-sm font-semibold">
        <IconMusic size={16} className="text-accent" />
        {track?.isPlaying ? 'Now Playing' : 'Last Played'}
      </h3>

      {error || (!track && !error === false) ? (
        <div className="bg-surface0 flex flex-col items-center justify-center rounded-lg p-6 text-center">
          <p className="text-subtext0 text-sm">Couldn't load Spotify</p>
        </div>
      ) : !track ? (
        <div className="bg-surface0 animate-pulse flex items-center gap-3 rounded-lg p-3">
          <div className="bg-surface1 size-12 flex-shrink-0 rounded" />
          <div className="flex-1 space-y-2">
            <div className="bg-surface1 h-3 w-3/4 rounded" />
            <div className="bg-surface1 h-3 w-1/2 rounded" />
          </div>
        </div>
      ) : (
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-surface0 hover:bg-surface1 group flex items-center gap-3 rounded-lg p-3 transition-colors"
        >
          {track.albumImageUrl ? (
            <img
              src={track.albumImageUrl}
              alt={track.title}
              className="size-12 flex-shrink-0 rounded object-cover"
            />
          ) : (
            <div className="bg-surface1 text-subtext1 size-12 flex-shrink-0 rounded flex items-center justify-center">
              <IconMusic size={20} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-text group-hover:text-accent truncate text-sm font-medium transition-colors">
              {track.title}
            </p>
            <p className="text-subtext0 truncate text-xs">{track.artist}</p>
          </div>
          {track.isPlaying && (
            <IconPlayerPlay size={14} className="text-accent flex-shrink-0" />
          )}
        </a>
      )}
    </div>
  );
}

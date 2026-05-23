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
    <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg flex flex-col h-full">
      <h3 className="text-text mb-3 flex items-center gap-2 text-sm font-semibold shrink-0">
        <IconMusic size={16} className="text-accent" />
        {track?.isPlaying ? 'Now Playing' : 'Last Played'}
        {track?.isPlaying && <IconPlayerPlay size={14} className="text-accent" />}
      </h3>

      <a
        href={track?.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col flex-1 min-h-0"
      >
        {/* album art vertically centered */}
        <div className="flex-1 flex items-center justify-center">
        <div className="size-24 rounded-lg overflow-hidden bg-surface1">
          {error ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-subtext0 text-sm">Couldn't load Spotify</p>
            </div>
          ) : !track ? (
            <div className="animate-pulse h-full w-full bg-surface1" />
          ) : track.albumImageUrl ? (
            <img
              src={track.albumImageUrl}
              alt={track.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <IconMusic size={32} className="text-subtext1" />
            </div>
          )}
        </div>
        </div>

        {/* song info bottom-left */}
        {track && (
          <div className="mt-3 min-w-0 shrink-0">
            <p className="text-text group-hover:text-accent truncate text-sm font-medium transition-colors">
              {track.title}
            </p>
            <p className="text-subtext0 truncate text-xs">{track.artist}</p>
          </div>
        )}
      </a>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { IconMusic } from '@tabler/icons-react';

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
    <div className="border-hairline bg-paper rounded-xl border p-4 flex flex-col aspect-square">
      <h3 className="text-ink mb-3 flex items-center gap-2 text-sm font-semibold shrink-0">
        <IconMusic size={16} className="text-mark" />
        {track?.isPlaying ? 'Now Playing' : 'Last Played'}
      </h3>

      <a
        href={track?.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col flex-1 min-h-0"
      >
        {/* album art vertically centered */}
        <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="aspect-square w-2/3 max-w-40 rounded-lg overflow-hidden bg-bar-track">
          {error ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-ink-secondary text-sm">Couldn't load Spotify</p>
            </div>
          ) : !track ? (
            <div className="animate-pulse h-full w-full bg-bar-track" />
          ) : track.albumImageUrl ? (
            <img
              src={track.albumImageUrl}
              alt={track.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <IconMusic size={32} className="text-ink-muted" />
            </div>
          )}
        </div>
        </div>

        {/* song info bottom-left */}
        {track && (
          <div className="mt-3 min-w-0 shrink-0">
            <p className="text-ink group-hover:text-mark truncate text-sm font-medium transition-colors">
              {track.title}
            </p>
            <p className="text-ink-secondary truncate text-xs">{track.artist}</p>
          </div>
        )}
      </a>
    </div>
  );
}

import { spotifyClient } from '@gabfon/spotify';
import { useQuery } from '@tanstack/react-query';
import { parseAsString, useQueryState } from 'nuqs';

/**
 * Factory for creating Spotify-related hooks.
 *
 * @param hookName - The name of the hook to create.
 * @returns The created hook.
 */
export const spotifyHooksFactory = (hookName: string) => {
  switch (hookName) {
    case 'useCurrentlyPlaying':
      return () =>
        useQuery({
          queryKey: ['spotify-currently-playing'],
          queryFn: () => spotifyClient.getCurrentlyPlaying(),
        });
    case 'useRecentlyPlayed':
      return (limit = 50) =>
        useQuery({
          queryKey: ['spotify-recently-played', limit],
          queryFn: () => spotifyClient.getRecentlyPlayed(limit),
        });
    case 'useTopTracks':
      return (
        timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
        limit = 50
      ) =>
        useQuery({
          queryKey: ['spotify-top-tracks', timeRange, limit],
          queryFn: () => spotifyClient.getTopTracks(timeRange, limit),
        });
    case 'useTopArtists':
      return (
        timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
        limit = 50
      ) =>
        useQuery({
          queryKey: ['spotify-top-artists', timeRange, limit],
          queryFn: () => spotifyClient.getTopArtists(timeRange, limit),
        });
    case 'useTrack':
      return (trackId: string) =>
        useQuery({
          queryKey: ['spotify-track', trackId],
          queryFn: () => spotifyClient.getTrack(trackId),
          enabled: !!trackId,
        });
    case 'useArtist':
      return (artistId: string) =>
        useQuery({
          queryKey: ['spotify-artist', artistId],
          queryFn: () => spotifyClient.getArtist(artistId),
          enabled: !!artistId,
        });
    case 'useAudioFeatures':
      return (trackIds: string[]) =>
        useQuery({
          queryKey: ['spotify-audio-features', trackIds],
          queryFn: () => spotifyClient.getAudioFeatures(trackIds),
          enabled: !!trackIds && trackIds.length > 0,
        });
    case 'useSearchTracks':
      return (limit = 20) => {
        const [query] = useQueryState('q', parseAsString.withDefault(''));
        return useQuery({
          queryKey: ['spotify-search-tracks', query, limit],
          queryFn: () => spotifyClient.searchTracks(query, limit),
          enabled: !!query,
        });
      };
    case 'useSearchArtists':
      return (limit = 20) => {
        const [query] = useQueryState('q', parseAsString.withDefault(''));
        return useQuery({
          queryKey: ['spotify-search-artists', query, limit],
          queryFn: () => spotifyClient.searchArtists(query, limit),
          enabled: !!query,
        });
      };
    default:
      throw new Error(`Invalid hook name: ${hookName}`);
  }
};

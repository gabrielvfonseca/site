import { spotifyHooksFactory } from './use-spotify';

export const useCurrentlyPlaying = spotifyHooksFactory('useCurrentlyPlaying');
export const useRecentlyPlayed = spotifyHooksFactory('useRecentlyPlayed');
export const useTopTracks = spotifyHooksFactory('useTopTracks');
export const useTopArtists = spotifyHooksFactory('useTopArtists');
export const useTrack = spotifyHooksFactory('useTrack');
export const useArtist = spotifyHooksFactory('useArtist');
export const useAudioFeatures = spotifyHooksFactory('useAudioFeatures');
export const useSearchTracks = spotifyHooksFactory('useSearchTracks');
export const useSearchArtists = spotifyHooksFactory('useSearchArtists');

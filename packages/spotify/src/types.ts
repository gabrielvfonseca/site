import { z } from 'zod';

/**
 * Spotify track information
 */
export const SpotifyTrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  artists: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
      uri: z.string(),
    })
  ),
  album: z.object({
    name: z.string(),
    images: z.array(
      z.object({
        url: z.string(),
        height: z.number().nullable(),
        width: z.number().nullable(),
      })
    ),
    release_date: z.string(),
  }),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_urls: z.object({
    spotify: z.string(),
  }),
  uri: z.string(),
  preview_url: z.string().nullable(),
});

/**
 * Spotify currently playing context
 */
export const SpotifyCurrentlyPlayingSchema = z.object({
  timestamp: z.number(),
  progress_ms: z.number().nullable(),
  is_playing: z.boolean(),
  item: SpotifyTrackSchema.nullable(),
  currently_playing_type: z.string(),
  actions: z.object({
    disallows: z.record(z.boolean()),
  }),
});

/**
 * Spotify recent track with played_at timestamp
 */
export const SpotifyRecentTrackSchema = z.object({
  track: SpotifyTrackSchema,
  played_at: z.string(),
  context: z
    .object({
      type: z.string(),
      uri: z.string(),
      external_urls: z.object({
        spotify: z.string(),
      }),
    })
    .nullable(),
});

/**
 * Spotify artist information
 */
export const SpotifyArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  images: z.array(
    z.object({
      url: z.string(),
      height: z.number().nullable(),
      width: z.number().nullable(),
    })
  ),
  followers: z.object({
    total: z.number(),
  }),
  genres: z.array(z.string()),
  popularity: z.number(),
  external_urls: z.object({
    spotify: z.string(),
  }),
  uri: z.string(),
});

/**
 * Spotify top tracks
 */
export const SpotifyTopTracksSchema = z.object({
  items: z.array(SpotifyTrackSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  previous: z.string().nullable(),
  next: z.string().nullable(),
});

/**
 * Spotify top artists
 */
export const SpotifyTopArtistsSchema = z.object({
  items: z.array(SpotifyArtistSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  previous: z.string().nullable(),
  next: z.string().nullable(),
});

/**
 * Spotify audio features
 */
export const SpotifyAudioFeaturesSchema = z.object({
  acousticness: z.number(),
  danceability: z.number(),
  energy: z.number(),
  instrumentalness: z.number(),
  liveness: z.number(),
  loudness: z.number(),
  speechiness: z.number(),
  valence: z.number(),
  tempo: z.number(),
  key: z.number(),
  mode: z.number(),
  time_signature: z.number(),
  duration_ms: z.number(),
  id: z.string(),
  uri: z.string(),
});

/**
 * API response wrapper
 */
export const SpotifyApiResponseSchema = z.object({
  data: z.unknown(),
  status: z.number(),
  headers: z.record(z.string()),
});

/**
 * Export types
 */
export type SpotifyTrack = z.infer<typeof SpotifyTrackSchema>;
export type SpotifyCurrentlyPlaying = z.infer<
  typeof SpotifyCurrentlyPlayingSchema
>;
export type SpotifyRecentTrack = z.infer<typeof SpotifyRecentTrackSchema>;
export type SpotifyArtist = z.infer<typeof SpotifyArtistSchema>;
export type SpotifyTopTracks = z.infer<typeof SpotifyTopTracksSchema>;
export type SpotifyTopArtists = z.infer<typeof SpotifyTopArtistsSchema>;
export type SpotifyAudioFeatures = z.infer<typeof SpotifyAudioFeaturesSchema>;
export type SpotifyApiResponse = z.infer<typeof SpotifyApiResponseSchema>;

import { keys } from './keys';
import {
  type SpotifyApiResponse,
  SpotifyApiResponseSchema,
  type SpotifyArtist,
  type SpotifyAudioFeatures,
  type SpotifyCurrentlyPlaying,
  type SpotifyRecentTrack,
  type SpotifyTopArtists,
  type SpotifyTopTracks,
  type SpotifyTrack,
} from './types';

const MS_PER_SECOND = 1000;
const AUTH_BUFFER_MS = 60_000;

/**
 * Base Spotify API client with authentication
 */
export class SpotifyClient {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly refreshToken?: string;
  private accessToken: string | null = null;
  private tokenExpiry = 0;

  constructor() {
    const env = keys();
    this.clientId = env.SPOTIFY_CLIENT_ID;
    this.clientSecret = env.SPOTIFY_CLIENT_SECRET;
    this.refreshToken = env.SPOTIFY_REFRESH_TOKEN;
  }

  /**
   * Get access token using client credentials flow
   */
  private async getAccessToken(): Promise<string> {
    // Check if current token is still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const credentials = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString('base64');

    const body = new URLSearchParams();
    if (this.refreshToken) {
      body.append('grant_type', 'refresh_token');
      body.append('refresh_token', this.refreshToken);
    } else {
      body.append('grant_type', 'client_credentials');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        authorization: `Basic ${credentials}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(
        `Spotify auth error: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as {
      // biome-ignore lint/style/useNamingConvention: API response property
      access_token: string;
      // biome-ignore lint/style/useNamingConvention: API response property
      expires_in: number;
    };
    this.accessToken = data.access_token;
    this.tokenExpiry =
      Date.now() + data.expires_in * MS_PER_SECOND - AUTH_BUFFER_MS;

    return this.accessToken;
  }

  /**
   * Make authenticated request to Spotify API
   */
  private async makeRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<SpotifyApiResponse> {
    const url = `${this.baseUrl}${endpoint}`;

    const token = await this.getAccessToken();
    const headers = {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `Spotify API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const result = SpotifyApiResponseSchema.parse({
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      }) as SpotifyApiResponse;

      return result;
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: Logging API failure is necessary
      console.error(`Spotify API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get currently playing track
   */
  async getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlaying | null> {
    try {
      const response = await this.makeRequest('/me/player/currently-playing');
      return response.data as SpotifyCurrentlyPlaying;
    } catch {
      // Return null if no track is playing (204 status)
      return null;
    }
  }

  /**
   * Get recently played tracks
   */
  async getRecentlyPlayed(limit = 50): Promise<SpotifyRecentTrack[]> {
    const response = await this.makeRequest(
      `/me/player/recently-played?limit=${limit}`
    );
    const result = response.data as { items: SpotifyRecentTrack[] };
    return result.items;
  }

  /**
   * Get user's top tracks
   */
  async getTopTracks(
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
    limit = 50
  ): Promise<SpotifyTopTracks> {
    const response = await this.makeRequest(
      `/me/top/tracks?time_range=${timeRange}&limit=${limit}`
    );
    return response.data as SpotifyTopTracks;
  }

  /**
   * Get user's top artists
   */
  async getTopArtists(
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
    limit = 50
  ): Promise<SpotifyTopArtists> {
    const response = await this.makeRequest(
      `/me/top/artists?time_range=${timeRange}&limit=${limit}`
    );
    return response.data as SpotifyTopArtists;
  }

  /**
   * Get track details
   */
  async getTrack(trackId: string): Promise<SpotifyTrack> {
    const response = await this.makeRequest(`/tracks/${trackId}`);
    return response.data as SpotifyTrack;
  }

  /**
   * Get artist details
   */
  async getArtist(artistId: string): Promise<SpotifyArtist> {
    const response = await this.makeRequest(`/artists/${artistId}`);
    return response.data as SpotifyArtist;
  }

  /**
   * Get audio features for tracks
   */
  async getAudioFeatures(trackIds: string[]): Promise<SpotifyAudioFeatures[]> {
    const response = await this.makeRequest(
      `/audio-features?ids=${trackIds.join(',')}`
    );
    const result = response.data as {
      // biome-ignore lint/style/useNamingConvention: API response property
      audio_features: SpotifyAudioFeatures[];
    };
    return result.audio_features;
  }

  /**
   * Search for tracks
   */
  async searchTracks(query: string, limit = 20): Promise<SpotifyTrack[]> {
    const response = await this.makeRequest(
      `/search?q=${encodeURIComponent(query)}&type=tracks&limit=${limit}`
    );
    const result = response.data as { tracks: { items: SpotifyTrack[] } };
    return result.tracks.items;
  }

  /**
   * Search for artists
   */
  async searchArtists(query: string, limit = 20): Promise<SpotifyArtist[]> {
    const response = await this.makeRequest(
      `/search?q=${encodeURIComponent(query)}&type=artists&limit=${limit}`
    );
    const result = response.data as { artists: { items: SpotifyArtist[] } };
    return result.artists.items;
  }
}

// Export singleton instance
export const spotifyClient = new SpotifyClient();

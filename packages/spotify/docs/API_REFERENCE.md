# @gabfon/spotify API Reference

## Installation

```bash
npm install @gabfon/spotify
```

## Environment Setup

Create environment variables for Spotify API access:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
```

## Exports

### Main Client
```typescript
export { SpotifyClient, spotifyClient } from './index';
```

### Types
```typescript
export * from './types';
```

### Hooks
```typescript
export * from './hooks';
```

### Environment Keys
```typescript
export { keys } from './keys';
```

## Client

### SpotifyClient

Main Spotify Web API client class for interacting with Spotify's API.

#### Constructor

```typescript
class SpotifyClient {
  constructor(tokens: SpotifyTokens)
}

interface SpotifyTokens {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token?: string;
}
```

#### Usage

```typescript
import { SpotifyClient } from '@gabfon/spotify';

const client = new SpotifyClient({
  access_token: 'your_access_token',
  token_type: 'Bearer',
  scope: 'user-read-private user-read-email',
  expires_in: 3600,
  refresh_token: 'your_refresh_token',
});
```

#### Default Client

```typescript
import { spotifyClient } from '@gabfon/spotify';

// Pre-configured client with environment tokens
const track = await spotifyClient.getTrack('track-id');
```

### Methods

#### Artist Methods

##### getArtist

Fetches detailed information about an artist.

```typescript
async getArtist(artistId: string): Promise<SpotifyArtist>
```

**Parameters**
- `artistId: string` - Spotify artist ID

**Returns**
- `Promise<SpotifyArtist>` - Artist information

**Example**
```typescript
const artist = await client.getArtist('4Z8W4fKeBZGyExZvQ4CAnf');
console.log(artist.name); // 'Daft Punk'
console.log(artist.genres); // Array of genres
```

##### getArtistAlbums

Fetches albums by an artist.

```typescript
async getArtistAlbums(artistId: string, options?: ArtistAlbumsOptions): Promise<SpotifyAlbum[]>
```

**Parameters**
- `artistId: string` - Spotify artist ID
- `options?: ArtistAlbumsOptions` - Query options

**Returns**
- `Promise<SpotifyAlbum[]>` - Array of albums

**Example**
```typescript
const albums = await client.getArtistAlbums('4Z8W4fKeBZGyExZvQ4CAnf', {
  include_groups: ['album', 'single'],
  limit: 20,
  offset: 0,
});
```

##### getArtistTopTracks

Fetches an artist's top tracks.

```typescript
async getArtistTopTracks(artistId: string, country?: string): Promise<SpotifyTrack[]>
```

**Parameters**
- `artistId: string` - Spotify artist ID
- `country?: string` - Country code (default: 'US')

**Returns**
- `Promise<SpotifyTrack[]>` - Array of top tracks

**Example**
```typescript
const topTracks = await client.getArtistTopTracks('4Z8W4fKeBZGyExZvQ4CAnf', 'US');
topTracks.forEach(track => {
  console.log(track.name, track.popularity);
});
```

#### Track Methods

##### getTrack

Fetches detailed information about a track.

```typescript
async getTrack(trackId: string): Promise<SpotifyTrack>
```

**Parameters**
- `trackId: string` - Spotify track ID

**Returns**
- `Promise<SpotifyTrack>` - Track information

**Example**
```typescript
const track = await client.getTrack('11dFghVXANMlK9aSXrLFsH');
console.log(track.name); // 'Shape of You'
console.log(track.duration_ms); // Duration in milliseconds
```

##### getAudioFeatures

Fetches audio features for a track.

```typescript
async getAudioFeatures(trackId: string): Promise<AudioFeatures>
```

**Parameters**
- `trackId: string` - Spotify track ID

**Returns**
- `Promise<AudioFeatures>` - Audio features

**Example**
```typescript
const features = await client.getAudioFeatures('11dFghVXANMlK9aSXrLFsH');
console.log(features.danceability); // 0.825
console.log(features.energy); // 0.652
console.log(features.valence); // 0.576
```

##### getAudioAnalysis

Fetches detailed audio analysis for a track.

```typescript
async getAudioAnalysis(trackId: string): Promise<AudioAnalysis>
```

**Parameters**
- `trackId: string` - Spotify track ID

**Returns**
- `Promise<AudioAnalysis>` - Detailed audio analysis

**Example**
```typescript
const analysis = await client.getAudioAnalysis('11dFghVXANMlK9aSXrLFsH');
console.log(analysis.tempo); // BPM
console.log(analysis.key); // Musical key
```

#### User Methods

##### getCurrentUser

Fetches the current user's profile.

```typescript
async getCurrentUser(): Promise<SpotifyUser>
```

**Returns**
- `Promise<SpotifyUser>` - User profile information

**Example**
```typescript
const user = await client.getCurrentUser();
console.log(user.display_name);
console.log(user.email);
console.log(user.followers.total);
```

##### getUserTopTracks

Fetches user's top tracks.

```typescript
async getUserTopTracks(timeRange?: TimeRange, limit?: number): Promise<SpotifyTrack[]>
```

**Parameters**
- `timeRange?: TimeRange` - Time range ('short_term', 'medium_term', 'long_term')
- `limit?: number` - Number of tracks to return

**Returns**
- `Promise<SpotifyTrack[]>` - Array of top tracks

**Example**
```typescript
const topTracks = await client.getUserTopTracks('short_term', 10);
topTracks.forEach(track => {
  console.log(`${track.name} - ${track.artists[0].name}`);
});
```

##### getUserTopArtists

Fetches user's top artists.

```typescript
async getUserTopArtists(timeRange?: TimeRange, limit?: number): Promise<SpotifyArtist[]>
```

**Parameters**
- `timeRange?: TimeRange` - Time range ('short_term', 'medium_term', 'long_term')
- `limit?: number` - Number of artists to return

**Returns**
- `Promise<SpotifyArtist[]>` - Array of top artists

**Example**
```typescript
const topArtists = await client.getUserTopArtists('medium_term', 20);
topArtists.forEach(artist => {
  console.log(artist.name, artist.popularity);
});
```

#### Playback Methods

##### getCurrentlyPlaying

Fetches the user's currently playing track.

```typescript
async getCurrentlyPlaying(): Promise<CurrentlyPlaying>
```

**Returns**
- `Promise<CurrentlyPlaying>` - Currently playing information

**Example**
```typescript
const currentlyPlaying = await client.getCurrentPlaying();
if (currentlyPlaying.item) {
  console.log(`Now playing: ${currentlyPlaying.item.name}`);
  console.log(`Progress: ${currentlyPlaying.progress_ms}ms`);
}
```

##### getRecentlyPlayed

Fetches user's recently played tracks.

```typescript
async getRecentlyPlayed(limit?: number): Promise<PlayHistory[]>
```

**Parameters**
- `limit?: number` - Number of tracks to return

**Returns**
- `Promise<PlayHistory[]>` - Array of recently played tracks

**Example**
```typescript
const recent = await client.getRecentlyPlayed(50);
recent.forEach(item => {
  console.log(`${item.track.name} - ${item.played_at}`);
});
```

##### getPlaybackState

Fetches user's current playback state.

```typescript
async getPlaybackState(): Promise<PlaybackState>
```

**Returns**
- `Promise<PlaybackState>` - Playback state information

**Example**
```typescript
const playbackState = await client.getPlaybackState();
if (playbackState.device) {
  console.log(`Playing on: ${playbackState.device.name}`);
  console.log(`Volume: ${playbackState.device.volume_percent}%`);
}
```

## Types

### SpotifyArtist

```typescript
interface SpotifyArtist {
  id: string;
  name: string;
  type: 'artist';
  uri: string;
  href: string;
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  popularity: number;
  images: Image[];
}
```

### SpotifyTrack

```typescript
interface SpotifyTrack {
  id: string;
  name: string;
  type: 'track';
  uri: string;
  href: string;
  external_urls: ExternalUrls;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  album: SimplifiedAlbum;
  artists: SimplifiedArtist[];
  external_ids: ExternalIds;
  preview_url: string | null;
  track_number: number;
  disc_number: number;
}
```

### AudioFeatures

```typescript
interface AudioFeatures {
  acousticness: number;        // 0.0 to 1.0
  danceability: number;       // 0.0 to 1.0
  energy: number;            // 0.0 to 1.0
  instrumentalness: number;   // 0.0 to 1.0
  key: number;               // 0 to 11 (C to B)
  liveness: number;          // 0.0 to 1.0
  loudness: number;          // -60 to 0 dB
  mode: number;              // 0 (minor) or 1 (major)
  speechiness: number;       // 0.0 to 1.0
  tempo: number;             // BPM
  time_signature: number;    // Beats per bar
  valence: number;          // 0.0 to 1.0 (negative to positive)
  id: string;
  uri: string;
  href: string;
  type: 'audio_features';
}
```

### SpotifyUser

```typescript
interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  uri: string;
  href: string;
  external_urls: ExternalUrls;
  followers: Followers;
  country: string;
  product: string;
  images: Image[];
  type: 'user';
}
```

### CurrentlyPlaying

```typescript
interface CurrentlyPlaying {
  item: SpotifyTrack | null;
  is_playing: boolean;
  progress_ms: number | null;
  timestamp: number;
  device: Device | null;
  shuffle_state: boolean;
  repeat_state: 'off' | 'track' | 'context';
}
```

## Hooks

### useSpotifyArtist

React hook for fetching Spotify artist data.

#### Signature

```typescript
function useSpotifyArtist(artistId: string): {
  data: SpotifyArtist | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useSpotifyArtist } from '@gabfon/spotify/hooks';

function ArtistProfile({ artistId }: { artistId: string }) {
  const { data: artist, loading, error } = useSpotifyArtist(artistId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!artist) return <div>Artist not found</div>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>Followers: {artist.followers.total}</p>
      <p>Genres: {artist.genres.join(', ')}</p>
      <div>
        {artist.images.map(image => (
          <img key={image.url} src={image.url} alt={artist.name} />
        ))}
      </div>
    </div>
  );
}
```

### useSpotifyTrack

React hook for fetching Spotify track data.

#### Signature

```typescript
function useSpotifyTrack(trackId: string): {
  data: SpotifyTrack | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useSpotifyTrack } from '@gabfon/spotify/hooks';

function TrackInfo({ trackId }: { trackId: string }) {
  const { data: track, loading, error } = useSpotifyTrack(trackId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!track) return <div>Track not found</div>;

  return (
    <div>
      <h1>{track.name}</h1>
      <p>Artist: {track.artists[0].name}</p>
      <p>Album: {track.album.name}</p>
      <p>Duration: {Math.floor(track.duration_ms / 1000 / 60)}:{String(Math.floor(track.duration_ms / 1000 % 60)).padStart(2, '0')}</p>
      <p>Popularity: {track.popularity}</p>
    </div>
  );
}
```

### useSpotifyAudioFeatures

React hook for fetching audio features of a track.

#### Signature

```typescript
function useSpotifyAudioFeatures(trackId: string): {
  data: AudioFeatures | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useSpotifyAudioFeatures } from '@gabfon/spotify/hooks';

function AudioFeaturesDisplay({ trackId }: { trackId: string }) {
  const { data: features, loading, error } = useSpotifyAudioFeatures(trackId);

  if (loading) return <div>Loading audio features...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!features) return <div>No audio features available</div>;

  return (
    <div>
      <h2>Audio Features</h2>
      <p>Danceability: {(features.danceability * 100).toFixed(1)}%</p>
      <p>Energy: {(features.energy * 100).toFixed(1)}%</p>
      <p>Valence: {(features.valence * 100).toFixed(1)}%</p>
      <p>Tempo: {features.tempo} BPM</p>
      <p>Key: {features.key} (0=C, 1=C#, etc.)</p>
      <p>Mode: {features.mode === 1 ? 'Major' : 'Minor'}</p>
    </div>
  );
}
```

### useCurrentlyPlaying

React hook for fetching currently playing track.

#### Signature

```typescript
function useCurrentlyPlaying(): {
  data: CurrentlyPlaying | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useCurrentlyPlaying } from '@gabfon/spotify/hooks';

function NowPlaying() {
  const { data: currentlyPlaying, loading, error } = useCurrentlyPlaying();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentlyPlaying || !currentlyPlaying.item) return <div>Nothing playing</div>;

  const track = currentlyPlaying.item;
  const progress = currentlyPlaying.progress_ms || 0;
  const duration = track.duration_ms;
  const progressPercent = (progress / duration) * 100;

  return (
    <div>
      <h2>Now Playing</h2>
      <p>{track.name} - {track.artists[0].name}</p>
      <p>Album: {track.album.name}</p>
      <div className="progress-bar">
        <div style={{ width: `${progressPercent}%` }} />
      </div>
      <p>
        {Math.floor(progress / 1000 / 60)}:{String(Math.floor(progress / 1000 % 60)).padStart(2, '0')} / 
        {Math.floor(duration / 1000 / 60)}:{String(Math.floor(duration / 1000 % 60)).padStart(2, '0')}
      </p>
    </div>
  );
}
```

## Environment Variables

### Required Variables

| Variable | Description | Type | Environment | Required |
|----------|-------------|------|-------------|----------|
| `SPOTIFY_CLIENT_ID` | Spotify Client ID | string | Server | Yes |
| `SPOTIFY_CLIENT_SECRET` | Spotify Client Secret | string | Server | Yes |
| `SPOTIFY_REDIRECT_URI` | OAuth redirect URI | string | Server | Yes |
| `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` | Public Client ID | string | Client | Yes |

### Environment Validation

```typescript
import { keys } from '@gabfon/spotify';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.SPOTIFY_CLIENT_ID);
console.log(env.SPOTIFY_CLIENT_SECRET);
console.log(env.SPOTIFY_REDIRECT_URI);
```

### OAuth Scopes

Common Spotify OAuth scopes:
- `user-read-private` - Read user's private information
- `user-read-email` - Read user's email
- `user-read-playback-state` - Read user's playback state
- `user-read-currently-playing` - Read user's currently playing track
- `user-top-read` - Read user's top artists and tracks
- `playlist-read-private` - Read user's private playlists

## Usage Examples

### Basic Client Usage

```typescript
import { SpotifyClient } from '@gabfon/spotify';

const client = new SpotifyClient({
  access_token: 'your_access_token',
  token_type: 'Bearer',
  scope: 'user-read-private',
  expires_in: 3600,
});

async function getArtistInfo(artistId: string) {
  try {
    const artist = await client.getArtist(artistId);
    const topTracks = await client.getArtistTopTracks(artistId);
    const albums = await client.getArtistAlbums(artistId);
    
    return {
      artist,
      topTracks,
      albums,
    };
  } catch (error) {
    console.error('Error fetching artist data:', error);
    throw error;
  }
}
```

### Server-Side API Route

```typescript
// app/api/spotify/track/[id]/route.ts
import { spotifyClient } from '@gabfon/spotify';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const track = await spotifyClient.getTrack(params.id);
    const audioFeatures = await spotifyClient.getAudioFeatures(params.id);
    
    return Response.json({
      track,
      audioFeatures,
    });
  } catch (error) {
    if (error.message === 'Track not found') {
      return Response.json(
        { error: 'Track not found' },
        { status: 404 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### React Component with Hooks

```typescript
// components/SpotifyTrackCard.tsx
import { useSpotifyTrack, useSpotifyAudioFeatures } from '@gabfon/spotify/hooks';

interface SpotifyTrackCardProps {
  trackId: string;
}

export function SpotifyTrackCard({ trackId }: SpotifyTrackCardProps) {
  const { data: track, loading: trackLoading, error: trackError } = useSpotifyTrack(trackId);
  const { data: features, loading: featuresLoading } = useSpotifyAudioFeatures(trackId);

  if (trackLoading || featuresLoading) return <div>Loading...</div>;
  if (trackError) return <div>Error loading track</div>;
  if (!track) return <div>Track not found</div>;

  return (
    <div className="spotify-track-card">
      <img src={track.album.images[0]?.url} alt={track.name} />
      <div className="track-info">
        <h3>{track.name}</h3>
        <p>{track.artists[0].name}</p>
        <p>{track.album.name}</p>
        <p>Duration: {Math.floor(track.duration_ms / 1000 / 60)}:{String(Math.floor(track.duration_ms / 1000 % 60)).padStart(2, '0')}</p>
      </div>
      
      {features && (
        <div className="audio-features">
          <h4>Audio Features</h4>
          <div className="feature-bars">
            <div>
              <span>Danceability</span>
              <div className="bar">
                <div style={{ width: `${features.danceability * 100}%` }} />
              </div>
            </div>
            <div>
              <span>Energy</span>
              <div className="bar">
                <div style={{ width: `${features.energy * 100}%` }} />
              </div>
            </div>
            <div>
              <span>Valence</span>
              <div className="bar">
                <div style={{ width: `${features.valence * 100}%` }} />
              </div>
            </div>
          </div>
          <p>Tempo: {features.tempo} BPM</p>
          <p>Key: {features.key} ({features.mode === 1 ? 'Major' : 'Minor'})</p>
        </div>
      )}
    </div>
  );
}
```

### Error Handling

```typescript
import { SpotifyClient } from '@gabfon/spotify';

const client = new SpotifyClient({ access_token: 'token' });

async function safeGetTrack(trackId: string) {
  try {
    const track = await client.getTrack(trackId);
    return { success: true, data: track };
  } catch (error) {
    if (error.message === 'Track not found') {
      return { success: false, error: 'Track not found' };
    }
    
    if (error.message === 'Unauthorized - check access token') {
      return { success: false, error: 'Access denied - check token' };
    }
    
    if (error.message.includes('Rate limit exceeded')) {
      return { success: false, error: 'Rate limit exceeded' };
    }
    
    return { success: false, error: 'Unknown error occurred' };
  }
}
```

### Token Refresh

```typescript
import { SpotifyClient } from '@gabfon/spotify';

class AutoRefreshSpotifyClient extends SpotifyClient {
  constructor(tokens: SpotifyTokens) {
    super(tokens);
    this.setupTokenRefresh();
  }

  private setupTokenRefresh() {
    // Refresh token 5 minutes before expiry
    const refreshTime = (this.expires_in - 300) * 1000;
    
    setTimeout(async () => {
      try {
        await this.refreshToken();
        this.setupTokenRefresh(); // Schedule next refresh
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }, refreshTime);
  }
}
```

## Advanced Usage

### Custom Client Configuration

```typescript
import { SpotifyClient } from '@gabfon/spotify';

const customClient = new SpotifyClient({
  access_token: 'your_access_token',
  token_type: 'Bearer',
  scope: 'user-read-private user-read-email',
  expires_in: 3600,
  refresh_token: 'your_refresh_token',
});

// Add custom methods
class ExtendedSpotifyClient extends SpotifyClient {
  async getRecommendations(seedTracks: string[]): Promise<SpotifyTrack[]> {
    const url = `${this.baseUrl}/v1/recommendations`;
    const params = new URLSearchParams({
      seed_tracks: seedTracks.join(','),
      limit: '20',
    });

    const response = await fetch(`${url}?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    const data = await this.handleResponse(response);
    return data.tracks;
  }
}
```

### Batch Operations

```typescript
import { SpotifyClient } from '@gabfon/spotify';

class BatchSpotifyClient extends SpotifyClient {
  async getMultipleTracks(trackIds: string[]): Promise<SpotifyTrack[]> {
    const url = `${this.baseUrl}/v1/tracks`;
    const params = new URLSearchParams({
      ids: trackIds.join(','),
    });

    const response = await fetch(`${url}?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    const data = await this.handleResponse(response);
    return data.tracks;
  }

  async getMultipleAudioFeatures(trackIds: string[]): Promise<AudioFeatures[]> {
    const url = `${this.baseUrl}/v1/audio-features`;
    const params = new URLSearchParams({
      ids: trackIds.join(','),
    });

    const response = await fetch(`${url}?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    const data = await this.handleResponse(response);
    return data.audio_features;
  }
}
```

### Caching Implementation

```typescript
// utils/spotifyCache.ts
import { SpotifyClient } from '@gabfon/spotify';

class CachedSpotifyClient extends SpotifyClient {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  async getTrack(trackId: string): Promise<SpotifyTrack> {
    const cacheKey = `track:${trackId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const track = await super.getTrack(trackId);
    this.cache.set(cacheKey, { data: track, timestamp: Date.now() });
    
    return track;
  }

  async getAudioFeatures(trackId: string): Promise<AudioFeatures> {
    const cacheKey = `features:${trackId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const features = await super.getAudioFeatures(trackId);
    this.cache.set(cacheKey, { data: features, timestamp: Date.now() });
    
    return features;
  }
}
```

## Error Handling

### Error Types

```typescript
// Custom error classes
class SpotifyApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'SpotifyApiError';
  }
}

class SpotifyRateLimitError extends SpotifyApiError {
  constructor(public retryAfter?: number) {
    super('Rate limit exceeded');
    this.name = 'SpotifyRateLimitError';
  }
}

class SpotifyAuthenticationError extends SpotifyApiError {
  constructor() {
    super('Authentication failed - check access token');
    this.name = 'SpotifyAuthenticationError';
  }
}
```

### Error Handling Pattern

```typescript
async function handleSpotifyRequest<T>(
  request: () => Promise<T>
): Promise<{ data?: T; error?: Error }> {
  try {
    const data = await request();
    return { data };
  } catch (error) {
    if (error instanceof SpotifyRateLimitError) {
      console.log('Rate limited, retry after:', error.retryAfter);
    } else if (error instanceof SpotifyAuthenticationError) {
      console.log('Authentication failed, refresh token');
    } else {
      console.error('Spotify API error:', error);
    }
    
    return { error: error as Error };
  }
}
```

## Best Practices

### 1. Token Management

```typescript
// Good: Use environment variables
const client = new SpotifyClient({
  access_token: process.env.SPOTIFY_ACCESS_TOKEN,
});

// Bad: Hardcode tokens
const client = new SpotifyClient({
  access_token: 'hardcoded_token',
});
```

### 2. Error Handling

```typescript
// Good: Comprehensive error handling
try {
  const track = await client.getTrack(trackId);
  // Process track data
} catch (error) {
  if (error.message === 'Track not found') {
    // Handle not found
  } else if (error.message === 'Unauthorized') {
    // Handle authentication
  } else {
    // Handle other errors
  }
}

// Bad: No error handling
const track = await client.getTrack(trackId);
```

### 3. React Hooks

```typescript
// Good: Use provided hooks
const { data, loading, error } = useSpotifyTrack(trackId);

// Bad: Manual data fetching in components
const [track, setTrack] = useState(null);
useEffect(() => {
  client.getTrack(trackId).then(setTrack);
}, [trackId]);
```

### 4. Type Safety

```typescript
// Good: Use TypeScript types
const track: SpotifyTrack = await client.getTrack(trackId);

// Bad: Use any
const track: any = await client.getTrack(trackId);
```

## Integration Examples

### With Analytics Package

```typescript
import { spotifyClient } from '@gabfon/spotify';
import { analytics } from '@gabfon/analytics/lib/server';

async function getTrackWithTracking(trackId: string) {
  try {
    const track = await spotifyClient.getTrack(trackId);
    
    analytics.capture('spotify_track_fetched', {
      trackId,
      trackName: track.name,
      artistName: track.artists[0].name,
      popularity: track.popularity,
    });
    
    return track;
  } catch (error) {
    analytics.capture('spotify_api_error', {
      trackId,
      error: error.message,
    });
    
    throw error;
  }
}
```

### With Design System Package

```typescript
import { useCurrentlyPlaying } from '@gabfon/spotify/hooks';
import { Card, Avatar, Text, Badge, Progress } from '@gabfon/design-system';

function NowPlayingCard() {
  const { data: currentlyPlaying, loading, error } = useCurrentlyPlaying();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!currentlyPlaying?.item) return <div>Nothing playing</div>;

  const track = currentlyPlaying.item;
  const progress = currentlyPlaying.progress_ms || 0;
  const duration = track.duration_ms;
  const progressPercent = (progress / duration) * 100;

  return (
    <Card>
      <div className="flex items-center space-x-4">
        <Avatar src={track.album.images[0]?.url} alt={track.name} />
        <div className="flex-1">
          <Text variant="h3">{track.name}</Text>
          <Text variant="muted">{track.artists[0].name}</Text>
          <Text variant="small">{track.album.name}</Text>
          
          <Progress value={progressPercent} className="mt-2" />
          
          <div className="flex space-x-2 mt-2">
            <Badge>{track.explicit ? 'Explicit' : 'Clean'}</Badge>
            <Badge>{Math.floor(track.duration_ms / 1000 / 60)}:{String(Math.floor(track.duration_ms / 1000 % 60)).padStart(2, '0')}</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

### With Security Package

```typescript
import { spotifyClient } from '@gabfon/spotify';
import { secure } from '@gabfon/security';

export async function GET(request: Request) {
  // Protect against bots
  await secure(['CATEGORY:SEARCH_ENGINE'], request);
  
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get('trackId');
  
  if (!trackId) {
    return Response.json({ error: 'Track ID required' }, { status: 400 });
  }
  
  try {
    const track = await spotifyClient.getTrack(trackId);
    return Response.json(track);
  } catch (error) {
    return Response.json({ error: 'Track not found' }, { status: 404 });
  }
}
```

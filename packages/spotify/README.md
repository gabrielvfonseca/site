# @gabfon/spotify

A TypeScript client library for interacting with the Spotify Web API. This package provides a comprehensive, type-safe interface for accessing Spotify data including user information, tracks, artists, playlists, and audio features.

## Features

- **Type-safe API** - Full TypeScript support with Zod validation
- **Spotify Web API Integration** - Access user profiles, tracks, artists, and playlists
- **Audio Analysis** - Fetch detailed audio features and analysis
- **Playback Control** - Currently playing and playback management
- **React Hooks** - Built-in React hooks for seamless integration
- **Environment Validation** - Secure environment variable handling with `@t3-oss/env-nextjs`

## Installation

```bash
npm install @gabfon/spotify
```

## Usage

### Environment Setup

Create environment variables for Spotify API access:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_ACCESS_TOKEN=your_spotify_access_token
```

### Basic Usage

```typescript
import { spotifyClient } from '@gabfon/spotify';

// Get user information
const user = await spotifyClient.getCurrentUser();

// Get currently playing track
const currentlyPlaying = await spotifyClient.getCurrentlyPlaying();

// Get user's top tracks
const topTracks = await spotifyClient.getTopTracks();

// Get user's top artists
const topArtists = await spotifyClient.getTopArtists();

// Get recent tracks
const recentTracks = await spotifyClient.getRecentTracks();

// Get audio features for a track
const audioFeatures = await spotifyClient.getAudioFeatures('track_id');
```

### React Integration

```typescript
import { useCurrentlyPlaying, useTopTracks, useTopArtists } from '@gabfon/spotify/hooks';

function SpotifyDashboard() {
  const { data: currentlyPlaying } = useCurrentlyPlaying();
  const { data: topTracks } = useTopTracks();
  const { data: topArtists } = useTopArtists();

  return (
    <div>
      <h1>Spotify Dashboard</h1>
      
      {currentlyPlaying && (
        <section>
          <h2>Currently Playing</h2>
          <p>{currentlyPlaying.item.name} by {currentlyPlaying.item.artists[0].name}</p>
        </section>
      )}

      {topTracks && (
        <section>
          <h2>Your Top Tracks</h2>
          <ul>
            {topTracks.items.map(track => (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul>
        </section>
      )}

      {topArtists && (
        <section>
          <h2>Your Top Artists</h2>
          <ul>
            {topArtists.items.map(artist => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
```

## API Reference

### Client Methods

#### User Data
- `getCurrentUser()` - Get current user profile
- `getTopTracks(options?)` - Get user's top tracks
- `getTopArtists(options?)` - Get user's top artists
- `getRecentTracks(options?)` - Get recently played tracks

#### Playback
- `getCurrentlyPlaying()` - Get currently playing track
- `getPlaybackState()` - Get current playback state

#### Track & Artist Data
- `getTrack(trackId: string)` - Get track information
- `getArtist(artistId: string)` - Get artist information
- `getAudioFeatures(trackId: string)` - Get audio features for a track

### Types

- `SpotifyUser` - User profile information
- `SpotifyTrack` - Track information
- `SpotifyArtist` - Artist information
- `SpotifyCurrentlyPlaying` - Currently playing response
- `SpotifyTopTracks` - Top tracks response
- `SpotifyTopArtists` - Top artists response
- `SpotifyRecentTrack` - Recent track information
- `SpotifyAudioFeatures` - Audio features analysis
- `SpotifyApiResponse<T>` - Generic API response wrapper

## Environment Variables

This package uses `@t3-oss/env-nextjs` for environment validation. Required variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `SPOTIFY_CLIENT_ID` | Spotify Client ID | Yes |
| `SPOTIFY_CLIENT_SECRET` | Spotify Client Secret | Yes |
| `SPOTIFY_ACCESS_TOKEN` | Spotify Access Token | Yes |

## Authentication

This package supports OAuth 2.0 authentication with Spotify. You'll need to:

1. Create a Spotify Developer account
2. Register your application to get Client ID and Client Secret
3. Implement OAuth flow to get access tokens
4. Set the required environment variables

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Type checking
npm run typecheck

# Build
npm run build
```

## Testing

The package includes comprehensive tests using Vitest:

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Dependencies

- `@gabfon/analytics` - Analytics integration
- `@gabfon/testing` - Shared testing utilities
- `@t3-oss/env-nextjs` - Environment validation
- `react` - React integration
- `zod` - Runtime type validation

# @gabfon/strava

A TypeScript client library for interacting with the Strava API. This package provides a comprehensive, type-safe interface for accessing athlete data, activities, achievements, and performance metrics from Strava.

## Features

- **Type-safe API** - Full TypeScript support with Zod validation
- **Strava API Integration** - Access athlete profiles, activities, and statistics
- **Activity Management** - Fetch, create, and update activities
- **Performance Analytics** - Detailed athlete statistics and achievements
- **React Hooks** - Built-in React hooks for seamless integration
- **Environment Validation** - Secure environment variable handling with `@t3-oss/env-nextjs`

## Installation

```bash
npm install @gabfon/strava
```

## Usage

### Environment Setup

Create environment variables for Strava API access:

```env
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
STRAVA_ACCESS_TOKEN=your_strava_access_token
STRAVA_REFRESH_TOKEN=your_strava_refresh_token
```

### Basic Usage

```typescript
import { stravaClient } from '@gabfon/strava';

// Get current athlete information
const athlete = await stravaClient.getCurrentAthlete();

// Get athlete statistics
const stats = await stravaClient.getAthleteStats(athleteId);

// Get athlete activities
const activities = await stravaClient.getAthleteActivities();

// Get specific activity
const activity = await stravaClient.getActivity(activityId);

// Get athlete achievements
const achievements = await stravaClient.getAthleteAchievements();
```

### React Integration

```typescript
import { useCurrentAthlete, useAthleteStats, useAthleteActivities } from '@gabfon/strava/hooks';

function StravaDashboard() {
  const { data: athlete, isLoading } = useCurrentAthlete();
  const { data: stats } = useAthleteStats(athlete?.id);
  const { data: activities } = useAthleteActivities();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{athlete?.firstname} {athlete?.lastname}</h1>
      
      {stats && (
        <section>
          <h2>Athlete Statistics</h2>
          <p>Total Activities: {stats.all_ride_types.count}</p>
          <p>Total Distance: {stats.all_ride_types.distance}m</p>
          <p>Total Elevation: {stats.all_ride_types.elevation_gain}m</p>
        </section>
      )}

      {activities && (
        <section>
          <h2>Recent Activities</h2>
          <ul>
            {activities.slice(0, 5).map(activity => (
              <li key={activity.id}>
                {activity.name} - {activity.type} - {activity.distance}m
              </li>
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

#### Athlete Data
- `getCurrentAthlete()` - Get current athlete profile
- `getAthleteStats(athleteId: number)` - Get athlete statistics
- `getAthleteAchievements()` - Get athlete achievements
- `updateAthlete(updates: Partial<Athlete>)` - Update athlete profile

#### Activities
- `getAthleteActivities(options?)` - Get athlete's activities
- `getActivity(activityId: number)` - Get specific activity
- `createActivity(activity: CreateActivityData)` - Create new activity
- `updateActivity(activityId: number, updates: Partial<Activity>)` - Update activity

#### Routes and Segments
- `getActivityRoutes(activityId: number)` - Get routes for an activity
- `getSegment(segmentId: number)` - Get segment information

### Types

- `StravaAthlete` - Athlete profile information
- `StravaActivity` - Activity information
- `StravaAthleteStats` - Athlete statistics
- `StravaAchievement` - Achievement information
- `StravaApiResponse<T>` - Generic API response wrapper

## Environment Variables

This package uses `@t3-oss/env-nextjs` for environment validation. Required variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `STRAVA_CLIENT_ID` | Strava Client ID | Yes |
| `STRAVA_CLIENT_SECRET` | Strava Client Secret | Yes |
| `STRAVA_ACCESS_TOKEN` | Strava Access Token | Yes |
| `STRAVA_REFRESH_TOKEN` | Strava Refresh Token | Yes |

## Authentication

This package supports OAuth 2.0 authentication with Strava. You'll need to:

1. Create a Strava Developer account
2. Register your application to get Client ID and Client Secret
3. Implement OAuth flow to get access and refresh tokens
4. Set the required environment variables

## Token Refresh

The package automatically handles token refresh using the refresh token when the access token expires.

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
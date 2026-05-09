# @gabfon/strava API Reference

## Installation

```bash
npm install @gabfon/strava
```

## Environment Setup

Create environment variables for Strava API access:

```env
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
STRAVA_REDIRECT_URI=http://localhost:3000/callback
NEXT_PUBLIC_STRAVA_CLIENT_ID=your_strava_client_id
```

## Exports

### Main Client
```typescript
export { StravaClient, stravaClient } from './index';
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

### StravaClient

Main Strava API client class for interacting with Strava's API.

#### Constructor

```typescript
class StravaClient {
  constructor(tokens: StravaTokens)
}

interface StravaTokens {
  token_type: string;
  access_token: string;
  expires_at: number;
  refresh_token: string;
  athlete: StravaAthlete;
}
```

#### Usage

```typescript
import { StravaClient } from '@gabfon/strava';

const client = new StravaClient({
  token_type: 'Bearer',
  access_token: 'your_access_token',
  expires_at: 1234567890,
  refresh_token: 'your_refresh_token',
  athlete: athleteObject,
});
```

#### Default Client

```typescript
import { stravaClient } from '@gabfon/strava';

// Pre-configured client with environment tokens
const athlete = await stravaClient.getCurrentAthlete();
```

### Methods

#### Athlete Methods

##### getCurrentAthlete

Fetches the currently authenticated athlete's profile.

```typescript
async getCurrentAthlete(): Promise<StravaAthlete>
```

**Returns**
- `Promise<StravaAthlete>` - Athlete profile information

**Example**
```typescript
const athlete = await client.getCurrentAthlete();
console.log(athlete.firstname, athlete.lastname);
console.log(athlete.city, athlete.country);
console.log(athlete.follower_count);
```

##### getAthleteStats

Fetches statistics for an athlete.

```typescript
async getAthleteStats(athleteId: string): Promise<AthleteStats>
```

**Parameters**
- `athleteId: string` - Strava athlete ID

**Returns**
- `Promise<AthleteStats>` - Athlete statistics

**Example**
```typescript
const stats = await client.getAthleteStats('123456');
console.log(`Biggest ride: ${stats.biggest_ride_distance}m`);
console.log(`YTD ride total: ${stats.ytd_ride_totals.distance}m`);
```

##### getAthleteActivities

Fetches activities for an athlete.

```typescript
async getAthleteActivities(athleteId: string, options?: ActivityOptions): Promise<StravaActivity[]>
```

**Parameters**
- `athleteId: string` - Strava athlete ID
- `options?: ActivityOptions` - Query options

**Returns**
- `Promise<StravaActivity[]>` - Array of activities

**Example**
```typescript
const activities = await client.getAthleteActivities('123456', {
  before: '2023-12-31T23:59:59Z',
  after: '2023-01-01T00:00:00Z',
  limit: 50,
  page: 1,
});
```

#### Activity Methods

##### getActivity

Fetches detailed information about an activity.

```typescript
async getActivity(activityId: string): Promise<StravaActivity>
```

**Parameters**
- `activityId: string` - Strava activity ID

**Returns**
- `Promise<StravaActivity>` - Activity information

**Example**
```typescript
const activity = await client.getActivity('789012');
console.log(activity.name);
console.log(activity.type);
console.log(activity.distance);
console.log(activity.moving_time);
```

##### getActivityStreams

Fetches streams for an activity.

```typescript
async getActivityStreams(activityId: string, types: StreamType[], resolution?: StreamResolution): Promise<ActivityStreams>
```

**Parameters**
- `activityId: string` - Strava activity ID
- `types: StreamType[]` - Types of streams to fetch
- `resolution?: StreamResolution` - Stream resolution

**Returns**
- `Promise<ActivityStreams>` - Activity streams

**Example**
```typescript
const streams = await client.getActivityStreams('789012', [
  'time',
  'latlng',
  'distance',
  'altitude',
  'heartrate',
  'cadence',
  'watts',
]);
```

#### Achievement Methods

##### getAthleteAchievements

Fetches achievements for an athlete.

```typescript
async getAthleteAchievements(athleteId: string): Promise<Achievement[]>
```

**Parameters**
- `athleteId: string` - Strava athlete ID

**Returns**
- `Promise<Achievement[]>` - Array of achievements

**Example**
```typescript
const achievements = await client.getAthleteAchievements('123456');
achievements.forEach(achievement => {
  console.log(`${achievement.type}: ${achievement.rank}`);
});
```

#### Club Methods

##### getClub

Fetches information about a club.

```typescript
async getClub(clubId: string): Promise<Club>
```

**Parameters**
- `clubId: string` - Strava club ID

**Returns**
- `Promise<Club>` - Club information

**Example**
```typescript
const club = await client.getClub('12345');
console.log(club.name);
console.log(club.member_count);
```

##### getClubMembers

Fetches members of a club.

```typescript
async getClubMembers(clubId: string, options?: ClubMembersOptions): Promise<ClubMember[]>
```

**Parameters**
- `clubId: string` - Strava club ID
- `options?: ClubMembersOptions` - Query options

**Returns**
- `Promise<ClubMember[]>` - Array of club members

**Example**
```typescript
const members = await client.getClubMembers('12345', {
  limit: 50,
  page: 1,
});
```

## Types

### StravaAthlete

```typescript
interface StravaAthlete {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  profile_medium: string;
  profile: string;
  friend: string;
  follower: string;
  follower_count: number;
  friend_count: number;
  mutual_friend_count: number;
  athlete_type: AthleteType;
  date_preference: string;
  measurement_preference: string;
  clubs: Club[];
  bikes: Bike[];
  shoes: Shoe[];
}
```

### StravaActivity

```typescript
interface StravaActivity {
  id: number;
  resource_state: number;
  external_id: string;
  upload_id: number;
  athlete: StravaAthlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: ActivityType;
  sport_type: SportType;
  workout_type: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: number[];
  end_latlng: number[];
  location_city: string;
  location_state: string;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: ActivityMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id: string;
  device_name: string;
  embed_token: string;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  weighted_average_watts: number;
  device_watts: boolean;
  max_watts: number;
  description: string;
  photos: ActivityPhoto[];
  calories: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
}
```

### AthleteStats

```typescript
interface AthleteStats {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_ride_totals: RecentTotals;
  recent_run_totals: RecentTotals;
  ytd_ride_totals: YtdTotals;
  ytd_run_totals: YtdTotals;
  all_ride_totals: AllTotals;
  all_run_totals: AllTotals;
}
```

### Achievement

```typescript
interface Achievement {
  type: string;
  type_id: number;
  rank: number;
  rank_type: string;
  effort_id: number;
  activity_id: number;
  pr_date: string;
  pr_elapsed_time: number;
  pr_activity_type: string;
  pr_distance: number;
  pr_elevation_gain: number;
  pr_count: number;
  sport_type: SportType;
  pr_rank: number;
  pr_rank_type: string;
  pr_value: number;
  achievement_description: string;
}
```

## Hooks

### useStravaAthlete

React hook for fetching Strava athlete data.

#### Signature

```typescript
function useStravaAthlete(athleteId: string): {
  data: StravaAthlete | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useStravaAthlete } from '@gabfon/strava/hooks';

function AthleteProfile({ athleteId }: { athleteId: string }) {
  const { data: athlete, loading, error } = useStravaAthlete(athleteId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!athlete) return <div>Athlete not found</div>;

  return (
    <div>
      <h1>{athlete.firstname} {athlete.lastname}</h1>
      <p>Location: {athlete.city}, {athlete.state}</p>
      <p>Followers: {athlete.follower_count}</p>
      <p>Premium: {athlete.premium ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### useStravaActivities

React hook for fetching athlete activities.

#### Signature

```typescript
function useStravaActivities(athleteId: string, options?: ActivityOptions): {
  data: StravaActivity[] | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useStravaActivities } from '@gabfon/strava/hooks';

function ActivityList({ athleteId }: { athleteId: string }) {
  const { data: activities, loading, error } = useStravaActivities(athleteId, {
    limit: 20,
    sport_type: 'Ride',
  });

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Recent Activities ({activities?.length})</h2>
      <ul>
        {activities?.map(activity => (
          <li key={activity.id}>
            <h3>{activity.name}</h3>
            <p>Type: {activity.type}</p>
            <p>Distance: {(activity.distance / 1000).toFixed(2)}km</p>
            <p>Time: {formatTime(activity.moving_time)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### useStravaActivity

React hook for fetching a specific activity.

#### Signature

```typescript
function useStravaActivity(activityId: string): {
  data: StravaActivity | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useStravaActivity } from '@gabfon/strava/hooks';

function ActivityDetail({ activityId }: { activityId: string }) {
  const { data: activity, loading, error } = useStravaActivity(activityId);

  if (loading) return <div>Loading activity...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!activity) return <div>Activity not found</div>;

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>Type: {activity.type}</p>
      <p>Date: {new Date(activity.start_date_local).toLocaleDateString()}</p>
      <p>Distance: {(activity.distance / 1000).toFixed(2)}km</p>
      <p>Time: {formatTime(activity.moving_time)}</p>
      <p>Elevation: {activity.total_elevation_gain}m</p>
      <p>Speed: {(activity.average_speed * 3.6).toFixed(2)}km/h</p>
    </div>
  );
}
```

### useStravaAthleteStats

React hook for fetching athlete statistics.

#### Signature

```typescript
function useStravaAthleteStats(athleteId: string): {
  data: AthleteStats | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useStravaAthleteStats } from '@gabfon/strava/hooks';

function AthleteStats({ athleteId }: { athleteId: string }) {
  const { data: stats, loading, error } = useStravaAthleteStats(athleteId);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!stats) return <div>No stats available</div>;

  return (
    <div>
      <h2>Athlete Statistics</h2>
      <div>
        <h3>Ride Stats</h3>
        <p>Biggest ride: {(stats.biggest_ride_distance / 1000).toFixed(2)}km</p>
        <p>YTD distance: {(stats.ytd_ride_totals.distance / 1000).toFixed(2)}km</p>
        <p>All time: {(stats.all_ride_totals.distance / 1000).toFixed(2)}km</p>
      </div>
      <div>
        <h3>Run Stats</h3>
        <p>YTD distance: {(stats.ytd_run_totals.distance / 1000).toFixed(2)}km</p>
        <p>All time: {(stats.all_run_totals.distance / 1000).toFixed(2)}km</p>
      </div>
    </div>
  );
}
```

## Environment Variables

### Required Variables

| Variable | Description | Type | Environment | Required |
|----------|-------------|------|-------------|----------|
| `STRAVA_CLIENT_ID` | Strava Client ID | string | Server | Yes |
| `STRAVA_CLIENT_SECRET` | Strava Client Secret | string | Server | Yes |
| `STRAVA_REDIRECT_URI` | OAuth redirect URI | string | Server | Yes |
| `NEXT_PUBLIC_STRAVA_CLIENT_ID` | Public Client ID | string | Client | Yes |

### Environment Validation

```typescript
import { keys } from '@gabfon/strava';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.STRAVA_CLIENT_ID);
console.log(env.STRAVA_CLIENT_SECRET);
console.log(env.STRAVA_REDIRECT_URI);
```

### OAuth Scopes

Common Strava OAuth scopes:
- `read` - Read public activities, profile data, and posts
- `read_all` - Read all data including private activities and segments
- `profile:read_all` - Read all profile data even if private
- `activity:read` - Read public activities
- `activity:read_all` - Read all activities including private
- `read_heartrate_zones` - Read heart rate zone data

## Usage Examples

### Basic Client Usage

```typescript
import { StravaClient } from '@gabfon/strava';

const client = new StravaClient({
  token_type: 'Bearer',
  access_token: 'your_access_token',
  expires_at: 1234567890,
  refresh_token: 'your_refresh_token',
  athlete: athleteObject,
});

async function getAthleteInfo(athleteId: string) {
  try {
    const athlete = await client.getCurrentAthlete();
    const stats = await client.getAthleteStats(athlete.id);
    const activities = await client.getAthleteActivities(athlete.id);
    
    return {
      athlete,
      stats,
      activities,
    };
  } catch (error) {
    console.error('Error fetching athlete data:', error);
    throw error;
  }
}
```

### Server-Side API Route

```typescript
// app/api/strava/athlete/[id]/route.ts
import { stravaClient } from '@gabfon/strava';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const athlete = await stravaClient.getAthlete(params.id);
    const stats = await stravaClient.getAthleteStats(params.id);
    
    return Response.json({
      athlete,
      stats,
    });
  } catch (error) {
    if (error.message === 'Athlete not found') {
      return Response.json(
        { error: 'Athlete not found' },
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
// components/StravaActivityCard.tsx
import { useStravaActivity } from '@gabfon/strava/hooks';

interface StravaActivityCardProps {
  activityId: string;
}

export function StravaActivityCard({ activityId }: StravaActivityCardProps) {
  const { data: activity, loading, error } = useStravaActivity(activityId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading activity</div>;
  if (!activity) return <div>Activity not found</div>;

  return (
    <div className="strava-activity-card">
      <h3>{activity.name}</h3>
      <p>Type: {activity.type}</p>
      <p>Sport: {activity.sport_type}</p>
      <p>Date: {new Date(activity.start_date_local).toLocaleDateString()}</p>
      <p>Distance: {(activity.distance / 1000).toFixed(2)}km</p>
      <p>Time: {formatTime(activity.moving_time)}</p>
      <p>Elevation: {activity.total_elevation_gain}m</p>
      <p>Speed: {(activity.average_speed * 3.6).toFixed(2)}km/h</p>
      {activity.max_speed && (
        <p>Max Speed: {(activity.max_speed * 3.6).toFixed(2)}km/h</p>
      )}
      <p>Kudos: {activity.kudos_count}</p>
      <p>Comments: {activity.comment_count}</p>
    </div>
  );
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
```

### Error Handling

```typescript
import { StravaClient } from '@gabfon/strava';

const client = new StravaClient({ access_token: 'token' });

async function safeGetActivity(activityId: string) {
  try {
    const activity = await client.getActivity(activityId);
    return { success: true, data: activity };
  } catch (error) {
    if (error.message === 'Activity not found') {
      return { success: false, error: 'Activity not found' };
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
import { StravaClient } from '@gabfon/strava';

class AutoRefreshStravaClient extends StravaClient {
  constructor(tokens: StravaTokens) {
    super(tokens);
    this.setupTokenRefresh();
  }

  private setupTokenRefresh() {
    // Refresh token 5 minutes before expiry
    const now = Date.now() / 1000;
    const refreshTime = (this.expires_at - 300) * 1000;
    const timeUntilRefresh = refreshTime - Date.now();
    
    if (timeUntilRefresh > 0) {
      setTimeout(async () => {
        try {
          await this.refreshToken();
          this.setupTokenRefresh(); // Schedule next refresh
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      }, timeUntilRefresh);
    }
  }
}
```

## Advanced Usage

### Custom Client Configuration

```typescript
import { StravaClient } from '@gabfon/strava';

const customClient = new StravaClient({
  token_type: 'Bearer',
  access_token: 'your_access_token',
  expires_at: 1234567890,
  refresh_token: 'your_refresh_token',
  athlete: athleteObject,
});

// Add custom methods
class ExtendedStravaClient extends StravaClient {
  async getSegmentEffort(segmentId: string): Promise<SegmentEffort> {
    const url = `${this.baseUrl}/v3/segment_efforts/${segmentId}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    const data = await this.handleResponse(response);
    return data;
  }

  async getStarredSegments(): Promise<Segment[]> {
    const url = `${this.baseUrl}/v3/segments/starred`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    const data = await this.handleResponse(response);
    return data;
  }
}
```

### Batch Operations

```typescript
import { StravaClient } from '@gabfon/strava';

class BatchStravaClient extends StravaClient {
  async getMultipleActivities(activityIds: string[]): Promise<StravaActivity[]> {
    const promises = activityIds.map(id => this.getActivity(id));
    const activities = await Promise.all(promises);
    return activities;
  }

  async getAthleteWithStats(athleteId: string): Promise<{ athlete: StravaAthlete; stats: AthleteStats }> {
    const [athlete, stats] = await Promise.all([
      this.getAthlete(athleteId),
      this.getAthleteStats(athleteId),
    ]);
    
    return { athlete, stats };
  }
}
```

### Caching Implementation

```typescript
// utils/stravaCache.ts
import { StravaClient } from '@gabfon/strava';

class CachedStravaClient extends StravaClient {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  async getActivity(activityId: string): Promise<StravaActivity> {
    const cacheKey = `activity:${activityId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const activity = await super.getActivity(activityId);
    this.cache.set(cacheKey, { data: activity, timestamp: Date.now() });
    
    return activity;
  }

  async getAthleteStats(athleteId: string): Promise<AthleteStats> {
    const cacheKey = `stats:${athleteId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const stats = await super.getAthleteStats(athleteId);
    this.cache.set(cacheKey, { data: stats, timestamp: Date.now() });
    
    return stats;
  }
}
```

## Error Handling

### Error Types

```typescript
// Custom error classes
class StravaApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'StravaApiError';
  }
}

class StravaRateLimitError extends StravaApiError {
  constructor(public rateLimit?: number) {
    super('Rate limit exceeded');
    this.name = 'StravaRateLimitError';
  }
}

class StravaAuthenticationError extends StravaApiError {
  constructor() {
    super('Authentication failed - check access token');
    this.name = 'StravaAuthenticationError';
  }
}
```

### Error Handling Pattern

```typescript
async function handleStravaRequest<T>(
  request: () => Promise<T>
): Promise<{ data?: T; error?: Error }> {
  try {
    const data = await request();
    return { data };
  } catch (error) {
    if (error instanceof StravaRateLimitError) {
      console.log('Rate limited, limit:', error.rateLimit);
    } else if (error instanceof StravaAuthenticationError) {
      console.log('Authentication failed, refresh token');
    } else {
      console.error('Strava API error:', error);
    }
    
    return { error: error as Error };
  }
}
```

## Best Practices

### 1. Token Management

```typescript
// Good: Use environment variables
const client = new StravaClient({
  access_token: process.env.STRAVA_ACCESS_TOKEN,
});

// Bad: Hardcode tokens
const client = new StravaClient({
  access_token: 'hardcoded_token',
});
```

### 2. Error Handling

```typescript
// Good: Comprehensive error handling
try {
  const activity = await client.getActivity(activityId);
  // Process activity data
} catch (error) {
  if (error.message === 'Activity not found') {
    // Handle not found
  } else if (error.message === 'Unauthorized') {
    // Handle authentication
  } else {
    // Handle other errors
  }
}

// Bad: No error handling
const activity = await client.getActivity(activityId);
```

### 3. React Hooks

```typescript
// Good: Use provided hooks
const { data, loading, error } = useStravaActivity(activityId);

// Bad: Manual data fetching in components
const [activity, setActivity] = useState(null);
useEffect(() => {
  client.getActivity(activityId).then(setActivity);
}, [activityId]);
```

### 4. Type Safety

```typescript
// Good: Use TypeScript types
const activity: StravaActivity = await client.getActivity(activityId);

// Bad: Use any
const activity: any = await client.getActivity(activityId);
```

## Integration Examples

### With Analytics Package

```typescript
import { stravaClient } from '@gabfon/strava';
import { analytics } from '@gabfon/analytics/lib/server';

async function getActivityWithTracking(activityId: string) {
  try {
    const activity = await stravaClient.getActivity(activityId);
    
    analytics.capture('strava_activity_fetched', {
      activityId,
      activityName: activity.name,
      activityType: activity.type,
      distance: activity.distance,
      movingTime: activity.moving_time,
    });
    
    return activity;
  } catch (error) {
    analytics.capture('strava_api_error', {
      activityId,
      error: error.message,
    });
    
    throw error;
  }
}
```

### With Design System Package

```typescript
import { useStravaActivity } from '@gabfon/strava/hooks';
import { Card, Avatar, Text, Badge, Progress } from '@gabfon/design-system';

function StravaActivityCard({ activityId }: { activityId: string }) {
  const { data: activity, loading, error } = useStravaActivity(activityId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!activity) return <div>Activity not found</div>;

  return (
    <Card>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Text variant="h3">{activity.name}</Text>
          <Text variant="muted">{activity.type}</Text>
          <Text variant="small">
            {new Date(activity.start_date_local).toLocaleDateString()}
          </Text>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <Text variant="small">Distance</Text>
              <Text>{(activity.distance / 1000).toFixed(2)}km</Text>
            </div>
            <div>
              <Text variant="small">Time</Text>
              <Text>{formatTime(activity.moving_time)}</Text>
            </div>
            <div>
              <Text variant="small">Speed</Text>
              <Text>{(activity.average_speed * 3.6).toFixed(2)}km/h</Text>
            </div>
            <div>
              <Text variant="small">Elevation</Text>
              <Text>{activity.total_elevation_gain}m</Text>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-2">
            <Badge>{activity.type}</Badge>
            <Badge>{activity.sport_type}</Badge>
            {activity.private && <Badge>Private</Badge>}
            <Badge>{activity.kudos_count} kudos</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

### With Security Package

```typescript
import { stravaClient } from '@gabfon/strava';
import { secure } from '@gabfon/security';

export async function GET(request: Request) {
  // Protect against bots
  await secure(['CATEGORY:SEARCH_ENGINE'], request);
  
  const { searchParams } = new URL(request.url);
  const activityId = searchParams.get('activityId');
  
  if (!activityId) {
    return Response.json({ error: 'Activity ID required' }, { status: 400 });
  }
  
  try {
    const activity = await stravaClient.getActivity(activityId);
    return Response.json(activity);
  } catch (error) {
    return Response.json({ error: 'Activity not found' }, { status: 404 });
  }
}
```

# @gabfon/analytics API Reference

## Installation

```bash
npm install @gabfon/analytics
```

## Environment Setup

Create environment variables for analytics configuration:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_instance_host
```

## Exports

### Main Provider
```typescript
export { AnalyticsProvider } from './index';
```

### Client-Side Analytics
```typescript
export { PostHogProvider, useAnalytics } from './lib/client';
```

### Server-Side Analytics
```typescript
export { analytics } from './lib/server';
```

### Vercel Analytics
```typescript
export { VercelAnalytics } from './vercel';
```

### Environment Keys
```typescript
export { keys } from './keys';
```

## Components

### AnalyticsProvider

The main provider component that wraps both PostHog and Vercel Analytics.

#### Props

```typescript
interface AnalyticsProviderProps {
  readonly children: ReactNode;
}
```

#### Usage

```typescript
import { AnalyticsProvider } from '@gabfon/analytics';

function App() {
  return (
    <AnalyticsProvider>
      <YourApp />
    </AnalyticsProvider>
  );
}
```

#### Features

- **Dual Integration**: Combines PostHog and Vercel Analytics
- **Conditional Initialization**: Only initializes when keys are available
- **Environment Validation**: Validates environment variables at runtime
- **Type Safety**: Full TypeScript support

### VercelAnalytics

Vercel Analytics component for performance metrics.

#### Usage

```typescript
import { VercelAnalytics } from '@gabfon/analytics';

function Layout() {
  return (
    <>
      <YourContent />
      <VercelAnalytics />
    </>
  );
}
```

## Hooks

### useAnalytics

React hook for accessing PostHog analytics functionality.

#### Returns

```typescript
import { usePostHog } from 'posthog-js/react';

// Returns PostHog instance
const analytics = useAnalytics();
```

#### Usage

```typescript
import { useAnalytics } from '@gabfon/analytics/lib/client';

function ButtonComponent() {
  const analytics = useAnalytics();

  const handleClick = () => {
    analytics.track('button_clicked', {
      button_id: 'submit',
      page: 'checkout',
    });
  };

  return <button onClick={handleClick}>Submit</button>;
}
```

#### Available Methods

```typescript
// Event tracking
analytics.track('event_name', properties);

// User identification
analytics.identify('user_id', userProperties);

// Page tracking
analytics.page('page_name', properties);

// Group tracking
analytics.group('group_id', groupProperties);

// Feature flags
analytics.isFeatureEnabled('feature_name');

// Experiments
analytics.getVariant('experiment_name');
```

## Server-Side Analytics

### analytics

Server-side PostHog instance for Node.js environments.

#### Usage

```typescript
import { analytics } from '@gabfon/analytics/lib/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Track server-side events
  analytics.capture('api_call', {
    endpoint: '/api/submit',
    method: 'POST',
    user_id: body.userId,
  });

  // Flush events immediately
  await analytics.flush();

  return Response.json({ success: true });
}
```

#### Available Methods

```typescript
// Event capture
analytics.capture('event_name', properties);

// User identification
analytics.identify({ distinctId: 'user_id', properties: userProperties });

// Alias creation
analytics.alias('new_id', 'previous_id');

// Group identification
analytics.groupIdentify({ groupType: 'company', groupKey: 'company_id', properties: companyProperties });

// Feature flags
analytics.isFeatureEnabled('feature_name', 'user_id');

// Event flushing
await analytics.flush();
```

## Environment Variables

### Required Variables

| Variable | Description | Type | Required |
|----------|-------------|------|----------|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key | string | Yes |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog instance host URL | string | Yes |

### Environment Validation

```typescript
import { keys } from '@gabfon/analytics/keys';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.NEXT_PUBLIC_POSTHOG_KEY);
console.log(env.NEXT_PUBLIC_POSTHOG_HOST);
```

## Usage Examples

### Basic Setup

```typescript
// app/layout.tsx
import { AnalyticsProvider } from '@gabfon/analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
```

### Client-Side Event Tracking

```typescript
// components/CheckoutButton.tsx
'use client';

import { useAnalytics } from '@gabfon/analytics/lib/client';

export function CheckoutButton() {
  const analytics = useAnalytics();

  const handleCheckout = () => {
    // Track checkout initiation
    analytics.track('checkout_started', {
      cart_value: 99.99,
      items_count: 3,
      currency: 'USD',
    });

    // Proceed with checkout logic
  };

  return <button onClick={handleCheckout}>Checkout</button>;
}
```

### User Identification

```typescript
// components/UserProfile.tsx
'use client';

import { useAnalytics } from '@gabfon/analytics/lib/client';

export function UserProfile({ user }: { user: User }) {
  const analytics = useAnalytics();

  useEffect(() => {
    // Identify user when profile loads
    analytics.identify(user.id, {
      email: user.email,
      name: user.name,
      plan: user.subscription.plan,
      signup_date: user.createdAt,
    });
  }, [user.id, analytics]);

  return <div>{user.name}</div>;
}
```

### Server-Side Event Tracking

```typescript
// app/api/user/route.ts
import { analytics } from '@gabfon/analytics/lib/server';

export async function POST(request: Request) {
  const { userId, action } = await request.json();

  // Track server-side events
  analytics.capture('user_action', {
    distinctId: userId,
    action,
    timestamp: new Date().toISOString(),
  });

  // Flush immediately for serverless environments
  await analytics.flush();

  return Response.json({ success: true });
}
```

### Feature Flag Usage

```typescript
// components/NewFeature.tsx
'use client';

import { useAnalytics } from '@gabfon/analytics/lib/client';

export function NewFeature() {
  const analytics = useAnalytics();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if feature is enabled for current user
    const enabled = analytics.isFeatureEnabled('new_dashboard');
    setIsEnabled(enabled);

    // Track feature flag exposure
    analytics.track('feature_flag_exposed', {
      flag_name: 'new_dashboard',
      enabled,
    });
  }, [analytics]);

  if (!isEnabled) {
    return <div>Feature not available</div>;
  }

  return <div>New Feature Content</div>;
}
```

### A/B Testing

```typescript
// components/PricingPage.tsx
'use client';

import { useAnalytics } from '@gabfon/analytics/lib/client';

export function PricingPage() {
  const analytics = useAnalytics();

  const getVariant = () => {
    const variant = analytics.getVariant('pricing_test');
    
    // Track experiment exposure
    analytics.track('experiment_exposed', {
      experiment_name: 'pricing_test',
      variant,
    });

    return variant;
  };

  const variant = getVariant();

  return (
    <div>
      {variant === 'control' ? (
        <StandardPricing />
      ) : (
        <NewPricing />
      )}
    </div>
  );
}
```

## Error Handling

### Environment Validation Errors

```typescript
import { keys } from '@gabfon/analytics/keys';

try {
  const env = keys();
  // Use environment variables
} catch (error) {
  console.error('Analytics configuration error:', error);
  // Handle missing or invalid environment variables
}
```

### Analytics Runtime Errors

```typescript
import { useAnalytics } from '@gabfon/analytics/lib/client';

function SafeTracking() {
  const analytics = useAnalytics();

  const trackEvent = (eventName: string, properties?: object) => {
    try {
      analytics.track(eventName, properties);
    } catch (error) {
      console.error('Analytics tracking error:', error);
      // Fallback behavior
    }
  };

  return <button onClick={() => trackEvent('button_click')}>Click me</button>;
}
```

## Best Practices

### 1. Event Naming
- Use consistent naming conventions (snake_case)
- Include relevant context in event names
- Avoid overly generic names

### 2. User Identification
- Identify users as early as possible
- Include relevant user properties
- Handle anonymous users appropriately

### 3. Privacy Compliance
- Respect user privacy preferences
- Implement data retention policies
- Provide opt-out mechanisms

### 4. Performance
- Use server-side tracking for sensitive data
- Batch events when possible
- Avoid blocking operations

### 5. Testing
- Test analytics in development environments
- Verify event properties are correct
- Test error handling scenarios

## Integration with Other Packages

### Design System Integration

```typescript
import { Button } from '@gabfon/design-system';
import { useAnalytics } from '@gabfon/analytics/lib/client';

function TrackedButton({ children, event, ...props }) {
  const analytics = useAnalytics();

  return (
    <Button
      {...props}
      onClick={() => {
        analytics.track(event);
        props.onClick?.();
      }}
    >
      {children}
    </Button>
  );
}
```

### Security Integration

```typescript
import { AnalyticsProvider } from '@gabfon/analytics';
import { SecurityProvider } from '@gabfon/security';

function App() {
  return (
    <SecurityProvider>
      <AnalyticsProvider>
        <YourApp />
      </AnalyticsProvider>
    </SecurityProvider>
  );
}
```

## Testing

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { AnalyticsProvider } from '@gabfon/analytics';

// Mock PostHog
jest.mock('posthog-js/react', () => ({
  usePostHog: () => ({
    track: jest.fn(),
    identify: jest.fn(),
  }),
}));

test('AnalyticsProvider renders children', () => {
  render(
    <AnalyticsProvider>
      <div>Test Content</div>
    </AnalyticsProvider>
  );

  expect(screen.getByText('Test Content')).toBeInTheDocument();
});
```

### Hook Testing

```typescript
import { renderHook } from '@testing-library/react';
import { useAnalytics } from '@gabfon/analytics/lib/client';

test('useAnalytics returns PostHog instance', () => {
  const { result } = renderHook(() => useAnalytics());
  
  expect(result.current.track).toBeDefined();
  expect(result.current.identify).toBeDefined();
});
```

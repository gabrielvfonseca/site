/**
 * Web Vitals tracking module
 * Monitors Core Web Vitals (LCP, FID, CLS) and reports to Sentry
 * for performance monitoring and debugging
 */

import * as Sentry from '@sentry/nextjs';

export interface WebVitalsMetrics {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Get Cumulative Layout Shift (CLS)
 * Measures visual stability - lower is better
 * Good: < 0.1, Needs improvement: 0.1 - 0.25, Poor: > 0.25
 */
export const getCLS = (callback: (metric: WebVitalsMetrics) => void) => {
  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];

  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!('hadRecentInput' in entry) || !entry.hadRecentInput) {
        const firstSessionEntry = clsEntries[0];
        const lastSessionEntry = clsEntries[clsEntries.length - 1];

        if (
          entry.startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
          entry.startTime - (firstSessionEntry?.startTime || 0) < 5000
        ) {
          clsEntries.push(entry);
          clsValue += (entry as any).value;
        } else {
          clsEntries = [entry as any];
          clsValue = (entry as any).value;
        }
      }
    }

    const metric: WebVitalsMetrics = {
      name: 'CLS',
      value: clsValue,
      rating:
        clsValue <= 0.1
          ? 'good'
          : clsValue <= 0.25
            ? 'needs-improvement'
            : 'poor',
      delta: clsValue,
      id: `cls-${Date.now()}`,
    };

    callback(metric);
  });

  observer.observe({ type: 'layout-shift', buffered: true });

  return observer;
};

/**
 * Get Largest Contentful Paint (LCP)
 * Measures when the largest content element becomes visible
 * Good: < 2.5s, Needs improvement: 2.5 - 4s, Poor: > 4s
 */
export const getLCP = (callback: (metric: WebVitalsMetrics) => void) => {
  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
      renderTime?: number;
      loadTime?: number;
    };

    const value = (lastEntry.renderTime || lastEntry.loadTime || 0) as number;

    const metric: WebVitalsMetrics = {
      name: 'LCP',
      value,
      rating:
        value <= 2500
          ? 'good'
          : value <= 4000
            ? 'needs-improvement'
            : 'poor',
      delta: value,
      id: `lcp-${Date.now()}`,
    };

    callback(metric);
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });

  return observer;
};

/**
 * Get First Contentful Paint (FCP)
 * Measures when the first content element becomes visible
 * Good: < 1.8s, Needs improvement: 1.8 - 3s, Poor: > 3s
 */
export const getFCP = (callback: (metric: WebVitalsMetrics) => void) => {
  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];

    const metric: WebVitalsMetrics = {
      name: 'FCP',
      value: lastEntry.startTime,
      rating:
        lastEntry.startTime <= 1800
          ? 'good'
          : lastEntry.startTime <= 3000
            ? 'needs-improvement'
            : 'poor',
      delta: lastEntry.startTime,
      id: `fcp-${Date.now()}`,
    };

    callback(metric);
  });

  observer.observe({ type: 'paint', buffered: true });

  return observer;
};

/**
 * Report Web Vitals metrics to Sentry
 */
export const reportWebVitals = (metric: WebVitalsMetrics) => {
  const message = `${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`;

  if (metric.rating === 'poor') {
    Sentry.captureMessage(message, 'error');
  } else if (metric.rating === 'needs-improvement') {
    Sentry.captureMessage(message, 'warning');
  } else {
    Sentry.captureMessage(message, 'info');
  }

  // Also send as a transaction for detailed performance analysis
  Sentry.captureEvent({
    message,
    level:
      metric.rating === 'poor'
        ? 'error'
        : metric.rating === 'needs-improvement'
          ? 'warning'
          : 'info',
    tags: {
      metric: metric.name,
      rating: metric.rating,
    },
    measurements: {
      [metric.name.toLowerCase()]: {
        value: metric.value,
        unit: 'millisecond',
      },
    },
  });
};

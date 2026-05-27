/**
 * Web Vitals Initialization Component
 * Client-side component that sets up Core Web Vitals monitoring
 * Should be placed in the root layout for app-wide performance tracking
 */

'use client';

import { useEffect } from 'react';
import { getCLS, getFCP, getLCP, reportWebVitals } from '@/lib/web-vitals';

export function WebVitalsInit() {
  useEffect(() => {
    // Initialize CLS tracking
    const clsObserver = getCLS(reportWebVitals);

    // Initialize LCP tracking
    const lcpObserver = getLCP(reportWebVitals);

    // Initialize FCP tracking
    const fcpObserver = getFCP(reportWebVitals);

    // Cleanup observers when component unmounts
    return () => {
      clsObserver.disconnect();
      lcpObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  // This component renders nothing - it only sets up tracking
  return null;
}

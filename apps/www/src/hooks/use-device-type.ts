"use client";

import { useMemo } from 'react';

function useDeviceInfo() {
  const deviceInfo = useMemo(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Check for mobile devices
    if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
      return { device: 'Mobile' };
    }

    // Check for Mac devices
    if (/Macintosh|Mac OS X/.test(userAgent)) {
      return { device: 'Mac' };
    }

    // Default to regular computer
    return { device: 'Regular Computer' };
  }, []);

  return deviceInfo;
}

export default useDeviceInfo;
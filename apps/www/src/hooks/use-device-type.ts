"use client";

// Function to get the device type
export const useDeviceType = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Check if the device is mobile
  if (/android/i.test(userAgent)) {
    return 'Android';
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }
  
  // Check if the OS is macOS
  if (navigator.platform.toUpperCase().includes('MAC')) {
    return 'macOS';
  }
  
  // Check if the OS is Windows
  if (navigator.platform.toUpperCase().includes('WIN')) {
    return 'Windows';
  }
  
  // Default to unknown
  return 'Unknown';
};

import confetti from 'canvas-confetti';
import { confettiColors } from '@/constants/colors';

/**
 * The ConfettiSideCannons for the site.
 * @returns The ConfettiSideCannons for the site.
 */
export function ConfettiSideCannons(): void {
  // Set the end time for the confetti
  const CONFETTI_DURATION_MS = 3 * 1000; // 3 seconds
  const end = Date.now() + CONFETTI_DURATION_MS;

  // Define the frame function
  const frame = () => {
    // Check if the current time is greater than the end time
    if (Date.now() > end) {
      return;
    }

    // Call the frame function recursively
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: confettiColors,
    });
    // Call the frame function recursively
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: confettiColors,
    });

    // Call the frame function recursively
    requestAnimationFrame(frame);
  };

  // Start the frame function
  frame();
}

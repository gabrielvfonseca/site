import confetti from 'canvas-confetti';
import { confettiColors } from '@/constants/colors';

/**
 * The ConfettiSideCannons for the site.
 * @returns The ConfettiSideCannons for the site.
 */
export function ConfettiSideCannons(): void {
  // Define the confetti duration
  const SECONDS_IN_MS = 1000;
  const CONFETTI_DURATION_SECONDS = 3;
  const CONFETTI_DURATION_MS = CONFETTI_DURATION_SECONDS * SECONDS_IN_MS;
  const CONFETTI_END_TIME = Date.now() + CONFETTI_DURATION_MS;

  // Define the confetti frame function
  const frame = () => {
    // Check if the current time is greater than the end time
    if (Date.now() > CONFETTI_END_TIME) {
      return;
    }

    // Call the confetti frame function recursively
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: confettiColors,
    });
    // Call the confetti frame function recursively
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: confettiColors,
    });

    // Call the confetti frame function recursively
    requestAnimationFrame(frame);
  };

  // Start the confetti frame function
  frame();
}

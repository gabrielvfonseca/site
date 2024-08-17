import confetti from 'canvas-confetti';

export function ConfettiSideCannons() {
    // Set the end time for the confetti
    const end = Date.now() + 3 * 1000; // 3 seconds

    // Define the colors for the confetti
    const colors: string[] = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

    // Define the frame function
    const frame = () => {
        // Check if the current time is greater than the end time
        if (Date.now() > end) return;

        // Call the frame function recursively
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
        });
        // Call the frame function recursively
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
        });

        // Call the frame function recursively
        requestAnimationFrame(frame);
    };

    // Start the frame function
    frame();
};
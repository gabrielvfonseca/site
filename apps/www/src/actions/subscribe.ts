'use server'; // Run this code on the server

// Import the subscription function
import { subscription } from '@utils/subscription';

// Create a new subscription
export default async function Subscribe (email: string) {
    // Return the subscription
    return await subscription(email);
};
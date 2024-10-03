'use server'; // Run this code on the server

// Import the subscription function
import { subscription } from '@services/subscription';

// Types
import type { SubscriptionRequest, SubscriptionResponse } from '@services/subscription';

// Create a new subscription
export default async function Subscribe ({ 
    email 
}: SubscriptionRequest): Promise<SubscriptionResponse> {
    // Return the subscription
    return await subscription({ email: email});
};
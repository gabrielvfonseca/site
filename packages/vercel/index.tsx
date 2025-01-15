import { ReactNode } from 'react';

import { Analytics } from './analytics';
import { SpeedInsights } from './speed-insights';

export const VercelAnalytics = ({ 
    children 
}: {
    children: ReactNode
}) => (
    <>
        {children}
        <SpeedInsights />
        <Analytics />
    </>
);
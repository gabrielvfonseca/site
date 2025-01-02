import { Suspense } from 'react';

import SignForm from '@/components/forms/sign-form';

export const Newsletter = () => (
    <Suspense fallback={null}>
        <SignForm />
    </Suspense>
);
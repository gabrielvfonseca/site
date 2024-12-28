import { Suspense } from 'react';

import SignForm from '@/components/forms/sign-form';

export default function Newsletter () {
    return (
        <Suspense fallback={null}>
            <SignForm />
        </Suspense>
    );
};
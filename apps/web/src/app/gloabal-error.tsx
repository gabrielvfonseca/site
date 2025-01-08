'use client';  // Error boundaries must be Client Components

import '@repo/design-system/styles/globals.css';

import { fonts } from '@repo/design-system/lib/fonts';

import { cn } from '@repo/design-system/lib/utils';

import { DesignSystemProvider } from '@repo/design-system';

import { Button } from '@repo/design-system/components/ui/button';
 
// Global error fallback
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    return (
        // global-error must include html and body tags
        <html
            lang='en'
            className={cn(fonts)}
            suppressHydrationWarning
        >   
            <body>
                <DesignSystemProvider>
                    <div className='flex flex-col gap-y-2 justify-center items-center flex-1 min-h-screen'>
                        <div className='font-medium tracking-wide leading-none text-primary'>
                            Global application error
                        </div>
                        {error.message && (
                            <p className='font-normal mb-1 text-sm text-secondary tracking-wide leading-none'>
                                {error.message}
                            </p>
                        )}
                        <Button 
                            size='sm'
                            variant='outline'
                            onClick={() => reset()}
                        >
                            Try again
                        </Button>
                    </div>
                </DesignSystemProvider>
            </body>
        </html>
    );
};
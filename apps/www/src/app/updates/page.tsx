import React from "react";

// Subscribe
import Subscribe from "@/components/forms/subscribe";

// Page JSX component
export default function Page(): JSX.Element {
    return (
        <div>
            <div className='mb-8 mt-8 sm:mt-10'>
                <h3 className='block mb-4 text-md'>
                    Recieve updates
                </h3>

                <p className='mb-4'>
                    I began working on a new project, which I'm excited 
                    to share with you soon. In the meantime, you can 
                    subscribe an recieve notes about other topics I 
                    write about.
                </p>

                <p className='mb-4'>
                    No spam, unsubscribe at any time.
                </p>

                <Subscribe />
            </div>
        </div>
    );
};
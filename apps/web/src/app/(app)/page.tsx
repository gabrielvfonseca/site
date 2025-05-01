import React from 'react';

import Link from 'next/link';


export default function Homepage() {
    return (
        <div className="pb-24 sm:pt-16 space-y-8 md:space-y-16">
            
            <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-6">
                <h4 className="col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:pt-0 md:text-right md:text-base md:font-normal md:text-opacity-40"></h4>
                <div className="col-span-10">
                    <div className="flex flex-col gap-4 prose text-primary">
                        <p>
                            Hey, I'm Gabriel. I'm a designer, 
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/brianlovin">software engineer</a>, 
                            <a target="_blank" rel="noopener noreferrer" href="https://designdetails.fm">podcaster</a>, 
                            and <a href="/writing">writer</a>. I'm currently designing products at 
                            <a target="_blank" rel="noopener noreferrer" href="https://notion.com">Notion</a>. 
                            Before Notion, I was the co-founder and CEO at 
                            <a target="_blank" rel="noopener noreferrer" href="https://campsite.com">Campsite</a>, 
                            an app that combined posts, docs, calls, and chat to enable thoughtful team collaboration.
                        </p>
                        <p>
                            Before Campsite, I spent four years designing the 
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/mobile">GitHub Mobile apps</a>. 
                            I joined GitHub after they acquired my first startup, 
                            <a target="_blank" rel="noopener noreferrer" href="https://spectrum.chat">Spectrum</a>, 
                            a platform for large-scale communities to have better public conversations.
                        </p>
                        <p>
                            Before Spectrum I designed payments experiences at Facebook, working across Facebook, Messenger, WhatsApp, and Instagram. 
                            I originally cut my teeth as the first product designer at 
                            <a target="_blank" rel="noopener noreferrer" href="https://buffer.com">Buffer</a>.
                        </p>
                        <p>
                            I also co-host the 
                            <a target="_blank" rel="noopener noreferrer" href="https://designdetails.fm">Design Details Podcast</a>, 
                            a weekly conversation about design process and culture.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

// Next OG
import { ImageResponse } from 'next/og';

// Config
import { siteConfig } from '@config/site';

// GET request handler for the route OG
export function GET(request: Request) {
  // Retrieve the title from the query parameters
  let url = new URL(request.url)
  // Set the title to the query parameter or default to the site name
  let title = url.searchParams.get('title') || siteConfig.siteName

  // Return the image response
  return new ImageResponse (
    (
      <div tw='flex flex-col w-full h-full items-center justify-center bg-white'>
        <div tw='flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8'>
          <h2 tw='flex flex-col text-4xl font-bold tracking-tight text-left'>
            {title}
          </h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

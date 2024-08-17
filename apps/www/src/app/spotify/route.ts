
// Fetcher function
import { getPlayingTrack } from '@utils/spotify';

// GET request handler
export async function GET() {
  // Try to fetch the currently playing track
  try {
    // Fetch the currently playing track
    const response = await getPlayingTrack();

    // What if response is null ?
    if (!response) {
      return Response.json({ state: false, data: {} }, { status: 500 });
    }

    // Check if the response is empty
    const data = await response.json();

    // If threre is no data, return a 500 response
    if (!data) {
      return new Response(JSON.stringify({ state: false, data: {} }), { status: 500 });
    }

    // If the response status is 204 or 202, return a 200 response
    if (response.status === 204 || response.status === 202) {
      return Response.json({ 
        state: false, 
        data: {} 
      }, { status: 200 });
    };

    // If the response status is not 200, throw an error
    if (response.status !== 200) {
      throw new Error('Failed to fetch currently playing track');
    };

    // If there is no item, return a 200 response
    if (!data.item) {
      return Response.json({ 
        state: false, 
        data: {} 
      }, { status: 200 });
    };

    // Format data
    return Response.json({
      state: true,
      data: {
        name: data.item.name,
        url: data.item.external_urls.spotify,
        image: data.item.album.images[0].url,
        album: data.item.album.name,
        artist: data.item.artists.map((artist:any) => artist.name).join(', '),
      },
    }, { status: 200 });

  } catch (error) {
    // Log the error and return a 500 response
    return Response.json({ error: error }, { status: 500 });
  };
};
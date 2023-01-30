// ./pages/api/spotify/tracks.ts

import { getTopTracks } from './index';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function tracks(req: NextApiRequest, res: NextApiResponse) {
  const response = await getTopTracks();
  const { items } = await response.json();

  return res.status(200).json({ items });
}

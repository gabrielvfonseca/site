// ./pages/api/spotify/playing.ts

import { getNowPlaying } from './index'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function play(req: NextApiRequest, res: NextApiResponse) {
  const response = await getNowPlaying()

  if (response.status !== 200) {
    return res.status(200).json({ isPlaying: false })
  } else {
    const song = await response.json()
    const isPlaying = song?.is_playing
    const title = song?.item.name
    const album = song?.item.album.name
    const albumImageUrl = song?.item.album.images[0].url
    const songUrl = song?.item.external_urls.spotify
    const artist = song?.item.artists[0].name

    return res.status(200).json({
      isPlaying,
      album,
      artist,
      albumImageUrl,
      songUrl,
      title,
    })
  }
}

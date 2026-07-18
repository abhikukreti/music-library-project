export function transformSong(raw) {
  return {
    id: raw.trackId,
    title: raw.trackName,
    artist: raw.artistName,
    album: raw.collectionName,
    year: raw.releaseDate ? new Date(raw.releaseDate).getFullYear() : null,
    artwork: raw.artworkUrl100,
  }
}
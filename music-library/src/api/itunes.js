export async function fetchSongs(term) {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=50`
  )
  if (!res.ok) throw new Error('Failed to fetch songs')
  const data = await res.json()
  return data.results
}
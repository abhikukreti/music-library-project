import { useQuery } from '@tanstack/react-query'
import { fetchSongs } from '../api/itunes'
import { transformSong } from '../utils/transformSongs'

export function useSongsQuery(term = 'the beatles') {
  return useQuery({
    queryKey: ['songs', term],
    queryFn: () => fetchSongs(term),
    select: (raw) => raw.map(transformSong),
    staleTime: 5 * 60 * 1000,
  })
}
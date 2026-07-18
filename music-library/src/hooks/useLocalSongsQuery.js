import { useQuery } from '@tanstack/react-query'

export function useLocalSongsQuery() {
  return useQuery({
    queryKey: ['localSongs'],
    queryFn: () => [],
    initialData: [],
    staleTime: Infinity,
  })
}
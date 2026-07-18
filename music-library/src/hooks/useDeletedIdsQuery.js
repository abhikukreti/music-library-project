import { useQuery } from '@tanstack/react-query'

export function useDeletedIdsQuery() {
  return useQuery({
    queryKey: ['deletedSongIds'],
    queryFn: () => [],
    initialData: [],
    staleTime: Infinity,
  })
}
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useAddSongMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (song) =>
      fetch('/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song),
      }).then((res) => res.json()),
    onSuccess: (newSong) => {
      queryClient.setQueryData(['localSongs'], (old = []) => [...old, newSong])
    },
  })
}

export function useDeleteSongMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) =>
      fetch(`/songs/${id}`, { method: 'DELETE' }).then((res) => res.json()),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['deletedSongIds'], (old = []) => [...old, deletedId])
      queryClient.setQueryData(['localSongs'], (old = []) => old.filter((s) => s.id !== deletedId))
    },
  })
}
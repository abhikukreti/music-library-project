import { http, HttpResponse } from 'msw'

let addedSongs = []

export const handlers = [
  http.post('/songs', async ({ request }) => {
    const body = await request.json()
    const newSong = { ...body, id: `local-${Date.now()}` }
    addedSongs.push(newSong)
    return HttpResponse.json(newSong, { status: 201 })
  }),

  http.delete('/songs/:id', ({ params }) => {
    addedSongs = addedSongs.filter((s) => s.id !== params.id)
    return HttpResponse.json({ ok: true })
  }),
]
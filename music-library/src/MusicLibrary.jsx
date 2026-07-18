import { useState } from 'react'
import { useSongsQuery } from './hooks/useSongsQuery'
import { useLocalSongsQuery } from './hooks/useLocalSongsQuery'
import { useDeletedIdsQuery } from './hooks/useDeletedIdsQuery'
import { AddSongForm } from './components/AddSongForm'
import { useDeleteSongMutation } from './api/songsMutations'

function MusicLibrary({ isAdmin }) {
  const { data: songs, isLoading, isError, error } = useSongsQuery('the beatles')
  const { data: localSongs } = useLocalSongsQuery()
  const { data: deletedIds } = useDeletedIdsQuery()
  const deleteSong = useDeleteSongMutation()

  const [filterField, setFilterField] = useState('title')
  const [filterValue, setFilterValue] = useState('')
  const [sortField, setSortField] = useState('title')
  const [groupByField, setGroupByField] = useState('')

  if (isLoading) return <p>Loading songs...</p>
  if (isError) return <p>Error: {error.message}</p>

  const allSongs = [...songs, ...localSongs].filter((s) => !deletedIds.includes(s.id))

  const filtered = allSongs.filter((s) =>
    filterValue ? String(s[filterField] ?? '').toLowerCase().includes(filterValue.toLowerCase()) : true
  )

  const sorted = [...filtered].sort((a, b) =>
    String(a[sortField] ?? '').localeCompare(String(b[sortField] ?? ''))
  )

  const grouped = sorted.reduce((acc, song) => {
    const key = song[groupByField] || 'Unknown'
    acc[key] = acc[key] ? [...acc[key], song] : [song]
    return acc
  }, {})

  return (
    <div>
      <h1>Music Library</h1>
      {isAdmin && <AddSongForm />}

      <div>
        <label>Filter by: </label>
        <select value={filterField} onChange={(e) => setFilterField(e.target.value)}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <input
          placeholder="Search value..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>

      <div>
        <label>Sort by: </label>
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
      </div>

      <div>
        <label>Group by: </label>
        <select value={groupByField} onChange={(e) => setGroupByField(e.target.value)}>
          <option value="">None</option>
          <option value="album">Album</option>
          <option value="artist">Artist</option>
          <option value="title">Title</option>
        </select>
      </div>

      {groupByField ? (
        Object.entries(grouped).map(([groupName, groupSongs]) => (
          <div key={groupName}>
            <h3>{groupName}</h3>
            <ul>
              {groupSongs.map((song) => (
                <li key={song.id}>
                  {song.title} — {song.artist} ({song.album}, {song.year})
                  {isAdmin && <button onClick={() => deleteSong.mutate(song.id)}>Delete</button>}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul>
          {sorted.map((song) => (
            <li key={song.id}>
              {song.title} — {song.artist} ({song.album}, {song.year})
              {isAdmin && <button onClick={() => deleteSong.mutate(song.id)}>Delete</button>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MusicLibrary
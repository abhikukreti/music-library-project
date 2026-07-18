import { useForm } from 'react-hook-form'
import { useAddSongMutation } from '../api/songsMutations'

export function AddSongForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const addSong = useAddSongMutation()

  const onSubmit = (data) => {
    addSong.mutate(
      { ...data, year: Number(data.year) },
      { onSuccess: () => reset() }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add Song</h3>

      <input placeholder="Title" {...register('title', { required: true })} />
      {errors.title && <span> Title is required</span>}

      <input placeholder="Artist" {...register('artist', { required: true })} />
      {errors.artist && <span> Artist is required</span>}

      <input placeholder="Album" {...register('album', { required: true })} />
      {errors.album && <span> Album is required</span>}

      <input
        type="number"
        placeholder="Year"
        {...register('year', { required: true, valueAsNumber: true, min: 1900, max: 2100 })}
      />
      {errors.year && <span> Enter a valid year</span>}

      <button type="submit" disabled={addSong.isPending}>
        {addSong.isPending ? 'Adding...' : 'Add Song'}
      </button>
    </form>
  )
}
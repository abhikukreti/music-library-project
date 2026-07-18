import { lazy, Suspense } from 'react'
import { useAuth } from './auth/AuthContext'
import { Login } from './components/Login'

const MusicLibrary = lazy(() => import('music_library/MusicLibrary'))

function App() {
  const { user, logout, isAdmin } = useAuth()

  if (!user) {
    return <Login />
  }

  return (
    <div>
      <p>
        Logged in as: <strong>{user.role}</strong>
        <button onClick={logout}>Logout</button>
      </p>

      <Suspense fallback={<p>Loading Music Library...</p>}>
        <MusicLibrary isAdmin={isAdmin} />
      </Suspense>
    </div>
  )
}

export default App
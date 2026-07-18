import { useAuth } from '../auth/AuthContext'

export function Login() {
  const { login } = useAuth()

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => login('admin')}>Login as Admin</button>
      <button onClick={() => login('user')}>Login as User</button>
    </div>
  )
}
export function createMockToken(role) {
  const payload = { role, sub: role === 'admin' ? 'admin-user' : 'regular-user', iat: Date.now() }
  return btoa(JSON.stringify(payload))
}

export function decodeMockToken(token) {
  try {
    return JSON.parse(atob(token))
  } catch {
    return null
  }
}
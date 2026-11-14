// API pública da feature "auth": exporte aqui o que outras partes do app podem usar.
export { AuthProvider } from './context/AuthProvider'
export { useAuth } from './hooks/useAuth'
export { ProtectedRoute } from './components/ProtectedRoute'
export type { LoginCredentials, User } from './types'

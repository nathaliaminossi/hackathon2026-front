import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'

// Envolve as rotas que exigem login. Sem usuário → manda para /login,
// guardando de onde veio para voltar depois de entrar.
export function ProtectedRoute() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}

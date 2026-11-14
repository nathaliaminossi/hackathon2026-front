import { useMemo, useState, type ReactNode } from 'react'
import * as authService from '../services/authService'
import type { LoginCredentials, User } from '../types'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  // Restaura a sessão salva para não pedir login a cada recarregamento.
  const [user, setUser] = useState<User | null>(authService.getStoredUser)

  const value = useMemo(
    () => ({
      user,
      login: async (credentials: LoginCredentials) => {
        setUser(await authService.login(credentials))
      },
      logout: () => {
        authService.logout()
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

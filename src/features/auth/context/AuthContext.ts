import { createContext } from 'react'
import type { LoginCredentials, User } from '../types'

export interface AuthContextValue {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

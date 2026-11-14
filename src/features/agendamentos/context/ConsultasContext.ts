import { createContext } from 'react'
import type { Consulta } from '@/types'

export interface ConsultasContextValue {
  consultas: Consulta[]
}

export const ConsultasContext = createContext<ConsultasContextValue | null>(null)

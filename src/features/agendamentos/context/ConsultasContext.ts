import { createContext } from 'react'
import type { Consulta } from '@/types'

export interface ConsultasContextValue {
  consultas: Consulta[]
  agendar: (consulta: Omit<Consulta, 'id' | 'status'>) => Consulta
}

export const ConsultasContext = createContext<ConsultasContextValue | null>(null)

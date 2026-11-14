import { useMemo, useState, type ReactNode } from 'react'
import { consultasIniciais } from '@/data/consultas'
import type { Consulta } from '@/types'
import { ConsultasContext } from './ConsultasContext'

// Estado local (mock) das consultas. Quando houver backend, buscar via services/api.
export function ConsultasProvider({ children }: { children: ReactNode }) {
  const [consultas] = useState<Consulta[]>(consultasIniciais)
  const value = useMemo(() => ({ consultas }), [consultas])
  return <ConsultasContext value={value}>{children}</ConsultasContext>
}

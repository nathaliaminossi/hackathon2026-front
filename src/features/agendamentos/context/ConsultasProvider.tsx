import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { consultasIniciais } from '@/data/consultas'
import type { Consulta } from '@/types'
import { ConsultasContext } from './ConsultasContext'

// Estado local (mock) das consultas: o que for agendado aparece no Início e no Calendário.
export function ConsultasProvider({ children }: { children: ReactNode }) {
  const [consultas, setConsultas] = useState<Consulta[]>(consultasIniciais)

  const agendar = useCallback((dados: Omit<Consulta, 'id' | 'status'>) => {
    const nova: Consulta = { ...dados, id: `c${Date.now()}`, status: 'confirmada' }
    setConsultas((atual) => [...atual, nova].sort((a, b) => a.inicio.getTime() - b.inicio.getTime()))
    return nova
  }, [])

  const value = useMemo(() => ({ consultas, agendar }), [consultas, agendar])
  return <ConsultasContext value={value}>{children}</ConsultasContext>
}

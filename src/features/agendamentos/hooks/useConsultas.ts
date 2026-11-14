import { useContext, useState } from 'react'
import { ConsultasContext } from '../context/ConsultasContext'

export function useConsultas() {
  const context = useContext(ConsultasContext)
  if (!context) throw new Error('useConsultas precisa estar dentro de <ConsultasProvider>')
  return context
}

/** Próxima consulta futura que ainda vai acontecer. */
export function useProximaConsulta() {
  const { consultas } = useConsultas()
  const [agora] = useState(() => Date.now())
  return consultas
    .filter((c) => c.inicio.getTime() > agora && (c.status === 'confirmada' || c.status === 'pendente'))
    .sort((a, b) => a.inicio.getTime() - b.inicio.getTime())[0]
}

import { Video } from 'lucide-react'
import { Card } from '@/components/ui'
import type { Consulta } from '@/types'
import { formatTime } from '@/utils/date'
import { AppointmentStatusText } from './AppointmentStatusBadge'

/** Card de consulta na lista: hora + duração à esquerda, detalhes à direita. */
export function ConsultaListItem({ consulta }: { consulta: Consulta }) {
  return (
    <Card className="flex items-stretch gap-4">
      <div className="flex w-12 shrink-0 flex-col justify-center">
        <span className="text-base font-bold text-primary-900 tabular-nums">{formatTime(consulta.inicio)}</span>
        <span className="text-[11px] text-ink-secondary">{consulta.duracaoMin} min</span>
      </div>
      <div aria-hidden="true" className="w-px bg-border" />
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-semibold text-ink">{consulta.especialidade}</p>
        <p className="flex items-center gap-1 truncate text-[13px] text-ink-secondary">
          {consulta.profissional}
          {consulta.modalidade === 'teleconsulta' && (
            <>
              <span aria-hidden="true">·</span>
              <Video aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
              <span>Online</span>
            </>
          )}
        </p>
        <div className="pt-1">
          <AppointmentStatusText status={consulta.status} />
        </div>
      </div>
    </Card>
  )
}

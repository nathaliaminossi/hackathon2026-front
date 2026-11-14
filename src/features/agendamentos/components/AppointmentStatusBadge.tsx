import { Badge, type BadgeTone } from '@/components/ui'
import { cn } from '@/utils/cn'
import type { AppointmentStatus } from '../types'

const statusConfig: Record<AppointmentStatus, { label: string; tone: BadgeTone; text: string }> = {
  pendente: { label: 'Aguardando confirmação', tone: 'warning', text: 'text-warning' },
  confirmada: { label: 'Confirmada', tone: 'success', text: 'text-accent-700' },
  cancelada: { label: 'Cancelada', tone: 'danger', text: 'text-danger' },
  reagendamento_solicitado: { label: 'Reagendamento solicitado', tone: 'primary', text: 'text-primary-700' },
  realizada: { label: 'Realizada', tone: 'neutral', text: 'text-ink-secondary' },
  falta: { label: 'Não compareceu', tone: 'danger', text: 'text-danger' },
}

/** Selo de status (fundo colorido). */
export function AppointmentStatusBadge({ status, className }: { status: AppointmentStatus; className?: string }) {
  const { label, tone } = statusConfig[status]
  return (
    <Badge tone={tone} className={className}>
      {label}
    </Badge>
  )
}

/** Status em texto com ponto (usado nas listas). */
export function AppointmentStatusText({ status }: { status: AppointmentStatus }) {
  const { label, text } = statusConfig[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold', text)}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

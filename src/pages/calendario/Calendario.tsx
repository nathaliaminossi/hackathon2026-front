import { CalendarPlus, CalendarX2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import { buttonStyles, MonthCalendar, ScreenHeader, SectionHeader } from '@/components/ui'
import { ConsultaListItem, useConsultas } from '@/features/agendamentos'
import { useToday } from '@/hooks/useToday'
import { formatRelativeDay, fromISODate, isSameDay, toISODate } from '@/utils/date'

export default function Calendario() {
  const { consultas } = useConsultas()
  // O dia selecionado fica na URL (?dia=2026-11-18): dá para linkar direto da Home e dos avisos.
  const [params, setParams] = useSearchParams()
  const hoje = useToday()
  const selecionado = fromISODate(params.get('dia')) ?? hoje

  const doDia = consultas.filter((c) => isSameDay(c.inicio, selecionado))
  const qtdNoDia = (d: Date) => consultas.filter((c) => isSameDay(c.inicio, d)).length

  return (
    <div className="space-y-6 px-5 pt-8 pb-6">
      <ScreenHeader title="Calendário" subtitle="Suas consultas, todas num só lugar." />

      <MonthCalendar
        selected={selecionado}
        onSelect={(d) => setParams({ dia: toISODate(d) }, { replace: true })}
        countOn={qtdNoDia}
      />

      <section aria-labelledby="dia-titulo" aria-live="polite">
        <SectionHeader
          id="dia-titulo"
          title={formatRelativeDay(selecionado)}
          action={
            <span className="text-xs text-ink-secondary">
              {doDia.length === 0 ? 'Sem consultas' : `${doDia.length} ${doDia.length > 1 ? 'consultas' : 'consulta'}`}
            </span>
          }
        />
        {doDia.length > 0 ? (
          <ul className="space-y-3">
            {doDia.map((c) => (
              <li key={c.id}>
                <ConsultaListItem consulta={c} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-3 rounded-card border border-dashed border-border p-4">
            <CalendarX2 aria-hidden="true" className="size-5 shrink-0 text-ink-muted" strokeWidth={1.75} />
            <p className="text-[13px] text-ink-secondary">Nenhuma consulta neste dia. Aproveite para descansar. 💜</p>
          </div>
        )}
      </section>

      <Link to="/agendar" className={buttonStyles({ variant: 'secondary', fullWidth: true })}>
        <CalendarPlus aria-hidden="true" className="size-4" strokeWidth={1.75} />
        Agendar nova consulta
      </Link>
    </div>
  )
}

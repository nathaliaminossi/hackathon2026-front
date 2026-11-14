import { useState } from 'react'
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  FileText,
  Pill,
  Star,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router'
import { PillTabs, ScreenHeader, type PillTab } from '@/components/ui'
import { avisosIniciais } from '@/data/avisos'
import { useToday } from '@/hooks/useToday'
import type { Aviso, AvisoIcone } from '@/types'
import { cn } from '@/utils/cn'
import { formatDayMonth, formatRelativeDay, formatTime, startOfDay } from '@/utils/date'

type Filtro = 'todos' | 'nao-lidos' | 'consultas'

const icones: Record<AvisoIcone, LucideIcon> = {
  calendar: CalendarDays,
  file: FileText,
  pill: Pill,
  user: UserRound,
  star: Star,
}

/** Agrupa por "Hoje", "Ontem" e "Anteriores", mantendo a ordem (mais recente primeiro). */
function agrupar(avisos: Aviso[], hoje: number) {
  const grupos = new Map<string, Aviso[]>()
  for (const aviso of [...avisos].sort((a, b) => b.criadoEm.getTime() - a.criadoEm.getTime())) {
    const dias = Math.round((hoje - startOfDay(aviso.criadoEm).getTime()) / 86_400_000)
    const rotulo = dias <= 1 ? formatRelativeDay(aviso.criadoEm, new Date(hoje)) : 'Anteriores'
    grupos.set(rotulo, [...(grupos.get(rotulo) ?? []), aviso])
  }
  return [...grupos.entries()]
}

export default function Avisos() {
  const [avisos, setAvisos] = useState(avisosIniciais)
  const [filtro, setFiltro] = useState<Filtro>('todos')

  const naoLidos = avisos.filter((a) => !a.lido).length
  const tabs: PillTab<Filtro>[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'nao-lidos', label: 'Não lidos', count: naoLidos },
    { value: 'consultas', label: 'Consultas' },
  ]

  const visiveis = avisos.filter((a) =>
    filtro === 'nao-lidos' ? !a.lido : filtro === 'consultas' ? a.categoria === 'consulta' : true,
  )
  const hojeMs = useToday().getTime()
  const grupos = agrupar(visiveis, hojeMs)

  const marcarTodos = () => setAvisos((lista) => lista.map((a) => ({ ...a, lido: true })))
  const marcarLido = (id: string) => setAvisos((lista) => lista.map((a) => (a.id === id ? { ...a, lido: true } : a)))

  return (
    <div className="space-y-6 px-5 pt-8 pb-6">
      <ScreenHeader
        title="Avisos"
        subtitle={naoLidos > 0 ? `${naoLidos} ${naoLidos > 1 ? 'avisos novos' : 'aviso novo'} para você.` : 'Nada novo por aqui.'}
      />

      {/* Banner de status */}
      <div className="flex items-center gap-3 rounded-card bg-primary-100 p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-control bg-surface text-primary-700">
          <Bell aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-sm font-semibold text-primary-900">
            Você está em dia <span aria-hidden="true">💜</span>
          </p>
          <p className="text-xs text-primary-900/80">Suas próximas consultas estão confirmadas.</p>
        </div>
      </div>

      <div className="space-y-5">
        <PillTabs aria-label="Filtrar avisos" tabs={tabs} value={filtro} onChange={setFiltro} panelId="avisos-lista" />

        <div id="avisos-lista" role="tabpanel" aria-labelledby={`tab-${filtro}`} className="space-y-5">
          {grupos.length === 0 && (
            <div className="flex flex-col items-center gap-2 rounded-card border border-dashed border-border px-4 py-8 text-center">
              <span className="grid size-10 place-items-center rounded-control bg-accent-50 text-accent-700">
                <Check aria-hidden="true" className="size-5" strokeWidth={2} />
              </span>
              <p className="text-sm font-semibold text-primary-900">Tudo lido!</p>
              <p className="text-[13px] text-ink-secondary">Quando chegar algo novo, aparece aqui.</p>
            </div>
          )}

          {grupos.map(([rotulo, lista], i) => (
            <section key={rotulo} aria-labelledby={`grupo-${i}`}>
              <div className="mb-2 flex min-h-11 items-center justify-between">
                <h2 id={`grupo-${i}`} className="text-[11px] font-semibold tracking-[0.08em] text-ink-secondary uppercase">
                  {rotulo}
                </h2>
                {i === 0 && (
                  <button
                    type="button"
                    onClick={marcarTodos}
                    disabled={naoLidos === 0}
                    className="-mr-2 h-11 cursor-pointer rounded-control px-2 text-[13px] font-semibold text-accent-700 transition-colors ease-out hover:bg-accent-50 active:bg-accent-50 disabled:cursor-default disabled:text-ink-muted disabled:hover:bg-transparent"
                  >
                    Marcar como lidos
                  </button>
                )}
              </div>
              <ul className="space-y-3">
                {lista.map((aviso) => (
                  <li key={aviso.id}>
                    <AvisoCard aviso={aviso} hojeMs={hojeMs} onAcao={() => marcarLido(aviso.id)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function AvisoCard({ aviso, hojeMs, onAcao }: { aviso: Aviso; hojeMs: number; onAcao: () => void }) {
  const Icon = aviso.concluido ? Check : icones[aviso.icone]
  const recente = hojeMs - startOfDay(aviso.criadoEm).getTime() <= 86_400_000
  return (
    <article
      className={cn(
        'flex gap-3 rounded-card border bg-surface p-4 transition-colors ease-out',
        aviso.lido ? 'border-border' : 'border-primary-700/25',
      )}
    >
      <span
        className={cn(
          'grid size-10 shrink-0 place-items-center rounded-control',
          aviso.concluido ? 'bg-accent-50 text-accent-700' : 'bg-primary-100 text-primary-700',
        )}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={aviso.concluido ? 2 : 1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex items-center gap-1.5 text-sm font-bold text-ink">
            {!aviso.lido && (
              <>
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-primary-700" />
                <span className="sr-only">Não lido:</span>
              </>
            )}
            {aviso.titulo}
          </h3>
          <time
            dateTime={aviso.criadoEm.toISOString()}
            className="shrink-0 pt-0.5 text-[11px] text-ink-secondary tabular-nums"
          >
            {recente ? formatTime(aviso.criadoEm) : formatDayMonth(aviso.criadoEm)}
          </time>
        </div>
        <p className="mt-1 text-[13px] leading-snug text-ink-secondary">{aviso.descricao}</p>
        {aviso.acao && (
          <Link
            to={aviso.acao.to}
            onClick={onAcao}
            className="mt-1 -mb-2 inline-flex min-h-11 items-center gap-1 text-[13px] font-semibold text-accent-700 hover:underline"
          >
            {aviso.acao.label}
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
          </Link>
        )}
      </div>
    </article>
  )
}

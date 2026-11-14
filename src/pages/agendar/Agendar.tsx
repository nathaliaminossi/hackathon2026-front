import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock,
  MapPin,
  Stethoscope,
  UserRound,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import {
  Badge,
  Button,
  Card,
  Chip,
  Eyebrow,
  ScreenHeader,
  SectionHeader,
  SegmentedControl,
  type SegmentOption,
} from '@/components/ui'
import { useConsultas } from '@/features/agendamentos'
import { clinica, especialidades, horariosDoDia, horariosOcupados } from '@/data/especialidades'
import type { Consulta, Modalidade } from '@/types'
import { cn } from '@/utils/cn'
import {
  addDays,
  at,
  DIAS_CURTOS,
  formatDayMonth,
  formatLongDate,
  formatMonthYear,
  formatTime,
  isSameDay,
  startOfDay,
  toISODate,
} from '@/utils/date'

const modalidades: SegmentOption<Modalidade>[] = [
  { value: 'presencial', label: 'Presencial', icon: MapPin },
  { value: 'teleconsulta', label: 'Teleconsulta', icon: Video },
]

/** Próximos 14 dias com atendimento (sem domingos). */
function proximosDias() {
  const hoje = startOfDay(new Date())
  return Array.from({ length: 16 }, (_, i) => addDays(hoje, i + 1))
    .filter((d) => d.getDay() !== 0)
    .slice(0, 14)
}

/** Horários indisponíveis: agenda da clínica + consultas que a paciente já tem no dia. */
function indisponiveis(dia: Date, consultas: Consulta[]) {
  const minhas = consultas.filter((c) => isSameDay(c.inicio, dia)).map((c) => formatTime(c.inicio))
  return [...horariosOcupados(dia), ...minhas]
}

function primeiroHorarioLivre(ocupados: string[], preferido?: string) {
  if (preferido && !ocupados.includes(preferido)) return preferido
  return horariosDoDia.find((h) => !ocupados.includes(h)) ?? null
}

export default function Agendar() {
  const navigate = useNavigate()
  const { consultas, agendar } = useConsultas()
  const [dias] = useState(proximosDias)

  const [passo, setPasso] = useState<1 | 2>(1)
  const [especialidadeId, setEspecialidadeId] = useState('cardio')
  const [modalidade, setModalidade] = useState<Modalidade>('presencial')
  const [dia, setDia] = useState(() => dias.find((d) => isSameDay(d, at(4, '00:00'))) ?? dias[0])
  const [horario, setHorario] = useState<string | null>(() =>
    primeiroHorarioLivre(indisponiveis(dia, consultas), '10:00'),
  )

  const especialidade = especialidades.find((e) => e.id === especialidadeId)!
  const ocupados = indisponiveis(dia, consultas)

  const escolherDia = (novoDia: Date) => {
    setDia(novoDia)
    // Mantém o horário se ainda estiver livre no novo dia.
    if (horario && indisponiveis(novoDia, consultas).includes(horario)) setHorario(null)
  }

  const confirmar = () => {
    if (!horario) return
    const [h, m] = horario.split(':').map(Number)
    const inicio = new Date(dia)
    inicio.setHours(h, m, 0, 0)
    agendar({
      especialidade: especialidade.nome,
      profissional: especialidade.profissional,
      clinica: modalidade === 'teleconsulta' ? 'Teleconsulta' : clinica.nome,
      inicio,
      duracaoMin: 30,
      modalidade,
    })
    navigate(`/calendario?dia=${toISODate(inicio)}`)
  }

  return (
    <div className="space-y-6 px-5 pt-8 pb-6">
      <ScreenHeader title="Agendar consulta" subtitle="Tudo organizado, sem preocupação." />

      <Stepper passo={passo} />

      {passo === 1 ? (
        <>
          {/* Especialidade: select nativo invisível sobre o card (teclado e leitor de tela de graça) */}
          <div className="relative rounded-card border border-border bg-surface p-4 transition-colors ease-out hover:border-primary-700/30 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-300">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-control bg-primary-100 text-primary-700">
                <Stethoscope aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <Eyebrow className="text-ink-secondary">
                  <label htmlFor="especialidade">Especialidade</label>
                </Eyebrow>
                <p className="mt-0.5 text-[15px] font-bold text-primary-900">{especialidade.nome}</p>
                <p className="truncate text-xs text-ink-secondary">{especialidade.descricao}</p>
              </div>
              <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-primary-700" strokeWidth={1.75} />
            </div>
            <select
              id="especialidade"
              value={especialidadeId}
              onChange={(e) => setEspecialidadeId(e.target.value)}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            >
              {especialidades.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nome}
                </option>
              ))}
            </select>
          </div>

          <SegmentedControl
            aria-label="Tipo de atendimento"
            options={modalidades}
            value={modalidade}
            onChange={setModalidade}
          />

          {/* Dias */}
          <section aria-labelledby="dia-titulo">
            <SectionHeader
              id="dia-titulo"
              title="Escolha o dia"
              action={<span className="text-xs text-ink-secondary">{formatMonthYear(dia)}</span>}
            />
            <DaySelector dias={dias} selecionado={dia} onSelect={escolherDia} />
          </section>

          {/* Horários */}
          <section aria-labelledby="horario-titulo" className="space-y-3">
            <SectionHeader id="horario-titulo" title="Horários disponíveis" className="mb-0" />
            {(['Manhã', 'Tarde'] as const).map((periodo) => {
              const lista = horariosDoDia.filter((h) => (periodo === 'Manhã' ? h < '12:00' : h >= '12:00'))
              return (
                <div key={periodo} role="group" aria-label={periodo}>
                  <p className="mb-2 text-xs font-medium text-ink-secondary">{periodo}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {lista.map((h) => {
                      const ocupado = ocupados.includes(h)
                      return (
                        <Chip
                          key={h}
                          selected={horario === h}
                          disabled={ocupado}
                          aria-label={ocupado ? `${h}, indisponível` : h}
                          onClick={() => setHorario(h)}
                        >
                          {h}
                        </Chip>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </section>

          {/* Local */}
          <Card className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-control bg-primary-50 text-primary-700">
              {modalidade === 'presencial' ? (
                <MapPin aria-hidden="true" className="size-5" strokeWidth={1.75} />
              ) : (
                <Video aria-hidden="true" className="size-5" strokeWidth={1.75} />
              )}
            </span>
            <div className="text-[13px]">
              {modalidade === 'presencial' ? (
                <>
                  <p className="font-semibold text-ink">{clinica.nome}</p>
                  <p className="mt-0.5 text-ink-secondary">{clinica.endereco}</p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-ink">Consulta por vídeo</p>
                  <p className="mt-0.5 text-ink-secondary">O link da chamada chega no chat 30 min antes.</p>
                </>
              )}
            </div>
          </Card>

          <Button fullWidth disabled={!horario} onClick={() => setPasso(2)} className="justify-between">
            <span>{horario ? `Continuar · ${formatDayMonth(dia)}, ${horario}` : 'Escolha um horário'}</span>
            <ArrowRight aria-hidden="true" className="size-5" strokeWidth={2} />
          </Button>
        </>
      ) : (
        <>
          <Card className="divide-y divide-border p-0">
            <ResumoLinha icon={Stethoscope} label="Especialidade" valor={especialidade.nome} />
            <ResumoLinha icon={UserRound} label="Profissional" valor={especialidade.profissional} />
            <ResumoLinha icon={CalendarDays} label="Data" valor={formatLongDate(dia)} />
            <ResumoLinha icon={Clock} label="Horário" valor={`${horario} · 30 min`} />
            <ResumoLinha
              icon={modalidade === 'presencial' ? MapPin : Video}
              label="Local"
              valor={modalidade === 'presencial' ? clinica.nome : 'Teleconsulta (vídeo)'}
            />
          </Card>

          <p className="text-[13px] leading-relaxed text-ink-secondary">
            Vamos te lembrar um dia antes e 2 horas antes da consulta. Se precisar remarcar, é só chamar a
            gente no chat. 💜
          </p>

          <div className="space-y-3">
            <Button fullWidth onClick={confirmar} className="justify-between">
              <span>Confirmar agendamento</span>
              <ArrowRight aria-hidden="true" className="size-5" strokeWidth={2} />
            </Button>
            <Button variant="secondary" fullWidth onClick={() => setPasso(1)}>
              <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2} />
              Voltar e alterar
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

function Stepper({ passo }: { passo: 1 | 2 }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge tone="primary" className="tracking-[0.08em] uppercase">
          Passo {passo} de 2
        </Badge>
        <span className="text-[13px] font-medium text-ink">
          {passo === 1 ? 'Data e horário' : 'Confirmação'}
        </span>
      </div>
      <div className="flex gap-1.5" aria-hidden="true">
        {[1, 2].map((n) => (
          <span
            key={n}
            className={cn('h-1 flex-1 rounded-full transition-colors', n <= passo ? 'bg-primary-900' : 'bg-primary-100')}
          />
        ))}
      </div>
    </div>
  )
}

function DaySelector({
  dias,
  selecionado,
  onSelect,
}: {
  dias: Date[]
  selecionado: Date
  onSelect: (d: Date) => void
}) {
  const listRef = useRef<HTMLDivElement>(null)

  // Garante que o dia escolhido apareça na faixa ao abrir a tela.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]')
    el?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, []) // só na montagem

  return (
    <div ref={listRef} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-0.5">
      {dias.map((d) => {
        const ativo = isSameDay(d, selecionado)
        return (
          <button
            key={d.toISOString()}
            type="button"
            aria-pressed={ativo}
            aria-label={formatLongDate(d)}
            onClick={() => onSelect(d)}
            className={cn(
              'flex h-[72px] w-14 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-control border transition-colors ease-out',
              ativo
                ? 'border-primary-900 bg-primary-900 text-white'
                : 'border-border bg-surface text-ink hover:border-primary-700/40 hover:bg-primary-50 active:bg-primary-100',
            )}
          >
            <span className={cn('text-[11px] font-medium capitalize', ativo ? 'text-white/80' : 'text-ink-secondary')}>
              {DIAS_CURTOS[d.getDay()]}
            </span>
            <span className="text-xl leading-none font-bold tabular-nums">{d.getDate()}</span>
          </button>
        )
      })}
    </div>
  )
}

function ResumoLinha({ icon: Icon, label, valor }: { icon: LucideIcon; label: string; valor: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Icon aria-hidden="true" className="size-5 shrink-0 text-primary-700" strokeWidth={1.75} />
      <span className="text-[13px] text-ink-secondary">{label}</span>
      <span className="ml-auto text-right text-sm font-semibold text-primary-900">{valor}</span>
    </div>
  )
}

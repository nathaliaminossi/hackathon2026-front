import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router'
import { Card, Eyebrow, Logo, SectionHeader } from '@/components/ui'
import { AppointmentStatusBadge, useProximaConsulta } from '@/features/agendamentos'
import { useAuth } from '@/features/auth'
import { formatLongDate, formatTime, toISODate } from '@/utils/date'

const atalhos: { to: string; label: string; descricao: string; icon: LucideIcon }[] = [
  { to: '/agendar', label: 'Agendar consulta', descricao: 'Escolha dia e horário', icon: CalendarPlus },
  { to: '/chat', label: 'Falar com a clínica', descricao: 'Tire suas dúvidas', icon: MessageCircle },
]

export default function Home() {
  const { user } = useAuth()
  const proxima = useProximaConsulta()
  const primeiroNome = user?.name.split(' ')[0] ?? ''

  return (
    <div className="space-y-6 px-5 pt-8 pb-6">
      {/* Marca */}
      <div className="space-y-2">
        <Logo size="lg" />
        <p className="text-[13px] text-ink-secondary">Seu cuidado, mais perto.</p>
      </div>

      {/* Saudação */}
      <div>
        <h1 className="text-[26px] leading-tight font-bold tracking-[-0.01em] text-primary-900">
          Olá, {primeiroNome} <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-1 text-[13px] text-ink-secondary">Um tempo para cuidar de você.</p>
      </div>

      {/* Próxima consulta */}
      {proxima ? (
        <Card tone="highlight" aria-labelledby="proxima-label" role="region" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <Eyebrow className="text-white/75">
              <span id="proxima-label">Sua próxima consulta</span>
            </Eyebrow>
            <AppointmentStatusBadge status={proxima.status} />
          </div>

          <div>
            <p className="text-xl leading-tight font-bold">{proxima.profissional}</p>
            <p className="mt-1 text-[13px] text-white/75">
              {proxima.especialidade} · {proxima.clinica}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
            <li className="flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="size-4 text-white/75" strokeWidth={1.75} />
              {formatLongDate(proxima.inicio)}
            </li>
            <li className="flex items-center gap-1.5">
              <Clock aria-hidden="true" className="size-4 text-white/75" strokeWidth={1.75} />
              {formatTime(proxima.inicio)}
            </li>
            <li className="flex items-center gap-1.5">
              {proxima.modalidade === 'teleconsulta' ? (
                <Video aria-hidden="true" className="size-4 text-white/75" strokeWidth={1.75} />
              ) : (
                <MapPin aria-hidden="true" className="size-4 text-white/75" strokeWidth={1.75} />
              )}
              {proxima.modalidade === 'teleconsulta' ? 'Online' : 'Presencial'}
            </li>
          </ul>

          <Link
            to={`/calendario?dia=${toISODate(proxima.inicio)}`}
            className="flex h-12 items-center justify-between rounded-control bg-white/12 px-4 text-sm font-semibold transition-colors ease-out hover:bg-white/20 active:bg-white/25"
          >
            Ver minha consulta
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
          </Link>
        </Card>
      ) : (
        <Card className="space-y-1">
          <Eyebrow className="text-ink-secondary">Sua próxima consulta</Eyebrow>
          <p className="text-sm text-ink">Nenhuma consulta marcada por enquanto.</p>
          <Link to="/agendar" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-accent-700 hover:underline">
            Agendar agora <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Card>
      )}

      {/* Atalhos */}
      <section aria-labelledby="atalhos-titulo">
        <SectionHeader id="atalhos-titulo" title="O que você precisa?" />
        <ul className="grid grid-cols-2 gap-3">
          {atalhos.map(({ to, label, descricao, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex h-full flex-col gap-3 rounded-card border border-border bg-surface p-4 transition-colors ease-out hover:border-primary-700/30 hover:bg-primary-50 active:bg-primary-100"
              >
                <span className="grid size-10 place-items-center rounded-control bg-primary-100 text-primary-700">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-primary-900">{label}</span>
                  <span className="mt-0.5 block text-xs text-ink-secondary">{descricao}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Cuidado do dia */}
      <Card tone="care" role="note" aria-labelledby="cuidado-titulo">
        <h2 id="cuidado-titulo" className="flex items-center gap-2 text-sm font-semibold text-primary-900">
          <Heart aria-hidden="true" className="size-4 fill-accent-500 text-accent-500" strokeWidth={1.75} />
          Um cuidado para hoje
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink">
          Faça uma pausa de 5 minutos, beba um copo de água e respire fundo. Pequenos gestos também
          cuidam de você.
        </p>
        <Link
          to="/avisos"
          className="mt-2 inline-flex min-h-11 items-center gap-1 text-[13px] font-semibold text-accent-700 hover:underline"
        >
          Ver lembretes <ChevronRight aria-hidden="true" className="size-4" />
        </Link>
      </Card>
    </div>
  )
}

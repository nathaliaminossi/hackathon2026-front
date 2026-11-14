import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useToday } from '@/hooks/useToday'
import { addDays, formatLongDate, formatMonthYear, isSameDay } from '@/utils/date'

const LETRAS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'] // semana começa na segunda
const NOMES = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo']

interface MonthCalendarProps {
  selected: Date
  onSelect: (date: Date) => void
  /** Quantos eventos há no dia (mostra o ponto se > 0). */
  countOn: (date: Date) => number
  className?: string
}

/** Calendário mensal. Setas do teclado movem o dia (±1 / ±7), PageUp/PageDown trocam o mês. */
export function MonthCalendar({ selected, onSelect, countOn, className }: MonthCalendarProps) {
  const [month, setMonth] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1))
  const gridRef = useRef<HTMLDivElement>(null)
  const focusAfterMove = useRef(false)
  const today = useToday()

  // Se a seleção mudar de mês (link externo ou teclado), o calendário acompanha.
  // Ajuste de estado durante o render: padrão recomendado pelo React no lugar de um effect.
  const selectedKey = selected.getFullYear() * 12 + selected.getMonth()
  const [prevKey, setPrevKey] = useState(selectedKey)
  if (selectedKey !== prevKey) {
    setPrevKey(selectedKey)
    setMonth(new Date(selected.getFullYear(), selected.getMonth(), 1))
  }

  // Depois de mover pelo teclado, o foco segue o dia selecionado.
  useEffect(() => {
    if (!focusAfterMove.current) return
    focusAfterMove.current = false
    gridRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus()
  })

  const offset = (month.getDay() + 6) % 7 // segunda = 0
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ]
  const selectedInMonth = selected.getMonth() === month.getMonth() && selected.getFullYear() === month.getFullYear()

  const changeMonth = (delta: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1))

  const onKeyDown = (event: KeyboardEvent, day: Date) => {
    const moves: Record<string, () => Date> = {
      ArrowRight: () => addDays(day, 1),
      ArrowLeft: () => addDays(day, -1),
      ArrowDown: () => addDays(day, 7),
      ArrowUp: () => addDays(day, -7),
      PageDown: () => new Date(day.getFullYear(), day.getMonth() + 1, Math.min(day.getDate(), 28)),
      PageUp: () => new Date(day.getFullYear(), day.getMonth() - 1, Math.min(day.getDate(), 28)),
    }
    const move = moves[event.key]
    if (!move) return
    event.preventDefault()
    focusAfterMove.current = true
    onSelect(move())
  }

  return (
    <div className={cn('rounded-card border border-border bg-surface p-4', className)}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-primary-900" aria-live="polite">
          {formatMonthYear(month)}
        </h2>
        <div className="flex gap-1">
          <NavButton label="Mês anterior" onClick={() => changeMonth(-1)}>
            <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </NavButton>
          <NavButton label="Próximo mês" onClick={() => changeMonth(1)}>
            <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </NavButton>
        </div>
      </div>

      <div role="grid" aria-label={formatMonthYear(month)} ref={gridRef}>
        <div role="row" className="grid grid-cols-7">
          {LETRAS.map((letra, i) => (
            <span
              key={i}
              role="columnheader"
              aria-label={NOMES[i]}
              className="pb-1 text-center text-[11px] font-semibold text-ink-secondary"
            >
              {letra}
            </span>
          ))}
        </div>

        {Array.from({ length: Math.ceil(cells.length / 7) }, (_, row) => (
          <div role="row" key={row} className="grid grid-cols-7">
            {cells.slice(row * 7, row * 7 + 7).map((day, i) => {
              if (!day) return <span role="gridcell" key={`v${i}`} />
              const isSelected = isSameDay(day, selected)
              const isToday = isSameDay(day, today)
              const count = countOn(day)
              // Só o dia selecionado (ou o 1º do mês, se a seleção estiver em outro mês) entra no Tab.
              const tabbable = selectedInMonth ? isSelected : day.getDate() === 1
              return (
                <div role="gridcell" key={day.getDate()} className="flex justify-center py-0.5">
                  <button
                    type="button"
                    aria-selected={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    aria-label={`${formatLongDate(day)}${isToday ? ', hoje' : ''}${
                      count ? `, ${count} ${count > 1 ? 'consultas' : 'consulta'}` : ''
                    }`}
                    tabIndex={tabbable ? 0 : -1}
                    onClick={() => onSelect(day)}
                    onKeyDown={(e) => onKeyDown(e, day)}
                    className={cn(
                      'relative flex h-11 w-full max-w-11 cursor-pointer flex-col items-center justify-center rounded-control text-sm tabular-nums transition-colors ease-out',
                      isSelected
                        ? 'bg-primary-900 font-bold text-white'
                        : isToday
                          ? 'bg-primary-100 font-semibold text-primary-900 hover:bg-primary-100/70'
                          : 'text-ink hover:bg-primary-50 active:bg-primary-100',
                    )}
                  >
                    {day.getDate()}
                    {count > 0 && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute bottom-1.5 size-1 rounded-full',
                          isSelected ? 'bg-white' : 'bg-accent-500',
                        )}
                      />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legenda */}
      <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-[11px] text-ink-secondary">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-500" />
          Dia com consulta
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-3 rounded-[4px] bg-primary-100" />
          Hoje
        </span>
      </div>
    </div>
  )
}

function NavButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 cursor-pointer place-items-center rounded-control text-primary-700 transition-colors ease-out hover:bg-primary-50 active:bg-primary-100"
    >
      {children}
    </button>
  )
}

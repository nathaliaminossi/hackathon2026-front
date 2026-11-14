import type { LucideIcon } from 'lucide-react'
import { rovingIndex, focusSibling } from '@/utils/roving'
import { cn } from '@/utils/cn'

export interface SegmentOption<T extends string> {
  value: T
  label: string
  icon?: LucideIcon
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  'aria-label': string
  className?: string
}

/** Alternância entre opções (Presencial | Teleconsulta). Semântica de radiogroup, setas navegam. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  ...aria
}: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" {...aria} className={cn('flex gap-1 rounded-control bg-primary-50 p-1', className)}>
      {options.map((option, index) => {
        const active = option.value === value
        const Icon = option.icon
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => {
              const next = rovingIndex(e, index, options.length)
              if (next === null) return
              onChange(options[next].value)
              focusSibling(e, next)
            }}
            className={cn(
              'flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] text-sm transition-[background-color,color,box-shadow] ease-out',
              active
                ? 'bg-surface font-semibold text-primary-900 shadow-[0_0_0_1px_var(--color-border)]'
                : 'font-medium text-ink-secondary hover:text-primary-900 active:bg-primary-100',
            )}
          >
            {Icon && <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

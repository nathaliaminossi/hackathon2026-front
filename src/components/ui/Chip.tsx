import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

/** Chip selecionável (horários). Selecionado: fundo menta, borda accent-300 de 1.5px. */
export function Chip({ selected = false, className, type = 'button', ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        'h-11 cursor-pointer rounded-chip border-[1.5px] text-sm tabular-nums transition-colors ease-out',
        selected
          ? 'border-accent-300 bg-accent-50 font-bold text-primary-900'
          : 'border-border bg-surface font-medium text-ink hover:border-primary-700/40 hover:bg-primary-50 active:bg-primary-100',
        'disabled:cursor-not-allowed disabled:border-border disabled:bg-bg disabled:font-normal disabled:text-ink-muted disabled:line-through',
        className,
      )}
      {...props}
    />
  )
}

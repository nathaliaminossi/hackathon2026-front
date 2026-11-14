import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type BadgeTone = 'success' | 'primary' | 'warning' | 'danger' | 'neutral'

const tones: Record<BadgeTone, string> = {
  success: 'bg-accent-50 text-accent-700',
  primary: 'bg-primary-100 text-primary-900',
  warning: 'bg-warning-50 text-warning',
  danger: 'bg-danger-50 text-danger',
  neutral: 'bg-primary-50 text-ink-secondary',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  /** Ponto indicador antes do texto (cor nunca é a única informação). */
  dot?: boolean
}

export function Badge({ tone = 'neutral', dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-chip px-2 py-1 text-[11px] leading-none font-semibold',
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

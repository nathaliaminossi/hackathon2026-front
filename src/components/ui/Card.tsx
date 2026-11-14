import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type CardTone = 'surface' | 'highlight' | 'care'

const tones: Record<CardTone, string> = {
  surface: 'border border-border bg-surface',
  highlight: 'bg-primary-900 text-white', // próxima consulta
  care: 'bg-accent-50', // "Um cuidado para hoje"
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone
}

/** Card base: raio 16px, padding 16px, separado por borda (sem sombra). */
export function Card({ tone = 'surface', className, ...props }: CardProps) {
  return <div className={cn('rounded-card p-4', tones[tone], className)} {...props} />
}

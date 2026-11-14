import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { Logo } from './Logo'

interface ScreenHeaderProps {
  title: string
  subtitle?: ReactNode
  className?: string
}

/** Cabeçalho das telas internas: título + subtítulo à esquerda, logo à direita. */
export function ScreenHeader({ title, subtitle, className }: ScreenHeaderProps) {
  return (
    <header className={cn('flex items-start justify-between gap-4', className)}>
      <div className="min-w-0">
        <h1 className="text-[26px] leading-tight font-bold tracking-[-0.01em] text-primary-900">{title}</h1>
        {subtitle && <p className="mt-1 text-[13px] text-ink-secondary">{subtitle}</p>}
      </div>
      <Logo className="mt-1.5" />
    </header>
  )
}

/** Título de seção (16px semibold) com ação opcional à direita. */
export function SectionHeader({
  title,
  action,
  id,
  className,
}: {
  title: string
  action?: ReactNode
  id?: string
  className?: string
}) {
  return (
    <div className={cn('mb-3 flex items-center justify-between gap-3', className)}>
      <h2 id={id} className="text-base font-semibold text-primary-900">
        {title}
      </h2>
      {action}
    </div>
  )
}

/** Rótulo em caixa alta ("SUA PRÓXIMA CONSULTA", "ESPECIALIDADE"). */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('text-[11px] font-semibold tracking-[0.08em] uppercase', className)}>
      {children}
    </span>
  )
}

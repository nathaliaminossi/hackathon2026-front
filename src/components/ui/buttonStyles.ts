import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-900 text-white hover:bg-primary-700 active:bg-primary-700 disabled:bg-primary-900/40',
  secondary:
    'border border-primary-900 bg-surface text-primary-900 hover:bg-primary-50 active:bg-primary-100 disabled:border-ink-muted disabled:text-ink-muted',
  ghost: 'text-accent-700 hover:bg-accent-50 active:bg-accent-50 disabled:text-ink-muted',
}

/** Classes do botão, para reaproveitar em <Link> (ex.: buttonStyles({ variant: 'secondary' })). */
export function buttonStyles({
  variant = 'primary',
  fullWidth = false,
  className,
}: { variant?: ButtonVariant; fullWidth?: boolean; className?: string } = {}) {
  return cn(
    'inline-flex h-12 cursor-pointer items-center gap-2 rounded-control px-5 text-sm font-semibold',
    'transition-[background-color,border-color,color,transform] ease-out active:scale-[0.98]',
    'disabled:cursor-not-allowed disabled:active:scale-100',
    // Sem tailwind-merge: só centraliza se o chamador não definiu outro alinhamento.
    className?.includes('justify-') ? undefined : 'justify-center',
    variants[variant],
    fullWidth && 'w-full',
    className,
  )
}

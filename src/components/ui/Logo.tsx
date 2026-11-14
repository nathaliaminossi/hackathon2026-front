import { cn } from '@/utils/cn'

/** Wordmark "liva": minúsculas, extra-bold, roxo. */
export function Logo({ size = 'sm', className }: { size?: 'sm' | 'lg'; className?: string }) {
  return (
    <span
      className={cn(
        'font-extrabold tracking-[-0.04em] text-primary-900 select-none',
        size === 'lg' ? 'text-[44px] leading-none' : 'text-[22px] leading-none',
        className,
      )}
    >
      liva
    </span>
  )
}

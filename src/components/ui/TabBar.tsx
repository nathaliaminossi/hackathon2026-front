import { Bell, CalendarDays, House, MessageCircle, Plus, type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '@/utils/cn'

const items: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/inicio', label: 'Início', icon: House },
  { to: '/agendar', label: 'Agendar', icon: Plus },
  { to: '/calendario', label: 'Calendário', icon: CalendarDays },
  { to: '/chat', label: 'Chat', icon: MessageCircle },
  { to: '/avisos', label: 'Avisos', icon: Bell },
]

/** Navegação inferior com 5 abas. Ativa: pílula lavanda + roxo profundo. */
export function TabBar() {
  return (
    <nav
      aria-label="Navegação principal"
      className="shrink-0 border-t border-border bg-surface px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <ul className="flex justify-between">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  'mx-auto flex h-14 w-full max-w-[68px] flex-col items-center justify-center gap-1 rounded-full transition-colors ease-out',
                  isActive
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-ink-secondary hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon aria-hidden="true" className="size-[22px]" strokeWidth={isActive ? 2 : 1.75} />
                  <span className={cn('text-[10px] leading-none', isActive ? 'font-semibold' : 'font-medium')}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* Home indicator: só aparece na moldura de celular (desktop); no aparelho real o sistema desenha o dele */}
      <div aria-hidden="true" className="mx-auto mt-2 hidden h-[5px] w-32 rounded-full bg-primary-900 md:block" />
    </nav>
  )
}

import { rovingIndex, focusSibling } from '@/utils/roving'
import { cn } from '@/utils/cn'

export interface PillTab<T extends string> {
  value: T
  label: string
  /** Contador opcional ("Não lidos · 2") */
  count?: number
}

interface PillTabsProps<T extends string> {
  tabs: PillTab<T>[]
  value: T
  onChange: (value: T) => void
  /** id do painel controlado pelas abas */
  panelId: string
  'aria-label': string
}

/** Abas em pílula (filtros). Ativa em primary-900. */
export function PillTabs<T extends string>({ tabs, value, onChange, panelId, ...aria }: PillTabsProps<T>) {
  return (
    <div role="tablist" {...aria} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
      {tabs.map((tab, index) => {
        const active = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            id={`tab-${tab.value}`}
            aria-selected={active}
            aria-controls={panelId}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(e) => {
              const next = rovingIndex(e, index, tabs.length)
              if (next === null) return
              onChange(tabs[next].value)
              focusSibling(e, next)
            }}
            className={cn(
              'h-11 shrink-0 cursor-pointer rounded-full px-4 text-[13px] font-semibold whitespace-nowrap transition-colors ease-out',
              active
                ? 'bg-primary-900 text-white'
                : 'border border-border bg-surface text-ink-secondary hover:border-primary-700/40 hover:text-primary-900 active:bg-primary-50',
            )}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className={active ? 'text-white/80' : 'text-primary-700'}> · {tab.count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

import type { KeyboardEvent } from 'react'

/** Setas ←/→ (e Home/End) movem a seleção num grupo de opções (radiogroup, tablist).
 *  Devolve o novo índice, ou null se a tecla não for de navegação. */
export function rovingIndex(event: KeyboardEvent, index: number, count: number): number | null {
  const keys: Record<string, number> = {
    ArrowRight: (index + 1) % count,
    ArrowDown: (index + 1) % count,
    ArrowLeft: (index - 1 + count) % count,
    ArrowUp: (index - 1 + count) % count,
    Home: 0,
    End: count - 1,
  }
  if (!(event.key in keys)) return null
  event.preventDefault()
  return keys[event.key]
}

/** Foca o botão de índice `next` dentro do mesmo container. */
export function focusSibling(event: KeyboardEvent, next: number, selector = 'button') {
  const container = (event.currentTarget as HTMLElement).parentElement
  container?.querySelectorAll<HTMLElement>(selector)[next]?.focus()
}

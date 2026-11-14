import type { ReactNode } from 'react'

/** Mobile: ocupa a tela toda. Desktop: centraliza numa moldura de celular de 390px. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh md:grid md:place-items-center md:bg-primary-50 md:p-6">
      <div className="relative flex h-full flex-col overflow-hidden bg-bg md:h-[min(844px,calc(100dvh-3rem))] md:w-[390px] md:rounded-[48px] md:border-[10px] md:border-ink">
        {children}
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { PhoneFrame, TabBar } from '@/components/ui'

/** Estrutura das telas logadas: conteúdo rolável + barra de abas fixa embaixo. */
export function AppLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  // Cada aba começa do topo.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <PhoneFrame>
      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto pt-[env(safe-area-inset-top)]">
        <div key={pathname} className="h-full animate-screen-in">
          <Outlet />
        </div>
      </main>
      <TabBar />
    </PhoneFrame>
  )
}

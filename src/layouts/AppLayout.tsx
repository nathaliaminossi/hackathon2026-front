import { Outlet } from 'react-router'
import { PhoneFrame } from '@/components/ui'

/** Estrutura das telas logadas: conteúdo rolável dentro da moldura de celular. */
export function AppLayout() {
  return (
    <PhoneFrame>
      <main className="min-h-0 flex-1 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <div className="animate-screen-in">
          <Outlet />
        </div>
      </main>
    </PhoneFrame>
  )
}

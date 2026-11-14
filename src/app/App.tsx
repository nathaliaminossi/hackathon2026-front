import { RouterProvider } from 'react-router'
import { ConsultasProvider } from '@/features/agendamentos'
import { AuthProvider } from '@/features/auth'
import { router } from './routes/router'

export default function App() {
  return (
    <AuthProvider>
      <ConsultasProvider>
        <RouterProvider router={router} />
      </ConsultasProvider>
    </AuthProvider>
  )
}

import { createBrowserRouter, Navigate } from 'react-router'
import { ProtectedRoute } from '@/features/auth'
import { AppLayout } from '@/layouts/AppLayout'
import Agendar from '@/pages/agendar/Agendar'
import Avisos from '@/pages/avisos/Avisos'
import Calendario from '@/pages/calendario/Calendario'
import Chat from '@/pages/chat/Chat'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    // Sem sessão → ProtectedRoute manda para /login.
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/inicio', element: <Home /> },
          { path: '/agendar', element: <Agendar /> },
          { path: '/calendario', element: <Calendario /> },
          { path: '/chat', element: <Chat /> },
          { path: '/avisos', element: <Avisos /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/inicio" replace /> },
])

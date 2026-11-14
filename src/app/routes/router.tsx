import { createBrowserRouter, Navigate } from 'react-router'
import { ProtectedRoute } from '@/features/auth'
import { AppLayout } from '@/layouts/AppLayout'
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
        children: [{ path: '/inicio', element: <Home /> }],
      },
    ],
  },
  { path: '*', element: <Navigate to="/inicio" replace /> },
])

import { useState, type SubmitEvent } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Navigate, useLocation, useNavigate, type Location } from 'react-router'
import { Button, Logo, PhoneFrame } from '@/components/ui'
import { useAuth } from '@/features/auth'
import { formatCpf } from '@/utils/cpf'

const inputClass =
  'h-12 w-full rounded-control border border-border bg-surface px-4 text-sm text-ink transition-colors ease-out placeholder:text-ink-muted hover:border-primary-700/40 focus-visible:border-primary-700 aria-invalid:border-danger'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = (location.state as { from?: Location } | null)?.from?.pathname ?? '/inicio'

  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  if (user) return <Navigate to={destino} replace />

  const entrar = async (e: SubmitEvent) => {
    e.preventDefault()
    setErro(null)
    setEnviando(true)
    try {
      await login({ cpf, password: senha })
      navigate(destino, { replace: true })
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível entrar.')
      setEnviando(false)
    }
  }

  return (
    <PhoneFrame>
      <main className="flex flex-1 flex-col overflow-y-auto px-5 pt-16 pb-8">
        <div className="space-y-2">
          <Logo size="lg" />
          <p className="text-[13px] text-ink-secondary">Seu cuidado, mais perto.</p>
        </div>

        <div className="mt-12">
          <h1 className="text-[26px] leading-tight font-bold text-primary-900">Que bom te ver 💜</h1>
          <p className="mt-1 text-[13px] text-ink-secondary">Entre para ver suas consultas e avisos.</p>
        </div>

        <form onSubmit={entrar} noValidate className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="cpf" className="text-[11px] font-semibold tracking-[0.08em] text-ink-secondary uppercase">
              CPF
            </label>
            <input
              id="cpf"
              inputMode="numeric"
              autoComplete="username"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              aria-invalid={erro ? true : undefined}
              aria-describedby={erro ? 'login-erro' : undefined}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="senha" className="text-[11px] font-semibold tracking-[0.08em] text-ink-secondary uppercase">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={mostrarSenha ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                aria-invalid={erro ? true : undefined}
                aria-describedby={erro ? 'login-erro' : undefined}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha((v) => !v)}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={mostrarSenha}
                className="absolute top-1/2 right-0.5 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-control text-ink-secondary transition-colors ease-out hover:text-primary-700"
              >
                {mostrarSenha ? (
                  <EyeOff aria-hidden="true" className="size-5" strokeWidth={1.75} />
                ) : (
                  <Eye aria-hidden="true" className="size-5" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>

          {erro && (
            <p id="login-erro" role="alert" className="text-[13px] font-medium text-danger">
              {erro}
            </p>
          )}

          <Button type="submit" fullWidth isLoading={enviando} className="justify-between">
            <span>Entrar</span>
            {!enviando && <ArrowRight aria-hidden="true" className="size-5" strokeWidth={2} />}
          </Button>
        </form>

        <p className="mt-auto pt-8 text-center text-xs text-ink-secondary">
          Demonstração: CPF <strong className="font-semibold text-ink">123.456.789-00</strong> · senha{' '}
          <strong className="font-semibold text-ink">liva123</strong>
        </p>
      </main>
    </PhoneFrame>
  )
}

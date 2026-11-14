import { Fragment, useEffect, useRef, useState, type SubmitEvent } from 'react'
import { Building2, CheckCheck, Lock, Paperclip, SendHorizontal } from 'lucide-react'
import { ScreenHeader } from '@/components/ui'
import { clinica } from '@/data/especialidades'
import { mensagensIniciais, respostaAutomatica } from '@/data/mensagens'
import type { Mensagem } from '@/types'
import { cn } from '@/utils/cn'
import { formatRelativeDay, formatTime, isSameDay } from '@/utils/date'

const novoId = () => `m${Date.now()}${Math.random().toString(36).slice(2, 6)}`

export default function Chat() {
  const [mensagens, setMensagens] = useState<Mensagem[]>(mensagensIniciais)
  const [texto, setTexto] = useState('')
  const listaRef = useRef<HTMLDivElement>(null)
  const respondeu = useRef(false)

  // Rola para a última mensagem sempre que chega uma nova (instantâneo na abertura).
  const primeiraVez = useRef(true)
  useEffect(() => {
    const el = listaRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: primeiraVez.current ? 'auto' : 'smooth' })
    primeiraVez.current = false
  }, [mensagens.length])

  const enviar = (e: SubmitEvent) => {
    e.preventDefault()
    const conteudo = texto.trim()
    if (!conteudo) return
    setMensagens((m) => [...m, { id: novoId(), autor: 'paciente', texto: conteudo, enviadaEm: new Date(), lida: false }])
    setTexto('')

    // Simula a clínica lendo e respondendo (só na primeira mensagem da sessão).
    window.setTimeout(() => {
      setMensagens((m) => m.map((msg) => (msg.autor === 'paciente' ? { ...msg, lida: true } : msg)))
    }, 900)
    if (!respondeu.current) {
      respondeu.current = true
      window.setTimeout(() => {
        setMensagens((m) => [...m, { id: novoId(), autor: 'clinica', texto: respostaAutomatica, enviadaEm: new Date() }])
      }, 1600)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-4 px-5 pt-8 pb-3">
        <ScreenHeader title="Conversas" subtitle="Fale com a clínica quando precisar." />

        {/* Card da clínica */}
        <div className="flex items-center gap-3 rounded-card border border-border bg-surface p-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-control bg-primary-100 text-primary-700">
            <Building2 aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-primary-900">{clinica.nome}</p>
            <p className="flex items-center gap-1.5 text-xs text-ink-secondary">
              Atendimento <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1 font-semibold text-accent-700">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-500" />
                Online agora
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      <div
        ref={listaRef}
        role="log"
        aria-label="Mensagens"
        aria-live="polite"
        tabIndex={0}
        className="min-h-0 flex-1 space-y-2 overflow-y-auto px-5 pb-4 focus-visible:outline-offset-[-2px]"
      >
        <p className="flex items-center justify-center gap-1.5 py-1 text-[11px] text-ink-secondary">
          <Lock aria-hidden="true" className="size-3" strokeWidth={2} />
          Sua conversa é privada e segura
        </p>

        {mensagens.map((msg, i) => {
          const anterior = mensagens[i - 1]
          const novoDia = !anterior || !isSameDay(anterior.enviadaEm, msg.enviadaEm)
          return (
            <Fragment key={msg.id}>
              {novoDia && (
                <div className="flex justify-center py-2">
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-[11px] font-medium text-ink-secondary">
                    {formatRelativeDay(msg.enviadaEm)}
                  </span>
                </div>
              )}
              <Balao mensagem={msg} />
            </Fragment>
          )
        })}
      </div>

      {/* Campo de mensagem */}
      <form onSubmit={enviar} className="flex shrink-0 items-center gap-2 border-t border-border bg-bg px-5 py-3">
        <div className="flex h-12 min-w-0 flex-1 items-center rounded-full border border-border bg-surface pr-4 pl-1 transition-colors ease-out focus-within:border-primary-700/50">
          <button
            type="button"
            aria-label="Anexar arquivo"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-ink-secondary transition-colors ease-out hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100"
          >
            <Paperclip aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </button>
          <label htmlFor="mensagem" className="sr-only">
            Mensagem
          </label>
          <input
            id="mensagem"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escreva sua mensagem…"
            autoComplete="off"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
          />
        </div>
        <button
          type="submit"
          aria-label="Enviar mensagem"
          disabled={!texto.trim()}
          className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-control bg-primary-900 text-white transition-[background-color,transform] ease-out hover:bg-primary-700 active:scale-95 active:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-900/40 disabled:active:scale-100"
        >
          <SendHorizontal aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </button>
      </form>
    </div>
  )
}

function Balao({ mensagem }: { mensagem: Mensagem }) {
  const minha = mensagem.autor === 'paciente'
  return (
    <div className={cn('flex', minha ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-card px-3.5 py-2.5 text-sm leading-snug',
          minha
            ? 'rounded-br-[6px] bg-primary-900 text-white'
            : 'rounded-bl-[6px] border border-border bg-surface text-ink',
        )}
      >
        <span className="sr-only">{minha ? 'Você:' : `${clinica.nome}:`}</span>
        <p className="whitespace-pre-wrap">{mensagem.texto}</p>
        <p
          className={cn(
            'mt-1 flex items-center justify-end gap-1 text-[11px] tabular-nums',
            minha ? 'text-white/70' : 'text-ink-secondary',
          )}
        >
          {formatTime(mensagem.enviadaEm)}
          {minha && (
            <>
              <CheckCheck
                aria-hidden="true"
                className={cn('size-3.5', mensagem.lida ? 'text-accent-300' : 'text-white/70')}
                strokeWidth={2}
              />
              <span className="sr-only">{mensagem.lida ? 'lida' : 'enviada'}</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

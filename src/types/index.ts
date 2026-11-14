import type { AppointmentStatus } from '@/features/agendamentos'

export type Modalidade = 'presencial' | 'teleconsulta'

export interface Especialidade {
  id: string
  nome: string
  /** Subtítulo exibido no select (ex.: "Coração e pressão arterial") */
  descricao: string
  profissional: string
}

export interface Consulta {
  id: string
  especialidade: string
  profissional: string
  clinica: string
  inicio: Date
  duracaoMin: number
  modalidade: Modalidade
  status: AppointmentStatus
}

export interface Mensagem {
  id: string
  autor: 'paciente' | 'clinica'
  texto: string
  enviadaEm: Date
  /** Só para mensagens do paciente: a clínica já leu? (✓✓ verde) */
  lida?: boolean
}

export type AvisoCategoria = 'consulta' | 'exame' | 'lembrete'
export type AvisoIcone = 'calendar' | 'file' | 'pill' | 'user' | 'star'

export interface Aviso {
  id: string
  categoria: AvisoCategoria
  icone: AvisoIcone
  titulo: string
  descricao: string
  criadoEm: Date
  lido: boolean
  /** Ação já resolvida: o ícone vira um check verde. */
  concluido?: boolean
  acao?: { label: string; to: string }
}

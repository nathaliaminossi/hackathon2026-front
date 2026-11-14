import type { AppointmentStatus } from '@/features/agendamentos'

export type Modalidade = 'presencial' | 'teleconsulta'

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

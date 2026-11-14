import type { Especialidade } from '@/types'

export const especialidades: Especialidade[] = [
  { id: 'clinico', nome: 'Clínico geral', descricao: 'Check-up e queixas do dia a dia', profissional: 'Dra. Ana Lima' },
  { id: 'cardio', nome: 'Cardiologia', descricao: 'Coração e pressão arterial', profissional: 'Dra. Helena Costa' },
  { id: 'dermato', nome: 'Dermatologia', descricao: 'Pele, cabelo e unhas', profissional: 'Dr. Paulo Mendes' },
  { id: 'nutri', nome: 'Nutrição', descricao: 'Alimentação e bem-estar', profissional: 'Dr. Rafael Moura' },
  { id: 'psico', nome: 'Psicologia', descricao: 'Saúde emocional e acolhimento', profissional: 'Dra. Júlia Prado' },
]

export const clinica = {
  nome: 'Clínica Liva Centro',
  endereco: 'Av. Paulista, 1000 — Bela Vista, São Paulo',
}

/** Grade de horários da clínica. */
export const horariosDoDia = ['08:00', '08:30', '09:00', '10:00', '10:30', '11:00', '14:00', '15:30', '16:00', '17:00']

/** Horários já ocupados num dia (mock determinístico: muda conforme a data). */
export function horariosOcupados(date: Date): string[] {
  const seed = date.getDate() + date.getMonth() * 31
  return horariosDoDia.filter((_, i) => (seed + i * 7) % 4 === 0)
}

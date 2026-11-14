import type { Consulta } from '@/types'
import { at } from '@/utils/date'

const clinica = { nome: 'Clínica Liva Centro' }

// Datas relativas a hoje, para o protótipo sempre parecer "atual".
export const consultasIniciais: Consulta[] = [
  {
    id: 'c1',
    especialidade: 'Cardiologia',
    profissional: 'Dra. Helena Costa',
    clinica: clinica.nome,
    inicio: at(4, '10:00'),
    duracaoMin: 30,
    modalidade: 'presencial',
    status: 'confirmada',
  },
  {
    id: 'c2',
    especialidade: 'Nutrição',
    profissional: 'Dr. Rafael Moura',
    clinica: 'Teleconsulta',
    inicio: at(4, '15:30'),
    duracaoMin: 45,
    modalidade: 'teleconsulta',
    status: 'pendente',
  },
  {
    id: 'c3',
    especialidade: 'Dermatologia',
    profissional: 'Dr. Paulo Mendes',
    clinica: clinica.nome,
    inicio: at(11, '09:00'),
    duracaoMin: 30,
    modalidade: 'presencial',
    status: 'confirmada',
  },
  {
    id: 'c4',
    especialidade: 'Clínico geral',
    profissional: 'Dra. Ana Lima',
    clinica: clinica.nome,
    inicio: at(-6, '08:30'),
    duracaoMin: 20,
    modalidade: 'presencial',
    status: 'realizada',
  },
]

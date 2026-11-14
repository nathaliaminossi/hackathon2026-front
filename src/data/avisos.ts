import type { Aviso } from '@/types'
import { at, toISODate } from '@/utils/date'

export const avisosIniciais: Aviso[] = [
  {
    id: 'a1',
    categoria: 'consulta',
    icone: 'calendar',
    titulo: 'Sua consulta está chegando',
    descricao: 'Cardiologia com a Dra. Helena Costa em 4 dias, às 10:00.',
    criadoEm: at(0, '08:15'),
    lido: false,
    acao: { label: 'Ver consulta', to: `/calendario?dia=${toISODate(at(4, '10:00'))}` },
  },
  {
    id: 'a2',
    categoria: 'exame',
    icone: 'file',
    titulo: 'Resultado de exame disponível',
    descricao: 'Seu hemograma completo já pode ser consultado.',
    criadoEm: at(0, '07:40'),
    lido: false,
    acao: { label: 'Ver resultado', to: '/chat' },
  },
  {
    id: 'a3',
    categoria: 'consulta',
    icone: 'calendar',
    titulo: 'Consulta confirmada',
    descricao: 'Dermatologia com o Dr. Paulo Mendes está confirmada.',
    criadoEm: at(-1, '18:40'),
    lido: true,
    concluido: true,
  },
  {
    id: 'a4',
    categoria: 'lembrete',
    icone: 'pill',
    titulo: 'Lembrete de medicação',
    descricao: 'Losartana 50 mg, 1 comprimido após o café da manhã.',
    criadoEm: at(-1, '07:30'),
    lido: true,
  },
  {
    id: 'a5',
    categoria: 'consulta',
    icone: 'star',
    titulo: 'Como foi seu atendimento?',
    descricao: 'Conte como foi a consulta de Clínico geral com a Dra. Ana Lima.',
    criadoEm: at(-5, '19:00'),
    lido: true,
    acao: { label: 'Avaliar', to: '/chat' },
  },
]

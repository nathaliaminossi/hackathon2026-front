import type { Mensagem } from '@/types'
import { at } from '@/utils/date'

export const mensagensIniciais: Mensagem[] = [
  {
    id: 'm1',
    autor: 'clinica',
    texto: 'Oi, Marina! Aqui é a Bia, da recepção da Clínica Liva Centro. Como posso te ajudar? 💜',
    enviadaEm: at(-1, '17:20'),
  },
  {
    id: 'm2',
    autor: 'paciente',
    texto: 'Oi, Bia! Preciso levar algum exame na consulta de cardiologia?',
    enviadaEm: at(-1, '17:24'),
    lida: true,
  },
  {
    id: 'm3',
    autor: 'clinica',
    texto: 'Se tiver, traga o último eletrocardiograma e a lista dos remédios que você usa. Não precisa estar em jejum.',
    enviadaEm: at(0, '08:02'),
  },
  {
    id: 'm4',
    autor: 'paciente',
    texto: 'Perfeito, vou separar tudo. Obrigada!',
    enviadaEm: at(0, '08:10'),
    lida: true,
  },
]

export const respostaAutomatica =
  'Recebemos sua mensagem! Alguém da nossa equipe já vai te responder por aqui. 💜'

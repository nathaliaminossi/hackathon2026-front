// Utilitários de data em pt-BR, sem dependências externas.
// Formatamos à mão para controlar a grafia ("18 nov", "qua") sem os pontos que o Intl adiciona.

export const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]
export const MESES_CURTOS = MESES.map((m) => m.slice(0, 3))
export const DIAS_SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
export const DIAS_CURTOS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

export function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/** Data de hoje (+ dias) num horário específico: at(4, '10:00') → daqui a 4 dias, às 10h. */
export function at(daysFromToday: number, time: string) {
  const [h, m] = time.split(':').map(Number)
  const d = addDays(startOfDay(new Date()), daysFromToday)
  d.setHours(h, m, 0, 0)
  return d
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  )
}

/** 2026-11-18 (data local, para URLs) */
export function toISODate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function fromISODate(value: string | null): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [y, m, d] = value.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return Number.isNaN(date.getTime()) ? null : date
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** 10:00 */
export const formatTime = (date: Date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

/** 18 nov */
export const formatDayMonth = (date: Date) => `${date.getDate()} ${MESES_CURTOS[date.getMonth()]}`

/** Quarta, 18 de novembro */
export const formatLongDate = (date: Date) =>
  `${capitalize(DIAS_SEMANA[date.getDay()])}, ${date.getDate()} de ${MESES[date.getMonth()]}`

/** Novembro 2026 */
export const formatMonthYear = (date: Date) => `${capitalize(MESES[date.getMonth()])} ${date.getFullYear()}`

/** "Hoje", "Ontem", "Amanhã" ou "Qua, 18 nov" */
export function formatRelativeDay(date: Date, today = new Date()) {
  const diff = Math.round((startOfDay(date).getTime() - startOfDay(today).getTime()) / 86_400_000)
  if (diff === 0) return 'Hoje'
  if (diff === -1) return 'Ontem'
  if (diff === 1) return 'Amanhã'
  return `${capitalize(DIAS_CURTOS[date.getDay()])}, ${formatDayMonth(date)}`
}

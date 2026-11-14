import { useState } from 'react'
import { startOfDay } from '@/utils/date'

/** Início do dia de hoje, calculado uma vez por montagem (mantém o render puro). */
export function useToday() {
  const [today] = useState(() => startOfDay(new Date()))
  return today
}

// API pública da feature "agendamentos": outras partes do app importam daqui.
export { AppointmentStatusBadge, AppointmentStatusText } from './components/AppointmentStatusBadge'
export { ConsultaListItem } from './components/ConsultaListItem'
export { ConsultasProvider } from './context/ConsultasProvider'
export { useConsultas, useProximaConsulta } from './hooks/useConsultas'
export type { AppointmentStatus } from './types'

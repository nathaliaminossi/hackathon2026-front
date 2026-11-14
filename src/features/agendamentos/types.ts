/** Situações possíveis de uma consulta ou exame no LIVA. */
export type AppointmentStatus =
  | 'pendente' // aguardando confirmação do paciente
  | 'confirmada'
  | 'cancelada'
  | 'reagendamento_solicitado'
  | 'realizada'
  | 'falta'

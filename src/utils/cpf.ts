/** Mantém só os dígitos (máx. 11). */
export function onlyCpfDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, 11)
}

/** Formata enquanto digita: 12345678900 → 123.456.789-00 */
export function formatCpf(value: string) {
  return onlyCpfDigits(value)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

// Cliente HTTP base. Todas as features usam este arquivo para falar com o backend.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar ${path}`)
  }

  return response.json() as Promise<T>
}

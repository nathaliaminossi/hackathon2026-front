import type { LoginCredentials, User } from '../types'

// MOCK: autenticação local enquanto o backend não está pronto.
// Para integrar, troque o corpo de `login` por: return api<User>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
const MOCK_USER: User = { id: '1', name: 'Marina Souza', cpf: '12345678900' }
const MOCK_PASSWORD = 'liva123'

const STORAGE_KEY = 'liva:user'

export async function login({ cpf, password }: LoginCredentials): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 600)) // simula latência de rede

  if (cpf.replace(/\D/g, '') !== MOCK_USER.cpf || password !== MOCK_PASSWORD) {
    throw new Error('CPF ou senha incorretos.')
  }

  saveUser(MOCK_USER)
  return MOCK_USER
}

export function logout() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // storage indisponível (modo privado etc.): nada a limpar
  }
}

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function saveUser(user: User) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
    // sem storage: a sessão vale só enquanto a aba estiver aberta
  }
}

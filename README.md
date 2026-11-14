# LIVA — Frontend

Plataforma digital para reduzir faltas em consultas e exames na Atenção Primária à Saúde (APS).

## Stack

React + TypeScript + Vite + Tailwind CSS v4

## Como rodar

```bash
npm install
cp .env.example .env.local   # ajuste VITE_API_URL
npm run dev
```

## Estrutura de pastas

Organização **por feature**: cada domínio do LIVA guarda seus próprios componentes, hooks e chamadas à API.

```
src/
├── app/                 # Configuração da aplicação
│   ├── App.tsx
│   ├── providers/       # Contextos globais (auth, tema, react-query...)
│   └── routes/          # Definição das rotas
├── features/            # Regras de negócio, separadas por domínio
│   ├── auth/            # Login do paciente
│   ├── agendamentos/    # Listar, confirmar e cancelar consultas/exames
│   ├── lembretes/       # Notificações e lembretes
│   └── reagendamento/   # Solicitação de reagendamento
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── index.ts     # O que a feature expõe para o resto do app
├── pages/               # Telas (montam features dentro de um layout)
├── layouts/             # Estruturas de página (header, menu, rodapé)
├── components/
│   ├── ui/              # Componentes visuais genéricos (Button, Card, Input)
│   └── common/          # Componentes compartilhados com algum contexto (Header, EmptyState)
├── data/                # Dados mockados (consultas, mensagens, avisos, especialidades)
├── services/api.ts      # Cliente HTTP base
├── hooks/               # Hooks genéricos (useDebounce, useMediaQuery...)
├── utils/               # Funções puras (formatar data, CPF...)
├── types/               # Tipos globais
├── styles/              # tokens.css (tema lilás/roxo do Tailwind) e global.css
└── assets/              # images/ e icons/
```

### Regras

- Use o alias `@/` nos imports: `import { api } from '@/services/api'`.
- Uma feature **não importa arquivos internos de outra**, somente o `index.ts` dela.
- Estilize com classes do Tailwind. As cores do LIVA ficam em `styles/tokens.css` (`@theme`) e viram classes: `bg-primary-600`, `text-muted`, `border-border`.
- Não use cores soltas (`bg-[#15803d]`, `bg-green-700`). Se faltar uma cor, adicione-a ao `tokens.css`.

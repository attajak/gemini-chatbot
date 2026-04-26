# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM (via `lib/db`)
- **Validation**: Zod, `drizzle-zod`
- **Build**: esbuild (ESM bundle for api-server)

## Artifacts

### gemini-chatbot (React + Vite frontend)
- **Path**: `artifacts/gemini-chatbot/`
- **Preview path**: `/`
- **Port**: `$PORT` (assigned by Replit)
- **Stack**: React 19, Vite 7, Tailwind CSS v4, AI SDK v3
- **Routing**: React Router v6 (`BrowserRouter` with `basename=BASE_PATH`)
- **Auth**: JWT via localStorage `auth-token`, context in `src/lib/auth-context.tsx`
- **State**: `useChat` from `ai/react` (AI SDK v3), SWR for data fetching
- **API proxy**: Vite proxies `/api` → `localhost:8080` in dev

### api-server (Express backend)
- **Path**: `artifacts/api-server/`
- **Port**: 8080 (assigned by Replit)
- **Stack**: Express 5, AI SDK v3, Drizzle ORM, Jose (JWT)
- **Routes**: All mounted at `/api`
  - `POST /api/register` - create account
  - `POST /api/login` - authenticate
  - `GET /api/session` - verify token
  - `POST /api/chat` - streaming AI chat (requires auth)
  - `GET /api/chat/:id` - get chat by ID (requires auth)
  - `GET /api/history` - get user chat history (requires auth)
  - `GET/PATCH /api/reservation` - get/update reservation
  - `POST /api/files/upload` - upload file (multer)
  - `GET /api/healthz` - health check
- **AI model**: `gemini-2.0-flash` via `@ai-sdk/google`
- **Auth**: JWT signed with `AUTH_SECRET` env var, verified via `jose`

### lib/db (Drizzle ORM schema)
- **Path**: `lib/db/`
- **Tables**: `User`, `Chat`, `Reservation`
- **Push command**: `pnpm --filter @workspace/db run push`

## Environment Variables / Secrets
- `GOOGLE_GENERATIVE_AI_API_KEY` - Gemini API key
- `AUTH_SECRET` - JWT signing secret
- `DATABASE_URL` - PostgreSQL connection string

## Key Commands
- `pnpm --filter @workspace/gemini-chatbot run dev` — run frontend
- `pnpm --filter @workspace/api-server run dev` — run API server
- `pnpm --filter @workspace/db run push` — push DB schema

## Features
- User registration & login (JWT-based)
- Streaming AI chat with tool calls (flight booking flow)
- Chat history (saved to PostgreSQL)
- File upload support (base64 data URLs)
- Flight tools: search flights, select seats, create reservation, authorize payment, display boarding pass
- Weather widget
- Dark/light theme toggle
- Responsive design

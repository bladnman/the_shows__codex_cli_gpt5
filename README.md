The Shows — Discover, track, and rate movies & TV.

Overview
- Next.js App Router + TypeScript + Tailwind v4
- Centralized theme tokens in `theme/tokens.ts` and CSS vars in `app/globals.css`
- TMDB-powered discovery and search with caching via `fetch` revalidate
- SQLite (Prisma) for watchlist, watched history, and ratings (anonymous session)

Setup
- Prereqs: Node 18+, npm
- Copy `.env.local.example` to `.env.local`
- Provide TMDB credentials (choose one):
  - v4 Read Access Token (preferred): set `TMDB_BEARER` (or `TMDB_V4_TOKEN`)
  - v3 API Key (fallback): set `TMDB_API_KEY`
- Initialize dev DB: `npm run db:push`
- Start dev server: `npm run dev` then open http://localhost:3000

Scripts
- `npm run dev`: Start Next.js
- `npm run build` / `npm start`: Build and run
- `npm run db:push`: Sync Prisma schema to SQLite
- `npm run db:studio`: Open Prisma Studio
- `npm test`: Run unit tests (Vitest)
- `npm run e2e`: Run Playwright E2E (builds + starts server)
- `npm run e2e:headed`: E2E in headed browser

Structure (Always Rules)
- `/app` — routes, each with `features/`, `hooks/`, `utils/` as needed
- `/components` — generic components (e.g., `ShowCard`, `Stars`)
- `/lib` — global services (`tmdb.ts`, `db.ts`, `user_state.ts`)
- `/theme` — `tokens.ts` for design tokens (no hard-coded values in components)

Routes
- `/` — Trending, Popular, and New sections
- `/search?q=` — Combined TMDB search
- `/show/[mediaType]/[id]` — Details + actions (watchlist, watched, rating)
- `/collections` — Watchlist, Watched, Rated

Notes
- Images are served from `image.tmdb.org` (configured in `next.config.ts`).
- Anonymous user session stored in `anonId` cookie; no auth in MVP.
- If `TMDB_API_KEY` is missing, discovery/search will error; set it first.
- E2E relies on live TMDB API. Ensure `TMDB_API_KEY` is set before running.

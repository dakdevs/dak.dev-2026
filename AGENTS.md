# dak.dev-2026

Personal portfolio site. Next.js 16 + React 19 + Tailwind v4 + Drizzle ORM + ORPC + TanStack Query.

## Structure

```
src/
  app/                    # Next.js App Router pages
    career/               # Career timeline page
    recommendations/      # Curated tools/products
    rpc/[[...rest]]/      # ORPC catch-all handler
  components/
    motion-primitives/    # Animated text effects (use client)
  config/                 # T3 Env validation
  db/                     # Drizzle ORM + PostgreSQL
  fonts/                  # Custom monospace font (all weights)
  orpc/                   # Type-safe RPC layer
    controllers/          # Route handlers
    middleware/           # Request context
  styles/                 # Tailwind v4 theme
  utils/                  # cn() helper
docs/
  style-guide.md          # Brand colors, typography, spacing
```

## Where to Look

| Task | Location |
|------|----------|
| Add page | `src/app/{route}/page.tsx` |
| Add API endpoint | `src/orpc/controllers/` + register in `index.ts` |
| Add component | `src/components/` (kebab-case filename) |
| Add animation | `src/components/motion-primitives/` |
| DB schema | `src/db/models/` |
| Environment vars | `src/config/env.ts` (T3 Env validation) |
| Theme/colors | `src/styles/globals.css` or `docs/style-guide.md` |

## Server Components First

**Never add `'use client'` to:**
- `page.tsx`, `layout.tsx`, `default.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`

**Push client code down the tree:**
```
page.tsx (server)
  └── interactive-widget.tsx ('use client')
```

Extract minimum client code: `useState`, `useEffect`, event handlers, browser APIs, motion animations.

## Conventions

- **Filenames**: kebab-case always
- **Params**: Inline types, not isolated `interface`
- **Motion**: Use `motion` package (not `framer-motion`)
- **Imports**: `~/` alias for `src/`
- **Formatter**: Ultracite (Biome) — tabs, single quotes, trailing commas
- **Unused imports**: Error (no auto-fix)

## ORPC Architecture

```
client.ts          # Browser client with TanStack Query
orpc.server.ts     # Server-side client (headers context)
router.ts          # Combines all controllers
controllers/
  index.ts         # Controller registry
  ping.ts          # Example: os.handler() pattern
```

Add controller: Create handler in `controllers/`, export from `index.ts`.

## Database

- **ORM**: Drizzle with PostgreSQL
- **Casing**: snake_case in DB
- **Schema**: `src/db/models/`
- **Commands**: `bun run db:push`, `db:generate`, `db:migrate`

## Commands

```bash
bun dev              # Dev server (Turbopack)
bun run build        # Production build
bun run lint         # Ultracite check
bun run lint:fix     # Ultracite fix
bun run typecheck    # tsc --noEmit
```

## Anti-Patterns

- `'use client'` on page/layout files
- `as any`, `@ts-ignore`, `@ts-expect-error`
- `framer-motion` import (use `motion`)
- Isolated `interface` for function params
- Non-kebab-case filenames

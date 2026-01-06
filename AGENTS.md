# Project Guidelines

## Server Components First

**Never mark these files as `'use client'`:**
- `page.tsx`
- `layout.tsx`
- `default.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`

### Why?

Server Components are the default in Next.js App Router. They enable:
- Zero client-side JavaScript for static content
- Direct database/API access without exposing endpoints
- Smaller bundle sizes
- Better SEO and initial page load

### How to Handle Client Interactivity

Push `'use client'` as far down the component tree as possible:

```
Bad:
page.tsx ('use client') <- entire page is client-rendered

Good:
page.tsx (server)
  └── ClientButton.tsx ('use client') <- only interactive parts
```

### Example

```tsx
// page.tsx - Server Component (no 'use client')
import { InteractiveWidget } from '~/components/interactive-widget'

export default function Page() {
  return (
    <main>
      <h1>Static content rendered on server</h1>
      <p>This text has zero JS overhead</p>
      <InteractiveWidget /> {/* Only this needs client JS */}
    </main>
  )
}

// components/interactive-widget.tsx
'use client'

export function InteractiveWidget() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### When You Need Client Features

Extract the minimum necessary into a separate client component:
- `useState`, `useEffect`, `useContext`
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `localStorage`, etc.)
- Third-party client libraries

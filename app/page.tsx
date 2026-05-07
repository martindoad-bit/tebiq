import { redirect } from 'next/navigation'

// 0.6 ENGINE Pack 1 — root route Option B (GM-approved 2026-05-07).
//
// `/` is no longer the dashboard hub. The 0.6 user-facing entry is the
// streaming-consultation flow; redirect from `/` keeps the canonical
// tebiq.jp URL pointing at it without forcing users to memorize the
// `/ai-consultation` path.
//
// Implementation choice: top-level `redirect()` in this server component
// (per GM directive) rather than middleware.ts. Two reasons:
//   1. Middleware runs on every request including static asset paths;
//      a single page-level redirect has narrower blast radius.
//   2. Easy to revert / repoint to a different path later — single line.
//
// `redirect()` from next/navigation throws a special exception Next.js
// catches and converts to a 307 (temporary). If a future iteration
// wants 308 (permanent SEO signal), switch to `permanentRedirect()`.

export const dynamic = 'force-dynamic'

export default function HomePage(): never {
  redirect('/ai-consultation')
}

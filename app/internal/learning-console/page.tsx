import { notFound } from 'next/navigation'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { listAllAiConsultations } from '@/lib/db/queries/aiConsultations'
import { computeKpis } from '@/lib/learning-console/types'
import LearningConsoleClient from './LearningConsoleClient'

// /internal/learning-console — 1.0 Alpha Learning Console (Issue #41).
//
// Distinct from /internal/eval-console:
//   - eval-console reads from eval_answers (annotation surface)
//   - learning-console reads from ai_consultations (real-user consultation
//     surface populated by Issue #39 streaming pipeline)
//
// Same env gate as eval-console for parity (Pack §1 / GM directive):
// `EVAL_LAB_ENABLED=1` must be set or the page 404s. Direct-URL only —
// no nav link from anywhere.
//
// Architecture:
//   - This page (server component) loads up to 200 most-recent rows AND
//     computes the KPI summary at request time. KPIs are computed in
//     lib/learning-console/types so the same logic is reusable in tests.
//   - The client component consumes the pre-loaded array and does
//     in-memory tab filtering (Pack §4 — 7 tabs). No per-tab fetch.
//   - Detail page is a separate route /internal/learning-console/[id]
//     (also server-rendered, also gated).

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Learning Console · TEBIQ Internal',
  // robots: noindex — internal tool, never want this in search.
  robots: { index: false, follow: false },
}

const ROW_LIMIT = 200

export default async function LearningConsolePage() {
  if (!isEvalLabEnabled()) {
    notFound()
  }
  // Pack §6.G — DS down does NOT impact this page; we only read from DB.
  const rows = await listAllAiConsultations(ROW_LIMIT)
  const kpis = computeKpis(rows)
  // Serialize Date fields to ISO strings before crossing the
  // server-component boundary (Next.js requires plain JSON-able props).
  const serialized = rows.map(r => ({
    ...r,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
    updatedAt: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : String(r.updatedAt),
    streamStartedAt: r.streamStartedAt instanceof Date ? r.streamStartedAt.toISOString() : null,
    firstTokenAt: r.firstTokenAt instanceof Date ? r.firstTokenAt.toISOString() : null,
    completedAt: r.completedAt instanceof Date ? r.completedAt.toISOString() : null,
  }))
  return <LearningConsoleClient rows={serialized} kpis={kpis} rowLimit={ROW_LIMIT} />
}

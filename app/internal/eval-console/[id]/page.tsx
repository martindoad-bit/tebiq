import { notFound } from 'next/navigation'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import EvalConsoleDetailClient from './EvalConsoleDetailClient'

// /internal/eval-console/[id] — per-question detail (Issue #26 §A3).
//
// Read-only page showing the full TEBIQ + DeepSeek output for a single
// question, plus DOMAIN risk metadata, sample classification, and the
// reason a sample is currently blocked from formal annotation.
//
// Server-component env gate. Internal-only.

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Eval Console Detail · TEBIQ Internal',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: { id: string }
}

export default function EvalConsoleDetailPage({ params }: PageProps) {
  if (!isEvalLabEnabled()) {
    notFound()
  }
  return <EvalConsoleDetailClient questionId={params.id} />
}

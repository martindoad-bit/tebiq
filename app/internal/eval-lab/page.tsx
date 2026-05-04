import { notFound } from 'next/navigation'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import EvalLabClient from './EvalLabClient'

// Server-component wrapper: env gate runs at request time. When
// EVAL_LAB_ENABLED is not '1' the page does not exist (404). The
// page is intentionally NOT linked from any navigation; access is
// by direct URL only.

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Eval Lab · TEBIQ Internal',
  // robots: noindex — internal tool, never want this in search.
  robots: { index: false, follow: false },
}

export default function EvalLabPage() {
  if (!isEvalLabEnabled()) {
    notFound()
  }
  return <EvalLabClient />
}

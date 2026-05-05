import AiConsultationEntryClient from './AiConsultationEntryClient'

// /ai-consultation — TEBIQ 1.0 Alpha consultation entry
// (Issue #39 / Charter §4).
//
// Entry surface: textarea + submit. On submit, creates a consultation
// row via the streaming endpoint and redirects to /c/[id] for the
// streaming view.
//
// New route — does NOT replace the existing legacy `/consultation`
// (human-contact form) or the existing `/answer/[id]` (legacy answer
// view from /api/questions).

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 在留咨询 Alpha',
  description: 'TEBIQ 1.0 Alpha — 输入你的在留问题获得咨询方向。Alpha 阶段，回答仅供参考。',
  robots: { index: false, follow: false }, // Alpha — limited release per Charter §9
}

export default function AiConsultationPage() {
  return <AiConsultationEntryClient />
}

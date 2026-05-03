// TEBIQ Matter Draft V0 — localStorage-only persistence.
//
// MVP scope (per Context Pack §3 L2): "MVP 阶段的"生成清单"仅指回答页
// 或事项卡内的结构化步骤展示，不是独立清单管理系统，也不包含复杂模板库、
// 多人协作、权限或后台流程".
//
// V0 design choice: localStorage, NO backend. Each draft is a pointer
// to a previously-rendered /answer/{answer_id}. This means:
//   - matters do NOT sync across devices / browsers
//   - clearing browser data wipes matters (acceptable for V0)
//   - no auth, no anonymous-vs-logged-in story
//   - no schema migration, no API surface, no server load
//
// When V1 needs cross-device sync, swap this module for a server-backed
// implementation; the public API surface (saveMatterDraft / list / etc.)
// stays the same.

const STORAGE_KEY = 'tebiq_matter_drafts_v0'
const MAX_DRAFTS = 50 // safety cap — older drafts get evicted FIFO when over

export interface MatterDraft {
  id: string                   // UUID generated client-side
  answer_id: string            // links back to /answer/{id} for re-render
  question: string             // the user's original question
  title: string                // short summary for the list card
  summary: string              // 1-2 line preview
  urgency: 'now' | 'soon' | 'later'
  created_at: string           // ISO 8601
}

export interface SaveMatterDraftInput {
  answer_id: string
  question: string
  title: string
  summary: string
  urgency?: 'now' | 'soon' | 'later'
}

// All functions are no-ops on the server — the storage is browser-only.
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readAll(): MatterDraft[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((m): m is MatterDraft =>
      m !== null
      && typeof m === 'object'
      && typeof (m as MatterDraft).id === 'string'
      && typeof (m as MatterDraft).answer_id === 'string',
    )
  } catch {
    return []
  }
}

function writeAll(drafts: MatterDraft[]): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts.slice(0, MAX_DRAFTS)))
  } catch {
    // Quota exceeded / private mode — silent fail. The button will still
    // claim "saved" but the draft won't persist. V1 will surface this.
  }
}

export function listMatterDrafts(): MatterDraft[] {
  return readAll()
    .slice()
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export function getMatterDraft(id: string): MatterDraft | null {
  return readAll().find(m => m.id === id) ?? null
}

// Returns true if a draft with the same answer_id already exists.
export function hasMatterDraftForAnswer(answer_id: string): boolean {
  return readAll().some(m => m.answer_id === answer_id)
}

export function saveMatterDraft(input: SaveMatterDraftInput): MatterDraft {
  const id = generateId()
  const draft: MatterDraft = {
    id,
    answer_id: input.answer_id,
    question: (input.question || '').slice(0, 240),
    title: (input.title || '').slice(0, 160),
    summary: (input.summary || '').slice(0, 320),
    urgency: input.urgency ?? 'later',
    created_at: new Date().toISOString(),
  }
  // Dedup by answer_id — saving the same answer twice replaces the
  // existing matter rather than creating a duplicate.
  const existing = readAll().filter(m => m.answer_id !== input.answer_id)
  writeAll([draft, ...existing])
  return draft
}

export function removeMatterDraft(id: string): void {
  writeAll(readAll().filter(m => m.id !== id))
}

function generateId(): string {
  // crypto.randomUUID isn't universal across older mobile webviews;
  // fall back to a 16-char base36 random.
  if (isBrowser() && typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `m_${crypto.randomUUID()}`
  }
  return `m_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`
}

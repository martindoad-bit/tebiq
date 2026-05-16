// Deep-Water Handoff block — "找谁确认"
//
// Rendered ABOVE the existing scrivener CTA on the answer page when the
// underlying question hit a deep-water route gate. Additive only: when
// the matched family is plain 行政書士 (no critical safety overrides),
// we still render the block but it visually defers to the existing
// scrivener flow. For DV / 不许可 / 退去強制, the block becomes the
// primary destination instead of /scrivener.
//
// Style mirrors AnswerResultView's other surface blocks (rounded-[16px],
// border-hairline, bg-surface, ink/slate/ash tokens) so it doesn't read
// as a marketing card.

import type { HandoffEntry, HandoffUrgency, ProfessionalKind } from '@/lib/consultation/deep-water-handoff'

const URGENCY_LABEL: Record<HandoffUrgency, string> = {
  today: '今天',
  this_week: '几天内',
  before_deadline: '期限前',
  general: '参考',
}

// Lightweight pictograph per kind. Uses unicode glyphs (no icon library
// dependency) so the block stays light and works inside server
// components without extra hydration cost.
const KIND_GLYPH: Record<ProfessionalKind, string> = {
  gyoseishoshi: '行',
  immigration_lawyer: '律',
  dv_center: 'DV',
  police: '警',
  isa_window: '入',
  tax_office: '税',
  tax_accountant: '税',
  pension_office: '年',
  social_insurance: '社',
  municipal_office: '市',
  hello_work: 'HW',
  judicial_scrivener: '司',
  legal_terrace: '法',
}

export default function DeepWaterHandoff({ handoff }: { handoff: HandoffEntry }) {
  if (!handoff || handoff.kinds.length === 0) return null

  // UI cap: render top-2 as named CTAs, rest as small alternates chip
  // row. Plan §3.4 P1 — cap multi-handoff display.
  const primary = handoff.kinds.slice(0, 2)
  const alternates = handoff.kinds.slice(2)

  return (
    <section className="mt-5 rounded-[16px] border border-hairline bg-surface px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[14px] font-medium leading-none text-ink">找谁确认</h2>
        <span className="inline-flex min-h-[22px] items-center whitespace-nowrap rounded-[8px] border border-hairline bg-paper px-2 py-0.5 text-[11.5px] leading-none text-slate">
          {URGENCY_LABEL[handoff.urgency]}
        </span>
      </div>

      <ul className="mt-3 grid gap-2">
        {primary.map((entry, idx) => (
          <li
            key={entry.kind}
            className={`grid grid-cols-[28px_1fr] items-start gap-2.5 rounded-[12px] px-3 py-2.5 ${
              idx === 0 ? 'bg-paper' : 'border border-hairline bg-canvas'
            }`}
          >
            <span
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-canvas text-[11px] font-medium text-ink"
            >
              {KIND_GLYPH[entry.kind]}
            </span>
            <div className="grid gap-1">
              <p className="text-[14.5px] leading-[1.4] text-ink [overflow-wrap:anywhere]">
                {entry.label}
              </p>
              {entry.official_locator && (
                <p className="text-[12.5px] leading-[1.5] text-slate [overflow-wrap:anywhere]">
                  {entry.official_locator}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {alternates.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="text-[12px] text-ash">也可能涉及：</span>
          {alternates.map(entry => (
            <span
              key={entry.kind}
              className="inline-flex items-center whitespace-nowrap rounded-[8px] border border-hairline bg-canvas px-2 py-0.5 text-[12px] text-slate"
            >
              {entry.label}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 text-[12.5px] leading-[1.6] text-ash [overflow-wrap:anywhere]">
        {handoff.oneLine}
      </p>
    </section>
  )
}

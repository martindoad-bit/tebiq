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
import {
  L5_SIGNAL_REGISTRY,
  type L5ContentState,
  type L5Signal,
} from '@/lib/l5/signal-registry'

// State-banner copy. needs_domain entries display a banner that frames
// the section as "points for the professional to confirm", not advice.
const STATE_BANNER: Record<L5ContentState, string | null> = {
  agent_drafted: null,
  needs_domain: '以下要点供你和专业人士确认，不是最终判断。',
  domain_reviewed: null,
}

// Lightweight static lookup so the component stays a server component
// (no client-side fetching, no hydration cost for a content-only block).
function lookupL5Signals(ids: string[] | undefined | null): L5Signal[] {
  if (!ids || ids.length === 0) return []
  const set = new Set(ids)
  return L5_SIGNAL_REGISTRY.filter(s => set.has(s.id))
}

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

      <L5SignalSection signals={lookupL5Signals(handoff.l5SignalIds)} />
    </section>
  )
}

// ---------------------------------------------------------------------
// L5 Practice Signal block — "为什么是深水 + 准备什么 + 不要做什么"
// ---------------------------------------------------------------------
//
// Renders inside the same handoff card so the user sees routing
// (找谁确认) and preparation (这道题为什么是深水) in one surface. Uses
// <details>/<summary> so the section is expandable with zero JS in a
// server component.

function L5SignalSection({ signals }: { signals: L5Signal[] }) {
  if (signals.length === 0) return null

  return (
    <div className="mt-4 grid gap-3">
      {signals.map(signal => (
        <details
          key={signal.id}
          className="group rounded-[12px] border border-hairline bg-canvas px-3 py-2.5 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
            <span className="text-[13.5px] leading-[1.4] text-ink [overflow-wrap:anywhere]">
              这道题为什么是深水：{signal.title}
            </span>
            <span className="mt-0.5 shrink-0 text-[11px] leading-none text-slate transition-transform group-open:rotate-90">
              ›
            </span>
          </summary>

          <div className="mt-3 grid gap-3">
            {STATE_BANNER[signal.contentState] && (
              <p className="rounded-[8px] bg-paper px-2.5 py-1.5 text-[11.5px] leading-[1.5] text-slate [overflow-wrap:anywhere]">
                {STATE_BANNER[signal.contentState]}
              </p>
            )}

            <div>
              <h3 className="text-[12.5px] font-medium leading-none text-slate">为什么不能直答</h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-ink [overflow-wrap:anywhere]">
                {signal.whyThisIsDeepWater}
              </p>
            </div>

            {signal.prepareWhat.length > 0 && (
              <div>
                <h3 className="text-[12.5px] font-medium leading-none text-slate">
                  {signal.contentState === 'needs_domain' ? '给专业人士看的事实清单' : '准备什么'}
                </h3>
                <ul className="mt-1.5 grid gap-1.5">
                  {signal.prepareWhat.map(item => (
                    <li
                      key={item}
                      className="text-[13px] leading-[1.55] text-ink [overflow-wrap:anywhere] before:mr-1.5 before:text-ash before:content-['·']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {signal.doNotDo.length > 0 && (
              <div>
                <h3 className="text-[12.5px] font-medium leading-none text-slate">不要做</h3>
                <ul className="mt-1.5 grid gap-1.5">
                  {signal.doNotDo.map(item => (
                    <li
                      key={item}
                      className="text-[13px] leading-[1.55] text-ink [overflow-wrap:anywhere] before:mr-1.5 before:text-ash before:content-['×']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {signal.sourceUrls.length > 0 && (
              <div>
                <h3 className="text-[12.5px] font-medium leading-none text-slate">参考公式信源</h3>
                <ul className="mt-1.5 grid gap-1">
                  {signal.sourceUrls.map(url => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[12.5px] leading-[1.55] text-slate underline [overflow-wrap:anywhere]"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}

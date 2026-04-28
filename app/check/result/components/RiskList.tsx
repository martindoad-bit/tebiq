import type { TriggeredItem } from '@/lib/check/questions/gijinkoku'

function TriggerCard({
  item,
  accentColor,
}: {
  item: TriggeredItem
  accentColor: 'red' | 'amber'
}) {
  const borderClass = accentColor === 'red' ? 'border-[#DC2626]' : 'border-primary'
  const titleClass = accentColor === 'red' ? 'text-[#DC2626]' : 'text-primary'

  return (
    <div className={`bg-card border-l-4 ${borderClass} rounded-r-xl p-4`}>
      <div className="font-bold text-title text-base leading-snug mb-2">
        {item.triggerLabel}
      </div>
      <div className={`${titleClass} text-xs font-bold mb-2`}>处理建议</div>
      <p className="text-body text-sm leading-relaxed">{item.fixHint}</p>
    </div>
  )
}

const SEVERITY_ORDER: Record<TriggeredItem['severity'], number> = {
  red: 0,
  yellow: 1,
}

export default function RiskList({
  items,
  heading,
  accentColor,
  /** When true (default), sort red items first then yellow. */
  sortBySeverity = true,
}: {
  items: TriggeredItem[]
  heading?: { text: string; tone: 'red' | 'amber' | 'green' }
  /** Force a single accent color for all cards. If omitted, each card uses its own severity. */
  accentColor?: 'red' | 'amber'
  sortBySeverity?: boolean
}) {
  if (items.length === 0) return null

  const ordered = sortBySeverity
    ? [...items].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
    : items

  const headingClass =
    heading?.tone === 'red'
      ? 'text-[#DC2626]'
      : heading?.tone === 'green'
        ? 'text-[#16A34A]'
        : 'text-primary'

  return (
    <div className="mb-6">
      {heading && (
        <h2 className={`font-bold ${headingClass} text-sm mb-3 px-1`}>{heading.text}</h2>
      )}
      <div className="space-y-3">
        {ordered.map(item => (
          <TriggerCard
            key={item.id}
            item={item}
            accentColor={accentColor ?? (item.severity === 'red' ? 'red' : 'amber')}
          />
        ))}
      </div>
    </div>
  )
}

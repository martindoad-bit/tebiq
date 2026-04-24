export default function Loading({
  label = '载入中…',
  inline = false,
}: {
  label?: string
  inline?: boolean
}) {
  if (inline) {
    return (
      <span className="inline-flex items-center gap-2 text-muted text-sm">
        <Spinner />
        {label}
      </span>
    )
  }
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-muted text-sm">
      <Spinner />
      <span>{label}</span>
    </div>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" opacity="0.2" />
      <path d="M21 12a9 9 0 0 1-9 9" />
    </svg>
  )
}

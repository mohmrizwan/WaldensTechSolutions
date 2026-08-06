// Static class map — keeps Tailwind JIT-safe (see StatsCard note on this pattern)
const STATUS_STYLES = {
  active: 'bg-emerald-500/15 text-emerald-400',
  completed: 'bg-accent/15 text-accent-light',
  'on-hold': 'bg-amber-500/15 text-amber-400',
  cancelled: 'bg-red-500/15 text-red-400',
  pending: 'bg-gray-500/15 text-gray-400',
}

/**
 * Small colored pill for status values (project status, etc.).
 * Falls back to a neutral style for unrecognized statuses.
 */
export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending
  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
    : 'Unknown'

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      {label}
    </span>
  )
}

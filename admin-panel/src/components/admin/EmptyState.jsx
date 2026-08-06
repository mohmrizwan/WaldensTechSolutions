import { Inbox } from 'lucide-react'

/**
 * Generic empty state — used wherever a list/table has no data
 * (no results, no records yet, filtered search with no matches).
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = '',
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-300/50">
        <Icon size={22} className="text-gray-500" />
      </div>
      <h3 className="mt-3 text-sm font-medium text-gray-200">{title}</h3>
      {description && (
        <p className="mt-1 max-w-xs text-xs text-gray-500">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

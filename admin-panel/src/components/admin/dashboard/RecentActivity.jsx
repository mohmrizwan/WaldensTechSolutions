import { Clock } from 'lucide-react'
import Loader from '../Loader'
import EmptyState from '../EmptyState'

/**
 * Renders the recent activity feed. Purely presentational — receives
 * data + loading/error state as props; Dashboard.jsx owns the fetching.
 */
export default function RecentActivity({ activity, isLoading, error }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h2 className="text-base font-semibold text-gray-100">Recent Activity</h2>

      <div className="mt-4">
        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader size="md" />
          </div>
        )}

        {!isLoading && error && (
          <p className="py-8 text-center text-sm text-red-400">
            Failed to load recent activity.
          </p>
        )}

        {!isLoading && !error && activity.length === 0 && (
          <EmptyState
            title="No recent activity"
            description="New actions across your site will show up here."
          />
        )}

        {!isLoading && !error && activity.length > 0 && (
          <ul className="space-y-4">
            {activity.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-300">
                  <Clock size={14} className="text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-200">
                    <span className="font-medium text-gray-100">{item.actor}</span>{' '}
                    {item.message}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

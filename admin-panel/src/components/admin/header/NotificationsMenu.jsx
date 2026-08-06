import { useRef } from 'react'
import { Bell } from 'lucide-react'
import { useClickOutside } from '../../../hooks/useClickOutside'

/**
 * Notifications bell + dropdown. Currently expects `notifications` as a prop
 * so this component stays pure UI — actual data fetching (e.g. from a
 * notificationsApi) belongs to whatever page/context supplies it, not here.
 */
export default function NotificationsMenu({
  notifications = [],
  isOpen,
  onToggle,
  onClose,
}) {
  const menuRef = useRef(null)
  useClickOutside(menuRef, onClose, isOpen)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={onToggle}
        className="relative rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-gray-100"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-surface-900" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 animate-slide-in rounded-xl border border-white/5 bg-surface-100/95 shadow-glass backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-100">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-accent-light">{unreadCount} new</span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-gray-500">
                You're all caught up.
              </p>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`border-b border-white/5 px-4 py-3 transition hover:bg-white/5 ${
                    !item.isRead ? 'bg-accent/5' : ''
                  }`}
                >
                  <p className="text-sm text-gray-200">{item.message}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.time}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

import { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Settings, LogOut, ChevronDown } from 'lucide-react'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { ROUTES } from '../../../utils/constants'

/**
 * User avatar + dropdown with quick links to Settings and logout.
 * STATIC UI MODE: there is no session, so identity fields are static
 * placeholders and "Log out" is just a link to the Login page for
 * design purposes — it does not clear any auth state.
 */
export default function ProfileMenu({ isOpen, onToggle, onClose }) {
  const user = null
  const navigate = useNavigate()
  const menuRef = useRef(null)
  useClickOutside(menuRef, onClose, isOpen)

  const handleLogout = () => {
    onClose()
    navigate(ROUTES.LOGIN)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 rounded-lg p-1.5 pr-2 transition hover:bg-white/5"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-sm font-medium text-white">
          {(user?.name || 'A').charAt(0).toUpperCase()}
        </div>
        <span className="hidden text-sm font-medium text-gray-200 sm:block">
          {user?.name || 'Admin'}
        </span>
        <ChevronDown
          size={16}
          className={`hidden text-gray-500 transition-transform sm:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 animate-slide-in rounded-xl border border-white/5 bg-surface-100/95 shadow-glass backdrop-blur-xl">
          <div className="border-b border-white/5 px-4 py-3">
            <p className="truncate text-sm font-medium text-gray-100">
              {user?.name || 'Admin'}
            </p>
            <p className="truncate text-xs text-gray-500">
              {user?.email || 'admin@example.com'}
            </p>
          </div>

          <div className="p-1.5">
            <NavLink
              to={ROUTES.SETTINGS}
              onClick={onClose}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-gray-100"
            >
              <Settings size={16} />
              Settings
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-300 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

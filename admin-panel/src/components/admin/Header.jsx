import { useState } from 'react'
import { Menu } from 'lucide-react'
import SearchBar from './header/SearchBar'
import NotificationsMenu from './header/NotificationsMenu'
import ProfileMenu from './header/ProfileMenu'

/**
 * Sticky top header. Composes SearchBar + NotificationsMenu + ProfileMenu.
 * Only one dropdown can be open at a time — opening one closes the other.
 *
 * `notifications` and `searchValue`/`onSearchChange` are left as props
 * (not hardcoded state) so pages can eventually wire real data/behavior
 * in without touching this file. For now they default to empty/no-op.
 */
export default function Header({
  onMenuClick,
  notifications = [],
  searchValue = '',
  onSearchChange = () => {},
}) {
  const [openMenu, setOpenMenu] = useState(null) // 'notifications' | 'profile' | null

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu))
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-surface-900/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-gray-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <SearchBar value={searchValue} onChange={onSearchChange} />

      <div className="ml-auto flex items-center gap-2">
        <NotificationsMenu
          notifications={notifications}
          isOpen={openMenu === 'notifications'}
          onToggle={() => toggleMenu('notifications')}
          onClose={() => setOpenMenu(null)}
        />
        <ProfileMenu
          isOpen={openMenu === 'profile'}
          onToggle={() => toggleMenu('profile')}
          onClose={() => setOpenMenu(null)}
        />
      </div>
    </header>
  )
}

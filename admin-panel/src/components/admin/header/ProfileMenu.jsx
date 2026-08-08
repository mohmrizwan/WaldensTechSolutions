import { useRef , useState, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Settings, LogOut, ChevronDown } from 'lucide-react'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { ROUTES } from '../../../utils/constants'
import { getCurrentAdmin } from '../../../api/adminApi'



export default function ProfileMenu({ isOpen, onToggle, onClose }) {
  const [admin , setAdmin]= useState(null);
  const navigate = useNavigate()
  const menuRef = useRef(null)
  useClickOutside(menuRef, onClose, isOpen)

  const handleLogout = () => {
    localStorage.removeItem("token")
    onClose()
    navigate(ROUTES.LOGIN)
  }
    useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getCurrentAdmin();
        console.log(data);
        setAdmin(data.admin);
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 rounded-lg p-1.5 pr-2 transition hover:bg-white/5"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-sm font-medium text-white">
          {(admin?.name || 'A').charAt(0).toUpperCase()}
        </div>
        <span className="hidden text-sm font-medium text-gray-200 sm:block">
          {admin?.name || 'Admin'}
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
              {admin?.name || 'Admin'}
            </p>
            <p className="truncate text-xs text-gray-500">
              {admin?.email || 'admin@example.com'}
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

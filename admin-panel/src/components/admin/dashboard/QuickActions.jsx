import { NavLink } from 'react-router-dom'
import { PlusCircle, FolderPlus, UserPlus, Mail } from 'lucide-react'
import { ROUTES } from '../../../utils/constants'

// Static config — these are navigation shortcuts, not data from the backend,
// so a local array here is appropriate (not a violation of the "no dummy
// data" rule, which applies to content that should come from an API).
const ACTIONS = [
  { label: 'Add Service', to: ROUTES.SERVICES, icon: PlusCircle },
  { label: 'Add Project', to: ROUTES.PROJECTS, icon: FolderPlus },
  { label: 'Add Team Member', to: ROUTES.TEAM, icon: UserPlus },
  { label: 'View Contacts', to: ROUTES.CONTACTS, icon: Mail },
]

/**
 * Shortcut buttons to common creation flows. Each links to the relevant
 * page — actual "add" modals live on those pages (Steps 7-9).
 */
export default function QuickActions() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h2 className="text-base font-semibold text-gray-100">Quick Actions</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {ACTIONS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className="group flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-surface-200/40 p-4 text-center transition-all duration-200 hover:border-accent/30 hover:bg-surface-200/70"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 transition-transform duration-200 group-hover:scale-110">
              <Icon size={18} className="text-accent-light" />
            </div>
            <span className="text-xs font-medium text-gray-300">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

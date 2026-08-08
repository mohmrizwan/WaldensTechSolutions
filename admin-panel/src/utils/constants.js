// Central place for app-wide constants — avoids magic strings scattered across files

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  SERVICES: '/services',
  PROJECTS: '/projects',
  TEAM: '/team',
  CONTACTS: '/contacts',
  BANNER: '/banner',
  SETTINGS: '/settings',
}

export const PAGE_SIZE = 8

// Drives the Sidebar nav — icon names map to lucide-react components in Sidebar.jsx
export const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Services', path: ROUTES.SERVICES, icon: 'Layers' },
  { label: 'Projects', path: ROUTES.PROJECTS, icon: 'FolderKanban' },
  { label: 'Team', path: ROUTES.TEAM, icon: 'Users' },
  { label: 'Contacts', path: ROUTES.CONTACTS, icon: 'Mail' },
  { label: 'Banner', path: ROUTES.BANNER, icon: 'Sparkles' },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: 'Settings' },
]

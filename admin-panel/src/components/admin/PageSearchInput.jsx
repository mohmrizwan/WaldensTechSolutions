import { Search } from 'lucide-react'

/**
 * Search input used at the top of list pages (Services, Projects, Team,
 * Contacts) to filter results. Distinct from the header's global SearchBar —
 * this one is scoped to whatever page renders it.
 */
export default function PageSearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-surface-200/50 py-2 pl-9 pr-3 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-accent/50"
      />
    </div>
  )
}

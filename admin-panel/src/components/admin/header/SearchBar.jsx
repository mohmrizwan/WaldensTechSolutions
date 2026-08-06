import { Search } from 'lucide-react'

/**
 * Controlled search input. Kept dumb on purpose — the page/context
 * consuming `value`/`onChange` decides what to do with the query
 * (e.g. filtering a DataTable), this component just renders the input.
 */
export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative hidden w-full max-w-sm sm:block">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-surface-200/50 py-2 pl-9 pr-3 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-accent/50 focus:bg-surface-200/80"
      />
    </div>
  )
}

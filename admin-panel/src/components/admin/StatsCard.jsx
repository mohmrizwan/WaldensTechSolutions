import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

// Static class map so Tailwind's JIT compiler can detect these at build time —
// template-literal class names (e.g. `bg-${color}/15`) would be purged.
const ICON_STYLES = {
  accent: 'bg-accent/15 text-accent-light',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  rose: 'bg-rose-500/15 text-rose-400',
}

/**
 * Single statistic card. Reusable across Dashboard (and potentially
 * other pages) — takes plain props, no data fetching of its own.
 *
 * `trend` is optional: positive number renders green/up, negative
 * renders red/down, omitted hides the trend indicator entirely.
 */
export default function StatsCard({ label, value, icon: Icon, trend, accentColor = 'accent' }) {
  const hasTrend = typeof trend === 'number'
  const isPositive = trend > 0
  const iconStyle = ICON_STYLES[accentColor] || ICON_STYLES.accent

  return (
    <div className="glass-card group rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-100">{value}</p>
        </div>
        {Icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${iconStyle}`}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      {hasTrend && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          {isPositive ? (
            <ArrowUpRight size={14} className="text-emerald-400" />
          ) : (
            <ArrowDownRight size={14} className="text-red-400" />
          )}
          <span className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  )
}

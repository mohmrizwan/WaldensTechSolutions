import { BarChart3 } from 'lucide-react'

/**
 * Visual placeholder for the analytics chart. Real chart integration
 * (recharts, chart.js, etc.) is a separate task once backend metrics
 * endpoints exist — kept simple and honest about being a placeholder
 * rather than faking data with a rendered chart.
 */
export default function ChartPlaceholder({ title = 'Overview' }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-100">{title}</h2>
        <span className="rounded-full bg-surface-300/50 px-2.5 py-1 text-xs text-gray-400">
          Last 30 days
        </span>
      </div>

      <div className="mt-6 flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-surface-200/30">
        <BarChart3 size={32} className="text-gray-600" />
        <p className="mt-3 text-sm text-gray-500">Chart will render here</p>
        <p className="text-xs text-gray-600">Connect analytics data to enable this chart</p>
      </div>
    </div>
  )
}

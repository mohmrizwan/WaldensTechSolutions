export default function ChartPlaceholder({ title = 'Overview', data = [] }) {
  const maximum = Math.max(1, ...data.flatMap((item) => [item.services, item.projects, item.contacts]))

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-100">{title}</h2>
        <span className="rounded-full bg-surface-300/50 px-2.5 py-1 text-xs text-gray-400">
          Last 30 days
        </span>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-surface-200/30 p-4">
        <div className="flex h-48 items-end gap-2 sm:gap-4">
          {data.map((item) => (
            <div key={item.label} className="flex min-w-0 flex-1 items-end justify-center gap-1">
              {[['services', 'bg-accent'], ['projects', 'bg-emerald-400'], ['contacts', 'bg-rose-400']].map(([key, color]) => (
                <div
                  key={key}
                  className={`w-full max-w-5 rounded-t-sm ${color}`}
                  style={{ height: `${Math.max(4, (item[key] / maximum) * 100)}%` }}
                  title={`${key}: ${item[key]}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2 sm:gap-4">
          {data.map((item) => <span key={item.label} className="min-w-0 flex-1 text-center text-[10px] text-gray-500">{item.label}</span>)}
        </div>
        <div className="mt-4 flex gap-4 text-xs text-gray-400">
          <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-accent" />Services</span>
          <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />Projects</span>
          <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-400" />Contacts</span>
        </div>
      </div>
    </div>
  )
}

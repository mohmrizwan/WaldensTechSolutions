/**
 * Generic tab switcher. `tabs` is [{ key, label, icon? }], parent owns
 * which tab is active and renders the corresponding content itself.
 */
export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-white/5">
      {tabs.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
            activeTab === key
              ? 'border-accent text-accent-light'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          {Icon && <Icon size={16} />}
          {label}
        </button>
      ))}
    </div>
  )
}

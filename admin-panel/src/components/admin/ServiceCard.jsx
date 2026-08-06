import { Pencil, Trash2, Layers } from 'lucide-react'

/**
 * Single service display card for the Services grid. Presentational only —
 * edit/delete actions call back up to Services.jsx, which owns the modals.
 */
export default function ServiceCard({ service, onEdit, onDelete }) {
  return (
    <div className="glass-card group flex flex-col rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15">
          <Layers size={20} className="text-accent-light" />
        </div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(service)}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-gray-100"
            aria-label="Edit service"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(service)}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
            aria-label="Delete service"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <h3 className="mt-4 text-base font-semibold text-gray-100">{service.title}</h3>
      <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-gray-400">
        {service.description}
      </p>

      {service.price !== undefined && service.price !== null && (
        <p className="mt-3 text-sm font-medium text-accent-light">
          ${service.price}
        </p>
      )}
    </div>
  )
}

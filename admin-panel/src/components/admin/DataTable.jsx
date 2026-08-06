import Loader from './Loader'
import EmptyState from './EmptyState'

/**
 * Generic table renderer. `columns` defines headers + how to render each
 * cell; `rows` is the data. Stays fully decoupled from any specific
 * entity (project/team/contact) — those pages define their own columns.
 *
 * columns: [{ key, label, render?: (row) => ReactNode }]
 */
export default function DataTable({
  columns,
  rows,
  isLoading,
  error,
  emptyTitle = 'No records found',
  emptyDescription = '',
  keyField = 'id',
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <Loader size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
        {error}
      </p>
    )
  }

  if (!rows || rows.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/5">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/5 bg-surface-200/40">
            {columns.map((col) => (
              <th
                key={col.key}
                className="whitespace-nowrap px-4 py-3 font-medium text-gray-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[keyField]}
              className="border-b border-white/5 transition hover:bg-white/[0.03] last:border-0"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-200">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

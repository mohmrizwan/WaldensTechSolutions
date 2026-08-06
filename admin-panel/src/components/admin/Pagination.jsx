import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Generic pagination control. Purely presentational — parent owns
 * the current page state and slices/fetches data accordingly.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  // Keep the pager compact on wider ranges: show first, last, current +/-1
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  )

  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/5 px-1 pt-4">
      <p className="text-xs text-gray-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/5 hover:text-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {visiblePages.map((page, idx) => {
          const prevPage = visiblePages[idx - 1]
          const showEllipsis = prevPage && page - prevPage > 1
          return (
            <div key={page} className="flex items-center gap-1">
              {showEllipsis && <span className="px-1 text-gray-600">…</span>}
              <button
                onClick={() => onPageChange(page)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition ${
                  page === currentPage
                    ? 'bg-accent text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-100'
                }`}
              >
                {page}
              </button>
            </div>
          )
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/5 hover:text-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

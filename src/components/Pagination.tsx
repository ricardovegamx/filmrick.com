import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  hasNextPage,
  hasPreviousPage
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath
    }
    return `${basePath}/page/${page}`
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <nav className="flex items-center justify-center space-x-2 py-16">
      {/* Previous button */}
      {hasPreviousPage ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 hover:border-gray-300 rounded-sm"
        >
          ← Anterior
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm text-gray-400 border border-gray-100 rounded-sm cursor-not-allowed">
          ← Anterior
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {generatePageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-400">
                ...
              </span>
            )
          }

          const pageNumber = page as number
          const isCurrentPage = pageNumber === currentPage

          return (
            <Link
              key={pageNumber}
              href={getPageUrl(pageNumber)}
              className={`px-3 py-2 text-sm font-bold transition-colors border rounded-sm ${
                isCurrentPage
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'text-gray-600 hover:text-gray-900 border-gray-200 hover:border-gray-300'
              }`}
            >
              {pageNumber}
            </Link>
          )
        })}
      </div>

      {/* Next button */}
      {hasNextPage ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 hover:border-gray-300 rounded-sm"
        >
          Siguiente →
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm text-gray-400 border border-gray-100 rounded-sm cursor-not-allowed">
          Siguiente →
        </span>
      )}
    </nav>
  )
}
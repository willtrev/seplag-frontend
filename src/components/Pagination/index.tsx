interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const generatePages = () => {
    const pages: (number | "...")[] = [];
    const visiblePages = 3;

    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);

    if (currentPage > visiblePages + 2) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - visiblePages);
      i <= Math.min(totalPages - 1, currentPage + visiblePages);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - (visiblePages + 1)) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div>
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-xs cursor-pointer"
        aria-label="Pagination"
      >
        <a
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 
                      ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        {generatePages().map((page, index) =>
          page === "..." ? (
            <span
              key={index}
              className="relative inline-flex items-center px-4 py-2 text-gray-400"
            >
              ...
            </span>
          ) : (
            <a
              key={index}
              onClick={() => onPageChange(page)}
              data-current={page === currentPage}
              className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-gray-300 
                          bg-gray-50 text-gray-900 hover:bg-gray-100"
                          data-[current=true]:bg-indigo-600 data-[current=true]:text-white
                         `}
            >
              {page}
            </a>
          )
        )}

        <a
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          data-current={currentPage === totalPages}
          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 
                      ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
        >
          <span className="sr-only">Next</span>
          <svg
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </nav>
    </div>
  );
}

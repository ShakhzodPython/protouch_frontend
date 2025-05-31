import { ChevronLeft, ChevronRight } from 'lucide-react';
import style from './Pagination.module.scss';
import { PaginationProps } from './Pagination.types.ts';

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);

    if (currentPage) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push('...');

    pages.push(totalPages);
  }

  // TODO: When user click to the pagination, we have to do scroll up
  return (
    <div className={style.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={style.pagination_button}
      >
        <ChevronLeft color='#222' />
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={index} className={style.pagination_ellipsis}>
            …
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(Number(page))}
            className={
              currentPage === page
                ? style.pagination_button_number_active
                : style.pagination_button_number
            }
          >
            <span>{page}</span>
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={style.pagination_button}
      >
        <ChevronRight color='#222' />
      </button>
    </div>
  );
}

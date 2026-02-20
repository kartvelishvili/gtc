"use client";

import Link from "next/link";
import { FC } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  dict: {
    previous: string;
    next: string;
  };
}

/**
 * Pagination component — fixes the "pagination.next" raw-key display bug
 * by requiring resolved dictionary strings.
 */
const Pagination: FC<Props> = ({ currentPage, totalPages, baseUrl, dict }) => {
  if (totalPages <= 1) return null;

  /* Generate page numbers with ellipsis */
  function getPages(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    const delta = 1; // pages shown around current

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  }

  function pageUrl(page: number): string {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}page=${page}`;
  }

  return (
    <nav className="gtc-pagination" aria-label="Pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link href={pageUrl(currentPage - 1)} className="gtc-pagination__link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {dict.previous}
        </Link>
      ) : (
        <span className="gtc-pagination__link gtc-pagination__link--disabled">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {dict.previous}
        </span>
      )}

      {/* Page numbers */}
      <div className="gtc-pagination__pages">
        {getPages().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="gtc-pagination__ellipsis">
              &hellip;
            </span>
          ) : (
            <Link
              key={page}
              href={pageUrl(page)}
              className={`gtc-pagination__page ${page === currentPage ? "gtc-pagination__page--active" : ""}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link href={pageUrl(currentPage + 1)} className="gtc-pagination__link">
          {dict.next}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      ) : (
        <span className="gtc-pagination__link gtc-pagination__link--disabled">
          {dict.next}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      )}
    </nav>
  );
};

export default Pagination;

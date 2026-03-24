"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Numbered pagination component with prev/next arrows.
 * Shows up to 5 page numbers at a time with ellipsis for large ranges.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build the page number array with ellipsis
  function getPageNumbers(): (number | "...")[] {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end   = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1 mt-10">

      {/* Prev button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-lg border transition-colors",
          currentPage === 1
            ? "border-border text-muted-foreground opacity-40 cursor-not-allowed"
            : "border-border text-foreground hover:border-[#E94560] hover:text-[#E94560]"
        )}
      >
        <ChevronLeft className="size-4" />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors",
              currentPage === p
                ? "bg-[#E94560] border-[#E94560] text-white"
                : "border-border text-foreground hover:border-[#E94560] hover:text-[#E94560]"
            )}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-lg border transition-colors",
          currentPage === totalPages
            ? "border-border text-muted-foreground opacity-40 cursor-not-allowed"
            : "border-border text-foreground hover:border-[#E94560] hover:text-[#E94560]"
        )}
      >
        <ChevronRight className="size-4" />
      </button>

    </div>
  );
}
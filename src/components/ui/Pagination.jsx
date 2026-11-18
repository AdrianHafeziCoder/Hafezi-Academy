import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

// Simple pagination: previous, numbers, next
export default function Pagination({ page, total, pageSize, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;

  // Only show 5 page numbers around the current page
  const first = Math.max(1, Math.min(page - 2, pages - 4));
  const numbers = Array.from(
    { length: Math.min(5, pages) },
    (_, i) => first + i,
  );

  const box = "icon-btn size-9 text-sm disabled:opacity-40";
  return (
    <nav
      className="mt-4 flex items-center justify-center gap-1.5"
      aria-label="Pagination"
      data-reveal
    >
      <button
        className={box}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {numbers.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            box,
            n === page &&
              "border-primary bg-primary text-white hover:bg-primary hover:text-white",
          )}
        >
          {n.toLocaleString("fa-IR")}
        </button>
      ))}
      <button
        className={box}
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

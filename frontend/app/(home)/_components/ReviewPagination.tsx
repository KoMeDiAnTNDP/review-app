import { useReviewStore } from "@/store/reviewStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewPaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export default function ReviewPagination({
  totalItems,
  itemsPerPage,
}: ReviewPaginationProps) {
  const { page, setPage } = useReviewStore();
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure current page is valid
  if (page > totalPages) {
    setPage(totalPages);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-3 py-1 rounded-md ${
              pageNum === page
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

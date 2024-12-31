import { useReviewStore } from "@/store/reviewStore";
import { Search, User, Star } from "lucide-react";

export default function ReviewFilters() {
  const { filters, setFilters, resetFilters } = useReviewStore();

  return (
    <div className="space-y-4 mb-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search reviews..."
          value={filters.search || ""}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
        />
      </div>

      <div className="flex gap-4">
        {/* Author Filter */}
        <div className="relative flex-1">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter by author..."
            value={filters.author || ""}
            onChange={(e) => setFilters({ author: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
          />
        </div>

        {/* Rating Filter */}
        <div className="relative w-48">
          <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={filters.rating || ""}
            onChange={(e) =>
              setFilters({ rating: Number(e.target.value) || undefined })
            }
            className="w-full pl-10 pr-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground appearance-none"
          >
            <option value="">All ratings</option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} {rating === 1 ? "star" : "stars"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Filters */}
      {(filters.search || filters.author || filters.rating) && (
        <button
          onClick={resetFilters}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}

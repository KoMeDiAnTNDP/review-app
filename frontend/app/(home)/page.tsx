"use client";
import { Suspense } from "react";
import Cards from "./_components/Cards";
import ReviewFilters from "./_components/ReviewFilters";
import ReviewPagination from "./_components/ReviewPagination";
import { useReviewStore } from "@/store/reviewStore";
import { useRouter } from "next/navigation";
import { useGetReviews } from "@/api/apiHooks";
import { Review } from "@/utils/types";

export default function DashboardPage() {
  const router = useRouter();
  const { filters, page } = useReviewStore();
  const { data: allReviews } = useGetReviews();

  const ITEMS_PER_PAGE = 9;

  // Add this log to see what we're receiving
  console.log("Reviews data:", allReviews);

  // Safely access the reviews array - Fixed: changed 'data' to 'allReviews'
  const reviews = Array.isArray(allReviews) ? allReviews : [];

  const filteredReviewsCount = reviews.filter((review: Review) => {
    // Changed 'any' to 'Review' type
    const matchesSearch = filters.search
      ? review.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.content.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    const matchesAuthor = filters.author
      ? review.author.toLowerCase().includes(filters.author.toLowerCase())
      : true;

    const matchesRating = filters.rating
      ? review.rating === filters.rating
      : true;

    return matchesSearch && matchesAuthor && matchesRating;
  }).length;

  const handleEdit = (review: Review) => {
    router.push(`/reviews/${review.id}/edit`);
  };

  return (
    <div className="mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Reviews</h1>
      <ReviewFilters />
      <Suspense fallback={<LoadingState />}>
        <Cards
          take={ITEMS_PER_PAGE}
          skip={(page - 1) * ITEMS_PER_PAGE}
          search={filters.search}
          author={filters.author}
          rating={filters.rating}
          onEdit={handleEdit}
        />
      </Suspense>
      <ReviewPagination
        totalItems={filteredReviewsCount}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}

const LoadingState = () => {
  return <div className="w-full h-full">Loading ...</div>;
};

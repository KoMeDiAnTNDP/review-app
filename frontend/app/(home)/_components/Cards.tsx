"use client";

import { useGetReviews, useDeleteReview } from "@/api/apiHooks";
import Card from "./Card";
import { toast } from "sonner";
import { CardsProps } from "@/utils/types";

export default function Cards({
  take = 10,
  skip = 0,
  search,
  author,
  rating,
  onEdit,
}: CardsProps) {
  const { data: allReviews, isLoading, isError } = useGetReviews();

  const { mutate: deleteReview } = useDeleteReview();

  const filteredReviews = allReviews?.filter((review) => {
    const matchesSearch = search
      ? review.title.toLowerCase().includes(search.toLowerCase()) ||
        review.content.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesAuthor = author
      ? review.author.toLowerCase().includes(author.toLowerCase())
      : true;

    const matchesRating = rating ? review.rating === rating : true;

    return matchesSearch && matchesAuthor && matchesRating;
  });

  const paginatedReviews = filteredReviews?.slice(skip, skip + take);

  const handleDelete = (id: number) => {
    deleteReview(id, {
      onSuccess: () => {
        toast.success("Review deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete review");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(take)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg h-[250px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 dark:text-red-400">
          Error loading reviews. Please try again later.
        </p>
      </div>
    );
  }

  if (!filteredReviews?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No reviews found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedReviews?.map((review) => (
        <Card
          key={review.id}
          review={review}
          onEdit={() => onEdit(review)} // Pass the callback correctly
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

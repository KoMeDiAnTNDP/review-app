import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import {
  CreateReviewPayload,
  Review,
  UpdateReviewPayload,
} from "@/utils/types";

export const useGetReviews = () => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Review[]>("/reviews");
      console.log("API Response:", data); // Add this log
      return data;
    },
  });
};

export const useGetReview = (id: number) => {
  return useQuery<Review, Error>({
    queryKey: ["review", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Review>(`/reviews/${id}`);
      return data;
    },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<Review, Error, CreateReviewPayload>({
    mutationFn: async (newReview: CreateReviewPayload) => {
      const { data } = await axiosInstance.post<Review>("/reviews", newReview);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<Review, Error, UpdateReviewPayload>({
    mutationFn: async (updatedReview: UpdateReviewPayload) => {
      const { data } = await axiosInstance.put<Review>(
        `/reviews/${updatedReview.id}`,
        updatedReview
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["review", variables.id] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

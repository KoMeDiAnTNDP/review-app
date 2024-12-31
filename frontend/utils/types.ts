export interface GetReviewsParams {
  take: number;
  skip: number;
  search?: string;
  author?: string;
  rating?: number;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
}

export interface CreateReviewPayload {
  title: string;
  content: string;
  author: string;
  rating: number;
}

export interface UpdateReviewPayload {
  id: number;
  title: string;
  content: string;
  author: string;
  rating: number;
}

export interface Review {
  id: number;
  title: string;
  content: string;
  author: string;
  rating: number;
  createdAt: string;
}

export interface UpdateReviewPayload extends CreateReviewPayload {
  id: number;
}

export interface CardProps {
  review: Review;
  onEdit?: (review: Review) => void;
  onDelete?: (id: number) => void;
}

export interface CardsProps {
  take?: number;
  skip?: number;
  search?: string;
  author?: string;
  rating?: number;
  onEdit: (review: Review) => void;
}

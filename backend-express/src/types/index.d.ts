export interface Review {
  id: number;
  title: string;
  content: string;
  rating: number;
  author: string;
  createdAt: Date;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface BaseResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

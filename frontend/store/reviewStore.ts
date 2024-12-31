import { create } from "zustand";

interface Filters {
  search?: string;
  author?: string;
  rating?: number;
}

interface ReviewStore {
  filters: Filters;
  page: number;

  setFilters: (filters: Filters) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  filters: {
    search: undefined,
    author: undefined,
    rating: undefined,
  },
  page: 1,

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      page: 1, // Reset page when filters change
    })),

  setPage: (page) => set({ page }),

  resetFilters: () =>
    set({
      filters: {
        search: undefined,
        author: undefined,
        rating: undefined,
      },
      page: 1,
    }),
}));

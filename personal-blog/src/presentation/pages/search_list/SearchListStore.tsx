import { create } from 'zustand';
import { Post } from '../../../domain/model/Post';

interface SearchListState {
  posts: Post[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  scrollPosition: number;
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  setPosts: (posts: Post[]) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setScrollPosition: (scrollPosition: number) => void;
  setCurrentPage: (page: number) => void;
  setTotalPosts: (total: number) => void;
}

export const useSearchListStore = create<SearchListState>()((set) => ({
  posts: [],
  searchQuery: "",
  isLoading: true,
  error: null,
  scrollPosition: 0,
  currentPage: 1,
  postsPerPage: 10,
  totalPosts: 0,
  setPosts: (posts) => set({ posts, isLoading: false }),
  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setScrollPosition: (scrollPosition) => set({ scrollPosition }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPosts: (total) => set({ totalPosts: total }),
}));

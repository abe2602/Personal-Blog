import { create } from "zustand";
import type { ApiPost } from "../../../data/posts/model/ApiPost";

interface PostsListState {
  posts: ApiPost[];
  isLoading: boolean;
  error: string | null;
  selectedPost: ApiPost | null;
  drawerOpen: boolean;
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  setPosts: (posts: ApiPost[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedPost: (post: ApiPost | null) => void;
  setDrawerOpen: (open: boolean) => void;
  setCurrentPage: (page: number) => void;
  setTotalPosts: (total: number) => void;
  openDrawer: (post: ApiPost) => void;
  closeDrawer: () => void;
}

export const usePostsListStore = create<PostsListState>()((set) => ({
  posts: [],
  isLoading: false,
  error: null,
  selectedPost: null,
  drawerOpen: false,
  currentPage: 1,
  totalPosts: 0,
  postsPerPage: 10,

  setPosts: (posts) => set({ posts }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setTotalPosts: (totalPosts) => set({ totalPosts }),

  openDrawer: (post) => set({ selectedPost: post, drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false, selectedPost: null }),
}));

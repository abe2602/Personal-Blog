import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Post } from "../../../domain/model/Post";

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  scrollPosition: number;
  searchTerm: string;
  selectedYear: number | null;
  currentPage: number;
  postsPerPage: number;
  setPosts: (posts: Post[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setScrollPosition: (scrollPosition: number) => void;
  setSearchTerm: (searchTerm: string) => void;
  setSelectedYear: (year: number | null) => void;
  setCurrentPage: (page: number) => void;
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set) => ({
      posts: [],
      isLoading: true,
      error: null,
      scrollPosition: 0,
      searchTerm: "",
      selectedYear: null,
      currentPage: 1,
      postsPerPage: 6,
      setPosts: (posts) => set({ posts, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setScrollPosition: (scrollPosition) => set({ scrollPosition }),
      setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
      setSelectedYear: (year) => set({ selectedYear: year, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: "posts-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        posts: state.posts,
        scrollPosition: state.scrollPosition,
        searchTerm: state.searchTerm,
        selectedYear: state.selectedYear,
        currentPage: state.currentPage,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.posts && state.posts.length > 0) {
          state.posts = state.posts
            .map((post: any) => ({
              ...post,
              date: new Date(post.date),
            }))
            .map(
              (post: any) =>
                new Post(post.title, post.description, post.date, post.imageUrl, post.id ?? null)
            );
          state.setLoading(false);
        }
      },
    }
  )
);

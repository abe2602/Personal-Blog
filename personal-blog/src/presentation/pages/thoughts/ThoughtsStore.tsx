import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Post } from '../../../domain/model/Post';

interface ThoughtsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  scrollPosition: number;
  searchTerm: string;
  setPosts: (posts: Post[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setScrollPosition: (scrollPosition: number) => void;
  setSearchTerm: (searchTerm: string) => void;
}

export const useThoughtsStore = create<ThoughtsState>()(
  persist(
    (set) => ({
      posts: [],
      isLoading: true,
      error: null,
      scrollPosition: 0,
      searchTerm: "",
      setPosts: (posts) => set({ posts, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setScrollPosition: (scrollPosition) => set({ scrollPosition }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
    }),
    {
      name: 'thoughts-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ posts: state.posts, scrollPosition: state.scrollPosition, searchTerm: state.searchTerm }),
      onRehydrateStorage: () => (state) => {
        if (state?.posts && state.posts.length > 0) {
          state.posts = state.posts.map((post: any) => ({
            ...post,
            date: new Date(post.date),
          })).map((post: any) => new Post(post.title, post.description, post.date, post.imageUrl));
          state.setLoading(false);
        }
      },
    }
  )
);



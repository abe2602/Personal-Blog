import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Post } from '../models/Post';

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  scrollPosition: number;
  setPosts: (posts: Post[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setScrollPosition: (scrollPosition: number) => void;
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set) => ({
      posts: [],
      isLoading: true,
      error: null,
      scrollPosition: 0,
      setPosts: (posts) => set({ posts, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setScrollPosition: (scrollPosition) => set({ scrollPosition }),
    }),
    {
      name: 'posts-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ posts: state.posts, scrollPosition: state.scrollPosition }),
      onRehydrateStorage: () => (state) => {
        if (state?.posts && state.posts.length > 0) {
          // Convert date strings back to Date objects
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


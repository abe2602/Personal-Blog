import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Post } from "../../../domain/model/Post";

interface PostState {
  post: Post | null;
  isLoading: boolean;
  error: string | null;
  setPost: (posts: Post) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      post: null,
      isLoading: false,
      error: null,
      setPost: (post) => set({ post, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "post-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ post: state.post }),
      onRehydrateStorage: () => (state) => {
        if (state?.post) {
          const post = state?.post;
          state.post = new Post(
            post.title,
            post.description,
            new Date(post.date),
            post.imageUrl,
            post.id
          );
          state.setLoading(false);
        }
      },
    }
  )
);

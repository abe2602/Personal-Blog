import type * as PostsRepository from "../../../data/posts/PostsRepository";
import type { ApiPost } from "../../../data/posts/model/ApiPost";
import { usePostsListStore } from "./PostsListStore";

function getPageFromUrl(): number {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const n = page ? parseInt(page, 10) : NaN;
  return Number.isNaN(n) || n < 1 ? 1 : n;
}

function setPageInUrl(page: number) {
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(page));
  window.history.pushState({}, "", url.pathname + url.search);
}

export default function PostsListController({
  postsRepository,
}: {
  postsRepository: typeof PostsRepository;
}) {
  const store = usePostsListStore.getState();

  async function fetchPage(page: number) {
    store.setLoading(true);
    store.setError(null);
    try {
      const { posts, total } = await postsRepository.getPosts(
        page,
        store.postsPerPage
      );
      store.setTotalPosts(total);
      store.setPosts(posts);
      store.setCurrentPage(page);
    } catch (error) {
      store.setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      store.setLoading(false);
    }
  }

  async function loadPosts() {
    const pageFromUrl = getPageFromUrl();
    const shouldFetch =
      store.totalPosts === 0 || store.currentPage !== pageFromUrl;

    if (shouldFetch) {
      store.setCurrentPage(pageFromUrl);
      await fetchPage(pageFromUrl);
    } else {
      store.setCurrentPage(pageFromUrl);
    }
  }

  async function loadPost(id: number): Promise<ApiPost | null> {
    try {
      const post = await postsRepository.getPost(id);
      store.setSelectedPost(post);
      return post;
    } catch {
      store.setError("Failed to load post");
      return null;
    }
  }

  function openDrawer(post: ApiPost) {
    store.openDrawer(post);
  }

  function closeDrawer() {
    store.closeDrawer();
  }

  async function setCurrentPage(page: number) {
    store.setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageInUrl(page);
    await fetchPage(page);
  }

  async function updatePost(id: number, updates: Partial<ApiPost>): Promise<ApiPost | null> {
    try {
      const updated = await postsRepository.updatePost(id, updates);
      store.setPosts(
        store.posts.map((p) => (p.id === id ? updated : p))
      );
      if (store.selectedPost?.id === id) {
        store.setSelectedPost(updated);
      }
      return updated;
    } catch {
      store.setError("Failed to update post");
      return null;
    }
  }

  async function deletePost(id: number): Promise<boolean> {
    try {
      await postsRepository.deletePost(id);
      store.setPosts(store.posts.filter((p) => p.id !== id));
      if (store.selectedPost?.id === id) {
        store.closeDrawer();
      }
      return true;
    } catch {
      store.setError("Failed to delete post");
      return false;
    }
  }

  const totalPages = Math.max(
    1,
    Math.ceil(store.totalPosts / store.postsPerPage)
  );

  const state = {
    posts: store.posts,
    isLoading: store.isLoading,
    error: store.error,
    selectedPost: store.selectedPost,
    drawerOpen: store.drawerOpen,
    currentPage: store.currentPage,
    totalPages,
  };

  const actions = {
    loadPosts,
    loadPost,
    openDrawer,
    closeDrawer,
    setCurrentPage,
    updatePost,
    deletePost,
  };

  return {
    actions,
    state,
  };
}

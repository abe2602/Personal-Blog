import * as PostsRemoteRepository from "../../../data/posts/PostsRepository";
import { usePostsStore } from "./HomeStore";

export default function HomeController({
  postsRepository,
}: {
  postsRepository: typeof PostsRemoteRepository;
}) {
  async function getPosts() {
    const store = usePostsStore.getState();
    if (store.posts.length > 0 && !store.isLoading) {
      return;
    }

    store.setLoading(true);

    try {
      const postList = await postsRepository.getPosts();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      store.setPosts(postList);
      store.setError(null);
      store.setCurrentPage(1);
    } catch (error) {
      store.setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      store.setLoading(false);
    }
  }

  function setSearchTerm(searchTerm: string) {
    const store = usePostsStore.getState();
    store.setSearchTerm(searchTerm);
  }

  function setSelectedYear(year: number | null) {
    const store = usePostsStore.getState();
    store.setSelectedYear(year);
  }

  function setCurrentPage(page: number) {
    const store = usePostsStore.getState();
    store.setCurrentPage(page);
    store.setScrollPosition(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Create a getter function that always gets fresh state
  function getState() {
    const store = usePostsStore.getState();
    const filteredPosts = store.posts.filter((post) => {
      const matchesSearch = post.title
        .toLocaleLowerCase()
        .includes(store.searchTerm.toLocaleLowerCase());
      const matchesYear = store.selectedYear === null || 
        post.date.getFullYear() === store.selectedYear;
      return matchesSearch && matchesYear;
    });

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / store.postsPerPage));
    const startIndex = (store.currentPage - 1) * store.postsPerPage;
    const endIndex = startIndex + store.postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      allPosts: filteredPosts,
      isLoading: store.isLoading,
      error: store.error,
      searchTerm: store.searchTerm,
      currentPage: store.currentPage,
      totalPages: totalPages,
      postsPerPage: store.postsPerPage,
    };
  }

  const state = getState();

  const actions = {
    getPosts: getPosts,
    setSearchTerm: setSearchTerm,
    setSelectedYear: setSelectedYear,
    setCurrentPage: setCurrentPage,
  };

  return {
    actions,
    state,
  };
}

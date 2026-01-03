import * as PostsRemoteRepository from "../../../data/posts/PostsRepository";
import { usePostsStore } from "./HomeStore";

export default function HomeController({
  postsRepository,
}: {
  postsRepository: typeof PostsRemoteRepository;
}) {
  const store = usePostsStore.getState();

  async function getPosts() {
    if (store.posts.length > 0) {
      store.setLoading(false);
      return;
    }

    store.setLoading(true);

    try {
      const postList = await postsRepository.getPosts();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      store.setPosts(postList);
      store.setError(null);
    } catch (error) {
      store.setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      store.setLoading(false);
    }
  }

  function setSearchTerm(searchTerm: string) {
    store.setSearchTerm(searchTerm);
  }

  async function getMorePosts() {
    try {
      store.setIsFetchingMore(true);
      const postList = await postsRepository.getPosts();
      store.setPosts([...store.posts, ...postList]);
    } finally {
      store.setIsFetchingMore(false);
    }
  }

  const state = {
    posts: store.posts.filter((post) =>
      post.title
        .toLocaleLowerCase()
        .includes(store.searchTerm.toLocaleLowerCase())
    ),
    isLoading: store.isLoading,
    error: store.error,
    searchTerm: store.searchTerm,
  };

  const actions = {
    getPosts: getPosts,
    getMorePosts: getMorePosts,
    setSearchTerm: setSearchTerm,
  };

  return {
    actions,
    state,
  };
}

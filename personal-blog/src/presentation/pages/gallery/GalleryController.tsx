import * as PostsRemoteRepository from "../../../data/posts/PostsRepository";
import { useGalleryStore } from "./GalleryStore";

export default function GalleryController({
  postsRepository,
}: {
  postsRepository: typeof PostsRemoteRepository;
}) {
  const store = useGalleryStore.getState();

  async function getPosts() {
    if (store.posts.length > 0) {
      store.setLoading(false);
      return;
    }

    store.setLoading(true);

    try {
      const postList = await postsRepository.getPosts();
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
    setSearchTerm: setSearchTerm,
  };

  return {
    actions,
    state,
  };
}




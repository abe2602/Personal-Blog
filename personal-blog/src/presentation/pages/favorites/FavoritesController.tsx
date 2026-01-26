import * as PostsRemoteRepository from "../../../data/posts/PostsRepository";
import * as ProfileRemoteRepository from "../../../data/profile/ProfileRepository";
import { useFavoritesStore } from "./FavoritesStore";
import { useProfileStore } from "../../components/profile_sidemenu/ProfileSideMenuStore";

export default function FavoritesController({
  postsRepository, profileRepository
}: {
  postsRepository: typeof PostsRemoteRepository;
  profileRepository: typeof ProfileRemoteRepository;
}) {
  const store = useFavoritesStore.getState();
    const profileStore = useProfileStore.getState();

  async function getPosts() {
    if (store.posts.length > 0 && !store.isLoading && profileStore.profile) {
      return;
    }

    store.setLoading(true);

    try {
      if (store.posts.length == 0 && store.isLoading) {
        const postsListing = await postsRepository.getFavoriteMediaPosts();
        store.setTotalPosts(postsListing.total);
        store.setPosts(postsListing.posts);
      }

      if (!profileStore.profile) {
        const profile = await profileRepository.getProfile();
        profileStore.setProfile(profile);
      }

      profileStore.setError(null);
      store.setError(null);
      store.setCurrentPage(1);
    } catch (error) {
      store.setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      store.setLoading(false);
    }
  }

  function setSearchTerm(searchTerm: string) {
    store.setSearchTerm(searchTerm);
  }

  function setCurrentPage(page: number) {
    store.setCurrentPage(page);
    store.setScrollPosition(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getState() {
    const filteredPosts = store.posts.filter((post) =>
      post.title
        .toLocaleLowerCase()
        .includes(store.searchTerm.toLocaleLowerCase())
    );

    const totalPages = Math.max(
      1,
      Math.ceil(store.totalPosts / store.postsPerPage)
    );
    const startIndex = (store.currentPage - 1) * store.postsPerPage;
    const endIndex = startIndex + store.postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      allPostsSize: filteredPosts.length,
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
    setCurrentPage: setCurrentPage,
  };

  return {
    actions,
    state,
  };
}

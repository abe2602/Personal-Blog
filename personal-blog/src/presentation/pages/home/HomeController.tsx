import * as PostsRemoteRepository from "../../../data/posts/PostsRepository";
import * as ProfileRemoteRepository from "../../../data/profile/ProfileRepository";
import { usePostsStore } from "./HomeStore";
import { useProfileStore } from "../../components/profile_sidemenu/ProfileSideMenuStore";

export default function HomeController({
  postsRepository, profileRepository
}: {
  postsRepository: typeof PostsRemoteRepository;
  profileRepository: typeof ProfileRemoteRepository;
}) {
  const store = usePostsStore.getState();
  const profileStore = useProfileStore.getState();

  async function getPosts() {  
    if (store.posts.length > 0 && !store.isLoading && profileStore.profile) {
      return;
    }

    store.setLoading(true);


    try {
      const postList = await postsRepository.getPosts();
      const profile = await profileRepository.getProfile();

      profileStore.setProfile(profile)
      profileStore.setError(null)

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
    store.setSearchTerm(searchTerm);
  }

  function setSelectedYear(year: number | null) {
    store.setSelectedYear(year);
  }

  function setCurrentPage(page: number) {
    store.setCurrentPage(page);
    store.setScrollPosition(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function getState() {
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

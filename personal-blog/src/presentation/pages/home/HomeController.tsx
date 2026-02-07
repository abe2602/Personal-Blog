import * as PostsRemoteRepository from "../../../data/posts/PostsRepository";
import * as ProfileRemoteRepository from "../../../data/profile/ProfileRepository";
import { usePostsStore } from "./HomeStore";
import { useProfileStore } from "../../components/profile_sidemenu/ProfileSideMenuStore";

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

export default function HomeController({
  postsRepository,
  profileRepository,
}: {
  postsRepository: typeof PostsRemoteRepository;
  profileRepository: typeof ProfileRemoteRepository;
}) {
  const store = usePostsStore.getState();
  const profileStore = useProfileStore.getState();

  async function fetchPage(page: number) {
    store.setLoading(true);
    try {
      const postsListing = await postsRepository.getPosts(page, store.postsPerPage);
      store.setTotalPosts(postsListing.total);
      store.setPosts(postsListing.posts);
      store.setCurrentPage(page);
      store.setError(null);
    } catch (error) {
      store.setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      store.setLoading(false);
    }
  }

  async function getPosts() {
    const pageFromUrl = getPageFromUrl();
    const shouldFetch =
      store.totalPosts === 0 ||
      store.currentPage !== pageFromUrl;

    if (shouldFetch) {
      store.setCurrentPage(pageFromUrl);
      await fetchPage(pageFromUrl);
    } else {
      store.setCurrentPage(pageFromUrl);
    }

    if (!profileStore.profile) {
      try {
        const profile = await profileRepository.getProfile();
        profileStore.setProfile(profile);
        profileStore.setError(null);
      } catch {
        // keep profile error handling as before if needed
      }
    }
  }

  function setSearchTerm(term: string) {
    const wasSearch = store.searchTerm.length >= 3;
    store.setSearchTerm(term);
    if (term.length < 3 && wasSearch && store.isSearchResults) {
      store.restoreSavedListing();
    }
  }

  async function triggerSearch() {
    const term = store.searchTerm;
    if (term.length < 3) return;
    if (!store.isSearchResults) {
      store.setSavedListing(store.posts, store.totalPosts, store.currentPage);
    }
    store.setIsSearchResults(true);
    store.setLoading(true);
    try {
      const searchResult = await postsRepository.searchPosts(term);
      store.setPosts(searchResult);
      store.setTotalPosts(searchResult.length);
      store.setCurrentPage(1);
      store.setError(null);
    } catch (error) {
      store.setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      store.setLoading(false);
    }
  }

  function setSelectedYear(year: number | null) {
    store.setSelectedYear(year);
  }

  async function setCurrentPage(page: number) {
    store.setCurrentPage(page);
    store.setScrollPosition(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageInUrl(page);
    await fetchPage(page);
  }

  function getState() {
    const isSearchMode = store.isSearchResults;
    const filteredPosts = store.posts.filter((post) => {
      const matchesSearch = isSearchMode
        ? true
        : post.title
            .toLocaleLowerCase()
            .includes(store.searchTerm.toLocaleLowerCase());
      const matchesYear =
        store.selectedYear === null ||
        post.date.getFullYear() === store.selectedYear;
      return matchesSearch && matchesYear;
    });

    const totalPages = Math.max(
      1,
      Math.ceil(store.totalPosts / store.postsPerPage)
    );

    return {
      posts: filteredPosts,
      allPostsSize: filteredPosts.length,
      isLoading: store.isLoading,
      error: store.error,
      searchTerm: store.searchTerm,
      currentPage: store.currentPage,
      totalPages: totalPages,
      postsPerPage: store.postsPerPage,
      selectedYear: store.selectedYear,
      availableYears: Array.from(
        new Set(store.posts.map((post) => post.date.getFullYear()))
      ).sort((a, b) => b - a),
    };
  }

  const state = getState();

  const actions = {
    getPosts: getPosts,
    setSearchTerm: setSearchTerm,
    triggerSearch: triggerSearch,
    setSelectedYear: setSelectedYear,
    setCurrentPage: setCurrentPage,
  };

  return {
    actions,
    state,
  };
}

import * as PostsRemoteRepository from "../../../data/posts/PostsRepository";
import * as ProfileRemoteRepository from "../../../data/profile/ProfileRepository";
import { useGalleryStore } from "./GalleryStore";
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

export default function GalleryController({
  postsRepository,
  profileRepository,
}: {
  postsRepository: typeof PostsRemoteRepository;
  profileRepository: typeof ProfileRemoteRepository;
}) {
  const store = useGalleryStore.getState();
  const profileStore = useProfileStore.getState();

  async function fetchPage(page: number) {
    store.setLoading(true);
    try {
      const postsListing = await postsRepository.getArtPosts(page, store.postsPerPage);
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

  function setSearchTerm(searchTerm: string) {
    store.setSearchTerm(searchTerm);
  }

  async function setCurrentPage(page: number) {
    store.setCurrentPage(page);
    store.setScrollPosition(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageInUrl(page);
    await fetchPage(page);
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

    return {
      posts: filteredPosts,
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

import * as PostsRemoteRepository from "../../../data/posts/PostsRepository";
import * as ProfileRemoteRepository from "../../../data/profile/ProfileRepository";
import { useThoughtsStore } from "./ThoughtsStore";
import { useProfileStore } from "../../components/profile_sidemenu/ProfileSideMenuStore";

export default function ThoughtsController({
  postsRepository,
  profileRepository,
}: {
  postsRepository: typeof PostsRemoteRepository;
  profileRepository: typeof ProfileRemoteRepository;
}) {
  const store = useThoughtsStore.getState();
  const profileStore = useProfileStore.getState();

  async function getPosts() {
    if (store.posts.length > 0 && !store.isLoading && profileStore.profile) {
      return;
    }

    store.setLoading(true);

    try {
      if (store.posts.length == 0 && store.isLoading) {
        const postList = await postsRepository.getThoughtsPosts();
        store.setPosts(postList);
      }

      if (!profileStore.profile) {
        const profile = await profileRepository.getProfile();
        profileStore.setProfile(profile);
      }

      profileStore.setError(null);
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

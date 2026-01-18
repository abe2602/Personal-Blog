import { useProfileStore } from "./ProfileSideMenuStore";

export default function ProfileSideMenuController() {
  const store = useProfileStore.getState();

  const state = {
    profile: store.profile,
    isLoading: store.isLoading,
    error: store.error,
  };

  return {
    state,
  };
}

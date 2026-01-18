import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Profile } from "../../../domain/model/Profile";

interface SideMenuState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: Profile) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProfileStore = create<SideMenuState>()(
  persist(
    (set) => ({
      profile: null,
      isLoading: false,
      error: null,
      setProfile: (profile) => set({ profile, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ profile: state.profile }),
      onRehydrateStorage: () => (state) => {
        if (state?.profile) {
          const profile = state?.profile;
          state.profile = new Profile(
            profile.title,
            profile.description,
            profile.imageUrl,
          );
          state.setLoading(false);
        }
      },
    }
  )
);
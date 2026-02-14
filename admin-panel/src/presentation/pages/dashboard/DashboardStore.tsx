import { create } from "zustand";

interface DashboardState {
  message: string;
  isLoading: boolean;
  error: string | null;
  setMessage: (message: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  message: "",
  isLoading: true,
  error: null,
  setMessage: (message) => set({ message }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

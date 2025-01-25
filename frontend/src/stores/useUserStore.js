import { create } from "zustand";
import config from "../common/config";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (newUser) => set((_) => ({ user: newUser })),
  logout: () => {
    localStorage.removeItem(config.keys.token);
    set((_) => ({ user: null }));
  },
}));

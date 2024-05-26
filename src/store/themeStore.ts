import { create } from "zustand";

interface ThemeState {
  theme: string;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("theme") || "cupcake",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "cupcake" ? "dark" : "cupcake";
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      return { theme: newTheme };
    }),
}));

export default useThemeStore;

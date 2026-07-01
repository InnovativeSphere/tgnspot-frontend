import { create } from "zustand";
import { persist } from "zustand/middleware";

const THEME_EXPIRY_DAYS = 30;

interface TGNStore {
  theme: "dark" | "cream";
  bookmarks: string[];
  deadSilence: boolean;
  activeCategory: string;
  pulseOpen: boolean;
  toggleTheme: () => void;
  toggleBookmark: (slug: string) => void;
  toggleDeadSilence: () => void;
  isBookmarked: (slug: string) => boolean;
  setActiveCategory: (category: string) => void;
  togglePulse: () => void;
  pulseModalOpen: boolean;
  togglePulseModal: () => void;
}

const storageWithExpiry = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      const now = new Date().getTime();
      if (parsed.meta?.expiry && now > parsed.meta.expiry) {
        localStorage.removeItem(name);
        return null;
      }
      return { state: parsed.state, version: parsed.version };
    } catch {
      localStorage.removeItem(name);
      return null;
    }
  },

  setItem: (name: string, value: unknown) => {
    try {
      const data = {
        ...(value as any),
        meta: {
          expiry:
            new Date().getTime() + THEME_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
        },
      };
      localStorage.setItem(name, JSON.stringify(data));
    } catch {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },

  removeItem: (name: string) => localStorage.removeItem(name),
};

export const useTGNStore = create<TGNStore>()(
  persist(
    (set, get) => ({
      theme: "dark",
      bookmarks: [],
      deadSilence: false,

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "cream" : "dark",
        })),

      pulseOpen: false,
      togglePulse: () => set((state) => ({ pulseOpen: !state.pulseOpen })),

      pulseModalOpen: false,
      togglePulseModal: () =>
        set((state) => ({ pulseModalOpen: !state.pulseModalOpen })),

      activeCategory: "All",
      setActiveCategory: (category) => set({ activeCategory: category }),

      toggleBookmark: (slug: string) =>
        set((state) => {
          // Always deduplicate and toggle
          const isBookmarked = state.bookmarks.includes(slug);
          const newBookmarks = isBookmarked
            ? state.bookmarks.filter((s) => s !== slug)
            : [...new Set([...state.bookmarks, slug])]; // guarantee uniqueness
          return { bookmarks: newBookmarks };
        }),

      toggleDeadSilence: () =>
        set((state) => ({
          deadSilence: !state.deadSilence,
        })),

      isBookmarked: (slug: string) => get().bookmarks.includes(slug),
    }),
    {
      name: "tgnspot-storage",
      storage: storageWithExpiry,
      partialize: (state) =>
        ({
          theme: state.theme,
          bookmarks: state.bookmarks,
        } as TGNStore),
    },
  ),
);
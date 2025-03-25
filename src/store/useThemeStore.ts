import { create } from "zustand";

export enum Theme {
    LIGHT = "light",
    DARK = "dark"
}

type ThemeState = {
    theme: Theme.LIGHT | Theme.DARK
}

type Action = {
    toggleTheme: () => void
}

export const useThemeStore = create<ThemeState & Action>((set) => ({
    theme: Theme.DARK,
    toggleTheme: () => set((state) => ({
        theme: state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    }))
}))

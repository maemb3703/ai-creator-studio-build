import { useColorScheme } from "./use-color-scheme";

export interface ThemeColorPalette {
  primary: string;
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  accent: string;
}

const Colors: Record<string, ThemeColorPalette> = {
  light: {
    primary: "#00d4ff",
    background: "#ffffff",
    surface: "#f5f5f5",
    foreground: "#000000",
    muted: "#666666",
    border: "#e0e0e0",
    success: "#00d084",
    warning: "#ffa500",
    error: "#ff4444",
    accent: "#ff00ff",
  },
  dark: {
    primary: "#00d4ff",
    background: "#0f0f1e",
    surface: "#1a1a2e",
    foreground: "#ffffff",
    muted: "#999999",
    border: "#333333",
    success: "#00ff99",
    warning: "#ffb84d",
    error: "#ff6666",
    accent: "#ff33ff",
  },
};

export function useColors(): ThemeColorPalette {
  const colorScheme = useColorScheme();
  return Colors[colorScheme === "dark" ? "dark" : "light"];
}

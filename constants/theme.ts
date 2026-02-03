export const Colors = {
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

export type ColorScheme = "light" | "dark";
export type ThemeColorPalette = typeof Colors.light;

import { useColorScheme as useNativeColorScheme } from "react-native";

export type ColorScheme = "light" | "dark";

export function useColorScheme(): ColorScheme {
  const scheme = useNativeColorScheme();
  return (scheme === "dark" ? "dark" : "light") as ColorScheme;
}

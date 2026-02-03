import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "@react-native-community/hooks";
import { View } from "react-native";

type ColorScheme = "light" | "dark";

interface ThemeContextType {
  colorScheme: ColorScheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  useEffect(() => {
    const scheme = useColorScheme();
    setColorScheme(scheme === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colorScheme === "dark" ? "#0f0f1e" : "#ffffff",
        }}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

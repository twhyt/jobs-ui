import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light" // Supports light, dark, and system
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;

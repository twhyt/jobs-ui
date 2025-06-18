import React from "react";
import { useTheme } from "next-themes";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <label htmlFor="theme-select">Select Theme:</label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="system">Device Default</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;

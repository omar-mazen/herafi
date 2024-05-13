import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return "dark";
    } else {
      return "light";
    }
  });
  useEffect(() => {
    if (theme == "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  function themeToggle() {
    setTheme((theme) => (theme == "dark" ? "light" : "dark"));
  }
  return (
    <themeContext.Provider value={{ theme, themeToggle }}>
      {children}
    </themeContext.Provider>
  );
}
export function useTheme() {
  const { theme, themeToggle } = useContext(themeContext);
  return { theme, themeToggle };
}

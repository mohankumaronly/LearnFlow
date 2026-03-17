import { useEffect } from 'react';

export const useDarkMode = () => {
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);
};
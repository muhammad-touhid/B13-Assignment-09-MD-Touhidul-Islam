"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        flex h-10 w-10 items-center justify-center rounded-full
        border border-gray-300
        bg-gray-100 text-[#07030e]
        transition hover:bg-gray-200
        dark:border-white/10
        dark:bg-white/10
        dark:text-[#fefefe]
        dark:hover:bg-white/20
      "
      aria-label="Toggle theme"
    >
      {darkMode ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}

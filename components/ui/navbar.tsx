"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ThemeSwitcher from "./Themeswitcher";

const Navbar = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "dark" ? systemTheme : theme;
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (currentTheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [currentTheme]);
  // console.log(darkMode)

  return (
    <div
      className={`border-b z-50 absolute w-screen border-gray-800 ${
        darkMode ? "bg-neutral-900" : "bg-white/60"
      } `}
    >
      <header className="flex justify-between items-center p-6">
        <div className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 dark:from-purple-500 dark:to-green-500">
          TTURL
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </header>
    </div>
  );
};

export default Navbar;

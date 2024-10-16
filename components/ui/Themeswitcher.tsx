"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeToggleSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        currentTheme === "dark" ? "bg-gray-600" : "bg-gray-300"
      }`}
    >
      
      <div
        className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          currentTheme === "dark" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {currentTheme === "dark" ? (
          <BsFillMoonFill className="text-yellow-300 m-0.5" />
        ) : (
          <BsFillSunFill className="text-yellow-500 m-0.5" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggleSwitch;

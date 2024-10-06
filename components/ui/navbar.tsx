"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ThemeSwitcher from "./Themeswitcher";
import Image from "next/image";
import logo from '../../public/assests/logo.png';

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

  const handleLogoClick = () =>{
    const url = "https://github.com/muruga21";
    window.open(url);
  }

  const handleContribute = ()=>{
    const url = "https://github.com/TherkuTech/tturl";
    window.open(url);
  }

  return (
    <div
      className={`border-b z-50 absolute w-screen border-gray-800 ${
        darkMode ? "bg-neutral-900" : "bg-white/60"
      } `}
    >
      <header className="flex justify-between items-center p-6">
        <div className="text-3xl font-bold text-gradient flex justify-center items-center gap-5 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 dark:from-purple-500 dark:to-green-500">
        <div onClick={handleLogoClick}>
          <Image src ={logo } alt = "logo" width={40} height={40} className=' rounded-lg cursor-pointer'></Image>
          </div>
          <h2 >
            TTURL
          </h2>

        </div>
        
        <div className = "flex gap-5 justify-center items-center">
          <ThemeSwitcher />
          <button className='p-2 w-fit h-fit bg-gradient-to-r from-pink-500 to-blue-500 dark:from-purple-500 dark:to-green-500 rounded-md font-medium text-lg text-white' onClick={handleContribute}>Contribute</button>

        </div>
      </header>
    </div>
  );
};

export default Navbar;

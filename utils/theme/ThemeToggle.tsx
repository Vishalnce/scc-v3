"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="cursor-pointer   p-1.5 [transition:background_20ms_ease-in,_color_0.15s]"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >


      <FaMoon className="block dark:hidden size-5"/>


      <IoSunnyOutline  className= "size-6 hidden dark:block dark:text-[#FFFFFF] "/>
     
    </button>
  );
}

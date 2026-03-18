"use client";

import { useTheme } from "next-themes";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";

function MobileThemeToggle()  {
   const { theme, setTheme } = useTheme();
  return (
   <div className="rounded-full flex flex-row justify-between gap-2 bg-[#F4F4FC] py-2 px-6">
      
      {/* Light */}
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center gap-2 px-8 py-1 rounded-full text-sm transition
        ${
          theme === "light"
            ? "bg-white"
            : "text-black"
        }`}
      >
        <IoSunnyOutline className="size-5 text-amber-400"  />
        Light
      </button>

      {/* Dark */}
      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center gap-2 px-8 py-1 rounded-full text-sm transition
        ${
          theme === "dark"
            ? "bg-white"
            : "text-black"
        }`}
      >
        <IoMoon className="size-5" />
        Dark
      </button>

    </div>
  );
  
}

export default MobileThemeToggle
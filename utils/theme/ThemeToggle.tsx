"use client";

import { useTheme } from "next-themes";
import { FaCircle, FaMoon } from "react-icons/fa";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-2 rounded-full px-4 flex gap-4 py-1 bg-[#F4F4FC] max-md:hidden">

  {/* Light Button */}
  <button
    onClick={() => setTheme("light")}
    className={`flex text-xl border-2 rounded-full px-4 gap-2 items-center
    ${theme === "light" ? "bg-white" : ""}`}
  >
    <FaCircle className="text-amber-300" />
    <p>Light</p>
  </button>

  {/* Dark Button */}
  <button
    onClick={() => setTheme("dark")}
    className={`flex text-xl  rounded-full px-4  gap-2 items-center border-2
    ${theme === "dark" ? "bg-white" : ""}`}
  >
    <IoMoon className="size-6" />
    <p>Dark</p>
  </button>

</div>
  );
}

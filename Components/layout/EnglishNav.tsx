"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiDark } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { FaBell } from "react-icons/fa";

import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

import { MdKeyboardArrowRight } from "react-icons/md";
import ThemeProvider from "@/utils/theme/ThemeProvider";
import ThemeToggle from "@/utils/theme/ThemeToggle";
function Nav() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleClick = (menu: string) => {
    setActiveTag((prev) => (prev === menu ? null : menu));
  };

  return (
    <>
      <div className="relative ">
        <nav className=" flex flex-row justify-between items-center z-50 sticky top-0  bg-[image:var(--color-my-gradient)] ">
          {/* logo */}
          <div className="m-2">
            <Image
              src="/layout/logo1.svg"
              alt="Logo"
              width={123}
              height={35}
              className=""
            />
          </div>

          {/* links */}
          <div className="flex flex-row items-center space-x-8 max-lg:hidden ">
            <Link href="/" onClick={() => handleClick("curren-affairs")}>
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green">
                <p className="">Current Affairs</p> <IoIosArrowDown />
              </div>
            </Link>

            <Link href="/" onClick={() => handleClick("concepts")}>
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Concepts</p> <IoIosArrowDown />
              </div>
            </Link>

            <Link href="/" onClick={() => handleClick("quiz")}>
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Quiz</p> <IoIosArrowDown />
              </div>
            </Link>
            <Link href="/">
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Syllabus</p>
              </div>
            </Link>

            <Link href="/">
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Test Series</p>
              </div>
            </Link>
            <Link href="/">
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Upcoming Exam</p>
              </div>
            </Link>
            <Link href="/">
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Blogs</p>
              </div>
            </Link>
          </div>

          {/* button and login */}

          <div className="flex flex-row justify-around items-center space-x-2 mx-2">
            
            <Link href="/hi">
              
            <CiGlobe className="size-5 " />
            </Link>
          

            <FaBell className="size-5 " />

            <ThemeToggle/>

            <button className="p-0.5 px-4 border-1 rounded-lg max-lg:text-sm max-sm:px-2 max-lg:hidden">Login</button>
            <button className="p-0.5 px-4 border-1 rounded-lg bg-my-green text-white max-lg:text-sm max-sm:px-2  ">
              Signup
            </button>
          </div>


        </nav>



        {/* DropDown for current affaris */}
        {activeTag === "curren-affairs" && (
          <div className=" w-full  flex flex-col absolute bg-[linear-gradient(to_right,_#FAFCFC,_#E6F1F1)] border-2 ">
            <div className="w-[20%] ml-24  p-2  hover:bg-[#E6F1F1] rounded-xl">
              <div>
                <div className="flex flex-row items-center">
                  <p className=" text-sm"> Detailed Current Affaris </p>{" "}
                  <MdKeyboardArrowRight />
                </div>

                <p className="text-my-text-color text-sm">
                  Get Full Details here
                </p>
              </div>
            </div>

            <div className="w-[20%] ml-24 mt-2 p-2   hover:bg-[#E6F1F1] rounded-xl ">
              <div>
                <div className="flex flex-row items-center">
                  <p className=" text-sm"> One Liner Current Affaris  </p>{" "}
                  <MdKeyboardArrowRight />
                </div>

                <p className="text-my-text-color text-sm">
                  Get Full Details here
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DropDown for quiz */}
        {activeTag === "quiz" && (
          <div className=" w-full  flex flex-col absolute  z-50 bg-[linear-gradient(to_right,_#FAFCFC,_#E6F1F1)] ">
            <div className="border-2 w-full flex flex-row justify-between">
              {/* heading */}
              <div className="w-[25%] flex flex-row  justify-center border-2 border-fuchsia-700 mt-10 p-3 ">
                <p className="text-my-text-color text-sm ">
                  For Prelims (Tier 1)
                </p>
                <MdKeyboardArrowRight className=" mt-0.5" />
              </div>

              {/* body */}

              <div className="w-[60%] border-2 border-red-600 flex flex-row justify-start text-sm text-my-text-color flex-wrap mt-10 gap-x-8 ">
                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  Quantitative Apptitude{" "}
                </p>
                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  {" "}
                  Reasoning & General Intelligence
                </p>
                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  English Comprehension{" "}
                </p>

                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  General Awareness{" "}
                </p>

                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">PYQs </p>
              </div>
            </div>

            {/* tier-2 */}
            <div className="border-2 w-full flex flex-row justify-between">
              {/* heading */}
              <div className="w-[25%] flex flex-row  justify-center border-2 border-fuchsia-700 mt-10 p-3 ">
                <p className="text-my-text-color text-sm ">
                  For mains (Tier 2)
                </p>
                <MdKeyboardArrowRight className=" mt-0.5" />
              </div>

              {/* body */}

              <div className="w-[60%] border-2 border-red-600 flex flex-row justify-start text-sm text-my-text-color flex-wrap mt-10 gap-x-8 ">
                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  Mathematical Abilities{" "}
                </p>
                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  {" "}
                  Reasoning & General Intelligence
                </p>
                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  English Comprehension{" "}
                </p>

                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  General Awareness{" "}
                </p>
                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  Computer Knowledge{" "}
                </p>

                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">
                  Data Entry Speed Test{" "}
                </p>

                <p className="p-3 hover:bg-[#E6F1F1] rounded-lg">PYQs </p>
              </div>
            </div>
          </div>
        )}




      </div>
    </>
  );
}

export default Nav;

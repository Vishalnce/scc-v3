"use client";
import React, { useState } from "react";
import Image from "next/image";

import { TbLanguageHiragana } from "react-icons/tb";

import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

import { MdKeyboardArrowRight, MdOutlineLightbulb } from "react-icons/md";

import ThemeToggle from "@/utils/theme/ThemeToggle";
import { IoBookOutline, IoClose } from "react-icons/io5";
import { RiMenu2Fill, RiMore2Fill } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react";
import { LuClipboardList, LuNewspaper } from "react-icons/lu";
import { FaRegNewspaper } from "react-icons/fa";

function SmallNav() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(true);

  const { status } = useSession();

  const handleClick = (menu: string) => {
    setActiveTag((prev) => (prev === menu ? null : menu));
  };
  return (
    <>
      {/* links */}

      {/* <div className=" bg-[]">


        </div> */}
      <div className="flex flex-row gap-6 items-center justify-between  w-[75%]  mx-auto my-4 py-3 max-sm:hidden">
        <div
          onClick={() => handleClick("current-affairs")}
          className={` rounded-xl flex flex-row gap-2 px-2 py-1 cursor-pointer 
      ${activeTag === "current-affairs" ? "border-green-500 border-2" : "shadow-[0_2px_10px_rgba(0,0,0,0.3)]  border-2 border-white"}
    `}
        >
          <LuNewspaper
            className={`my-auto size-5 ${
              activeTag === "current-affairs" ? "text-my-green" : ""
            }`}
          />

          <div
            className={`flex flex-row items-center justify-center gap-1
        ${activeTag === "current-affairs" ? "text-my-green" : ""}
      `}
          >
            <p>Current Affairs</p>
            <IoIosArrowDown
              className={`${activeTag === "current-affairs" ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>

        <div
          onClick={() => handleClick("concepts")}
          className={` rounded-xl flex flex-row gap-2 px-2 py-1 cursor-pointer 
      ${activeTag === "concepts" ? "border-green-500 border-2" : "shadow-[0_2px_10px_rgba(0,0,0,0.3)]  border-2 border-white"}
    `}
        >
          <IoBookOutline
            className={`my-auto size-5 ${
              activeTag === "concepts" ? "text-my-green" : ""
            }`}
          />

          <div
            className={`flex flex-row items-center justify-center gap-1
        ${activeTag === "concepts" ? "text-my-green" : ""}
      `}
          >
            <p>Concepts</p>
            <IoIosArrowDown
              className={`${activeTag === "concepts" ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>

        <div
          onClick={() => handleClick("quiz")}
          className={` rounded-xl flex flex-row gap-2 px-2 py-1 cursor-pointer 
      ${activeTag === "quiz" ? "border-green-500 border-2" : "shadow-[0_2px_10px_rgba(0,0,0,0.3)]  border-2 border-white"}
    `}
        >
          <LuNewspaper
            className={`my-auto size-5 ${
              activeTag === "quiz" ? "text-my-green" : ""
            }`}
          />

          <div
            className={`flex flex-row items-center justify-center gap-1
        ${activeTag === "quiz" ? "text-my-green" : ""}
      `}
          >
            <p>Quiz</p>
            <IoIosArrowDown
              className={`${activeTag === "quiz" ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>

        <Link href="/syllabus-page/client?slug=syllabus-for-ssc-cgl">
          <div className="flex flex-row items-center justify-center border-2 border-white  rounded-xl px-4 py-1 shadow-[0_2px_10px_rgba(0,0,0,0.3)] ">
            <p className="">Syllabus</p>
          </div>
        </Link>

        <Link href="/test-series">
          <div className="flex flex-row items-center justify-center border-white  rounded-xl px-4 py-1 shadow-[0_2px_10px_rgba(0,0,0,0.3)] ">
            <p className="">Test Series</p>
          </div>
        </Link>
        <Link href="/upcoming-exam">
          <div className="flex flex-row items-center justify-center  border-white  rounded-xl px-4 py-1 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            <p className="">Upcoming Exam</p>
          </div>
        </Link>
        <Link href="/blog">
          <div className="flex flex-row items-center justify-center  border-white  rounded-xl px-4 py-1 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            <p className="">Blogs</p>
          </div>
        </Link>
      </div>

      {/* DropDown for current affaris */}
      {activeTag === "current-affairs" && (
        <div className="  z-50 w-full  flex py-4 flex-col fixed top-34 bg-white  border-2">
          <div className="w-[90%] border-2 mx-auto">
            <div className="w-[20%] ml-24  p-2  hover:bg-[#E6F1F1] dark:hover:bg-black rounded-xl">
              <Link
                href={"/current-affaris"}
                onClick={() => setActiveTag(null)}
              >
                <div className="flex flex-row items-center gap-2">
                  <p className=" text-sm text-my-text-color ">
                    {" "}
                    Detailed Current Affaris{" "}
                  </p>{" "}
                  <MdKeyboardArrowRight className="text-my-text-color" />
                </div>

                <p className="text-my-text-color text-sm py-2">
                  Get Full Details here
                </p>
              </Link>
            </div>

            <div className="w-[20%] ml-24 mt-2 p-2   hover:bg-[#E6F1F1] dark:hover:bg-black rounded-xl ">
              <Link href={"/one-liner"} onClick={() => setActiveTag(null)}>
                <div className="flex flex-row items-center gap-2">
                  <p className=" text-sm text-my-text-color ">
                    {" "}
                    One Liner Current Affaris{" "}
                  </p>{" "}
                  <MdKeyboardArrowRight className="text-my-text-color" />
                </div>

                <p className="text-my-text-color text-sm py-2">
                  Get Full Details here
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* DropDown for concepts */}
      {activeTag === "concepts" && (
        <div className="  z-50 w-full  flex flex-col fixed  top-34 bg-white border-2  ">
          <div className="border-2 w-[85%] mx-auto">
            <div className=" w-full flex flex-row justify-between">
              {/* heading */}
              <div className="w-[25%] flex flex-row  justify-center  border-fuchsia-700 mt-10 p-3 ">
                <p className="text-my-text-color text-sm ">
                  Concepts For Prelims (Tier 1)
                </p>
                <MdKeyboardArrowRight className=" mt-0.5" />
              </div>

              {/* body */}

              <div className="w-[60%]  border-red-600 flex flex-row justify-start text-sm text-my-text-color flex-wrap mt-10 gap-x-8 ">
                <Link
                  href={{
                    pathname: "/concept",
                    query: {
                      category: "pre",
                      subject: "quantitative-apptitude",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  {" "}
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black  rounded-lg">
                    Quantitative Apptitude{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/concept",
                    query: { category: "pre", subject: "reasoning-general" },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] rounded-lg dark:hover:bg-black">
                    {" "}
                    Reasoning & General Intelligence
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/concept",
                    query: {
                      category: "pre",
                      subject: "english-comprehension",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] rounded-lg dark:hover:bg-black ">
                    English Comprehension{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/concept",
                    query: { category: "pre", subject: "general-awareness" },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] rounded-lg dark:hover:bg-black ">
                    General Awareness{" "}
                  </p>
                </Link>
              </div>
            </div>

            {/* tier-2 */}
            <div className=" w-full flex flex-row justify-between">
              {/* heading */}
              <div className="w-[25%] flex flex-row  justify-center  border-fuchsia-700 mt-10 p-3 ">
                <p className="text-my-text-color text-sm ">
                  Concepts For mains (Tier 2)
                </p>
                <MdKeyboardArrowRight className=" mt-0.5" />
              </div>

              {/* body */}

              <div className="w-[60%]  border-red-600 flex flex-row justify-start text-sm text-my-text-color flex-wrap mt-10 gap-x-8 ">
                <Link
                  href={{
                    pathname: "/concept",
                    query: {
                      category: "mains",
                      subject: "mathematics-ability",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    Mathematical Abilities{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/concept",
                    query: { category: "mains", subject: "reasoning-general" },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    {" "}
                    Reasoning & General Intelligence
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/concept",
                    query: {
                      category: "mains",
                      subject: "english-comprehension",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    English Comprehension{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/concept",
                    query: {
                      category: "mains",
                      subject: "general-awareness",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    General Awareness{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/concept",
                    query: {
                      category: "mains",
                      subject: "computer-knowledge",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    Computer Knowledge{" "}
                  </p>
                </Link>

                <Link
                  href={"/typing-test/intro"}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    Data Entry Speed Test{" "}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DropDown for quiz */}
      {activeTag === "quiz" && (
        <div className="  z-50 w-full  flex flex-col fixed  top-34 bg-white border-2   ">
          <div className="border-2 w-[85%] mx-auto">
            <div className=" w-full flex flex-row justify-between">
              {/* heading */}
              <div className="w-[25%] flex flex-row  justify-center  border-fuchsia-700 mt-10 p-3 ">
                <p className="text-my-text-color text-sm ">
                  Quiz For Prelims (Tier 1)
                </p>
                <MdKeyboardArrowRight className=" mt-0.5" />
              </div>

              {/* body */}

              <div className="w-[60%]  border-red-600 flex flex-row justify-start text-sm text-my-text-color flex-wrap mt-10 gap-x-8 ">
                <Link
                  href={{
                    pathname: "/quiz",
                    query: {
                      category: "pre",
                      subject: "quantitative-apptitude",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    Quantitative Apptitude{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/quiz",
                    query: { category: "pre", subject: "reasoning-general" },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    {" "}
                    Reasoning & General Intelligence
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/quiz",
                    query: {
                      category: "pre",
                      subject: "english-comprehension",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    English Comprehension{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/quiz",
                    query: { category: "pre", subject: "general-awareness" },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    General Awareness{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/quiz",
                    query: { category: "pre", subject: "pyq" },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    PYQs{" "}
                  </p>
                </Link>
              </div>
            </div>

            {/* tier-2 */}
            <div className=" w-full flex flex-row justify-between">
              {/* heading */}
              <div className="w-[25%] flex flex-row  justify-center  border-fuchsia-700 mt-10 p-3 ">
                <p className="text-my-text-color text-sm ">
                  Quiz For mains (Tier 2)
                </p>
                <MdKeyboardArrowRight className=" mt-0.5" />
              </div>

              {/* body */}

              <div className="w-[60%]  border-red-600 flex flex-row justify-start text-sm text-my-text-color flex-wrap mt-10 gap-x-8 ">
                <Link
                  href={{
                    pathname: "/quiz",
                    query: {
                      category: "mains",
                      subject: "mathematics-ability",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    Mathematical Abilities{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/quiz",
                    query: {
                      category: "mains",
                      subject: "reasoning-general",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    {" "}
                    Reasoning & General Intelligence
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/quiz",
                    query: {
                      category: "mains",
                      subject: "english-comprehension",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    English Comprehension{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/quiz",
                    query: {
                      category: "mains",
                      subject: "general-awareness",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  {" "}
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    General Awareness{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/quiz",
                    query: {
                      category: "mains",
                      subject: "computer-knowledge",
                    },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  {" "}
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    Computer Knowledge{" "}
                  </p>
                </Link>

                <Link
                  href={"/typing-test/intro"}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    Data Entry Speed Test{" "}
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/quiz",
                    query: { category: "mains", subject: "pyq" },
                  }}
                  onClick={() => setActiveTag(null)}
                >
                  <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                    PYQs{" "}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SmallNav;

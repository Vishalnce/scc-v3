"use client";
import React, { useState } from "react";
import Image from "next/image";

import { TbLanguageHiragana } from "react-icons/tb";
import { FaBell } from "react-icons/fa";

import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

import { MdKeyboardArrowRight } from "react-icons/md";

import ThemeToggle from "@/utils/theme/ThemeToggle";
import { IoClose } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react";
import { unauthorized } from "next/navigation";

function Nav() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(true);

  const [subMenu, setSubMenu] = useState<string | null>(null);

  const { status } = useSession();

  const handleClick = (menu: string) => {
    setActiveTag((prev) => (prev === menu ? null : menu));
  };

  const handleSubClick = (menu: string) => {
    setSubMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <>
      <nav className="bg-[image:var(--color-my-gradient)]  w-full sticky z-50   top-0 ">
        <div className="  flex flex-row justify-between items-center mx-auto   max-w-[1400px]  ">
          {/* small screen toggle menu button */}

          {/* logo and hamburger icon */}
          <div className="m-2 flex flex-row gap-3">
            <div
              className="my-auto m-1 lg:hidden "
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <RiMenu2Fill className="size-8 " />
              ) : (
                <IoClose className="size-8" />
              )}
            </div>
            <Link href="/">
              <Image
                src="/layout/logo1.svg"
                alt="Logo"
                width={123}
                height={35}
                className="h-auto w-auto"
              />
            </Link>
          </div>

          {/* links */}
          <div className="flex flex-row items-center space-x-8 max-lg:hidden ">
            <div onClick={() => handleClick("current-affairs")}>
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green">
                <p className="">Current Affairs</p> <IoIosArrowDown />
              </div>
            </div>

            <div onClick={() => handleClick("concepts")}>
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Concepts</p> <IoIosArrowDown />
              </div>
            </div>

            <div onClick={() => handleClick("quiz")}>
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Quiz</p> <IoIosArrowDown />
              </div>
            </div>
            <Link href="/syllabus-page/client?slug=syllabus-for-ssc-cgl">
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Syllabus</p>
              </div>
            </Link>

            <Link href="/test-series">
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Test Series</p>
              </div>
            </Link>
            <Link href="/upcoming-exam">
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Upcoming Exam</p>
              </div>
            </Link>
            <Link href="/blog">
              <div className="flex flex-row items-center justify-center text-my-text-color text-sm hover:text-my-green ">
                <p className="">Blogs</p>
              </div>
            </Link>
          </div>

          {/* button and login */}

          <div className="flex flex-row justify-around items-center space-x-2 mx-2">
            <Link href="/hi">
              <TbLanguageHiragana className="size-5 " />
            </Link>

            <FaBell className="size-5 " />

            <ThemeToggle />
            {status === "authenticated" ? (
              <div>
                <button
                  className="p-0.5 px-4 border-1 rounded-lg bg-my-green text-white max-lg:text-sm max-sm:px-2  "
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-row gap-2">
                <Link href={"/login"}>
                  <button
                    onClick={() => {
                      signIn();
                    }}
                    className="p-0.5 px-4 border-1 rounded-lg max-lg:text-sm max-sm:px-2 "
                  >
                    Login
                  </button>
                </Link>

                <Link href={"/signup"}>
                  <button className="p-0.5 px-4 border-1 rounded-lg bg-my-green text-white max-lg:text-sm max-lg:hidden  ">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* DropDown for current affaris */}
      {activeTag === "current-affairs" && (
        <div className="  z-50 w-full  flex py-4 flex-col fixed top-12 bg-[image:var(--color-my-gradient)]  ">
          <div className="w-[20%] ml-24  p-2  hover:bg-[#E6F1F1] dark:hover:bg-black rounded-xl">
            <Link href={"/current-affaris"} onClick={() => setActiveTag(null)}>
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
      )}

      {/* DropDown for concepts */}
      {activeTag === "concepts" && (
        <div className="  z-50 w-full  flex flex-col fixed top-12  bg-[image:var(--color-my-gradient)]  ">
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
                  query: { category: "pre", subject: "quantitative-apptitude" },
                }}
                onClick={() => setActiveTag(null)}
              >
                {" "}
                <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black  rounded-lg">
                  Quantitative Apptitude{" "}
                </p>
              </Link>

              <p className="p-3 hover:bg-[#E6F1F1] rounded-lg dark:hover:bg-black">
                {" "}
                Reasoning & General Intelligence
              </p>
              <p className="p-3 hover:bg-[#E6F1F1] rounded-lg dark:hover:bg-black ">
                English Comprehension{" "}
              </p>

              <Link href={""}>
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
              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                Mathematical Abilities{" "}
              </p>
              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                {" "}
                Reasoning & General Intelligence
              </p>
              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                English Comprehension{" "}
              </p>

              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                General Awareness{" "}
              </p>
              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                Computer Knowledge{" "}
              </p>

              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                Data Entry Speed Test{" "}
              </p>

              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                PYQs{" "}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DropDown for quiz */}
      {activeTag === "quiz" && (
        <div className="  z-50 w-full  flex flex-col fixed top-12  bg-[image:var(--color-my-gradient)]  ">
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
                  query: { category: "pre", subject: "quantitative-apptitude" },
                }}
                onClick={() => setActiveTag(null)}
              >
                <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                  Quantitative Apptitude{" "}
                </p>
              </Link>

              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                {" "}
                Reasoning & General Intelligence
              </p>
              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                English Comprehension{" "}
              </p>

              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                General Awareness{" "}
              </p>

              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                PYQs{" "}
              </p>
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
              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                Mathematical Abilities{" "}
              </p>
              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                {" "}
                Reasoning & General Intelligence
              </p>
              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                English Comprehension{" "}
              </p>

              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                General Awareness{" "}
              </p>
              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                Computer Knowledge{" "}
              </p>

              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                Data Entry Speed Test{" "}
              </p>

              <p className="p-3 hover:bg-[#E6F1F1] dark:hover:bg-black rounded-lg">
                PYQs{" "}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* menu for small screen */}

      {!isOpen && (
        <div className=" fixed  top-[52px] max-md:top-12 left-0  z-50 max-lg:w-[40%] max-sm:w-full  bg-[image:var(--color-my-gradient)]  flex flex-col items-center lg:hidden overflow-y-auto h-[70vh] pb-2">
          {/* cureent affais */}
          <div className=" w-[80%] ">
            <div
              className="border-b-2 border-[#007076] flex flex-row justify-between mt-2"
              onClick={() => handleClick("mini-current-affairs")}
            >
              <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                {" "}
                Current Affaris{" "}
              </p>
              <MdKeyboardArrowRight className="my-auto" />
            </div>

            {activeTag === "mini-current-affairs" && (
              <div className="flex flex-col items-center w-[80%] mt-2 togle">
                <div className="w-[80%] text-sm  ">
                  <p className=" hover:text-[#007076] mt-2">
                    Details Current Affairs
                  </p>

                  <p className=" hover:text-[#007076] mt-2">
                    One Liner Current Affaris
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* MIni-Concepts */}
          <div className=" w-[80%] ">
            <div
              className="border-b-2 border-[#007076] flex flex-row justify-between mt-2"
              onClick={() => handleClick("mini-pre-concepts")}
            >
              <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                Concepts
              </p>
              <MdKeyboardArrowRight className="my-auto" />
            </div>

            {activeTag === "mini-pre-concepts" && (
              <div className="flex flex-col items-center w-[80%]  mt-2 togle">
                <div className="w-[80%] text-sm  ">
                  <div
                    className=" hover:text-[#007076] flex flex-row justify-between border-b-2 border-[#007076] mt-2"
                    onClick={() => {
                      handleSubClick("pre");
                    }}
                  >
                    <p>For pre</p>
                    <MdKeyboardArrowRight className="my-auto" />
                  </div>
                  {subMenu === "pre" && (
                    <div className="fle flex-col ">
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Quantitative Apptitude
                      </p>
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Reasoning & General Intelligence
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        English Comprehension
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1]  dark:hover:bg-[#313131] ">
                        General Awareness
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        PYQs
                      </p>
                    </div>
                  )}

                  {/* for mains */}
                  <div
                    className=" hover:text-[#007076] flex flex-row justify-between border-b-2 mt-2"
                    onClick={() => {
                      handleSubClick("mini-concepts-main");
                    }}
                  >
                    <p>For Main</p>
                    <MdKeyboardArrowRight className="my-auto" />
                  </div>
                  {subMenu === "mini-concepts-main" && (
                    <div className="fle flex-col ">
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]  ">
                        Quantitative Apptitude
                      </p>
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Quantitative Apptitude
                      </p>
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Reasoning & General Intelligence
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        English Comprehension
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]  ">
                        General Awareness
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Computer Knowledge
                      </p>
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Data Entry Speed Test
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        PYQs
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mini- quiz */}
          <div className=" w-[80%] ">
            <div
              className="border-b-2 border-[#007076] flex flex-row justify-between mt-2"
              onClick={() => handleClick("mini-quiz")}
            >
              <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                Quiz
              </p>
              <MdKeyboardArrowRight className="my-auto" />
            </div>

            {activeTag === "mini-quiz" && (
              <div className="flex flex-col items-center w-[80%] mt-2 togle">
                <div className="w-[80%] text-sm  ">
                  <div
                    className=" hover:text-[#007076] flex flex-row justify-between border-b-2 border-[#007076] mt-2"
                    onClick={() => {
                      handleSubClick("pre-quiz");
                    }}
                  >
                    <p>For pre</p>
                    <MdKeyboardArrowRight className="my-auto" />
                  </div>
                  {subMenu === "pre-quiz" && (
                    <div className="fle flex-col ">
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Quantitative Apptitude
                      </p>
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Reasoning & General Intelligence
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        English Comprehension
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1]  dark:hover:bg-[#313131] ">
                        General Awareness
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        PYQs
                      </p>
                    </div>
                  )}

                  {/* for mains */}
                  <div
                    className=" hover:text-[#007076] flex flex-row justify-between border-b-2 mt-2"
                    onClick={() => {
                      handleSubClick("main-quiz");
                    }}
                  >
                    <p>For Main</p>
                    <MdKeyboardArrowRight className="my-auto" />
                  </div>
                  {subMenu === "main-quiz" && (
                    <div className="flex flex-col ">
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]  ">
                        Quantitative Apptitude
                      </p>
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Quantitative Apptitude
                      </p>
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Reasoning & General Intelligence
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        English Comprehension
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]  ">
                        General Awareness
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Computer Knowledge
                      </p>
                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        Data Entry Speed Test
                      </p>

                      <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                        PYQs
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* mini Syllabus */}
          <div className="w-[80%]">
            <div className="border-b-2 border-[#007076] flex flex-row justify-between mt-2">
              <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                Syllabus
              </p>
              <MdKeyboardArrowRight className="my-auto" />
            </div>
          </div>

          {/* Test Series */}
          <div className="w-[80%]">
            <div className="border-b-2 border-[#007076] flex flex-row justify-between mt-2">
              <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                Test Series
              </p>
              <MdKeyboardArrowRight className="my-auto" />
            </div>
          </div>
          {/* Upcoming Exams */}
          <div className="w-[80%]">
            <div className="border-b-2 border-[#007076] flex flex-row justify-between mt-2">
              <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                Upcoming Exams
              </p>
              <MdKeyboardArrowRight className="my-auto" />
            </div>
          </div>
          {/* Blogs */}
          <div className="w-[80%]">
            <div className="border-b-2 border-[#007076] flex flex-row justify-between mt-2">
              <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                Blogs
              </p>
              <MdKeyboardArrowRight className="my-auto" />
            </div>
          </div>
        </div>
      )}

      {/* bottom nav */}
      <div className="w-full  bg-[image:var(--color-my-gradient)] fixed z-50 bottom-0 md:hidden ">
        <div className="flex flex-row  max-md:w-[90%] mx-auto justify-between  ">
          <div className="flex flex-col">
            <div>
              <Image
                alt="News"
                src="/layout/mobile/news.svg"
                width={30}
                height={30}
              />
              <p className="text-my-text-color text-[12px] text-center">News</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <Image
                alt="test"
                src="/layout/mobile/bulb.svg"
                width={30}
                height={30}
              />
              <p className="text-my-text-color text-[12px] text-center">Test</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="-m-4 ">
              <Image
                alt="home"
                src="/layout/mobile/home.svg"
                width={40}
                height={40}
              />
              <p className="text-my-text-color text-[12px] text-center pt-1">
                Home
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <Image
                alt="task"
                src="/layout/mobile/task.svg"
                width={30}
                height={30}
                className="h-auto w-auto"
              />
              <p className="text-my-text-color text-[12px] text-center">Test</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <Image
                alt="menu"
                src="/layout/mobile/menu.svg"
                width={30}
                height={30}
                className="h-auto w-auto"
              />
              <p className="text-my-text-color text-[12px] text-center">More</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;

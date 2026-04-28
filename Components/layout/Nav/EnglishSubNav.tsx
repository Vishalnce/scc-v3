

"use client";
import React, { useState } from "react";
import Image from "next/image";

import { TbLanguageHiragana } from "react-icons/tb";

import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

import { MdKeyboardArrowRight, MdOutlineLightbulb } from "react-icons/md";

import ThemeToggle from "@/utils/theme/ThemeToggle";
import { IoClose } from "react-icons/io5";
import { RiMenu2Fill, RiMore2Fill } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react";
import { LuClipboardList, LuNewspaper } from "react-icons/lu";
import { FaRegArrowAltCircleUp } from "react-icons/fa";


function EnglishSubNav() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);

    const [subMenu, setSubMenu] = useState<string | null>(null);

    const handleSubClick = (menu: string) => {
    setSubMenu((prev) => (prev === menu ? null : menu));

    
  const handleClick = (menu: string) => {
    setActiveTag((prev) => (prev === menu ? null : menu));
  };


  
  return (
    <>
          {/* menu for small screen */}

      {!isOpen && (
        <div className=" fixed  top-[52px] max-md:top-12 left-0  z-50 max-lg:w-[40%] max-sm:w-full  bg-[image:var(--color-my-gradient)]  flex flex-col items-center lg:hidden overflow-y-auto h-[70vh] pb-2 ">
          {/* cureent affais */}
          <div className=" w-[80%] ">
            <div
              className="border-b-2 border-[#007076] flex flex-row justify-between mt-2"
              onClick={() => handleClick("mini-current-affairs")}
            >
              <p className="py-1  text-xl text-center text-my-text-color hover:text-[#007076]">
                {" "}
                Current affairs{" "}
              </p>
              <MdKeyboardArrowRight className="my-auto" />
            </div>

            {activeTag === "mini-current-affairs" && (
              <div className="flex flex-col items-center w-[90%] mt-2 togle">
                <div className="w-[80%] text-sm  ">
                  <Link href={"/current-affairs"}>
                    <button
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                      className=" hover:text-[#007076]  text-lg mt-2"
                    >
                      {" "}
                      Details Current Affairs{" "}
                    </button>
                  </Link>

                  <Link href={"/one-liner"}>
                    <button
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                      className=" hover:text-[#007076]  text-lg mt-2"
                    >
                      {" "}
                      One Liner Current Affairs
                    </button>
                  </Link>
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
              <p className="py-1 text-center text-xl text-my-text-color hover:text-[#007076]">
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
                    <p className="text-lg">For pre</p>
                    <MdKeyboardArrowRight className="my-auto" />
                  </div>
                  {subMenu === "pre" && (
                    <div className="fle flex-col ">
                      <Link
                        href={{
                          pathname: "/concept",
                          query: {
                            category: "pre",
                            subject: "quantitative-apptitude",
                          },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {" "}
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          Quantitative Apptitude{" "}
                        </p>
                      </Link>

                      <Link
                        href={{
                          pathname: "/concept",
                          query: {
                            category: "pre",
                            subject: "reasoning-general",
                          },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                          English Comprehension{" "}
                        </p>
                      </Link>

                      <Link
                        href={{
                          pathname: "/concept",
                          query: {
                            category: "pre",
                            subject: "general-awareness",
                          },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131] ">
                          General Awareness{" "}
                        </p>
                      </Link>
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
                      <Link
                        href={{
                          pathname: "/concept",
                          query: {
                            category: "mains",
                            subject: "mathematical-abilities",
                          },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          Mathematical Abilities{" "}
                        </p>
                      </Link>

                      <Link
                        href={{
                          pathname: "/concept",
                          query: {
                            category: "mains",
                            subject: "reasoning-general",
                          },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          Computer Knowledge{" "}
                        </p>
                      </Link>

                      <Link
                        href={"/typing-test/intro"}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          Data Entry Speed Test{" "}
                        </p>
                      </Link>
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
                      <Link
                        href={{
                          pathname: "/quiz",
                          query: {
                            category: "pre",
                            subject: "quantitative-apptitude",
                          },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          Quantitative Apptitude{" "}
                        </p>
                      </Link>
                      <Link
                        href={{
                          pathname: "/quiz",
                          query: {
                            category: "pre",
                            subject: "reasoning-general",
                          },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          English Comprehension{" "}
                        </p>
                      </Link>

                      <Link
                        href={{
                          pathname: "/quiz",
                          query: {
                            category: "pre",
                            subject: "general-awareness",
                          },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          General Awareness{" "}
                        </p>
                      </Link>

                      <Link
                        href={{
                          pathname: "/quiz",
                          query: { category: "pre", subject: "pyq" },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          PYQs{" "}
                        </p>
                      </Link>
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
                      <Link
                        href={{
                          pathname: "/quiz",
                          query: {
                            category: "mains",
                            subject: "mathematical-abilities",
                          },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {" "}
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
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
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {" "}
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          Computer Knowledge{" "}
                        </p>
                      </Link>

                      <Link
                        href={"/typing-test/intro"}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          Data Entry Speed Test{" "}
                        </p>
                      </Link>
                      <Link
                        href={{
                          pathname: "/quiz",
                          query: { category: "main", subject: "pyq" },
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <p className="p-2 hover:bg-[#E6F1F1] dark:hover:bg-[#313131]">
                          PYQs{" "}
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* mini Syllabus */}
          <div className="w-[80%]">
            <Link href={"/syllabus-page/client?slug=syllabus-for-ssc-cgl"}>
              {" "}
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="border-b-2 border-[#007076] flex flex-row justify-between mt-2 w-full "
              >
                <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                  Syllabus
                </p>
                <MdKeyboardArrowRight className="my-auto" />
              </button>
            </Link>
          </div>

          {/* Test Series */}
          <div className="w-[80%]">
            <Link href={"/test-series"}>
              {" "}
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="border-b-2 border-[#007076] flex flex-row justify-between mt-2 w-full "
              >
                <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                 Test Series
                </p>
                <MdKeyboardArrowRight className="my-auto" />
              </button>
            </Link>
          </div>
          {/* Upcoming Exams */}
          <div className="w-[80%]">
            <Link href={"/upcoming-exam"}>
              {" "}
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="border-b-2 border-[#007076] flex flex-row justify-between mt-2 w-full "
              >
                <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                Upcoming Exam
                </p>
                <MdKeyboardArrowRight className="my-auto" />
              </button>
            </Link>
          </div>
          {/* Blogs */}
          <div className="w-[80%]">
                <Link href={"/blog"}>
              {" "}
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="border-b-2 border-[#007076] flex flex-row justify-between mt-2 w-full "
              >
                <p className="py-1 text-center text-my-text-color hover:text-[#007076]">
                Blogs
                </p>
                <MdKeyboardArrowRight className="my-auto" />
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* scroll up */}

      <div className="fixed z-50 bottom-10 right-15">

        <FaRegArrowAltCircleUp className="text-white bg-amber-600    size-10" />

     
      </div>

    </>
  )
}
}
export default EnglishSubNav
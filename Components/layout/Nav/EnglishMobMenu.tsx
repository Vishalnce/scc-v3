"use client";
import React, { useState } from "react";
import Image from "next/image";

import { TbLanguageHiragana } from "react-icons/tb";

import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineLightbulb,
} from "react-icons/md";

import ThemeToggle from "@/utils/theme/ThemeToggle";
import { IoClose } from "react-icons/io5";
import { RiMenu2Fill, RiMore2Fill } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  LuBookMinus,
  LuBookOpen,
  LuClipboardList,
  LuNewspaper,
} from "react-icons/lu";
import {
  FaBlog,
  FaRegArrowAltCircleUp,
  FaRegCalendarAlt,
  FaRegClipboard,
  FaRegNewspaper,
} from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";
import EnglishMobileLogin from "./EnglishMobileLogin";
import MobileThemeToggle from "./MobileThemeToggle";
import EnglishHindi from "./EnglishHindi";


function EnglishMobMenu( { setIsOpenMobile } : { setIsOpenMobile: (isOpen: boolean) => void })  {

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const [subMenu, setSubMenu] = useState<string | null>(null);

  const handleSubClick = (menu: string) => {
    setSubMenu((prev) => (prev === menu ? null : menu));
  };
  const handleClick = (menu: string) => {
    setActiveTag((prev) => (prev === menu ? null : menu));
  };

  return (
    <>
      <div className="fixed dark:bg-[#262626] top-[65px] pt-2 left-0 w-full h-[100vh]  bg-white z-50 flex flex-col items-center gap-2  ">
        {/* cureent affais */}
        <div className=" w-[85%] dark:bg-black dark:text-white rounded-xl px-2 ">
          <div
            className=" rounded-xl  shadow flex flex-row justify-between py-2 px-2 "
            onClick={() => handleClick("mini-current-affairs")}
          >
            <div className="flex flex-row gap-2">
              <LuNewspaper className="my-auto size-5" />
              <p className="py-1  font-bold text-center  hover:text-[#007076]">
                Current Affairs
              </p>
            </div>

            <MdKeyboardArrowDown className="my-auto  font-bold size-6" />
          </div>

          {activeTag === "mini-current-affairs" && (
            <div className="flex flex-col items-center  w-[100%] togle py-4 space-y-2 ">
              <Link
                href={"/current-affairs"}
                className="w-full shadow pl-9 py-1"
              >
                <button
                  onClick={(e) => {
              
                 
                    setIsOpenMobile(true);
                  }}



                  className=" hover:text-[#007076]    rounded-xl  "
                >
                  {" "}
                  <p className=" text-sm text-[#6F6F6F] dark:text-white">
                    {" "}
                    Details Current Affairs{" "}
                  </p>
                </button>
              </Link>

              <Link href={"/one-liner"} className="w-full shadow pl-9 py-1">
                <button
                  onClick={(e) => {
               
                     setIsOpenMobile(true);
                  }}
                  className=" hover:text-[#007076]    rounded-xl "
                >
                  {" "}
                  <p className=" text-sm text-[#6F6F6F] dark:text-white">
                    {" "}
                    One Liner Current Affairs{" "}
                  </p>
                </button>
              </Link>

                 <Link href={"/editorial"} className="w-full shadow pl-9 py-1">
                <button
                  onClick={(e) => {
                
              
                     setIsOpenMobile(true);
                  }}
                  className=" hover:text-[#007076]    rounded-xl "
                >
                  {" "}
                  <p className=" text-sm text-[#6F6F6F] dark:text-white">
                    {" "}
                    Editorials{" "}
                  </p>
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* MIni-Concepts */}
        <div className=" w-[85%] space-y-2  dark:bg-black dark:text-white rounded-xl px-2">
          <div
            className=" rounded-xl  shadow flex flex-row justify-between py-2 px-2 "
            onClick={() => handleClick("mini-pre-concepts")}
          >
            <div className="flex flex-row gap-2 ">
              <div className=" p-1  my-auto ">
                   <LuBookOpen className="my-auto size-5" />
              </div>
           
              <p className="py-1  font-bold text-center ">Concepts</p>
            </div>

            <MdKeyboardArrowDown className="my-auto  font-bold size-6" />
          </div>

          {activeTag === "mini-pre-concepts" && (
            <div className="flex flex-col items-center w-full    togle">
              <div className="w-full text-sm  ">
                <div
                  className="  flex flex-row justify-between  shadow w-full py-2 rounded-xl pr-2 "
                  onClick={() => {
                    handleSubClick("pre");
                  }}
                >
                  <div className="flex flex-row gap-2 pl-9">
                    <VscGraph className="my-auto size-5" />
                    <p className="py-1  font-bold text-center  hover:text-[#007076]">
                      Tier 1
                    </p>
                  </div>

                  <MdKeyboardArrowDown className="my-auto  font-bold size-6" />
                </div>

                {/* pre */}
                {subMenu === "pre" && (
                  <div className="flex flex-col space-x-2  ">
                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: "pre",
                          subject: "quantitative-apptitude",
                        },
                      }}
                onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-16  w-full"
                    >
                      {" "}
                      <p className="">Quantitative Apptitude </p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: "pre",
                          subject: "reasoning-general",
                        },
                      }}
                  
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className=""> Reasoning & General Intelligence</p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: "pre",
                          subject: "english-comprehension",
                        },
                      }}
                        onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className=" ">English Comprehension </p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: "pre",
                          subject: "general-awareness",
                        },
                      }}
                        onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className=" ">General Awareness </p>
                    </Link>
                  </div>
                )}

                {/* for mains */}

                <div
                  className="  flex flex-row justify-between  shadow w-full py-2 rounded-xl pr-2 "
                  onClick={() => {
                    handleSubClick("mini-concepts-main");
                  }}
                >
                  <div className="flex flex-row gap-2 pl-9">
                    <VscGraph className="my-auto size-5" />
                    <p className="py-1  font-bold text-center  hover:text-[#007076]">
                      Tier 2
                    </p>
                  </div>

                  <MdKeyboardArrowDown className="my-auto  font-bold size-6" />
                </div>

                {subMenu === "mini-concepts-main" && (
                  <div className="flex flex-col space-x-2  ">
                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: "mains",
                          subject: "mathematical-abilities",
                        },
                      }}
                        onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className="">Mathematical Abilities </p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: "mains",
                          subject: "reasoning-general",
                        },
                      }}
                        onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className=""> Reasoning & General Intelligence</p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: "mains",
                          subject: "english-comprehension",
                        },
                      }}
                       onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className="">English Comprehension </p>
                    </Link>
                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: "mains",
                          subject: "general-awareness",
                        },
                      }}
                 onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className="">General Awareness </p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: "mains",
                          subject: "computer-knowledge",
                        },
                      }}
                       onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className="">Computer Knowledge </p>
                    </Link>

                    <Link
                      href={"/typing-test/intro"}
                       onClick={() => setIsOpenMobile(true)}
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
        <div className=" w-[85%] space-y-2 dark:bg-black dark:text-white rounded-xl px-2 ">
          <div
            className="rounded-xl  shadow flex flex-row justify-between py-2 px-2 "
            onClick={() => handleClick("mini-quiz")}
          >
            <div className="flex flex-row gap-2">
              <MdOutlineLightbulb className="my-auto size-5" />
              <p className="py-1  font-bold text-center ">Quiz</p>
            </div>
            <MdKeyboardArrowDown className="my-auto  font-bold size-6" />
          </div>

          {/* pre  */}
          {activeTag === "mini-quiz" && (
            <div className="flex flex-col items-center w-full togle">
              <div className="w-full text-sm  ">
                <div
                  className="flex flex-row justify-between  shadow w-full py-2 rounded-xl pr-2"
                  onClick={() => {
                    handleSubClick("pre-quiz");
                  }}
                >
                  <div className="flex flex-row gap-2 pl-9">
                    <VscGraph className="my-auto size-5" />
                    <p className="py-1  font-bold text-center  hover:text-[#007076]">
                      Tier 1
                    </p>
                  </div>
                  <MdKeyboardArrowRight className="my-auto font-bold size-6" />
                </div>

                {subMenu === "pre-quiz" && (
                  <div className="flex flex-col space-x-2  ">
                    <Link
                      href={{
                        pathname: "/quiz",
                        query: {
                          category: "pre",
                          subject: "quantitative-apptitude",
                        },
                      }}
                     onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-16  w-full"
                    >
                      <p className="">Quantitative Apptitude </p>
                    </Link>
                    <Link
                      href={{
                        pathname: "/quiz",
                        query: {
                          category: "pre",
                          subject: "reasoning-general",
                        },
                      }}
                     onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-16  w-full"
                    >
                      <p className=""> Reasoning & General Intelligence</p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/quiz",
                        query: {
                          category: "pre",
                          subject: "english-comprehension",
                        },
                      }}
                       onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-16  w-full"
                    >
                      <p className="">English Comprehension </p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/quiz",
                        query: {
                          category: "pre",
                          subject: "general-awareness",
                        },
                      }}
                      onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-16  w-full"
                    >
                      <p className="">General Awareness </p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/quiz",
                        query: { category: "pre", subject: "pyq" },
                      }}
                     onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-16  w-full"
                    >
                      <p className="">PYQs </p>
                    </Link>
                  </div>
                )}

                {/* for mains */}
                <div
                  className=" flex flex-row justify-between  shadow w-full py-2 rounded-xl pr-2"
                  onClick={() => {
                    handleSubClick("main-quiz");
                  }}
                >
                  <div className="flex flex-row gap-2 pl-9">
                    <VscGraph className="my-auto size-5" />
                    <p className="py-1  font-bold text-center  hover:text-[#007076]">
                      Tier 2
                    </p>
                  </div>
                  <MdKeyboardArrowRight className="my-auto  font-bold size-6" />
                </div>
                {subMenu === "main-quiz" && (
                  <div className="flex flex-col space-x-2">
                    <Link
                      href={{
                        pathname: "/quiz",
                        query: {
                          category: "mains",
                          subject: "mathematical-abilities",
                        },
                      }}
                     onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className="">Mathematical Abilities </p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/quiz",
                        query: {
                          category: "mains",
                          subject: "reasoning-general",
                        },
                      }}
             
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className=""> Reasoning & General Intelligence</p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/quiz",
                        query: {
                          category: "mains",
                          subject: "english-comprehension",
                        },
                      }}
                       onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className="">English Comprehension </p>
                    </Link>
                    <Link
                      href={{
                        pathname: "/quiz",
                        query: {
                          category: "mains",
                          subject: "general-awareness",
                        },
                      }}
                       onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      {" "}
                      <p className="">General Awareness </p>
                    </Link>

                    <Link
                      href={{
                        pathname: "/quiz",
                        query: {
                          category: "mains",
                          subject: "computer-knowledge",
                        },
                      }}
                       onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      {" "}
                      <p className="">Computer Knowledge </p>
                    </Link>

                    <Link
                      href={"/typing-test/intro"}
                  
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className="">Data Entry Speed Test </p>
                    </Link>
                    <Link
                      href={{
                        pathname: "/quiz",
                        query: { category: "main", subject: "pyq" },
                      }}
                       onClick={() => setIsOpenMobile(true)}
                      className=" shadow rounded-xl py-4 pl-14  w-full"
                    >
                      <p className="">PYQs </p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* mini Syllabus */}
        <div className="w-[85%] dark:bg-black dark:text-white rounded-xl px-2 ">
          <Link href={"/syllabus-page/client?slug=syllabus-for-ssc-cgl"}>
            {" "}
            <button
               onClick={() => setIsOpenMobile(true)}
              className="rounded-xl  shadow flex flex-row justify-between py-2 px-2  w-full "
            >
              <div className="flex flex-row gap-2">
                <LuBookMinus className="my-auto size-5" />
                <p className="py-1  font-bold text-center  hover:text-[#007076]">
                  Syllabus
                </p>
              </div>
            </button>
          </Link>
        </div>

        {/* Test Series */}
        <div className="w-[85%] dark:bg-black dark:text-white rounded-xl px-2">
          <Link href={"/test-series"}>
            {" "}
            <button
               onClick={() => setIsOpenMobile(true)}
              className="rounded-xl  shadow flex flex-row justify-between py-2 px-2  w-full "
            >
              <div className="flex flex-row gap-2">
                <FaRegClipboard className="my-auto size-5" />
                <p className="py-1  font-bold text-center  hover:text-[#007076]">
                  Test Series
                </p>
              </div>
            </button>
          </Link>
        </div>
        {/* Upcoming Exams */}
        <div className="w-[85%] dark:bg-black dark:text-white rounded-xl px-2">
          <Link href={"/upcoming-exam"}>
            {" "}
            <button
              onClick={() => setIsOpenMobile(true)}
              className="rounded-xl  shadow flex flex-row justify-between py-2 px-2  w-full "
            >
                <div className="flex flex-row gap-2">
              <FaRegCalendarAlt  className="my-auto size-5" />
              <p className="py-1  font-bold text-center  hover:text-[#007076]">
                Upcoming Exams
              </p>
            </div>
           
            </button>
          </Link>
        </div>
        {/* Blogs */}
        <div className="w-[85%] dark:bg-black dark:text-white rounded-xl px-2 ">
          <Link href={"/blog"}>
            {" "}
            <button
              onClick={() => setIsOpenMobile(true)}
              className="rounded-xl  shadow flex flex-row justify-between py-2 px-2  w-full "
            >
              
                <div className="flex flex-row gap-2">
              <FaBlog  className="my-auto size-5" />
              <p className="py-1  font-bold text-center  hover:text-[#007076]">
                Blogs
              </p>
            </div>
             
            </button>
          </Link>
        </div>


        <div className="w-[85%]">
              <EnglishMobileLogin/>

        </div>

        <div className="w-[85%] ">

          <MobileThemeToggle/>
        </div>

        <div className="w-[85%]  "> 

              <EnglishHindi/>
        </div>
      </div>
    </>
  );
}

export default EnglishMobMenu;

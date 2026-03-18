"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowDropright,
  IoIosArrowForward,
} from "react-icons/io";
import { MdKeyboardArrowRight, MdOutlineEventNote } from "react-icons/md";
import { HiOutlineCalculator, HiOutlineChartSquareBar } from "react-icons/hi";
import { RiArrowRightWideLine } from "react-icons/ri";


import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { HiOutlineGlobe } from "react-icons/hi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { HiOutlineClock } from "react-icons/hi";
export default function QuizCard() {
 const Tier1 = [
  {
    border: "border-[#87D5E2]",
    iconBg: "bg-[#24B3CB]",
    bg: "bg-[#E9F3FF]",
    textbg: "text-[#24B3CB]",
    icon: HiOutlineCalculator,
    title: "Quantitative Aptitude",
    category: "pre",
    subject: "quantitative-apptitude",
  },
  {
    border: "border-[#93E4A6]",
    iconBg: "bg-[#11C352]",
    bg: "bg-[#EBFFE4]",
    textbg: "text-[#11C352]",
    icon: HiOutlineLightBulb,
    title: "Reasoning & GI",
    category: "pre",
    subject: "reasoning-general",
  },
  {
    border: "border-[#E6C69C]",
    iconBg: "bg-[#F89716]",
    bg: "bg-[#FFF1DF]",
    textbg: "text-[#F89716]",
     icon: HiOutlineBookOpen,
    title: "English Comprehension",
    category: "pre",
    subject: "english-comprehension",
  },
  {
    border: "border-[#E8A2CB]",
    iconBg: "bg-[#D63895]",
    bg: "bg-[#FFE5F4]",
    textbg: "text-[#E8A2CB]",
      icon: HiOutlineGlobe,
    title: "General Awareness",
    category: "pre",
    subject: "general-awareness",
  },
];

const Tier2: any = [
  {
    image: "/ui/client/home/quiz/math.svg",
    title: "Quantitative Aptitude",
    category: "mains",
    subject: "quantitative-apptitude",

    border: "border-[#87D5E2]",
    iconBg: "bg-[#24B3CB]",
    bg: "bg-[#E9F3FF]",
    textbg: "text-[#24B3CB]",
    icon: HiOutlineCalculator,
  },

  {
    image: "/ui/client/home/quiz/reasoning.svg",
    title: "Reasoning & GI",
    category: "mains",
    subject: "reasoning-general",

    border: "border-[#93E4A6]",
    iconBg: "bg-[#11C352]",
    bg: "bg-[#EBFFE4]",
    textbg: "text-[#11C352]",
    icon: HiOutlineLightBulb,
  },

  {
    image: "/ui/client/home/quiz/english.svg",
    title: "English Comprehension",
    category: "mains",
    subject: "english-comprehension",

    border: "border-[#E6C69C]",
    iconBg: "bg-[#F89716]",
    bg: "bg-[#FFF1DF]",
    textbg: "text-[#F89716]",
    icon: HiOutlineBookOpen,
  },

  {
    image: "/ui/client/home/quiz/reasoning.svg",
    title: "General Awareness",
    category: "mains",
    subject: "general-awareness",

    border: "border-[#E8A2CB]",
    iconBg: "bg-[#D63895]",
    bg: "bg-[#FFE5F4]",
    textbg: "text-[#D63895]",
    icon: HiOutlineGlobe,
  },

  {
    image: "/ui/client/home/quiz/computer.svg",
    title: "Computer Knowledge",
    category: "mains",
    subject: "computer-knowledge",

    border: "border-[#B3B3FF]",
    iconBg: "bg-[#6366F1]",
    bg: "bg-[#EEF0FF]",
    textbg: "text-[#6366F1]",
    icon: HiOutlineDesktopComputer,
  },

  {
    image: "/ui/client/home/quiz/data.svg",
    title: "Data Entry Speed Test",

    border: "border-[#FFD966]",
    iconBg: "bg-[#FACC15]",
    bg: "bg-[#FFF9DB]",
    textbg: "text-[#FACC15]",
    icon: HiOutlineClock,
  },
];

  const [tierChange, setTierChange] = useState<"for-tier1" | "for-tier2">(
    "for-tier1",
  );

  return (
    <>
      <div className="max-w-[1400px] pt-8 flex flex-col mx-auto w-[90%]">
        {/* heading */}

        <header className="flex flex-row max-md:flex-col max-md:justify-startw justify-between items-center  p-4 max-sm:px-0  ">
          <div className="w-[60%] max-sm:w-full ">
            <p className="text-4xl max-sm:text-2xl font-bold dark:text-white">
              Live Quizzes
            </p>
            <p className="text-lg text-my-text-color max-sm:hidden">
              Compete with aspirants nationwide in real-time
            </p>
          </div>
          {/* buttons */}
          <div className="w-[23%] max-md:w-full flex flex-row max-md:flex-row max-md:py-2 justify-between  items-center ">
            <div>
              <button
                onClick={() => setTierChange("for-tier1")}
                className={`px-6 py-1  rounded-xl text-lg max-md:py-2 max-md:px-10 max-sm:text-sm whitespace-nowrap min-w-[100px] flex flex-row gap-2  ${tierChange === "for-tier1" ? "bg-[#047077] border-[#047077]" : "border-2 border-[text-[#6F6F6F] dark:text-white dark:border-white"}`}
              >
                <div
                  className={`${tierChange === "for-tier1" ? "text-white" : "text-[#6F6F6F]"}`}
                >
                  <HiOutlineChartSquareBar
                    className={`my-auto size-7 ${tierChange === "for-tier1" ? "text-white" : "text-[#6F6F6F]"}`}
                  />{" "}
                </div>
                <p
                  className={` my-auto ${tierChange === "for-tier1" ? "text-white" : "text-[#6F6F6F]"}`}
                >
                  {" "}
                  Tier 1
                </p>
              </button>
            </div>

            <div>
              <button
                onClick={() => {
                  setTierChange("for-tier2");
                }}
                className={`px-6 py-1 border-2 rounded-xl text-lg  max-md:py-2 max-md:px-10  max-sm:text-sm whitespace-nowrap min-w-[100px] flex flex-row gap-2  ${tierChange === "for-tier2" ? "bg-[#047077] border-[#047077]" : "border-2 border-[text-[#6F6F6F] dark:text-white dark:border-white"}`}
              >
                <div
                  className={`${tierChange === "for-tier2" ? "text-white" : "text-[#6F6F6F]"}`}
                >
                  <HiOutlineChartSquareBar
                    className={` my-auto size-7 ${tierChange === "for-tier2" ? "text-white" : "text-[#6F6F6F]"}`}
                  />
                </div>
                <p
                  className={` my-auto ${tierChange === "for-tier2" ? "text-white" : "text-[#6F6F6F]"}`}
                >
                  {" "}
                  Tier 2
                </p>
              </button>
            </div>
          </div>
        </header>

        {/* main boady */}
        <main className=" ">
          {tierChange === "for-tier1" ? (
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 py-4">
              {Tier1.map((item: any, index: number) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className={`flex flex-row border-2 items-center justify-between py-4 rounded-xl px-6 ${item.border} ${item.bg}`}
                  >
                    {/* Left Section */}
                    <div className="flex flex-row w-[70%] gap-4">
                      <div
                        className={`${item.iconBg} p-3 max-md:p-4 rounded-full flex items-center justify-center`}
                      >
                        <Icon className="text-white size-6" />
                      </div>

                      <p className="my-auto text-xl">{item.title}</p>
                    </div>

                    {/* Right Arrow */}
                    <div
                      className={`bg-white rounded-full p-3  flex items-center justify-center`}
                    >
                      <RiArrowRightWideLine className={`${item.textbg} size-6 `} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="  relative   max-sm:min-h-[326]">
              {/* track */}
              <div className="grid grid-cols-2 gap-4 py-4">
               {Tier2.map((item: any, index: number) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className={`flex flex-row border-2 items-center justify-between py-4 rounded-xl px-6 ${item.border} ${item.bg}`}
                  >
                    {/* Left Section */}
                    <div className="flex flex-row w-[70%] gap-4">
                      <div
                        className={`${item.iconBg} p-3 max-md:p-4 rounded-full flex items-center justify-center`}
                      >
                        <Icon className="text-white size-6" />
                      </div>

                      <p className="my-auto text-xl">{item.title}</p>
                    </div>

                    {/* Right Arrow */}
                    <div
                      className={`bg-white rounded-full p-3  flex items-center justify-center`}
                    >
                      <RiArrowRightWideLine className={`${item.textbg} size-6 `} />
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";
import { SlCalculator } from "react-icons/sl";
import Icon2 from "./Concept/Icon2";
import Icon1 from "./Concept/Icon1";
import Icon3 from "./Concept/Icon3";
import Icon4 from "./Concept/Icon4";
import Icon6 from "./Concept/Icon6";
import Icon5 from "./Concept/Icon5";
import { HiOutlineChartSquareBar } from "react-icons/hi";

export default function MasterConcepts() {
  const Tier1: any = [
    {
      border: "border-[#87D5E2]",
      bg: "#F8FBFF",
      circle: "#E9F3FF",
      incircle: "#24B3CB",
      title: "Quant. Aptitude",
      category: "pre",
      subject: "quantitative-apptitude",
      Icon: Icon1,
    },

    {
      border: "border-[#93E4A6]",
      bg: "#F6FFF3",
      circle: "#EBFFE4",
      incircle: "#11C352",
      title: "Reasoning & GI",
      category: "pre",
      subject: "reasoning-general",
      Icon: Icon2,
    },
    {
      border: "border-[#E6C69C]",
      bg: "#FFFDFA",
      circle: "#FFF1DF ",
      incircle: "#F89716",

      title: "English Comph.",
      category: "pre",
      subject: "english-comprehension",
      Icon: Icon3,
    },
    {
      border: "border-[#E8A2CB]",
      bg: "#FCF4F8",
      circle: "#FFE5F4",
      incircle: "#D63895",
      title: "General Awareness",
      category: "pre",
      subject: "general-awareness",
      Icon: Icon4,
    },
  ];

  const Tier2: any = [
    {
      border: "border-[#87D5E2]",
      bg: "#F8FBFF",
      circle: "#E9F3FF",
      incircle: "#24B3CB",

      title: "Quantitative Aptitude",

      category: "mains",
      subject: "quantitative-apptitude",
      Icon: Icon1,
    },

    {
      border: "border-[#93E4A6]",
      bg: "#F6FFF3",
      circle: "#EBFFE4",
      incircle: "#11C352",
      title: "Reasoning & GI",
      category: "mains",
      subject: "reasoning-general",
      Icon: Icon2,
    },
    {
      border: "border-[#E6C69C]",
      bg: "#FFFDFA",
      circle: "#FFF1DF ",
      incircle: "#F89716",

      title: "English Comprehension",
      category: "mains",
      subject: "english-comprehension",
      Icon: Icon3,
    },
    {
      border: "border-[#E8A2CB]",
      bg: "#FCF4F8",
      circle: "#FFE5F4",
      incircle: "#D63895",

      title: "General Awareness",
      category: "mains",
      subject: "general-awareness",
      Icon: Icon4,
    },
    {
      border: "border-[#C796E4]",
      bg: "#F9F0FF",
      circle: "#F3E6FF",
      incircle: "#9F38D6",

      title: "Computer Knowledge",
      category: "mains",
      subject: "computer-knowledge",
      Icon: Icon5,
    },
    {
      border: "border-[#E38688]",
      bg: "#E38688",
      circle: "#FDE9E9 ",
      incircle: "#F14343",
      title: "Data Entry Speed Test",
      Icon: Icon6,
    },
  ];

  const { theme } = useTheme();
  const [tierChange, setTierChange] = useState<"for-tier1" | "for-tier2">(
    "for-tier1",
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    align: "start",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // 👇 Update button state when Embla updates
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Call once to set initial state
    onSelect();

    // Subscribe to events
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className="  dark:bg-[#1F1F1F]">
        <div className="max-w-[1400px] pt-8 flex flex-col mx-auto w-[90%]">
          {/* heading */}

          <header className="flex flex-row max-md:flex-col max-md:justify-startw justify-between items-center  p-4 max-sm:px-0  ">
            <div className="w-[60%] max-sm:w-full ">
              <p className="text-4xl max-sm:text-2xl font-bold dark:text-white">
                Popular Concepts
              </p>
              <p className="text-lg text-my-text-color max-sm:hidden">
                Master these essential topics for SSC exams
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
          <main className="  ">
            {tierChange === "for-tier1" ? (
              <div className="   flex flex-row flex-nowrap justify-between py-4  overflow-x-auto    scrollbar-hide gap-4    ">
                {/* cards */}

                {Tier1.map((item: any, index: number) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={index}
                      className={`relative flex-shrink-0 w-[25%] md:h-[200px] max-sm:h-[120px] max-lg:h-[180px] lg:max-h-[280px] lg:max-w-[280px] max-sm:w-[28%] rounded-lg border-2 shadow flex items-center flex-col justify-center ${item.border}  overflow-hidden bg-[${item.bg}] dark:bg-[#3a3636] border-2  `}
                    >
                      <svg
                        className={` absolute max-md:top-9 top-3 dark:bg-[#3a3636]  ${item.bg}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="152 60 200 200"
                      >
                        <defs>
                          <filter
                            id="filter0_d_31_943"
                            x="92"
                            y="0"
                            width="76"
                            height="76"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="4" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_31_943"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_31_943"
                              result="shape"
                            />
                          </filter>
                        </defs>

                        <ellipse
                          cx="253.295"
                          cy="209.755"
                          rx="107"
                          ry="94.042"
                          fill={theme === "dark" ? "#E9F3FF1A" : item.circle}
                          style={{ strokeWidth: 1 }}
                          
                        />

                        <g className="rectn">
                          <rect
                            x="100"
                            y="6"
                            width="60"
                            height="60"
                            rx="30"
                            fill={item.incircle}
                          />

                          <g transform="translate(92,0)">{Icon && <Icon />}</g>
                        </g>
                      </svg>

                      <p className="absolute bottom-8 z-40 font-semibold max-sm:left-5 max-sm:bottom-2 lg:text-xl max-md:text-xs max-md:text-center max-md:right-7  text-center ">
                        {item.title}
                      </p>

                      {/* 
                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: item.category,
                          subject: item.subject,
                        },
                      }}
                    ></Link> */}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="  relative   max-sm:min-h-[326]">
                <div className="overflow-hidden  py-12  " ref={emblaRef}>
                  {/* track */}
                  <div className="flex   gap-10 px-2 ">
                    {Tier2.map((item: any, index: number) => {
                      const Icon = item.Icon;
                      return (
                        <div
                          key={index}
                          className={`relative flex-shrink-0 w-[25%] h-[200px] max-sm:h-[120px] max-lg:h-[150px] lg:max-h-[280px] lg:max-w-[280px] max-sm:w-[40%] rounded-lg border-3 flex items-center flex-col justify-center ${item.border}  overflow-hidden ${item.bg} dark:bg-[#3a3636]`}
                        >
                          <svg
                            className={` absolute top-2 dark:bg-[#3a3636]  ${item.bg}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="152 60 200 200"
                          >
                            <defs>
                              <filter
                                id="filter0_d_31_943"
                                x="92"
                                y="0"
                                width="76"
                                height="76"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                              >
                                <feFlood
                                  floodOpacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="4" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_31_943"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_31_943"
                                  result="shape"
                                />
                              </filter>
                            </defs>

                            <ellipse
                              cx="253.295"
                              cy="209.755"
                              rx="107"
                              ry="94.042"
                              fill={
                                theme === "dark" ? "#E9F3FF1A" : item.circle
                              }
                              style={{ strokeWidth: 1 }}
                            />

                            <g className="rectn">
                              <rect
                                x="100"
                                y="6"
                                width="60"
                                height="60"
                                rx="30"
                                fill={item.incircle}
                              />

                              <g transform="translate(92,0)">
                                {Icon && <Icon />}
                              </g>
                            </g>
                          </svg>

                          <p className="absolute bottom-8 z-40 font-semibold max-sm:left-7 max-sm:bottom-3 lg:text-xl max-md:text-sm max-md:text-center max-md:right-7  ">
                            {item.title}
                          </p>

                          {/* 
                    <Link
                      href={{
                        pathname: "/concept",
                        query: {
                          category: item.category,
                          subject: item.subject,
                        },
                      }}
                    ></Link> */}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* controls */}
                <button
                  onClick={scrollPrev}
                  disabled={!canPrev}
                  className={` max-sm:hidden absolute -left-2 top-34 -translate-y-1/2 p-3 rounded-full 
    ${canPrev ? "bg-white text-[#007076]" : "bg-white text-[#007076] opacity-80"}`}
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!canNext}
                  className={`  max-sm:hidden absolute -right-2 top-34 -translate-y-1/2 p-3 rounded-full 
    ${canNext ? "bg-white text-[#007076]" : "bg-white text-[#007076] opacity-80"}`}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

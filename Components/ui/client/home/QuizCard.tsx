"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";

export default function QuizCard() {
  const Tier1: any = [
    {
      image: "/ui/client/home/quiz/math.svg",
      title: "Quantitative Aptitude",
    },
   
    {
      image: "/ui/client/home/quiz/reasoning.svg",
      title: "Reasoning & GI",
    },
    {
      image: "/ui/client/home/quiz/english.svg",
      title: "English Comprehension",
    },
    {
      image: "/ui/client/home/quiz/reasoning.svg",
      title: "General Awareness",
    },
  ];

  const Tier2:any = [
     {
      image: "/ui/client/home/quiz/math.svg",
      title: "Quantitative Aptitude",
    },
   
    {
      image: "/ui/client/home/quiz/reasoning.svg",
      title: "Reasoning & GI",
    },
    {
      image: "/ui/client/home/quiz/english.svg",
      title: "English Comprehension",
    },
    {
      image: "/ui/client/home/quiz/reasoning.svg",
      title: "General Awareness",
    },
     {
      image: "/ui/client/home/quiz/computer.svg",
      title: "Computer Knowledge",
    },
     {
      image: "/ui/client/home/quiz/data.svg",
      title: "Data Entry Speed Test",
    },
  ]

  const [tierChange, setTierChange] = useState<"for-tier1" | "for-tier2">(
    "for-tier1"
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
      <div className="bg-[image:var(--color-my-gradient)]">
        <div className="max-w-[1400px] pt-8 flex flex-col mx-auto border-2 w-[90%]">
          {/* heading */}

          <header className="flex flex-row justify-between items-center p-4">
            <div className="w-[60%]">
              <p className="text-2xl font-bold dark:text-white">
                Dive Into Live Quizzes Now
              </p>
              <p className="text-sm text-my-text-color max-sm:hidden">
                Test Your Skills in Real-Time with Subject-Wise Live Quizzes for
                SSC CGL!
              </p>
            </div>
            {/* buttons */}
            <div className="w-[22%]   flex flex-row justify-between gap-2">
              <button
                onClick={() => {
                  setTierChange("for-tier1");
                }}
                className={`px-4 py-1.5 border-2 rounded-full text-sm ${tierChange === "for-tier1" ? "bg-[#FFE332] border-[#FFE332]" : "border-2 border-black dark:text-white dark:border-white "}`}
              >
                For Tier 1
              </button>
              <button
                onClick={() => {
                  setTierChange("for-tier2");
                }}
                className={`px-4 py-1.5 border-2 rounded-full text-sm ${tierChange === "for-tier2" ? "bg-[#FFE332] border-[#FFE332]" : "border-2 border-black dark:text-white dark:border-white"}`}
              >
                For Tier 2
              </button>
            </div>
          </header>

          {/* main boady */}
          <main className="border-2  ">
            {tierChange === "for-tier1" ? (
              <div className="   flex flex-row justify-between py-12 ">
                {/* cards */}

                {Tier1.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="w-[25%] px-2   rounded-t-lg rounded-b-lg max-h-[280px] max-w-[280px]"
                  >
                    {/* top */}
                    <div className="flex flex-col justify-center items-center py-6 bg-[#F1F7F7] rounded-t-lg">
                      <div className="-mt-12">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={60}
                          height={60}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-bold pt-3">{item.title}</p>
                      </div>
                    </div>

                    {/* middle */}
                    <div className="flex flex-row justify-between py-3 w-full px-2 bg-white  ">
                      <div className="w-[30%]">
                        <p className="text-sm">Questions</p>
                        <p className="text-sm font-bold">1000+</p>
                      </div>

                      <div className="w-[35%]">
                        <div className="flex flex-row gap-1 justify-end">
                          <MdOutlineEventNote className="my-auto" />
                          <p className="text-sm">Updated</p>
                        </div>
                        <p className="text-sm text-end font-bold">
                          {new Date().getFullYear()}
                        </p>
                      </div>
                    </div>

                    {/* bottom */}
                    <div className="w-full bg-[#007076] py-4 rounded-b-lg">
                      <p className="text-center text-white">Start Quiz</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="  relative">
                <div className="overflow-hidden  py-12" ref={emblaRef}>
                  {/* track */}
                  <div className="flex">
                    {Tier2.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="w-[25%] flex-shrink-0 px-2" // 3 cards visible
                      >
                        <div className="bg-white rounded-t-lg rounded-b-lg max-h-[280px]">
                          {/* top */}
                          <div className="flex flex-col justify-center items-center py-6 bg-[#F1F7F7] rounded-t-lg">
                            <div className="-mt-12">
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={60}
                                height={60}
                              />
                            </div>
                            <p className="text-lg font-bold pt-3">
                              {item.title}
                            </p>
                          </div>

                          {/* middle */}
                          <div className="flex flex-row justify-between py-3 w-full px-2 bg-white">
                            <div className="w-[30%]">
                              <p className="text-sm">Questions</p>
                              <p className="text-sm font-bold">1000+</p>
                            </div>
                            <div className="w-[35%]">
                              <div className="flex flex-row gap-1 justify-end">
                                <MdOutlineEventNote className="my-auto" />
                                <p className="text-sm">Updated</p>
                              </div>
                              <p className="text-sm text-end font-bold">
                                {new Date().getFullYear()}
                              </p>
                            </div>
                          </div>

                          {/* bottom */}
                          <div className="w-full bg-[#007076] py-4 rounded-b-lg">
                            <p className="text-center text-white">Start Quiz</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* controls */}
                <button
                  onClick={scrollPrev}
                  disabled={!canPrev}
                 className={`absolute -left-2 top-34 -translate-y-1/2 p-3 rounded-full 
    ${canPrev ? "bg-white text-[#007076]" : "bg-white text-[#007076] opacity-80"}`}
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!canNext}
                  className={`absolute -right-2 top-34 -translate-y-1/2 p-3 rounded-full 
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

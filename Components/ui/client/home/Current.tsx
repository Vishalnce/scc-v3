"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SlCalender } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";

type CurrentAffair = {
  title: string;
  slug: string;
  topic: string;
  image: string;
  alt: string;
  summary: string;
  keywords: string;
  description: string;
  editorHtml: string;
  toc: string;
  timeToRead: string;
  createdAt: string;
};

export default function Current() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    align: "start",
  });

  const [affairs, setAffairs] = useState<CurrentAffair[]>([]);
  const [loading, setLoading] = useState(true);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Fetch from backend API
  useEffect(() => {
    const fetchAffairs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affairs/client`);
        if (!res.ok) throw new Error("Failed to fetch current affairs");
        const data = await res.json();

        setAffairs(data.posts); // ✅ adjust based on API shape
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAffairs();
  }, []);

  // Update button states when carousel changes
  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const colorObject = [
    {
      border: "border-[#87D5E2]",
      bg: "bg-[#F8FBFF]",
      tagbg: "bg-[#E9F3FF]",
      bgButton: "bg-[#24B3CB]",
    },

    {
      border: "border-[#93E4A6]",
      bg: "bg-[#F6FFF3]",
      tagbg: "bg-[#EBFFE4]",
      bgButton: "bg-[#11C352]",
    },

    {
      border: "border-[#E6C69C]",
      bg: "bg-[#FFFDFA]",
      tagbg: "bg-[#FFF1DF]",
      bgButton: "bg-[#F89716]",
    },
  ];

  return (
    <div className="">
      <div className="max-w-[1400px]  md:pt-8 flex flex-col mx-auto  w-[90%]  relative">
        {/* heading */}
        <header className="flex flex-row justify-between items-center  ">
          <div className="w-[60%] space-y-2">
            <p className="text-4xl font-bold dark:text-white max-sm:text-2xl">
              Current Affairs
            </p>
            <p className="text-lg text-my-text-color max-sm:hidden">
              Stay updated with the latest news and events
            </p>
          </div>

          <div>
            <Link href={"/current-affairs"}>
              <p className="p-2 px-6 text-lg max-sm:text-sm  text-[#007076] rounded-full  underline">
                View All
              </p>
            </Link>
          </div>
        </header>

        {/* main body */}
        <div
          className="overflow-hidden my-2 md:my-16 dark:bg-black pb-6   "
          ref={emblaRef}
        >
          <div className="flex">
            {loading ? (
              // ✅ Skeleton Loading
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-[33.333%] max-sm:min-w-[90%] px-2 max-sm:pr-8"
                >
                  <div className="border-2 px-6 py-4 flex flex-col animate-pulse">
                    {/* image */}
                    <div className="w-full h-48 bg-gray-300 rounded-xl"></div>

                    {/* title */}
                    <div className="h-6 bg-gray-300 rounded mt-4 w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded mt-2 w-1/2"></div>

                    {/* tag */}
                    <div className="h-6 bg-gray-300 rounded-full mt-4 w-24"></div>

                    {/* divider */}
                    <div className="h-[1px] bg-gray-300 my-4"></div>

                    {/* summary */}
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>

                    {/* date + time */}
                    <div className="flex justify-between mt-4">
                      <div className="h-8 bg-gray-300 rounded-full w-28"></div>
                      <div className="h-8 bg-gray-300 rounded-full w-28"></div>
                    </div>

                    {/* button */}
                    <div className="h-12 bg-gray-300 rounded-xl mt-4"></div>
                  </div>
                </div>
              ))
            ) : affairs.length === 0 ? (
              // ✅ Empty state
              <p className="p-4 text-gray-500">No current affairs available</p>
            ) : (
              // ✅ Actual Data
              affairs.map((item, index) => {
                const color = colorObject[index % colorObject.length];

                return (
                  <Link
                    href={`/current-affairs-page/${item.slug}`}
                    className="min-w-[33.333%] max-sm:min-w-[90%] px-2 max-sm:pr-3 "
                    key={index}
                  >
                    <div
                      className={`border-2 px-6 max-md:px-3 py-4 flex flex-col transition-all duration-300  ${color.border} ${color.bg} rounded-xl`}
                    >
                      {/* image */}
                      <div className="w-full h-48 relative ">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          className="object-cover rounded-t-2xl"
                        />
                      </div>

                      {/* heading */}
                      <p className="text-lg sm:text-xl font-semibold py-3 sm:py-4 leading-snug  max-md:min-h-[100px] overflow-hidden">
                        {item.title}
                      </p>

                      {/* tag */}
                      <div>
                        <p
                          className={`text-lg py-1 px-4 rounded-full inline-flex whitespace-nowrap max-md:text-sm ${color.tagbg}`}
                        >
                          {item.topic}
                        </p>
                      </div>

                      {/* divider */}
                      <span
                        className={`border mt-3 mb-4 ${color.border}`}
                      ></span>

                      {/* summary */}
                      <p className="line-clamp-2 max-md:line-clamp-3 max-md:text-sm text-lg text-[#6F6F6F]">
                        {item.summary}
                      </p>

                      {/* date & time */}
                      <div className="flex justify-between py-2">
                        <div
                          className={`flex items-center gap-2 rounded-3xl px-4 py-2 ${color.tagbg} whitespace-nowrap`}
                        >
                          <SlCalender />
                          <p className="max-md:text-xs">
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>

                        <div
                          className={`flex items-center gap-2 rounded-3xl px-4 py-2 ${color.tagbg} whitespace-nowrap`}
                        >
                          <CiClock2 className="size-5" />
                          <p className="max-md:text-xs whitespace-nowrap">
                            {item.timeToRead} min read
                          </p>
                        </div>
                      </div>
                      {/* button */}
                      <button
                        className={`my-2 text-xl rounded-xl md:py-4 py-2 text-white ${color.bgButton}`}
                      >
                        Read More
                      </button>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* controls */}
        <button
          onClick={scrollPrev}
          disabled={!canPrev}
          className={`max-sm:hidden  absolute -left-3 top-10/25 -translate-y-1/2  
          ${canPrev ? "bg-white p-3 text-2xl max-sm:p-2 max-sm:text-xl rounded-full text-[#007076]" : "bg-white p-3 text-2xl max-sm:p-2 max-sm:text-xl rounded-full text-[#007076] cursor-not-allowed opacity-50"}`}
        >
          <IoIosArrowBack />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canNext}
          className={`max-sm:hidden  absolute right-2 top-10/25  -translate-y-1/2  
          ${canNext ? "bg-white p-3 text-2xl max-sm:p-2 max-sm:text-xl rounded-full text-[#007076]" : "bg-white p-3 text-2xl max-sm:p-2 max-sm:text-xl rounded-full text-[#007076] cursor-not-allowed opacity-50"}`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}


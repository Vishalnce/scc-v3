"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
        const res = await fetch("/api/en/current-affaris/client");
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
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <div className="bg-[image:var(--color-my-gradient)]">
      <div className="max-w-[1400px] pt-8 flex flex-col mx-auto  w-[90%]  relative">
        {/* heading */}
        <header className="flex flex-row justify-between items-center  ">
          <div className="w-[60%] space-y-2">
            <p className="text-4xl font-bold dark:text-white max-sm:text-2xl">
              Check out the Latest Current Affairs
            </p>
            <p className="text-lg text-my-text-color max-sm:hidden">
              Boost Your General Awareness with Daily Updated Current Affairs
              for SSC CGL Success!
            </p>
          </div>

         
          
          <div>
            <Link href={"/current-affaris"}>
                 <button className="p-2 px-6 text-lg max-sm:text-sm bg-[#007076] text-white rounded-full ">
              View All
            </button>
            
            </Link>
       
          </div>
        </header>

        {/* main body */}
        <div
          className="overflow-hidden  my-16 dark:bg-black pb-6 border-2  text-fade-right"
          ref={emblaRef}
        >
          <div className="flex">
            {loading ? (
              <p className="p-4">Loading...</p>
            ) : affairs.length === 0 ? (
              <p className="p-4">No current affairs available</p>
            ) : (
              affairs.map((item, index) => (
                <Link
                href={`/current-affaris-page/${item.slug}`}
                  className="min-w-[33.333%] max-sm:min-w-[90%] px-2 max-sm:pr-8 "
                  key={index}
                >
                  {/* iimage */}

                  <div className="w-full h-48 relative shadow-2xl">
                    {" "}
                    {/* parent is relative */}
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill // makes it absolute inside parent
                      className="object-cover rounded-t-2xl"
                    />
                  </div>

                  {/* boady */}

                  <div className="flex flex-col rounded-b-2xl shadow-2xl items-stretch px-2 min-h-70 sm:min-h-80  ">
                    <div className="flex flex-row justify-between items-center py-2 pt-4 ">
                      <div className="text-sm p-2 rounded-full bg-[#FFE332]">
                        Updated
                      </div>
                      <div className="dark:text-white">
                        {item.createdAt.slice(0, 10)}
                      </div>
                    </div>

                    <div>
                      <p className="font-bold py-2 dark:text-white sm:min-h-22 min-h-24">
                        {item.title}
                      </p>
                    </div>
                    <div className="text-fade dark:text-white line-clamp-3 sm:line-clamp-5">
                      {item.summary}
                    </div>

                    <div className="py-2">
                      <p className="dark:text-white">Read more</p>
                    </div>
                  </div>
                </Link>
              ))
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

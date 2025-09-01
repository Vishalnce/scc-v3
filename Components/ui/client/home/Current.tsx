"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

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
        console.log(data.posts);
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
      <div className="max-w-[1400px] mt-10 flex flex-col mx-auto border-2 w-[90%]  relative">
        {/* heading */}
        <header className="flex flex-row justify-between items-center border-2 p-4">
          <div className="w-[60%]">
            <p className="text-2xl font-bold dark:text-white">
              Check out the Latest Current Affairs
            </p>
            <p className="text-sm text-my-text-color max-sm:hidden">
              Boost Your General Awareness with Daily Updated Current Affairs
              for SSC CGL Success!
            </p>
          </div>
          <div>
            <button className="p-2 px-3 bg-[#007076] text-white rounded-full text-sm">
              View All
            </button>
          </div>
        </header>

        {/* main body */}
        <div className="overflow-hidden border-2 my-12" ref={emblaRef}>
          <div className="flex">
            {loading ? (
              <p className="p-4">Loading...</p>
            ) : affairs.length === 0 ? (
              <p className="p-4">No current affairs available</p>
            ) : (
              affairs.map((item, index) => (
                <div className="min-w-[33.333%] px-2 border-2" key={index}>
                  {/* iimage */}

                  <div className="w-full h-48 relative">
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

                  <div className="flex flex-col ">
                    <div className="flex flex-row justify-between items-center py-2 ">
                      <div className="text-sm p-2 rounded-full bg-[#FFE332]">
                      Updated  
                      </div>
                      <div>
                        {item.createdAt.slice(0, 10)}
                        </div>
                    </div>

                    <div>
                    <p className="font-bold py-2">{item.title}</p>  
                    </div>
                    <div className="text-fade">
                    {item.summary.slice(0, 150)}...  
                  
                    </div>

                    <div className="py-2">
                      <p>Read more</p>
                    </div>


                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* controls */}
        <button
          onClick={scrollPrev}
          disabled={!canPrev}
          className={`px-4 py-2 absolute left-2 top-1/2 -translate-y-1/2 rounded-lg 
          ${canPrev ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-50"}`}
        >
          Prev
        </button>
        <button
          onClick={scrollNext}
          disabled={!canNext}
          className={`px-4 py-2 absolute right-2 top-1/2 -translate-y-1/2 rounded-lg 
          ${canNext ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-50"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

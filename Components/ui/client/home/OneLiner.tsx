"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiCircleBold } from "react-icons/pi";
import Link from "next/link";

type Item = {
  id: number;
  content: string;
  createdAt: string;
};

export default function OneLiner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    align: "start",
  });

  const [items, setItems] = useState<Item[]>([]);
  const [canNext, setCanNext] = useState(false);
  const [loading, setLoading] = useState(true);

  // fetch data
  useEffect(() => {
    const fetchOneLiner = async () => {
      try {
        const res = await fetch("/api/en/one-liner/client/?limit=10");

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setItems(data.contents || []);
      } catch (err) {
        console.error("one liner fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOneLiner();
  }, []);

  // update arrow button
  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setCanNext(emblaApi.canScrollNext());
    };

    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });

    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `Updated on ${day}${getOrdinal(day)}, ${month}`;
  }

  return (
    <div className="bg-white dark:bg-black">
      <div className="max-w-[1400px] pt-12 flex flex-col mx-auto w-[90%] relative">
        {/* heading */}
        <header className="flex justify-between py-4 ">
          <p className="text-3xl max-sm:text-2xl font-bold dark:text-white">
            One-Liner Current Affairs
          </p>

         <Link href={"/current-affaris"}>
              <p className="p-2 px-6 text-lg max-sm:text-sm  text-[#007076] rounded-full  underline">
                View All
              </p>
            </Link>
        </header>

        {/* carousel */}
        <div className="overflow-hidden mt-6" ref={emblaRef}>
          <div className="flex gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className="min-w-[40.333%] max-sm:min-w-[85%] pt-4  px-2 border-2 rounded-xl bg-[#F8FAFC] border-[#DADADA] flex flex-row gap-4 "
                >
                  <div className="flex gap-3 items-start">
                    <span className="font-semibold text-3xl text-white bg-[#007076] px-2 py-2 rounded-xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="">
                    {" "}
                    <p className=" font-medium md:text-lg line-clamp-2">{item.content}</p>
                    <p className="text-[#6F6F6F] max-md:text-sm mt-2 mb-4">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* right scroll button */}
        <button
          onClick={scrollNext}
          disabled={!canNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow text-[#007076] text-xl
          ${!canNext ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}

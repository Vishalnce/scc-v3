"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Card1 from "./HeroCard/Card1";
import Card2 from "./HeroCard/Card2";
import Card3 from "./HeroCard/Card3";
import Card4 from "./HeroCard/Card4";

export default function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  return (
    <div className="w-full bg-white dark:bg-[#1F1F1F]">
      <div
        className="overflow-hidden px-4 md:px-6 py-4"
        ref={emblaRef}
      >
        <div className="flex items-stretch">
          
          <div className="flex-none w-full md:w-[80%] px-2">
            <div className=" sm:h-[300px] md:h-[380px] lg:h-[400px]">
              <Card4 />
            </div>
          </div>

          <div className="flex-none w-full md:w-[80%] px-2">
            <div className=" sm:h-[300px] md:h-[380px] lg:h-[400px]">
              <Card1 />
            </div>
          </div>

          <div className="flex-none w-full md:w-[80%] px-2">
            <div className=" sm:h-[300px] md:h-[380px] lg:h-[400px]">
              <Card3 />
            </div>
          </div>

          <div className="flex-none w-full md:w-[80%] px-2">
            <div className=" sm:h-[300px] md:h-[380px] lg:h-[400px]">
              <Card2 />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
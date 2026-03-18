"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import SmallNav from "../../../layout/Nav/SmallNav";
import Card1 from "./HeroCard/Card1";
import Card3 from "./HeroCard/Card3";
import Card2 from "./HeroCard/Card2";
import Card4 from "./HeroCard/Card4";

export default function HeroCarousel() {
  const slides = [1, 2, 3];

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center" },
    // [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  return (
    <div className="w-full  bg-white">
      <div></div>

      <div className="overflow-hidden md:px-6 px-4 my-4 py-4 " ref={emblaRef}>
        <div className="flex ">
          <div className="flex-none w-[100%]  md:w-[80%] px-2 ">
            <Card1 />
          </div>

          <div className="flex-none w-[100%] md:w-[80%]  px-2 ">
            <Card2 />
          </div>

          <div className="flex-none w-[100%] md:w-[80%] px-2">
            <Card3 />
          </div>

          <div className="flex-none w-[100%] md:w-[80%] px-2 ">
            <Card4 />
          </div>
        </div>

        {/* container
        <div className="flex">

          {slides.map((slide) => (
            <div key={slide} className="flex-none w-[80%] px-8 ">

              <div className="h-[40vh] bg-gray-100 rounded-xl shadow flex items-center justify-center text-3xl font-bold">
                Card {slide}
              </div>

            </div>
          ))}

        </div> */}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import SmallNav from "./SmallNav";
import Card1 from "./HeroCard/Card1";
import Card3 from "./HeroCard/Card3";
import Card2 from "./HeroCard/Card2";

export default function HeroCarousel() {

  const slides = [1, 2, 3];

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  
  );

  return (
    <div className="w-full  bg-white">
      
      <div>
        <SmallNav/>
      </div>

      <div className="overflow-hidden px-6" ref={emblaRef}>


        <div className="flex">
          <Card1/>
          <Card2/>
          <Card3/>

          


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
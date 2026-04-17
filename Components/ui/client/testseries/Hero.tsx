import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <>
  
        <div className="bg-gradient-to-r from-[#289AA2] to-[#8CD6DB] rounded-2xl shadow pb-5 relative  md:min-h-[380px] ">
          {/* main div */}

          <div className="flex flex-row items-center justify-center max-md:justify-start md:pt-10 pt-6 md:px-6 px-3">
            {/* text */}
            <div className=" flex flex-col  justify-between items-start md:gap-6 w-[60%] max-md:w-[75%]   ">
              <p className="text-4xl max-md:text-lg text-white font-montserrat font-semibold max-md:hidden block">
               Conquer SSC CGL with Our Power-Packed Test Series
              </p>

              <p className="max-md:block hidden text-white font-montserrat font-semibold ">Power-Packed Test series </p>

              <p className="text-white font-medium text-xl max-md:text-sm max-md:pt-2 max-md:leading-4 max-md:hidden block">
                Sharpen Your Skills and Track Your Progress with Realistic Mock Tests Designed for SSC CGL Excellence
              </p>

              <p className="max-md:block hidden max-md:text-sm text-white">Crack SSC CGL Tier 1 & Tier 2 with Exam-Level Mock Tests. </p>

              <div className="flex flex-row max-md:items-center max-md:justify-between gap-2  w-full max-md:w-[90%]   pt-4">
                <button className="md:mt-6  bg-[#FFFFFFCC] md:text-xl md:px-14 px-2 py-2 rounded-2xl font-semibold max-sm:text-sm whitespace-nowrap">
                  <p className=" max-md:px-2 max-md:text-xs">Mock Test</p>
                </button>

                <button className="md:mt-6 bg-[#FFFFFFCC] md:text-xl md:px-12 py-2 rounded-2xl font-semibold max-md:px-2  max-sm:text-sm whitespace-nowrap">
                  <p className=" max-md:px-2 max-md:text-xs">Test Series</p>
                </button>
              </div>
            </div>

            {/* image */}
            <div className="w-[30%] max-md:w-[28%] max-md:absolute right-2 bottom-8">
              <Image
                src="/ui/client/test-series/boy-hero.png"
                width={300}
                height={300}
                alt="hero"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
   
    </>
  );
}

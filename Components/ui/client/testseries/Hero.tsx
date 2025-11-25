import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <>
      <div className="bg-white dark:bg-[#313131]">
        <div className="max-w-[1400px] mx-auto   flex flex-row justify-between">
          {/* text */}
          <div className="w-[50%] max-md:w-[90%] max-md:mx-auto flex flex-col items-center justify-center max-sm:mb-8  sm:my-14   max-sm:mt-4">
            <p className="text-5xl max-sm:text-2xl font-bold font-montserrat py-2 dark:text-white">
              Conquer <span className="text-[#007076] ">SSC CGL </span>with Our
              Power-Packed Test Series
            </p>
            <p className="text-my-text-color  text-lg py-2 max-sm:text-sm">
              Sharpen Your Skills and Track Your Progress with Realistic Mock
              Tests Designed for SSC CGL Excellence
            </p>

            <div className="self-start max-sm:flex flex-row space-x-6 py-2  max-sm:w-full  justify-center">
              <Link href="/">
                <button className="border-2 px-4 py-2 max-sm:text-xs rounded-full dark:border-white dark:text-white  ">
                  Free Mock Test
                </button>
              </Link>
              <Link href="/">
                <button className=" px-4 py-2 rounded-full max-sm:text-xs border-2 border-[#007076]  bg-[#007076] text-white">
                  Join Test Series
                </button>
              </Link>
            </div>
          </div>

          {/* image */}

          <div className="w-[40%]  mask-l-from-10% mask-l-to-100% max-md:hidden   max-lg:my-14">
            <Image
              src="/ui/client/test-series/trophy.png"
              alt="Trophy"
              width={527}
              height={440}
              className=" object-contain h-auto w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
export default function Hero() {
  const [smallBanner, setSmallBanner] = useState<boolean>(false);
  return (
    <>
      <div className="bg-[image:var(--color-my-gradient)]">
        {/* samll banner */}

        <div
          className={`relative bg-[#2CBB01] max-sm:gap-4 flex items-center justify-center py-2 px-4 ${smallBanner ? "hidden" : ""} }`}
        >
          {/* Center text content */}
          <div className="flex flex-row items-center sm:gap-2 gap-3  ">
            <p className="text-center text-[#FFFFFF] text-sm max-sm:text-[12px] ">
             Only Exclusive SSC CGL Test Series
            </p>
            <p className="p-1 px-2 bg-[#FFE332] rounded-full text-xs max-sm:text-[10px] max-sm:hidden  max-sm:text-center">
              Coming soon
            </p>
            <Link href={"/"}>
            <MdArrowOutward className=" rounded-2xl  bg-[#FFE332] size-6 text-white sm:hidden" />
            </Link>
                 
          </div>

          {/* Close button on right */}
          <button
            className="sm:absolute right-1"
            onClick={() => setSmallBanner(true)}
          >
            <IoClose className="text-white text-lg" />
       
          </button>
        </div>

        <div className="max-w-[1400px] flex flex-col  mx-auto">
          {/* main banner */}

          <div className="flex flex-row justify-between   py-6 sm:py-8 w-[90%] mx-auto max-md:flex-col ">
            {/* text section */}
            <div className="flex flex-col  w-[55%] items-start gap-2 max-sm:w-full  ">
              <div className="  max-sm:w-full">
                <p className="bg-[#FFE332] rounded-full p-2 text-sm py-2  max-sm:text-center">
                  New Quizzes and Current Affairs!
                </p>
              </div>

              <h1 className="text-4xl font-montserrat max-sm:text-2xl font-bold dark:text-[#FFFFFF] pt-2  leading-snug">
                Crack  <span className="text-[#007076]">SSC CGL</span> Secure Dream Government Career!
              </h1>
              <p className="text-my-text-color py-2 max-sm:text-sm">
                Empower Your Prep with Top-Notch Study Materials, Mock Tests,
                Quizzes and Exclusive SSC CGL Updates to help you succeed in
                exam.{" "}
              </p>

              {/* button */}
              <div className="flex flex-row gap-2 py-3 ">
                <Link href={"/"}>
                  <button className="p-2 px-3 border-black border-2 dark:border-white text-sm rounded-full dark:text-white ">
                    {" "}
                    See Current Affairs
                  </button>
                </Link>
                <Link href={"/"}>
                  <button className="p-2 px-6 text-sm text-white rounded-full bg-[#007076]">
                    {" "}
                    Take Quiz
                  </button>
                </Link>
              </div>

              {/* trusted by banner  */}
              <div className="py-4 flex flex-row items-center gap-2">
                <Image
                  src="/ui/client/home/group.png"
                  alt="ssc"
                  width={150}
                  height={150}
                />
                <p className="text-sm text-my-text-color">
                	Trsuted by SSC Aspirants!
                </p>
              </div>
            </div>

            {/* image section */}
            <div className="w-[40%]  max-sm:w-full relative max-sm:py-4 flex items-stretch">
              <div className="relative w-full aspect-[450/477]   max-w-[400px] mx-auto ">
                <Image
                  src="/ui/client/home/girl.png"
                  alt="ssc"
                  fill
                  className="object-contain border-2"
                />
              </div>

              <div className="absolute top-12 -left-12 w-[230px] h-[230px] max-sm:w-[200px] max-sm:-left-8  max-sm:top-4">
                <Image
                  src="/ui/client/home/small.png"
                  alt="ssc"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

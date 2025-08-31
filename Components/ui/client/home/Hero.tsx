"use client";
import React from "react";
import Image from "next/image";
export default function Hero() {
  return (
    <>
      <div className="bg-[image:var(--color-my-gradient)]">
        {/* samll banner */}
        <div className="bg-[#2CBB01] flex flex-row justify-center items-center gap-2 py-2  ">
          <p className="text-center text-[#FFFFFF]  text-sm max-sm:text-[10px] ">
            Exclusive SSC Test Series that Blends Quality with Affordability!
          </p>
          <button className="p-1 px-2 bg-[#FFE332] rounded-full text-xs max-sm:text-[10px] ">
            Coming soon
          </button>
        </div>
        <div className="max-w-[1400px] flex flex-col  mx-auto">
          {/* main banner */}

          <div className="flex flex-row justify-around  border-2 py-6 sm:py-8 w-[90%] mx-auto max-sm:flex-col">
            {/* text section */}
            <div className="flex flex-col border-2 w-[50%] items-start max-sm:w-full ">
              <p className="bg-[#FFE332] rounded-full p-2 text-sm py-2 ">
                New Quizzes and Current Affairs Just Dropped!
              </p>
              <h1 className="text-4xl max-sm:text-3xl font-bold dark:text-[#FFFFFF] py-4">
                Conquer the <span className="text-[#007076]">SSC CGL</span> Exam
                and Secure Your Dream Career!
              </h1>
              <p className="text-my-text-color py-2 max-sm:text-sm">
                Empower Your Prep with Top-Notch Study Materials, Mock Tests,
                Quizzes and Exclusive SSC CGL Updates to help you succeed in
                exam.{" "}
              </p>
              <div className="flex flex-row gap-2 py-3">
                <button className="p-2 px-3 border-black border-2 dark:border-white text-sm rounded-full dark:text-white ">
                  {" "}
                  See Current Affairs
                </button>
                <button className="p-2 px-6 text-sm text-white rounded-full bg-[#007076]">
                  {" "}
                  Take Quiz
                </button>
              </div>
              <div className="py-4 flex flex-row items-center gap-2">
                <Image
                  src="/ui/client/home/group.png"
                  alt="ssc"
                  width={150}
                  height={150}
                />
                <p className="text-sm text-my-text-color">
                  Trusted by over 1,00,000+ students
                </p>
              </div>
            </div>

            {/* image section */}
            <div className="w-[40%]  max-sm:w-full relative max-sm:py-4">
              <div className=" border-2 max-w-[400px] max-h-[450px]">
                <Image
                  src="/ui/client/home/girl.png"
                  alt="ssc"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
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

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

export default function About() {
  return (
    <>
      <div className="bg-[#E6F1F1] dark:bg-[#313131]">
        <div className="mx-auto max-w-[1400px] w-[90%] flex flex-row  py-12 justify-between">
          {/* left card */}

          <div className=" w-[60%]  max-md:w-[90%] max-md:mx-auto flex flex-col items-start  justify-center">
            <p className="font-bold font-montserrat text-4xl max-sm:text-3xl py-4 dark:text-white">
              About SSC CGL Examlife Test Series
            </p>

            <p className="text-lg max-sm:text-sm  text-my-text-color py-2 pb-8 lg:w-[80%] ">
              Transform Your SSC CGL Preparation with Expert-Designed Mock Tests
              and In-Depth Performance Insights to Achieve Your Dream Rank.
            </p>

            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-start gap-4 py-2 items-start  w-full">
                <span className="">
                  <IoMdCheckmark className="text-white bg-[#007076] rounded-full w-7 h-7 p-1" />
                </span>{" "}
                <p className="dark:text-white">
                  <span className="font-bold text-lg"> Real Exam Experience: </span>{" "}
                  Expert-designed mock tests.
                </p>
              </div>

              <div className="flex flex-row justify-start gap-4 py-2 items-start  w-full">
                <span className="">
                  <IoMdCheckmark className="text-white bg-[#007076] rounded-full w-7 h-7 p-1" />
                </span>{" "}
                <p className="dark:text-white">
                  <span className="font-bold  text-lg"> Wide Coverage: </span> Mocks,
                  past papers, & topic-wise tests.
                </p>
              </div>
              <div className="flex flex-row justify-start gap-4 py-2 items-start  w-full">
                <span className="">
                  <IoMdCheckmark className="text-white bg-[#007076] rounded-full w-7 h-7 p-1" />
                </span>{" "}
                <p className="dark:text-white">
                  <span className="font-bold  text-lg"> Performance Analysis: </span>{" "}
                  Track progress & improve.
                </p>
              </div>

              <div className="flex flex-row justify-start gap-4  py-2 items-start  w-full">
                <span className="">
                  <IoMdCheckmark className="text-white bg-[#007076] rounded-full w-7 h-7 p-1" />
                </span>{" "}
                <p className="dark:text-white">
                  <span className="font-bold  text-lg"> Expert-Designed Questions </span>{" "}
                  :Based on the latest SSC CGL trends.
                </p>
              </div>
            </div>

            {/* button  */}

            <div className="self-start max-sm:flex flex-row space-x-6 py-2 border-2 max-sm:w-full max-sm:justify-between">
              <Link href="/">
                <button className="border-2 px-4 py-2  flex-shrink-0 max-sm:text-sm  rounded-full dark:border-white dark:text-white  ">
                  Free Mock Test
                </button>
              </Link>
              <Link href="/">
                <button className=" px-4 py-2 rounded-full max-sm:text-sm flex-shrink-0
 bg-[#007076] text-white">
                  Join Test Series
                </button>
              </Link>
            </div>
          </div>

          {/* right card */}

          <div className="relative w-[40%] max-md:hidden flex justify-center items-center ">
            <Image
              src="/ui/client/test-series/boy.png"
              alt="boy"
              fill
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}

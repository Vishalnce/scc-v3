import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Concept() {
  const session = await getServerSession(NEXT_AUTH);

  return (
    <>
      <div className="bg-[#007076]">
        <div className="w-[90%] mx-auto pt-14 max-sm:pt-10 max-sm:py-18 pb-10 flex flex-row max-sm:flex-col justify-between ">
          {/* left Side */}
          <div className="w-[33%] max-sm:w-[95%] flex flex-col items-start max-sm:pb-8  pt-2 max-sm:justify-between">


            {session?.user?.role === "ADMIN" ? (
              <div className="w-[90%] dark:bg-[#191919] max-md:hidden">
                <Link href="/admin/small-concept ">
                  <button className=" bg-[#FFE332] rounded-full text-center  px-2 py-2">
                    Edit concept
                  </button>
                </Link>
              </div>
            ) : (
              ""
            )}


            <p className="bg-[#FFE332] rounded-full p-2 text-xs py-2 max-md:hidden">
              <span className="px-2 rounded-full bg-[#FFFFFF] mr-2"></span>
              Explore subject wise Concepts in the Section below!
            </p>
            <p className="text-white text-3xl font-bold max-md:text-center max-md:text-2xl py-2  max-md:mx-auto">
              Today’s Concepts for SSC CGL!
            </p>
            <p className="text-[#FFFFFF] text-sm py-2 max-sm:hidden">
              Enhance Your SSC CGL Mastery with Daily Expert-Explained Concepts
              Spanning All Subjects, Tailored for Exam Success!
            </p>
          </div>

          {/* right side */}
          <div className=" border-white bg-white rounded-xl w-[60%] py-2 max-sm:w-full ">
            {/* heading */}

            <div className=" flex flex-row justify-between relative w-[90%]  mx-auto py-2">
              {/* icon */}
              <div className=" absolute -top-10">
                <Image
                  alt="Pin"
                  height={60}
                  width={30}
                  src={"/ui/client/home/pin.png"}
                  className="size-16"
                />
              </div>

              <div className="ml-auto">
                <p className="text-sm text-[#6C6C6C]">
                  General Intelligence & Reasoning
                </p>
              </div>
            </div>

            {/* middle part  */}

            <div className="w-full py-2">
              <p className="text-center text-2xl font-semibold">
                Understanding Syllogism Basics
              </p>
            </div>

            {/* content part  */}

            <div className="w-[90%]  mx-auto py-2">
              <p className="text-[#6C6C6C] text-center">
                Syllogism involves drawing conclusions from two statements,
                e.g., "All dogs are animals" and "Some animals are black" may
                lead to "Some dogs are black." In SSC CGL, it tests logical
                reasoning, requiring you to identify valid conclusions using
                categorical statements (All, Some, No). Practice with simple
                examples to build speed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

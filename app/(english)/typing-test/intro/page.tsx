import React from "react";
import Link from "next/link";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { IoCheckmark } from "react-icons/io5";
import { PiPencilSimple } from "react-icons/pi";
export default async function page() {
  const session = await getServerSession(NEXT_AUTH);
  const features = [
    "Fresh Test Each Time",
    "Custom Test Duration",
    "Exam-Oriented Practice",
    "Level-Based Tests",
  ];

  return (
    <>
      <div className="dark:bg-black ">
        {session?.user?.role === "ADMIN" ? (
          <div className="w-[90%] dark:bg-[#191919] mx-auto m-6 max-md:hidden">
            <Link href="/admin/typing ">
              <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
                Add Typing Test
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className=" w-[90%] mx-auto bg-gradient-to-r from-[#289AA2] to-[#8CD6DB]  relative rounded-2xl shadow lg:pb-6    ">
          <div className="flex flex-row items-start justify-start md:justify-start md:pt-6 py-2  md:px-6 px-3 ">
            {/* text  */}
            <div className="  flex flex-col  justify-between r items-start md:gap-6 max-md:py-4 w-[70%] max-md:w-[85%] md:mt-8  max-md:pr-4  md:py-4  md:pl-12">
              <button className=" px-8 mt-4 bg-[#FFFFFFCC] max-md:text-xs  text-xl md:px-16 py-2 rounded-2xl font-semibold">
                Newly Launched
              </button>
              <p className=" md:text-4xl max-md:text-xl text-white font-montserrat font-semibold">
                {" "}
                <span className="max-md:hidden"> Master the</span> Data Entry
                Speed{" "}
                <span className="max-md:hidden">
                  Test with SSC Examlife
                </span>{" "}
              </p>

              <p className="text-white text-xl max-md:text-sm max-md:pt-2 max-md:leading-4 max-md:w-[90%] ">
                Boost Your Typing Speed and Accuracy with Interactive Practice{" "}
                <span className="max-md:hidden">
                  {" "}
                  to Ace the SSC CGL Data Entry Round.
                </span>
              </p>
            </div>

            {/* image */}

            <div className="w-[25%]  max-md:w-[35%] max-md:absolute right-1 bottom-4">
              <Image
                src="/ui/client/home/Hero/hero1.png"
                width={300}
                height={300}
                alt="hero"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* start card */}

        <div className="w-[90%] my-4 mx-auto bg-white rounded-2xl shadow-lg p-5 md:p-10 ">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#0F766E] p-3 md:p-4 rounded-xl">
              <PiPencilSimple className="text-white text-xl md:text-2xl" />
            </div>

            <div>
              <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
                Typing Speed Test
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Train your fingers for faster typing
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <IoCheckmark className="text-green-600 text-lg" />
                </div>

                <p className="text-gray-700 text-sm md:text-base">{item}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/typing-test/level ">
            <button className="w-full bg-[#0F766E] hover:bg-[#0d5f5b] transition-all text-white py-3 md:py-4 rounded-full text-sm md:text-base font-medium">
              Start Typing
            </button>
          </Link>
        </div>

        {/* <div className="w-[90%] mx-auto flex flex-col  gap-4 py-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center bg-[image:var(--color-my-gradient)] dark:bg-[#313131] rounded-2xl  "
          >
            <div className="py-4 ml-6">
              <p className="font-bold text-xl dark:text-white">Typing Test {index + 1}</p>
            </div>

            <Link href="/typing-test/level " >
              <button className="px-3 py-2  bg-[#007076] rounded-full ml-4 text-white mr-3 cursor-pointer">
                Start Test
              </button>
            </Link>
          </div>
        ))}
      </div> */}
      </div>
    </>
  );
}

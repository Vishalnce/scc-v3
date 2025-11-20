import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Concept() {
  const session = await getServerSession(NEXT_AUTH);

  async function fetchSmallConcept() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/small-concepts/client`
      );
      const data = await res.json();
      // Debugging log
      return data;
    } catch (error) {
      console.log(`error in one liner: ${error}`);
      return { post: [] }; // fallback
    }
  }
  const conceptData = await fetchSmallConcept();
  const item = conceptData?.post?.[0] ?? null;

  return (
    <>
      <div className="bg-[#007076]">
        <div className="w-[90%] max-w-[1400px] mx-auto pt-14 max-sm:pt-10 max-sm:py-18 pb-10 flex flex-row max-sm:flex-col justify-between ">
          {/* left Side */}
          <div className="w-[33%] max-sm:w-[95%] flex flex-col items-start max-sm:pb-8  pt-2 max-sm:justify-between    ">
            <p className="bg-[#FFE332] rounded-full px-6 text-lg py-2 max-md:hidden flex items-center ">
              {/* White circle container */}
              <span className="relative mr-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                {/* Blinking yellow dot centered inside */}
                <span
                  className="w-3 h-3 rounded-full bg-yellow-600 animate-pulse "
                  aria-label="live indicator"
                    style={{ animationDuration: '0.7s' }}
                ></span>
              </span>
              Explore subject wise Concepts!
            </p>

            <p className="text-white text-4xl font-bold max-md:text-center max-md:text-2xl py-2  max-md:mx-auto">
              Today’s Concepts for SSC CGL!
            </p>
            <p className="text-[#FFFFFF] text-lg py-2 max-sm:hidden">
              Enhance Your SSC CGL Mastery with Daily Expert-Explained Concepts
              Spanning All Subjects, Tailored for Exam Success!
            </p>

            {session?.user?.role === "ADMIN" ? (
              <div className="w-[90%]  max-md:hidden">
                <Link href="/admin/small-concepts ">
                  <button className=" bg-[#FFE332] rounded-full text-center  px-6 py-2">
                    Edit concept
                  </button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* right side */}
          {item ? (
            <div className="border-white bg-white rounded-xl w-[60%] py-2 max-sm:w-full ">
              {/* heading */}
              <div className="flex flex-row justify-between relative w-[90%] mx-auto py-2">
                <div className="absolute -top-10">
                  <Image
                    alt="Pin"
                    height={60}
                    width={30}
                    src={"/ui/client/home/pin.png"}
                    className="size-16"
                  />
                </div>
                <div className="ml-auto">
                  <p className="text-sm text-[#6C6C6C]">{item.topic}</p>
                </div>
              </div>

              <div className="w-full py-2">
                <p className="text-center text-2xl font-semibold">
                  {item.title}
                </p>
              </div>

              <div className="w-[90%] mx-auto py-2">
                <p className="text-[#6C6C6C] text-center">{item.content}</p>
              </div>
            </div>
          ) : (
            <div className="border-white bg-white rounded-xl w-[60%] max-sm:w-full py-8 text-center text-gray-500">
              No concept available today.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

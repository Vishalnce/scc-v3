import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoClock } from "react-icons/go";
export default function DataEntry() {
  return (
    <>
      <div className="bg-[#007076]">
        <div className="max-w-[1400px] flex flex-row justify-between items-center mx-auto  w-[90%] py-5">
          {/* time and text */}
          <div className="flex flex-row gap-5 max-sm:gap-2  max-md:w-[95%]">
            <div className="my-auto ">
              <GoClock className="text-white max-sm:size-12 size-16 bg-[#26858A] p-3  rounded-full" />
            </div>
            <div className="my-auto">
              <p className="text-3xl max-sm:text-sm text-white font-bold">
                Explore our new Data Entry Speed Test
              </p>
            </div>
          </div>

          <div className="flex justify-end w-[50%]  ">
            <Link href="/typing-test/intro">
              <button className="bg-[#FFE332] max-lg:py-1.5 max-md:text-xs px-6 py-2 max-sm:px-5 rounded-full text-lg">
                Start Typing
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

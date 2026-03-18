import React from "react";
import { IoLockClosedOutline, IoRocketOutline } from "react-icons/io5";

function ProCard() {
  return (
    <>
      <div className=" mx-auto  w-[90%] max-w-[1400px]  flex rounded-xl flex-col my-4 border-1 pb-4 border-[#DADADA]">
        {/* head */}
        <div className="w-full flex items-center px-8 py-2 bg-[#E6F1F2] rounded-t-xl gap-6 max-md:gap-4">
          {/* icon */}
          <div className="rounded-xl bg-gradient-to-r p-2 sm:p-3 from-[#047077] to-[#2FC6C7] flex items-center justify-center">
            <IoRocketOutline className="text-white size-8 md:size-12" />
          </div>

          {/* text */}
          <div>
            <p className="font-semibold text-xl max-md:text-lg">
              Unlock Smarter Analysis
            </p>
            <p className="text-[#6F6F6F] max-md:text-sm">
              Compare insights with pro analysis
            </p>
          </div>
        </div>
        {/* boady */}

       <div className="flex flex-col px-6 sm:px-8 py-4">

  {/* FREE ITEM */}
  <div className="flex items-start gap-3 my-2">
    <button className="bg-[#E9F3FF] px-3 py-1.5 rounded-3xl whitespace-nowrap shrink-0">
      <p className="text-[#24B3CB] text-xs sm:text-sm font-medium">Free</p>
    </button>

    <p className="text-sm sm:text-lg leading-snug">
      Score, Accuracy & Attempts Summary
    </p>
  </div>

  {/* FREE ITEM */}
  <div className="flex items-start gap-3 my-2">
    <button className="bg-[#E9F3FF] px-3 py-1.5 rounded-3xl whitespace-nowrap shrink-0">
      <p className="text-[#24B3CB] text-xs sm:text-sm font-medium">Free</p>
    </button>

    <p className="text-sm sm:text-lg leading-snug">
      Basic Performance Trend
    </p>
  </div>

  {/* PRO ITEM */}
  <div className="flex items-start gap-3 my-2">
    <button className="bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 py-1.5 rounded-3xl flex items-center gap-1 whitespace-nowrap shrink-0">
      <IoLockClosedOutline className="text-white size-3 sm:size-4" />
      <p className="text-white text-xs sm:text-sm font-medium">Pro</p>
    </button>

    <p className="text-sm sm:text-lg text-[#6F6F6F] leading-snug">
      Topic-wise Strength & Weakness Analysis
    </p>
  </div>

  {/* PRO ITEM */}
  <div className="flex items-start gap-3 my-2">
    <button className="bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 py-1.5 rounded-3xl flex items-center gap-1 whitespace-nowrap shrink-0">
      <IoLockClosedOutline className="text-white size-3 sm:size-4" />
      <p className="text-white text-xs sm:text-sm font-medium">Pro</p>
    </button>

    <p className="text-sm sm:text-lg text-[#6F6F6F] leading-snug">
      Time Wastage & Overthinking Detection
    </p>
  </div>

  {/* PRO ITEM */}
  <div className="flex items-start gap-3 my-2">
    <button className="bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 py-1.5 rounded-3xl flex items-center gap-1 whitespace-nowrap shrink-0">
      <IoLockClosedOutline className="text-white size-3 sm:size-4" />
      <p className="text-white text-xs sm:text-sm font-medium">Pro</p>
    </button>

    <p className="text-sm sm:text-lg text-[#6F6F6F] leading-snug">
      AI Prediction of Common Mistakes
    </p>
  </div>

  {/* PRO ITEM */}
  <div className="flex items-start gap-3 my-2">
    <button className="bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 py-1.5 rounded-3xl flex items-center gap-1 whitespace-nowrap shrink-0">
      <IoLockClosedOutline className="text-white size-3 sm:size-4" />
      <p className="text-white text-xs sm:text-sm font-medium">Pro</p>
    </button>

    <p className="text-sm sm:text-lg text-[#6F6F6F] leading-snug">
      Exam Readiness & Improvement Guidance
    </p>
  </div>

</div>
        {/* button */}
        <div className="px-6">
          <button className="w-full  bg-gradient-to-r p-4 from-[#047077] to-[#2FC6C7] flex fle-col items-center justify-center gap-4 rounded-3xl text-white">
            <IoLockClosedOutline className="text-white size-6 my-auto" />
            Unlock Pro Features
          </button>
        </div>
      </div>
    </>
  );
}

export default ProCard;

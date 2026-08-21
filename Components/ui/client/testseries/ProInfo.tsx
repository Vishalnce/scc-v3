import React from "react";
import { IoLockClosedOutline, IoRocketOutline } from "react-icons/io5";

function ProCard() {
  return (
    <>
      <div
        className="mx-auto w-[90%] max-w-[1400px] flex flex-col rounded-xl
  bg-white dark:bg-[#242424]
  border border-[#DADADA] dark:border-[#3A3A3A]
  overflow-hidden"
      >
        {/* Header */}
        <div
          className="w-full flex items-center px-8 py-2
    bg-[#E6F1F2] dark:bg-[#2D2D2D]
    gap-6 max-md:gap-4"
        >
          {/* Icon */}
          <div className="rounded-xl bg-gradient-to-r p-2 sm:p-3 from-[#047077] to-[#2FC6C7] flex items-center justify-center">
            <IoRocketOutline className="text-white size-8 md:size-12" />
          </div>

          {/* Text */}
          <div>
            <p className="font-semibold text-xl max-md:text-lg dark:text-white">
              Unlock Smarter Analysis
            </p>

            <p className="text-[#6F6F6F] max-md:text-sm dark:text-[#C8C8C8]">
              Compare insights with pro analysis
            </p>
          </div>
        </div>

        {/* Body */}
        <div
          className="flex flex-col px-6 sm:px-8 py-4
    bg-white dark:bg-black"
        >
          {/* FREE ITEM */}
          <div className="flex items-start gap-3 my-2">
            <button className="bg-[#E9F3FF] dark:bg-[#17383D] px-3 py-1.5 rounded-3xl whitespace-nowrap shrink-0">
              <p className="text-[#24B3CB] text-xs sm:text-sm font-medium">
                Free
              </p>
            </button>

            <p className="text-sm sm:text-lg leading-snug dark:text-[#E5E5E5]">
              Score, Accuracy & Attempts Summary
            </p>
          </div>

          {/* FREE ITEM */}
          <div className="flex items-start gap-3 my-2">
            <button className="bg-[#E9F3FF] dark:bg-[#17383D] px-3 py-1.5 rounded-3xl whitespace-nowrap shrink-0">
              <p className="text-[#24B3CB] text-xs sm:text-sm font-medium">
                Free
              </p>
            </button>

            <p className="text-sm sm:text-lg leading-snug dark:text-[#E5E5E5]">
              Basic Performance Trend
            </p>
          </div>

          {/* PRO ITEM */}
          <div className="flex items-start gap-3 my-2">
            <button className="bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 py-1.5 rounded-3xl flex items-center gap-1 whitespace-nowrap shrink-0">
              <IoLockClosedOutline className="text-white size-3 sm:size-4" />
              <p className="text-white text-xs sm:text-sm font-medium">Pro</p>
            </button>

            <p className="text-sm sm:text-lg leading-snug text-[#6F6F6F] dark:text-[#D0D0D0]">
              Topic-wise Strength & Weakness Analysis
            </p>
          </div>

          {/* PRO ITEM */}
          <div className="flex items-start gap-3 my-2">
            <button className="bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 py-1.5 rounded-3xl flex items-center gap-1 whitespace-nowrap shrink-0">
              <IoLockClosedOutline className="text-white size-3 sm:size-4" />
              <p className="text-white text-xs sm:text-sm font-medium">Pro</p>
            </button>

            <p className="text-sm sm:text-lg leading-snug text-[#6F6F6F] dark:text-[#D0D0D0]">
              Time Wastage & Overthinking Detection
            </p>
          </div>

          {/* PRO ITEM */}
          <div className="flex items-start gap-3 my-2">
            <button className="bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 py-1.5 rounded-3xl flex items-center gap-1 whitespace-nowrap shrink-0">
              <IoLockClosedOutline className="text-white size-3 sm:size-4" />
              <p className="text-white text-xs sm:text-sm font-medium">Pro</p>
            </button>

            <p className="text-sm sm:text-lg leading-snug text-[#6F6F6F] dark:text-[#D0D0D0]">
              AI Prediction of Common Mistakes
            </p>
          </div>

          {/* PRO ITEM */}
          <div className="flex items-start gap-3 my-2">
            <button className="bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 py-1.5 rounded-3xl flex items-center gap-1 whitespace-nowrap shrink-0">
              <IoLockClosedOutline className="text-white size-3 sm:size-4" />
              <p className="text-white text-xs sm:text-sm font-medium">Pro</p>
            </button>

            <p className="text-sm sm:text-lg leading-snug text-[#6F6F6F] dark:text-[#D0D0D0]">
              Exam Readiness & Improvement Guidance
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="px-6 pb-8 bg-white dark:bg-black">
          <button
            className="w-full bg-gradient-to-r from-[#047077] to-[#2FC6C7]
      p-4 flex items-center justify-center gap-4 rounded-3xl text-white"
          >
            <IoLockClosedOutline className="text-white size-6" />
            Unlock Pro Features
          </button>
        </div>
      </div>
    </>
  );
}

export default ProCard;

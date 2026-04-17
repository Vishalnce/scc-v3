import Filter from "@/Components/client/typing-test/Filter";
import React from "react";
import { IoCheckmark } from "react-icons/io5";
export default function page() {

const features = [
  "Pick a time limit that suits your practice goals.",
  "Select a difficulty level to match your current typing skills.",
  "Review detailed results with accuracy, WPM, errors, and improvement tips.",
];
  return (
    <>
    <div className="dark:bg-black py-18" >
<div className="w-[90%] py-2 mx-auto shadow-[0_0_9px_rgba(0,0,0,0.2)] dark:bg-[#313131] rounded-2xl">
        {/* headiong */}
        <div className="flex flex-col  items-center my-4">
          <p className="font-bold text-3xl py-2 dark:text-white max-sm:text-center">
            Start Data Entry Typing Test
          </p>
          <p className=" text-my-text-color ">Customize your test settings</p>
        </div>

        {/* selection tools */}

        <Filter />
      </div>
    </div>

    {/* Smart Typing Card */}
       <div className="w-[90%]   shadow-[0_0_9px_rgba(0,0,0,0.2)] mx-auto  rounded-2xl p-5 md:p-10">

      {/* Badge */}
      <div className="mb-4">
        <span className="bg-gray-200 text-gray-700 text-xs md:text-sm px-3 py-1 rounded-full">
          Popular
        </span>
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-2">
          Smart Typing Practice
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl">
          Sharpen Your Skills and Track Your Progress with mock test and test series.
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-4 md:gap-6">
        {features.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            
            {/* Icon */}
            <div className="bg-[#E6F4F1] p-2 rounded-full shrink-0">
              <IoCheckmark className="text-[#0F766E] text-lg" />
            </div>

            {/* Text */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {item}
            </p>

          </div>
        ))}
      </div>

    </div>
      
    </>
  );
}

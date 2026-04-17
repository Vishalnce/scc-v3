import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import { FaRegCheckCircle, FaRegClock, FaRegThumbsUp } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { LuPlay } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";

function Why() {
  return (
    <div className=" mx-auto    flex rounded-xl flex-col shadow-[0_0_9px_rgba(0,0,0,0.2)] md:px-8 py-2">
      <div
        className=" w-full flex  flex-col my-4 
          md:px-8"
      >
        {/* heading */}
        <div className="flex flex-col my-4">
          <p className="font-bold text-2xl">Why Choose Us?</p>
          <p className="text-[#6F6F6F]">Practice with exam-accurate tests, track your progress with detailed analytics</p>
        </div>

        {/* cards */}

        <div className="grid grid-cols-1 max-md:grid-cols-1 gap-1">
     

          <div className="grid grid-cols-1 gap-2">

             {/* Item 0 */}
            <div className="flex flex-row py-2 gap-3 sm:gap-4 items-start sm:items-center">
              <div
                className="bg-[#F3E6FF] rounded-full 
                    p-2 sm:p-3 md:p-4 
                    shrink-0 flex items-center justify-center"
              >
                <TbTargetArrow className="text-[#9F38D6]  max-md:size-10 md:size-8" />
              </div>

              <div>
                <p className="font-bold  text-xl">
                Exam-Aligned Structure
                </p>
                <p className="text-[#6F6F6F] text-base   max-md:text-sm leading-snug">
                 Every Test follows the latest SSC CGL pattern with accurate timing, question distribution, and difficulty level.
                </p>
              </div>
            </div>
            {/* Item 1 */}
            <div className="flex flex-row py-2 gap-3 sm:gap-4 items-start sm:items-center">
              <div
                className="bg-[#EBFFE4] rounded-full 
                    p-2 sm:p-3 md:p-4 
                    shrink-0 flex items-center justify-center"
              >
              <BsGraphUpArrow className="text-[#11C352] max-md:size-10 md:size-8" />
              </div>

              <div>
                <p className="font-bold  text-xl">
                Performance Analytics
                </p>
                <p className="text-[#6F6F6F] text-base   max-md:text-sm leading-snug">
                  Get detailed insights on your strengths, weak areas, and improvement trajectory with every attempt.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-row py-2 gap-3 sm:gap-4 items-start sm:items-center">
              <div
                className="bg-[#FDE9E9] rounded-full 
                    p-2 sm:p-3 md:p-4 
                    shrink-0 flex items-center justify-center"
              >
               <IoIosTimer className="text-[#F14343] size-4  max-md:size-10 md:size-8" />
              </div>

              <div>
                <p className="font-bold  text-xl">
               Time Management Training
                </p>
                <p className="text-[#6F6F6F] text-base    max-md:text-sm leading-snug">
                  Practice under real exam conditions and develop the speed and accuracy needed to crack SSC CGL.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-row py-2 gap-3 sm:gap-4 items-start sm:items-center">
              <div
                className="bg-[#E9F3FF] rounded-full 
                    p-2 sm:p-3 md:p-4 
                    shrink-0 flex items-center justify-center"
              >
               <IoBookOutline className="text-[#24B3CB] size-4   max-md:text-sm max-md:size-10 md:size-8" />
              </div>

              <div>
                <p className="font-bold  text-xl">
          Subject-wise Practice
                </p>
                <p className="text-[#6F6F6F] text-base max-md:text-sm leading-snug">
                  Focus on individual subjects or take full tests. Build concepts first, then test comprehensively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default Why;

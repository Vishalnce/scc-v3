import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

function Choose() {
  return (
    <>
      <div className=" mx-auto    flex rounded-xl flex-col shadow-[0_0_9px_rgba(0,0,0,0.2)] md:px-8 py-2">
        <div
          className=" w-full flex  flex-col my-4 
              md:px-8"
        >
          {/* heading */}
          <div className="flex flex-col my-4">
            <p className="font-bold text-2xl">Choose Your SSC CGL Stage</p>
            <p className="text-[#6F6F6F]">
              Select the test series that matches your current preparation
              level.
            </p>
          </div>

          {/* cards */}

          <div className="  flex flex-row max-md:flex-col justify-between max-md:items-center ">
            {/* card 1 */}
            <div className=" w-[45%] max-md:w-[90%] shadow-[0_0_9px_rgba(0,0,0,0.2)] rounded-2xl">
              {/* heading  */}
              <div className="w-full flex items-center px-8 py-4  rounded-t-xl gap-6 max-md:gap-4 bg-[#E9F3FF]">
                {/* icon */}
                
                <div className="rounded-xl bg-[#24B3CB]   p-2 sm:p-3  flex items-center justify-center">
                  <VscGraph className="text-white size-6 md:size-8" />
                </div>

                <div>
                  <p className="font-semibold text-xl max-md:text-lg">
              Test Series for Tier 1
                  </p>
                  <p className="text-[#6F6F6F] max-md:text-sm">
                  For prelims level
                  </p>
                </div>

              </div>

              
                {/* boady  */}

                <div className=" px-8 py-4  flex flex-col gap-2">
                  <div className=" flex flex-row gap-2">
                    <div className="p-2 bg-[#EBFFE4] rounded-full">
                      <FaCheck className="my-auto text-[#11C352] flex-none " />
                    </div>

                    <p className=" text-[#6F6F6F]">Full-length mock tests </p>
                  </div>

                  <div className=" flex flex-row gap-2">
                    <div className="p-2 bg-[#EBFFE4] rounded-full">
                      <FaCheck className="my-auto text-[#11C352] flex-none " />
                    </div>

                    <p className=" text-[#6F6F6F]">
                    Subject-wise sectional tests
                    </p>
                  </div>

                  <div className=" flex flex-row gap-2">
                    <div className="p-2 bg-[#EBFFE4] rounded-full">
                      <FaCheck className="my-auto text-[#11C352] flex-none " />
                    </div>

                    <p className=" text-[#6F6F6F]">
                     Speed & accuracy focused
                    </p>
                  </div>
                     <div className=" flex flex-row gap-2">
                    <div className="p-2 bg-[#EBFFE4] rounded-full">
                      <FaCheck className="my-auto text-[#11C352] flex-none " />
                    </div>

                    <p className=" text-[#6F6F6F]">
                    Ideal for prelims clearance
                    </p>
                  </div>
                </div>

                {/* button */}

                <div className="w-full  px-8  my-4">

                  <button className="bg-[#24B3CB] text-white py-4 text-center w-full rounded-2xl">
                    Buy Now
                  </button>
                </div>
            </div>

             {/* card 2 */}
            <div className=" w-[45%]  max-md:w-[90%] shadow-[0_0_9px_rgba(0,0,0,0.2)] rounded-2xl">
              {/* heading  */}
              <div className="w-full flex items-center px-8 py-4  rounded-t-xl gap-6 max-md:gap-4 bg-[#F3E6FF]">
                {/* icon */}
                
                <div className="rounded-xl bg-[#9F38D6]   p-2 sm:p-3  flex items-center justify-center">
           <LuCrown className="text-white size-6 md:size-8" />
                </div>

                <div>
                  <p className="font-semibold text-xl max-md:text-lg">
              Test Series for Tier 1
                  </p>
                  <p className="text-[#6F6F6F] max-md:text-sm">
                  For prelims level
                  </p>
                </div>

              </div>

              
                {/* boady  */}

                <div className=" px-8 py-4  flex flex-col gap-2">
                  <div className=" flex flex-row gap-2">
                    <div className="p-2 bg-[#EBFFE4] rounded-full">
                      <FaCheck className="my-auto text-[#11C352] flex-none " />
                    </div>

                    <p className=" text-[#6F6F6F]">Advanced difficulty level </p>
                  </div>

                  <div className=" flex flex-row gap-2">
                    <div className="p-2 bg-[#EBFFE4] rounded-full">
                      <FaCheck className="my-auto text-[#11C352] flex-none " />
                    </div>

                    <p className=" text-[#6F6F6F]">
                    Mains-level paper pattern
                    </p>
                  </div>

                  <div className=" flex flex-row gap-2">
                    <div className="p-2 bg-[#EBFFE4] rounded-full">
                      <FaCheck className="my-auto text-[#11C352] flex-none " />
                    </div>

                    <p className=" text-[#6F6F6F]">
                     High-scoring question focus
                    </p>
                  </div>
                     <div className=" flex flex-row gap-2">
                    <div className="p-2 bg-[#EBFFE4] rounded-full">
                      <FaCheck className="my-auto text-[#11C352] flex-none " />
                    </div>

                    <p className=" text-[#6F6F6F]">
                   Ideal for final selection
                    </p>
                  </div>
                </div>

                {/* button */}

                <div className="w-full  px-8  my-4">

                  <button className="bg-[#9F38D6] text-white py-4 text-center w-full rounded-2xl">
                    Buy Now
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Choose;

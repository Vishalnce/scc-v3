import React from "react";
import { FaCheck } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";

function Conquer() {
  return (
    <>
      <div className="shadow-[0_0_9px_rgba(0,0,0,0.2)] my-5 rounded-2xl">
        {/* head */}

        <div className="w-full flex items-center px-8 py-6  rounded-t-xl gap-6 max-md:gap-4">
          {/* icon */}
          <div className="rounded-xl bg-gradient-to-r p-2 sm:p-3 from-[#047077] to-[#2FC6C7] flex items-center justify-center">
            <GoChecklist className="text-white size-6 md:size-8" />
          </div>

          {/* text */}
          <div>
            <p className="font-semibold text-xl max-md:text-lg">
              Conquer SSC CGL Exam
            </p>
            <p className="text-[#6F6F6F] max-md:text-sm">
              With our mock tests and test series
            </p>
          </div>
        </div>

        {/* boady  */}

        <div className=" px-8   flex flex-col gap-2">
          <div className=" flex flex-row gap-2">
            <div className="p-2 bg-[#EBFFE4] rounded-full">
              <FaCheck className="my-auto text-[#11C352] flex-none " />
            </div>

            <p className=" text-[#6F6F6F]">1000+ Practice Questions </p>
          </div>


           <div className=" flex flex-row gap-2">
            <div className="p-2 bg-[#EBFFE4] rounded-full">
              <FaCheck className="my-auto text-[#11C352] flex-none " />
            </div>

            <p className=" text-[#6F6F6F]">Based on Latest SSC CGL notification </p>
          </div>


           <div className=" flex flex-row gap-2">
            <div className="p-2 bg-[#EBFFE4] rounded-full">
              <FaCheck className="my-auto text-[#11C352] flex-none " />
            </div>

            <p className=" text-[#6F6F6F]">Subject-wise + Full-length mocks</p>
          </div>
        </div>

        {/* button */}
        <div className="px-6 py-6">


          <button className="bg-[#047077] w-full text-center text-white py-2 rounded-full">
Start Typing

          </button>
        </div>
      </div>
    </>
  );
}

export default Conquer;

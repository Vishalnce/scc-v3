import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { IoTrophyOutline } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";

function TestSeriesCard() {
  return (
    <>
      <div className=" mx-auto  w-[90%] max-w-[1400px]  flex rounded-xl flex-col my-4 border-1 border-[#DADADA] px-8">
        {/* new launced */}
        <div className="my-4  ">
          <button className=" bg-[#F4F4FC] rounded-2xl py-2 px-4">
            {" "}
            New Launched
          </button>
        </div>
        {/* heading */}
        <div className="flex flex-col my-4">
          <p className="font-semibold text-xl"> Power-Packed Test Series</p>
          <p className="text-[#6F6F6F]">
            Sharpen Your Skills and Track Your Progress with mock test and test
            series.
          </p>
        </div>

        {/* cards */}

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
          <div className=" flex flex-row py-4 gap-4">
            {/* icon */}
            <div className="bg-[#F3E6FF] rounded-full p-4">
              <GoChecklist className="text-[#9F38D6] size-8" />
            </div>

            {/* headinfg */}
            <div className="my-auto">
              <p className="font-semibold">50+ Test </p>
              <p className="text-[#6F6F6F]"> Full length mocks</p>
            </div>
          </div>



           <div className=" flex flex-row py-4 gap-4">
            {/* icon */}
            <div className="bg-[#EBFFE4] rounded-full p-4">
             <BsGraphUpArrow className="text-[#11C352] size-8" />
            </div>

            {/* headinfg */}
            <div className="my-auto">
              <p className="font-semibold">AI Analytics </p>
              <p className="text-[#6F6F6F]"> Performance insights</p>
            </div>
          </div>



             <div className=" flex flex-row py-4 gap-4">
            {/* icon */}
            <div className="bg-[#FDE9E9] rounded-full p-4">
              <IoTrophyOutline className="text-[#F14343] size-8" />
            </div>

            {/* headinfg */}
            <div className="my-auto">
              <p className="font-semibold">Rank Predictor </p>
              <p className="text-[#6F6F6F]"> Know Your Standing</p>
            </div>
          </div>



             <div className=" flex flex-row py-4 gap-4">
            {/* icon */}
            <div className="bg-[#E9F3FF] rounded-full p-4">
              <TbTargetArrow className="text-[#24B3CB] size-8" />
            </div>

            {/* headinfg */}
            <div className="my-auto">
              <p className="font-semibold">Dual Level Test </p>
              <p className="text-[#6F6F6F]"> Pre + Mains</p>
            </div>
          </div>
          
        </div>

        

        {/* buttons */}

        <div className=" w-full flex flex-row  justify-between text-white">
          <button className=" w-[48%] bg-[#047077] py-3 rounded-xl ">

            Mock Test
          </button>
 
             <button className=" w-[48%] bg-[#047077] py-3 rounded-xl">
Test Series
            
          </button>


        </div>
      </div>
    </>
  );
}

export default TestSeriesCard;

import React from "react";
import { IoLockClosedOutline, IoRocketOutline } from "react-icons/io5";

function ProCard() {
  return (
    <>
      <div className=" mx-auto  w-[90%] max-w-[1400px]  flex rounded-xl flex-col my-4">
        {/* head */}
        <div className=" w-full flex flex-row justify-start  px-8 py-2 bg-[#E6F1F2] rounded-t-xl gap-6">
          {/* icon */}
          <div className="rounded-xl bg-gradient-to-r p-4 from-[#047077] to-[#2FC6C7]">
            <IoRocketOutline className="my-auto size-12 text-white" />{" "}
          </div>

          {/* text */}
          <div className=" my-auto">
            <p className="font-semibold text-xl">Unlock Smarter Analysis </p>
            <p className=" text-[#6F6F6F]">
              Compare insights with pro analysis{" "}
            </p>
          </div>
        </div>

        {/* boady */}

        <div className="flex flex-col px-8  py-4">
          <div className="flex flex-row gap-2 my-2">
            <button className="bg-[#E9F3FF] px-2 py-2 w-[8%] rounded-3xl">
              <p className="text-[#24B3CB] text-lg"> Free</p>
            </button>

            <p className=" my-auto text-xl ">
              {" "}
              Score, Accuracy & Attempts Summary
            </p>
          </div>

          <div className="flex flex-row gap-2 my-2">
            <button className="bg-[#E9F3FF] px-2 py-2 w-[8%] rounded-3xl">
              <p className="text-[#24B3CB] text-lg"> Free</p>
            </button>

            <p className=" my-auto text-xl "> Basic Performance Trend</p>
          </div>

          <div className="flex flex-row gap-2 my-2">
            <button className="bg-gradient-to-r p-4 from-[#047077] to-[#2FC6C7] px-2 py-2 w-[8%] rounded-3xl flex flex-row   justify-center gap-2 ">
              <IoLockClosedOutline className="text-white size-6 my-auto" />
              <p className="text-white text-lg "> Pro</p>
            </button>

            <p className=" my-auto text-xl text-[#6F6F6F]">
              {" "}
              Topic-wise Strength & Weakness Analysis
            </p>
          </div>

          <div className="flex flex-row gap-2 my-2">
            <button className="bg-gradient-to-r p-4 from-[#047077] to-[#2FC6C7] px-2 py-2 w-[8%] rounded-3xl flex flex-row   justify-center gap-2 ">
              <IoLockClosedOutline className="text-white size-6 my-auto" />
              <p className="text-white text-lg "> Pro</p>
            </button>

            <p className=" my-auto text-xl text-[#6F6F6F] ">
              {" "}
              Time Wastage & Overthinking Detection
            </p>
          </div>

          <div className="flex flex-row gap-2 my-2">
            <button className="bg-gradient-to-r p-4 from-[#047077] to-[#2FC6C7] px-2 py-2 w-[8%] rounded-3xl flex flex-row   justify-center gap-2 ">
              <IoLockClosedOutline className="text-white size-6 my-auto" />
              <p className="text-white text-lg "> Pro</p>
            </button>

            <p className=" my-auto text-xl text-[#6F6F6F] ">
              {" "}
              AI Prediction of Common Mistakes
            </p>
          </div>

          <div className="flex flex-row gap-2 my-2">
            <button className="bg-gradient-to-r p-4 from-[#047077] to-[#2FC6C7] px-2 py-2 w-[8%] rounded-3xl flex flex-row   justify-center gap-2 ">
              <IoLockClosedOutline className="text-white size-6 my-auto" />
              <p className="text-white text-lg "> Pro</p>
            </button>

            <p className=" my-auto text-xl  text-[#6F6F6F]">
              {" "}
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

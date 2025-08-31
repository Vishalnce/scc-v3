import Image from "next/image";
import React from "react";

export default function Reason() {
  return (
    <>
      <div className="bg-[#007076]">
        <div className=" w-[90%] border-2 mx-auto py-14 flex flex-row justify-between">
          {/* heading */}
          <div className="w-[30%] flex flex-col items-start">
            <p className="text-white text-3xl font-bold">
              Top 3 Reasons to Prepare with SSC Examlife!
            </p>
            <button className="text-xs p-2 px-4 rounded-full bg-[#FFE332] my-4">
              Join US
            </button>
          </div>
          {/* small cards */}

          <div className="flex flex-row justify-around max-sm:flex-col max-sm:items-center gap-4 py-8 border-2  w-[74%]">
            <div className="bg-[#26858A] border-2 border-white flex flex-col w-[35%] items-center justify-start rounded-2xl p-2 relative max-h-[250px]">
              {/* image */}
              <div className=" absolute -top-10 left-3">
                <Image
                src="/ui/client/home/bulb.png" 
                alt="image"

                width={50}
                height={50}
                className="w-20 h-20 "
                />

              </div>
              {/* boady */}
              <div className="mt-8">
                <p className="text-start pl-2 text-xl text-white">
                Master Skills with Interactive Quizzes{" "}
              </p>
              <div className="space-y-1">
                <div className="space-x-1 flex flex-row pt-3 items-center">
                  <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                  <p className="  text-white">Diverse Question Bank</p>
                </div>
                <div className="space-x-1 flex flex-row  items-center justify-start">
                  <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                  <p className=" text-white">Real-Time Feedback</p>
                </div>
                <div className="space-x-1 flex flex-row  items-center">
                  <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                  <p className="  text-white">Flexible Learning</p>
                </div>
              </div>
              </div>

              
            </div>

             <div className="bg-[#26858A] border-2 border-white flex flex-col w-[35%] items-center justify-start rounded-2xl p-2 relative mt-10 max-h-[250px]">
              {/* image */}
              <div className=" absolute -top-10 left-3">
                <Image
                src="/ui/client/home/bulb.png" 
                alt="image"

                width={50}
                height={50}
                className="w-20 h-20 "
                />

              </div>
              {/* boady */}
              <div className="mt-10">
                <p className="text-start pl-2 text-xl text-white">
                Master Skills with Interactive Quizzes{" "}
              </p>
              <div>
                <div className="space-x-1 flex flex-row pt-3 items-center">
                  <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                  <p className=" py-2 text-white">Diverse Question Bank</p>
                </div>
                <div className="space-x-1 flex flex-row  items-center justify-start">
                  <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                  <p className=" py-2 text-white">Real-Time Feedback</p>
                </div>
                <div className="space-x-1 flex flex-row  items-center">
                  <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                  <p className=" py-2 text-white">Flexible Learning</p>
                </div>
              </div>
              </div>

              
            </div>

              <div className="bg-[#26858A] border-2 border-white flex flex-col w-[35%] items-center justify-start rounded-2xl p-2 relative  max-h-[250px]">
              {/* image */}
              <div className=" absolute -top-10 left-3">
                <Image
                src="/ui/client/home/bulb.png" 
                alt="image"

                width={50}
                height={50}
                className="w-20 h-20 "
                />

              </div>
              {/* boady */}
              <div className="mt-10">
                <p className="text-start pl-2 text-xl text-white">
                Master Skills with Interactive Quizzes{" "}
              </p>
              <div>
                <div className="space-x-1 flex flex-row pt-3 items-center">
                  <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                  <p className=" py-2 text-white">Diverse Question Bank</p>
                </div>
                <div className="space-x-1 flex flex-row  items-center justify-start">
                  <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                  <p className=" py-2 text-white">Real-Time Feedback</p>
                </div>
                <div className="space-x-1 flex flex-row  items-center">
                  <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                  <p className=" py-2 text-white">Flexible Learning</p>
                </div>
              </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

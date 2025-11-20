import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Reason() {
  return (
    <>
      <div className="bg-[#007076]">
        <div className=" w-[90%] max-w-[1400px]  mx-auto pt-8 pb-8 flex flex-row max-sm:flex-col justify-between ">
          {/* heading */}
          <div className="w-[25%] max-sm:w-[95%] flex flex-col max-sm:flex-row items-start max-sm:pt-4 pt-8  max-sm:justify-between">
            <p className="text-white text-4xl font-bold max-sm:w-[70%] max-sm:text-2xl leading-snug">
              Top 3 Reasons to Prepare with SSC Examlife!
            </p>
            <Link href={"/test-series"}>
              <button className=" p-2  text-lg px-6 rounded-full bg-[#FFE332] my-4">
                Join US
              </button>
            </Link>
          </div>
          {/* small cards */}

          <div className="flex flex-row justify-between max-sm:flex-col max-sm:items-center sm:gap-4 py-4  w-[64%]  max-sm:w-[95%]  ">
            <div className="bg-[#26858A] border-2 border-white flex flex-col w-[30%] items-center justify-center rounded-2xl p-2 relative sm:mt-8 mt-2 sm:max-w-[230px] max-sm:w-full max-sm:flex-row">
              {/* image */}
              <div className=" sm:absolute sm:-top-10 sm:left-2">
                <Image
                  src="/ui/client/home/bulb.png"
                  alt="image"
                  width={50}
                  height={50}
                  className="w-20 h-20 "
                />
              </div>
              {/* boady */}
              <div className="sm:mt-8 sm:py-4 py-auto">
                <p className="text-start pl-2 text-xl text-white font-bold ">
                  Master Skills with Interactive Quizzes{" "}
                </p>

                <div className="space-y-1 flex flex-col justify-center items-start max-sm:hidden  pl-2 ">
                  <div className="space-x-1 flex flex-row pt-3 items-center ">
                    <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                    <p className=" text-sm  text-white">
                      Diverse Question Bank
                    </p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center justify-start ">
                    <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                    <p className="text-sm  text-white">Real-Time Feedback</p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center">
                    <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                    <p className="text-sm   text-white">Flexible Learning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#ffffff] border-2 border-white flex flex-col w-[30%] items-center justify-center rounded-2xl p-2 relative lg:max-h-[220px] md:max-h-[250px] sm:max-w-[230px] max-sm:w-full max-sm:mt-4 max-sm:flex-row">
              {/* image */}
              <div className=" sm:absolute sm:-top-10 sm:left-2">
                <Image
                  src="/ui/client/home/globe.png"
                  alt="image"
                  width={50}
                  height={50}
                  className="w-20 h-20 "
                />
              </div>
              {/* boady */}
              <div className="sm:mt-8 sm:py-4 py-auto">
                <p className="text-start pl-2 text-xl font-bold">
                  Stay Ahead with Daily Updates
                </p>

                <div className="space-y-1 flex flex-col justify-center items-start max-sm:hidden pl-2 ">
                  <div className="space-x-1 flex flex-row pt-3 items-center ">
                    <span className="inline-block w-4 h-4 border-3 border-black rounded-full mr-2"></span>
                    <p className=" text-sm  ">Renewed every 24 hours.</p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center justify-start ">
                    <span className="inline-block w-4 h-4 border-3 border-black rounded-full mr-2"></span>
                    <p className=" text-sm ">Exam-Relevant Topics</p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center">
                    <span className="inline-block w-4 h-4 border-3 border-black rounded-full mr-2"></span>
                    <p className=" text-sm  ">Quick Revision</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#26858A] border-2 border-white flex flex-col w-[30%] items-center justify-center rounded-2xl p-2 relative sm:mt-8 mt-4 sm:max-w-[230px] max-sm:w-full max-sm:flex-row">
              {/* image */}
              <div className=" sm:absolute sm:-top-10 sm:left-2">
                <Image
                  src="/ui/client/home/book.png"
                  alt="image"
                  width={50}
                  height={50}
                  className="w-20 h-20 "
                />
              </div>
              {/* boady */}
              <div className="sm:mt-8 sm:py-4 py-auto">
                <p className="text-start pl-2 text-xl text-white font-bold">
                  Excel with Expert Test Series
                </p>

                <div className="space-y-1 flex flex-col justify-center items-start max-sm:hidden pl-2 ">
                  <div className="space-x-1 flex flex-row pt-3 items-center ">
                    <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                    <p className="text-sm   text-white">Subject-wise tests</p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center justify-start ">
                    <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                    <p className="text-sm  text-white">Track progress</p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center">
                    <span className="inline-block w-4 h-4 border-3 border-white rounded-full mr-2"></span>
                    <p className="text-sm   text-white">Affordable Prices</p>
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

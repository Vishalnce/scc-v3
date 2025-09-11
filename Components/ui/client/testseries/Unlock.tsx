import React from "react";

export default function Unlock() {
  return (
    <>
      <div className="bg-[#007076]">
        <div className=" w-[90%]  mx-auto py-10 flex flex-row max-sm:flex-col justify-between  ">
          {/* heading */}
          <div className="w-[30%] max-sm:w-[95%] flex flex-col max-sm:flex-row items-start max-sm:pt-4 pt-4  max-sm:justify-between ">
            <p className="text-white text-2xl font-bold max-sm:w-[70%] font-montserrat">
              Unlock Your Potential with Our{" "}
              <span className="text-[#FFE332]">Free</span> Full Length Mock
              Test!
            </p>
            <button className="text-xs p-2 px-4 rounded-full bg-[#FFE332] my-4">
              Enroll Now
            </button>
          </div>
          {/* small cards */}

          <div className="flex flex-row justify-between max-sm:flex-col max-sm:items-center gap-4 max-sm:gap-8 w-[65%]  max-sm:w-[95%]  max-sm:py-8 ">


            <div className="bg-[#26858A] border-white border-2  flex flex-col  items-center justify-center rounded-2xl px-4   w-[45%] max-sm:w-[90%] ">
              {/* boady */}
              <div className=" max-sm:py-8 ">
                <p className="text-start  text-lg text-white font-bold">
                  SSC CGL Examlife Mock Tests
                </p>

                <div className="space-y-1 flex flex-col justify-center items-start  ">
                  <div className="space-x-1 flex flex-row pt-3 items-center ">
                    <span className="inline-block w-3 h-3 border-3 border-white  rounded-full mr-2"></span>
                    <p className=" text-xs  text-white">
                      Realistic SSC CGL Tier 1 & 2 format.
                    </p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center justify-start ">
                    <span className="inline-block w-3 h-3 border-3 border-white  rounded-full mr-2"></span>
                    <p className="text-xs  text-white">
                      Get Instant score and feedback.
                    </p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center">
                    <span className="inline-block w-3 h-3 border-3 border-white rounded-full mr-2"></span>
                    <p className="text-xs   text-white">
                      Topic-wise practice of each subject.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="bg-white border-white border-2   flex flex-col  items-center justify-center rounded-2xl  px-4   w-[45%] max-sm:w-[90%] ">
              {/* boady */}
              <div className=" max-sm:py-8">
                <p className="text-start  text-lg  font-bold">
                  SSC CGL Examlife Mock Tests
                </p>

                <div className="space-y-1 flex flex-col justify-center items-start ">
                  <div className="space-x-1 flex flex-row pt-3 items-center ">
                    <span className="inline-block w-3 h-3 border-3   rounded-full mr-2"></span>
                    <p className=" text-xs  ">
                      Realistic SSC CGL Tier 1 & 2 format.
                    </p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center justify-start ">
                    <span className="inline-block w-3 h-3 border-3   rounded-full mr-2"></span>
                    <p className="text-xs  ">
                      Get Instant score and feedback.
                    </p>
                  </div>
                  <div className="space-x-1 flex flex-row  items-center">
                    <span className="inline-block w-3 h-3 border-3  rounded-full mr-2"></span>
                    <p className="text-xs   ">
                      Topic-wise practice of each subject.
                    </p>
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

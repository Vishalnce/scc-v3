import Image from "next/image";
import React from "react";

function Download() {
  return (
    <>
      <div className=" relative  rounded-2xl shadow border-1 border-[#CDE2E4] bg-[#CDE2E4] md:py-4  mx-auto max-w-[1400px]  my-4  ">
        <div className="flex flex-row items-start justify-start md:justify-start md:pt-6 py-2  md:px-6 px-3 ">
          {/* text  */}
          <div className="  flex flex-col  justify-between  items-start md:gap-6 max-md:py-4 w-[70%] max-md:w-[70%] md:mt-8  max-md:pr-4  md:py-4  md:pl-12 ">
            <p className=" md:text-4xl max-md:text-lg text-[#047077] font-montserrat font-semibold">
              {" "}
              Download Examlife Test Series Schedule
            </p>

            <p className=" text-xl max-md:text-sm max-md:pt-2 max-md:leading-4 md:w-[80%]">
              Download the ExamLife test series schedule
              <span className="max-md:hidden">
                {" "}
                to organize your SSC preparation effectively.
              </span>
            </p>

            <div className=" space-x-3">
              <button className=" px-8 bg-[#047077] max-md:text-xs  text-xl md:px-16 py-2 rounded-full font-semibold text-white">
                Tier 1
              </button>

              <button className=" px-8  border-[#047077] border-2 max-md:text-xs  text-xl md:px-16 py-2 rounded-full font-semibold text-[#047077]">
                Tier 2
              </button>
            </div>
          </div>

          {/* image */}

          <div className=" max-md:absolute right-6 top-10 max-md:w-[30%] ">
            <Image
              src={"/ui/client/test-series/book.png"}
              width={300}
              height={300}
              alt="hero"
              className="max-md:scale-[140%]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Download;

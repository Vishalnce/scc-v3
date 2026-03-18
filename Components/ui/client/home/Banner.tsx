import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdArrowOutward } from "react-icons/md";

export default function Banner() {
  return (
    <>
      {/* main div */}
      <div className=" relative  rounded-2xl shadow border-1 border-[#CDE2E4] bg-[#CDE2E4] md:py-4 w-[90%] mx-auto max-w-[1400px]  my-4  ">
        <div className="flex flex-row items-start justify-start md:justify-between md:pt-6 py-2   w-[90%] mx-auto ">
          {/* text  */}
          <div className="  flex flex-col  justify-between  items-start md:gap-6 max-md:py-4 w-[70%] max-md:w-full md:mt-8  max-md:pr-4  md:py-4   ">
            <p className=" md:text-4xl max-md:text-lg text-[#047077] font-montserrat font-semibold">
              {" "}
              Explore our other exams with Examlife
            </p>

            <p className=" text-xl max-md:text-sm max-md:pt-2 max-md:leading-4 md:w-[80%]">
              Get access to comprehensive study material
              <span className="max-md:hidden">
                for all government competitive exams.
              </span>
            </p>
            <div className=" flex flex-row  gap-6 max-md:mt-4  max-md:w-full justify-between">
              <button className=" px-4 bg-[#047077]  max-md:text-xs  text-lg md:px-5 py-2 rounded-2xl font-semibold text-white">
                Bank PO / Clerk
              </button>
              <button className=" px-4  text-[#047077] border-[#047077] border-1 max-md:text-xs  text-lg md:px-5 py-2 rounded-2xl font-semibold ">
                UPSC / State PCS
              </button>
            </div>
          </div>

          {/* image */}

          <div className=" max-md:hidden right-4 top-4  max-md:w-[30%] md:mr-20 ">
            <Image
              src={"/ui/client/home/b2.png"}
              width={150}
              height={100}
              alt="hero"
              className="max-md:scale-[110%]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

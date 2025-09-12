import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoClock } from "react-icons/go";
import { MdArrowOutward, MdOutlineFileDownload } from "react-icons/md";
export default function DataEntry() {
  return (
    <>
      <div className="bg-[#007076]">
        <div className="max-w-[1400px] flex flex-row max-md:flex-col justify-between items-center mx-auto  w-[90%] py-5">


          {/* time and text */}
          <div className="flex flex-row gap-5 max-sm:gap-2 w-[40%] max-md:w-[95%]  max-md:justify-center">
            <div className="my-auto ">
              <MdOutlineFileDownload  className="text-white max-sm:size-12 size-16 bg-[#26858A] p-3  rounded-full" />
            </div>
            <div className="my-auto">
              <p className="text-2xl max-sm:text-md max-sm:text-center text-white font-bold">
                Download Examlife Test Series Schedule!
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center max-md:w-[90%]  py-4 w-[40%] ">

            
          <Link href="/" className="">

           <div className="flex justify-between  gap-3 text-white max-sm:py-4">
           <p>
            Click For Prelims
           </p>
           <span className="my-auto"><MdArrowOutward /></span>
          </div>

          </Link>

              <Link href="/" className="">

           <div className="flex justify-between  gap-3 text-white">
           <p>
            Click For Mains
           </p>
           <span className="my-auto"><MdArrowOutward /></span>
          </div>

          </Link>
         

          </div>




        </div>
      </div>
    </>
  );
}

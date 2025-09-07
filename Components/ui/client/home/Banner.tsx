import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdArrowOutward } from "react-icons/md";

export default function Banner() {
  return (
    <>
      <div className="bg-[#007076]">
        <div className="max-w-[1400px] w-[90%] mx-auto md:py-4  flex flex-row justify-between max-md:flex-col">
          {/* heading  */}
          <div className="  bg-[#007076] rounded-t-xl flex flex-row items-center justify-center gap-5  py-1   w-[40%] max-md:w-[100%] max-md:py-2 mx-auto">
            <div className="my-auto ">
              <Image
                src={"/ui/client/home/book.svg"}
                alt="Boook"
                width={60}
                height={60}
              />
            </div>
            <div className="w-[50%]  max-md:w-[60%]">
              <p className="text-[#FFFFFF] text-xl font-semibold max-md:text-lg">
                {" "}
                Explore Other Exams with Examlife!
              </p>
            </div>
          </div>

          {/* other links  */}

          <div className="flex flex-row  w-[50%]  justify-between items-center mx-auto max-md:py-4 gap-2 max-md:w-full ">
            <div>
              <Link href={"https://www.examlife.info/"} target="_blank">
                <div className="flex flex-row items-center gap-2  max-sm:justify-center">
                  <p className="text-white  max-md:text-sm max-sm:w-[77%]">
                    Visit For UPSC/State PCS
                  </p>
                  <MdArrowOutward className="text-white" />
                </div>
              </Link>
            </div>

            <div>
              <Link href={"https://www.bankexamlife.info/"} target="_blank" >
                <div className="flex flex-row items-center gap-2 max-sm:justify-center">
                  <p className="text-white max-md:text-sm max-sm:w-[57%]">
                    Visit For Bank PO/Clerk
                  </p>
                  <MdArrowOutward className="text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

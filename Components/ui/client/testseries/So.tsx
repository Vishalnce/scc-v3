import React from "react";
import { FaCheck } from "react-icons/fa";
import { GoChecklist, GoDeviceMobile } from "react-icons/go";
import { IoIosRepeat } from "react-icons/io";
import { IoShieldOutline } from "react-icons/io5";

function So() {
  return (
    <>
      <div className="shadow-[0_0_9px_rgba(0,0,0,0.2)] my-5 rounded-2xl ">
        {/* head */}

        <div className="w-full flex items-center px-8 py-4  rounded-t-xl gap-6 max-md:gap-4 bg-[#0470771A]">
          {/* icon */}

          {/* text */}
          <div>
            <p className="font-semibold text-xl max-md:text-lg">
              So What you Choose?
            </p>
          </div>
        </div>

        {/* boady  */}

       <div className="px-8 py-4 flex flex-col gap-2">
  
  {/* 1 */}
  <div className="flex gap-2 items-start">
    <div className="w-9 h-9 flex items-center justify-center bg-[#0470771A] rounded-full flex-shrink-0">
      <IoShieldOutline className="text-[#047077] size-5" />
    </div>
    <p className="text-[#6F6F6F]">Instant access after purchase</p>
  </div>

  {/* 2 */}
  <div className="flex gap-2 items-start">
    <div className="w-9 h-9 flex items-center justify-center bg-[#0470771A] rounded-full flex-shrink-0">
      <GoDeviceMobile className="text-[#047077] size-5" />
    </div>
    <p className="text-[#6F6F6F]">Works on mobile & desktop</p>
  </div>

  {/* 3 */}
  <div className="flex gap-2 items-start">
    <div className="w-9 h-9 flex items-center justify-center bg-[#0470771A] rounded-full flex-shrink-0">
      <IoIosRepeat className="text-[#047077] size-5" />
    </div>
    <p className="text-[#6F6F6F]">Updated as per latest SSC changes</p>
  </div>

</div>

        {/* button */}
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4  px-8 pb-4 ">
          <button className="bg-[#F89716] w-full text-center text-white py-3 rounded-xl">
            Free Mock Test
          </button>
          <button className="bg-[#24B3CB] w-full text-center text-white py-3 rounded-xl">
            Test Series for Tier 1
          </button>

          <button className="bg-[#9F38D6] w-full text-center text-white py-3 rounded-xl">
            Test Series for Tier 2
          </button>
        </div>
      </div>
    </>
  );
}

export default So;

import Filter from "@/Components/client/typing-test/Filter";
import React from "react";

export default function page() {


  return (
    <>
    <div className="dark:bg-black py-18" >
<div className="w-[90%] mx-auto bg-[#FAFCFC] border-[1.5px] border-[#E6F1F1] dark:bg-[#313131] ">
        {/* headiong */}
        <div className="flex flex-col  items-center my-4">
          <p className="font-bold text-3xl py-2 dark:text-white max-sm:text-center">
            Start Data Entry Typing Test
          </p>
          <p className=" text-my-text-color ">Customize your test settings</p>
        </div>

        {/* selection tools */}

        <Filter />
      </div>
    </div>
      
    </>
  );
}

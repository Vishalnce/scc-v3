import DateWise from "@/Components/client/one-liner/DateWise";
import FilterOneLiner from "@/Components/client/one-liner/FilterOneLiner";
import React from "react";

const page = () => {
  

  return (
    <>
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl">
            One-Liner Current Affairs{" "}
            <span className="text-my-green">SSC CGL</span> Success
          </h1>
          <p className="mt-1 text-sm text-my-text-color">
            Stay Ahead with Daily Updates Tailored for SSC CGL General
            Awareness!
          </p>
        </div>
      </header>

      {/* Filter Section */}
      <div className="dark:bg-[#191919]">
        <div className="flex  flex-row justify-between items-center mx-auto w-[90%] pt-2">
          {/* add fileter */}
          <FilterOneLiner />

          <div className="max-md:hidden">
            <p className="bg-[image:var(--color-my-yellow-alert)] dark:text-black max-lg:text-sm px-4 py-2 rounded-4xl text-center">
              New One-Liner Just Dropped!
            </p>
          </div>
        </div>
      </div>

      {/* Main Section or One-Liner Section */}
      <div className=" dark:bg-[#191919]  ">
        <div className="flex flex-row w-[90%] mx-auto border-2 justify-between ">
          {/* DateWise Section */}
          <div className="w-[25%] ">

            <DateWise/>
          </div>


          {/* Content Section */}
          <div className="w-[70%]">

            {/* small heading */}

            <div className="flex flex-row justify-between my-4">
              <h2 className="text-xl text-my-text-color font-bold ">One-Liner Current Affairs</h2>
              <p className="text-sm text-gray-500 ">
                Updated Daily
              </p>
            </div>



          </div>


        </div>
      </div>
    </>
  );
};

export default page;

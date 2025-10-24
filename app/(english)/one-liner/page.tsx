import CommentWrapper from "@/Components/client/comment/CommentWrapper";
import DateWise from "@/Components/client/one-liner/DateWise";
import FilterOneLiner from "@/Components/client/one-liner/FilterOneLiner";
import React from "react";

type postType = {
  id: number;
  content: string;
  createdAt: string | Date;
};

export default async function ({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;
  const date = params.date;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/one-liner/client/?date=${date || ""}`
  );

  const { contents  } = await res.json();
 
 

  return (
    <>
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl  dark:text-white">
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
      <div className="dark:bg-[#191919] py-8 ">
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
        <div className="flex flex-row w-[90%] mx-auto  justify-between ">
          {/* DateWise Section */}
          <div className="w-[25%] max-sm:hidden ">
            <DateWise />
          </div>

          {/* Content Section */}
          <div className="w-[70%]   max-sm:w-[100%]  ">
            {/* small heading */}

            <div className="flex flex-row justify-between my-4 ">
              <h2 className="text-xl text-my-text-color font-bold  ">
                One-Liner Current Affairs
              </h2>
              <div className="text-md text-gray-500 my-auto "> {params? (
                <p>{ date} </p>
              ) : <p> Updated Daily  </p>} </div>
            </div>

            {/* main content */}

            <div className=" ">
              {contents?.map((item: postType) => (
                <div
                  key={item.id}
                  className=" m-2 my-3 flex flex-row justify-between  bg-my-green text-white border-[#E6F1F1] border-1 rounded dark:bg-[#313131]  "
                >
                  <p className="p-2  dark:text-white">{item.content}</p>
                </div>
              )) || <p>No data found</p>}
            </div>
          </div>
        </div>
      </div>

      {/* <CommentWrapper parentId={id} parentType="linerId"/> */}

      {/* comment section */}
    </>
  );
}

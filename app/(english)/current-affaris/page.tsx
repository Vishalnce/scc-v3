import Filter from "@/Components/client/Filter";
import React from "react";

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

    const resolvedSearchParams = await searchParams;

  const date = resolvedSearchParams.date;
  const topic = resolvedSearchParams.topic;
 

  console.log("Date:", date);
  console.log("Topic:", topic);



  
  


  return (
    <>
      {/* heading */}
      <header className="bg-[image:var(--color-my-gradient)]">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl">
            Current Affairs for <span className="text-my-green">SSC CGL</span>{" "}
            Success
          </h1>
          <p className=" mt-1 text-sm   text-my-text-color">
            Stay Ahead with Daily Updates Tailored for SSC CGL General
            Awareness!
          </p>
        </div>
      </header>

      {/* Boady */}

      <div>
        <div className="flex  flex-row justify-between items-center mx-auto w-[90%] mt-2">
          {/* left side filter */}

          
          <Filter />



          {/* right side */}
          <div className="max-md:hidden">
            <p className="bg-[image:var(--color-my-yellow-alert)] dark:text-black max-lg:text-sm px-4 py-2 rounded-4xl text-center">
              New Current Affairs Just Dropped!
            </p>
          </div>
        </div>

        <div className="w-full bg-amber-500 ">

        </div>
      </div>
    </>
  );
}

export default page;

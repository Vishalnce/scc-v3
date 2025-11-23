import Image from "next/image";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiCircleBold } from "react-icons/pi";

type Item = {
  id: number;
  content: string;
  createdAt: Date;
};

export default async function OneLiner() {
  async function fetchOneLiner() {
    try {
      // ✅ Resolve base URL dynamically — works locally, in Docker, and in production
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.VERCEL_URL ||
        "http://localhost:3000";

      // ✅ Fetch with optional revalidation (avoid dynamic errors)
      const res = await fetch(`${baseUrl}/api/en/one-liner/client/?limit=5`, {
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        console.warn("One-liner fetch failed:", res.statusText);
        return { contents: [] };
      }

      const data = await res.json();

      // ✅ Ensure data structure safety
      return data && Array.isArray(data.contents) ? data : { contents: [] };
    } catch (error) {
      console.error("error in one liner:", error);
      return { contents: [] }; // safe fallback
    }
  }
  const { contents } = await fetchOneLiner();

  return (
    <>
      <div className="bg-white dark:bg-[black]">
        <div className="max-w-[1400px] pt-12 max-sm:pt-6 flex flex-col mx-auto  w-[90%]">
          {/* heading */}
          <header className="flex flex-row justify-between   py-4">
            <div className="w-[60%] ">
              <p className="text-4xl max-sm:text-2xl font-bold dark:text-white">
                One-Liner Current Affairs for Quick Revision
              </p>
              <div className="w-[40%] max-lg:hidden py-2">
                <p className="bg-[#2CBB0180] w-full rounded-full py-2 px-6 my-2 text-black text-lg flex items-center ">
                  {/* White circle container */}
                  <span className="relative mr-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    {/* Blinking green dot centered inside */}
                    <span
                      className="w-3 h-3 rounded-full bg-green-600 animate-pulse"
                      aria-label="live indicator"
                       style={{ animationDuration: '0.7s' }}
                    ></span>
                  </span>
                  Don't Miss The Live Quizzes
                </p>
              </div>
            </div>
            <div>
              <button className="p-2 px-6 bg-[#FFE332] max-sm:text-sm  rounded-full text-lg">
                Read More
              </button>
            </div>
          </header>

          <main className="w-full  flex flex-row justify-between  pb-10 mt-4 ">
            {/* one liner */}
            <div className="text-fade max-lg:w-[100%] w-[55%]  flex flex-col justify-between ">
              {contents.map((item: Item) => (
                <div
                  key={item.id}
                  className="flex flex-row items-center justify-start py-1 gap-2"
                >
                  <MdKeyboardArrowRight  className="font-bold text-lg size-6 flex-shrink-0 dark:text-white" />
                  <p className="dark:text-white text-lg">{item.content}</p>
                </div>
              ))}
            </div>

            {/* image */}

            <div className="w-[35%]  max-lg:hidden ">
              <Image
                src={"/ui/client/home/boy.png"}
                alt="boy-reading"
                width={443}
                height={294}
              />
            </div>

          </main>
        </div>
      </div>
    </>
  );
}

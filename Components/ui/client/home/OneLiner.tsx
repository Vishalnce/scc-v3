import Image from "next/image";
import React from "react";

type Item = {
  id: number;
  content: string;
  createdAt: Date;
};

export default async function OneLiner() {
  async function fetchOneLiner() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/one-liner/client/?limit=5`,
        { cache: "no-store" }
      );

        if (!res.ok) {
        return { contents: [] };
      }

      const data = await res.json();
      return data; // { contents: [...] }
    } catch (error) {
      console.log(`error in one liner: ${error}`);
      return { contents: [] }; // fallback
    }
  }

  const { contents } = await fetchOneLiner();

  return (
    <>
      <div className="bg-white dark:bg-[black]">
        <div className="max-w-[1400px] pt-10 max-sm:pt-6 flex flex-col mx-auto b w-[90%]">
          {/* heading */}
          <header className="flex flex-row justify-between items-center  p-4">
            <div className="w-[60%]">
              <p className="text-2xl max-sm:text-xl font-bold dark:text-white">
                One-Liner Current Affairs for Quick Revision
              </p>
              <div className="w-[34%] max-lg:hidden">
                <p className="bg-[#2CBB0180] rounded-full   py-1 px-2 my-2 text-black text-xs max-w-[250px]">
                  <span className="px-2 rounded-full bg-[#FFFFFF] mr-2 "></span>
                  Don't Miss The Live Quizzes
                </p>
              </div>
            </div>
            <div>
              <button className="p-2 px-3 bg-[#FFE332]  rounded-full text-sm">
                Read More
              </button>
            </div>
          </header>

          <main className="w-full  flex flex-row justify-between pb-10">
            {/* one liner */}
            <div className="text-fade max-lg:w-[100%] w-[60%]  flex flex-col justify-between mx-auto">
              {contents.map((item: Item) => (
                <div
                  key={item.id}
                  className="flex flex-row items-center py-1 gap-2"
                >
                  <span className="w-4 h-4 max-sm:w-5 flex items-center justify-center rounded-full border-4 font-bold dark:border-white"></span>
                  <p className="dark:text-white">{item.content}</p>
                </div>
              ))}

             
            </div>

            {/* image */}

            <div className="w-[35%]  max-lg:hidden">
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

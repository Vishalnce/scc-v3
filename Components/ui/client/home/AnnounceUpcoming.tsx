import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoClock } from "react-icons/go";

export default async function AnnounceUpcoming() {
  async function fetchNotice() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/notice/client`,
        { cache: "no-store" }
      );
      const data = await res.json();
      return data; // { contents: [...] }
    } catch (error) {
      console.log(`error in one liner: ${error}`);
      return { contents: [] }; // fallback
    }
  }

  async function fetchAnnounce() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/announcement/client`,
        { cache: "no-store" }
      );
      const data = await res.json();
      return data; // { contents: [...] }
    } catch (error) {
      console.log(`error in one liner: ${error}`);
      return { contents: [] }; // fallback
    }
  }

  const { post } = await fetchAnnounce();

  const data = await fetchNotice();

  const noticePost = data.post;

  return (
    <>
      <div className="bg-white dark:bg-black">
        <div className="max-w-[1400px]  w-[90%] mx-auto py-16">
          <div className="flex flex-row justify-between items-center">
            {/* announcment card */}
            <div className=" w-[46%] ">
              {/* heading */}
              <div className="  bg-[#007076] rounded-t-xl flex flex-row items-center justify-center gap-4  py-1 w-full">
                <div className="my-auto ">
                  <Image
                    src={"/ui/client/home/announce.svg"}
                    alt="announcement"
                    width={60}
                    height={60}
                  />
                </div>
                <div>
                  <p className="text-white text-xl"> Announcement</p>
                </div>
              </div>

              {/* body  */}

              <div className=" py-3 space-y-3 max-h-[210px] overflow-y-auto shadow-2xl px-3 rounded-b-lg ">
                {post.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between gap-3  h-[54px]"
                  >
                    <span className="w-4 h-4 my-auto flex items-center justify-center rounded-full border-4 font-bold dark:border-white"></span>
                    <p className="text-[#6C6C6C] text-sm my-auto w-[60%]">
                      {item.title}
                    </p>
                    <div className="w-[30%] max-w-32 flex flex-col justify-center">
                      <Link href={item.link} className="w-full" target="_blank">
                        <button className="bg-[#FFE332] px-2 py-2 rounded-full text-sm w-full ">
                          Check Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}

              
              </div>
            </div>

            <div className=" w-[46%] ">
              {/* heading */}
              <div className="  bg-[#007076] rounded-t-xl flex flex-row items-center justify-center gap-4  py-1 w-full">
                <div className="my-auto ">
                  <Image
                    src={"/ui/client/home/upcoming.svg"}
                    alt="announcement"
                    width={60}
                    height={60}
                  />
                </div>
                <div>
                  <p className="text-white text-xl"> Upcoming Exam</p>
                </div>
              </div>

              {/* body  */}

              <div className=" py-3 space-y-3 overflow-y-auto max-h-[210px]  px-3 rounded-b-lg shadow-2xl">
                {noticePost.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between gap-3  h-[54px]"
                  >
                    <span className="w-4 h-4 my-auto flex items-center justify-center rounded-full border-4 font-bold dark:border-white"></span>
                    <p className="text-[#6C6C6C] text-sm my-auto w-[60%]">
                      {item.title}
                    </p>
                    <div className="w-[30%] max-w-32 flex flex-col justify-center">
                      <Link href={item.link} className="w-full" target="_blank">
                        <button className="bg-[#FFE332] px-2 py-2 rounded-full text-sm w-full ">
                          Check Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

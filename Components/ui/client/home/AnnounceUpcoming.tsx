import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoClock } from "react-icons/go";
import { RiArrowRightWideLine } from "react-icons/ri";

export default async function AnnounceUpcoming() {
  async function fetchNotice() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/en/notice/client`);
      const data = await res.json();
      return data; // { contents: [...] }
    } catch (error) {
      console.log(`error in one liner: ${error}`);
      return { contents: [] }; // fallback
    }
  }

  async function fetchAnnounce() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/en/announcement/client`);
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

  const session = await getServerSession(NEXT_AUTH);

  return (
    <>
      <div className="bg-white dark:bg-black">
        <div className="max-w-[1400px]  w-[90%] mx-auto py-16 max-md:py-12">
          <div className="flex flex-row justify-between items-center max-md:flex-col max-md:gap-8">
            {/* announcment card */}
            <div className=" w-[46%] max-md:w-[100%] border-1 border-[#DADADA] rounded-xl pb-6 md:px-6 px-2">
              {/* heading */}
              <div className="   rounded-t-xl flex flex-row  gap-4  py-2  w-full">
                <p className=" text-2xl font-semibold"> Announcement</p>
              </div>

              {/* body  */}

              <div className="  space-y-3 max-h-[210px] overflow-y-auto  md:px-6 rounded-b-lg dark:bg-[#313131]  ">
                {/* {session?.user?.role === "ADMIN" ? (
                  <div className="w-[90%]  max-md:hidden">
                    <Link href="/admin/announcement ">
                      <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
                        Edit Announcements
                      </button>
                    </Link>
                  </div>
                ) : (
                  ""
                )} */}
                {post.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between gap-3 w-full my-4 px-2 md:px-4 py-2 rounded-2xl shadow "
                  >
                    <p className=" my-auto flex items-center justify-center  font-bold dark:border-white text-xl md:text-3xl text-white bg-[#047077] md:p-3 p-2 rounded-full">
                      {(index + 1).toString().padStart(2, "0")}
                    </p>

                    <p className=" font-semibold my-auto w-[60%]">
                      {item.title}
                    </p>

                    <Link href={item.link} className="my-auto" target="_blank">
                      <div
                        className={`bg-[#047077] rounded-full md:p-4 p-2 flex items-center justify-center `}
                      >
                        <RiArrowRightWideLine
                          className={`${item.textbg} md:size-6 size-5 my-auto text-white`}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* upcoming exam as notice */}
            <div className=" w-[46%] max-md:w-[100%] border-1 border-[#DADADA] rounded-xl pb-6 md:px-6 px-2">
              {/* heading */}
              <div className="   rounded-t-xl flex flex-row  gap-4  py-2  w-full">
                <p className=" text-2xl font-semibold">Upcoming Exam</p>
              </div>

              {/* body  */}

              <div className="  space-y-3 max-h-[210px] overflow-y-auto  md:px-6 rounded-b-lg dark:bg-[#313131]  ">
                {/* {session?.user?.role === "ADMIN" ? (
                  <div className="w-[90%]  max-md:hidden">
                    <Link href="/admin/announcement ">
                      <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
                        Edit Announcements
                      </button>
                    </Link>
                  </div>
                ) : (
                  ""
                )} */}
                {noticePost.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between gap-3 w-full my-4 px-2 md:px-4 py-2 rounded-2xl shadow "
                  >
                    <p className=" my-auto flex items-center justify-center  font-bold dark:border-white text-xl md:text-3xl text-white bg-[#047077] md:p-3 p-2 rounded-full">
                      {(index + 1).toString().padStart(2, "0")}
                    </p>

                    <p className=" font-semibold my-auto w-[60%]">
                      {item.title}
                    </p>

                    <Link href={item.link} className="my-auto" target="_blank">
                      <div
                        className={`bg-[#047077] rounded-full md:p-4 p-2 flex items-center justify-center `}
                      >
                        <RiArrowRightWideLine
                          className={`${item.textbg} md:size-6 size-5 my-auto text-white`}
                        />
                      </div>
                    </Link>
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

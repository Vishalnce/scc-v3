import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Concept() {
  async function fetchSmallConcept() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/small-concepts/client`,
      );
      const data = await res.json();
      // Debugging log
      return data;
    } catch (error) {
      console.log(`error in one liner: ${error}`);
      return { post: [] }; // fallback
    }
  }
  const conceptData = await fetchSmallConcept();
  const item = conceptData?.post?.[0] ?? null;
  const session = await getServerSession(NEXT_AUTH);

  return (
    <>
      <div className="bg-[#F8FAFC] dark:bg-[#353535] md:py-8 ">
        <div className="max-w-[1400px] mx-auto w-[70%] max-md:w-[90%] flex flex-col items-center md:gap-4 ">
          <div className="flex flex-col items-center max-md:pb-4">
            <p className="max-md:text-2xl text-4xl  font-bold max-md:mt-4 dark:text-white ">
              Today's Concepts for SSC
            </p>
            <p className="text-[#6F6F6F] text-center dark:text-white">
              Stay Updated with all the Concepts
            </p>
          </div>

          <div className="w-full bg-white md:px-4 dark:bg-[#141212] max-md:px-2 py-6 rounded-lg shadow-sm flex flex-col gap-4">
            <div
              className="prose max-w-none dark:text-white dark:bg-[#141212]"
              dangerouslySetInnerHTML={{ __html: item?.content || "" }}
            />

            <button className="w-full bg-[#047077] rounded-full py-2 text-white">
              Read More
            </button>

            {session?.user?.role === "ADMIN" ? (
              <div className="w-[90%] dark:bg-[#191919] mx-auto m-6 max-md:hidden">
                <Link href="/admin/small-concepts ">
                  <div className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
                    Add Concept
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

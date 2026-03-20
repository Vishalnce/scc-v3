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




  return (
    <>
      <div className="bg-[#F8FAFC] py-8">
        <div className="max-w-[1400px] mx-auto w-[70%] max-md:w-[90%] flex flex-col items-center md:gap-4 ">
          <p className="text-2xl font-bold max-md:mt-4">Today's Concepts for SSC</p>
          <p className="text-[#6F6F6F]">Stay Updated with all the Concepts</p>

          <div className="w-full bg-white md:px-4 max-md:px-2 py-6 rounded-lg shadow-sm flex flex-col gap-4">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: item?.content || "" }}
            />

            <button className="w-full bg-[#047077] rounded-full py-2 text-white">
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

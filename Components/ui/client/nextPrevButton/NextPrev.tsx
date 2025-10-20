"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Post = {
  id: number;
  title: string;
  slug: string;
  image: string;
  alt: string;
  topic: string;
  summary: string;
  keywords: string;
  description: string;
  editorHtml: string;
  toc: string;
  createdAt: string;
};
type NextPrevProps = {
  nextPost?: Post | null;
  prevPost?: Post | null;
  pageNumber?: number | null;
  prevNumber?:number | null;
  parentType: "current-affaris-page" | "concept-page" | "blog-page" | "upcoming-exam-page"
};

export default function NextPrev({
  nextPost,
  prevPost,
  pageNumber,
  prevNumber,
  parentType
}: NextPrevProps) {

 
  const handleShare = () => {
    const url = window.location.href;

    if (navigator.share) {
      // Directly invoke share without awaiting in async to ensure event context
      navigator
        .share({
          title: document.title,
          text: "Check this out!",
          url: url,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          // Optional fallback here
        });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log("Link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    } else {
      window.prompt("Copy this link:", url);
    }
  };

 

  return (
    <>

     <div className="bg-white dark:bg-black">
<div className=" w-[90%] mx-auto pt-12 flex flex-row justify-between items-center py-5 dark:bg-black max-md:flex-col max-md:gap-6">
      {/* share button */}

      <div className="flex flex-row justify-center items-center gap-3 ">
        {/* button */}
        <div>
          <button
            onClick={handleShare}
            className="bg-[#2CBB0180] px-6 py-2 rounded-full font-semibold text-sm "
          >
            Share this post on
          </button>
        </div>
        {/* image */}

        <div className=" flex flex-row items-center gap-2">
          <Image
            src="/ui/client/current-affaris-page/icons.png"
            alt="ssc"
            width={150}
            height={150}
          />
        </div>
      </div>

      {/* nex and prev button  */}

      <div className="flex justify-center items-center   gap-4">
        {prevPost ? (
          <Link
            href={{
              pathname: `/${parentType}/${prevPost.slug}`,
              query: { page: prevNumber }, // pass your page variable
            }}
            className=" bg-[#FFE332] py-2 px-5 rounded-full  flex flex-row items-center"
          >
          <MdKeyboardArrowLeft className="my-auto size-6" />  Previous
          </Link>
        ) : (
          <span />
        )}

        {nextPost ? (
          <Link
           href={{
              pathname: `/${parentType}/${nextPost.slug}`,
              query: { page: pageNumber }, // pass your page variable
            }}
            className=" bg-[#FFE332] py-2 px-7 rounded-full  flex flex-row items-center"
          >
            Next  <MdKeyboardArrowRight className="my-auto size-6" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
    </div>
    
    </>
   
  );
}

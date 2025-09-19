"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

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
};

export default function NextPrev({
  nextPost,
  prevPost,
  pageNumber,
  prevNumber
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

  console.log("prevnumber form next comp",prevNumber)

  return (
    <div className="border-2 w-[90%] mx-auto mt-6">
      {/* share button */}

      <div className="flex flex-row justify-between items-center">
        {/* button */}
        <div>
          <button
            onClick={handleShare}
            className="bg-[#2CBB0180] px-6 py-2 rounded-md font-semibold hover:bg-[#2CBB01]"
          >
            Share
          </button>
        </div>
        {/* image */}

        <div className="py-4 flex flex-row items-center gap-2">
          <Image
            src="/ui/client/home/group.png"
            alt="ssc"
            width={150}
            height={150}
          />
        </div>
      </div>

      {/* nex and prev button  */}

      <div className="flex justify-between items-center mt-6">
        {prevPost ? (
          <Link
            href={{
              pathname: `/current-affaris-page/${prevPost.slug}`,
              query: { page: prevNumber }, // pass your page variable
            }}
            className="text-blue-600"
          >
            Prev
          </Link>
        ) : (
          <span />
        )}

        {nextPost ? (
          <Link
           href={{
              pathname: `/current-affaris-page/${nextPost.slug}`,
              query: { page: pageNumber }, // pass your page variable
            }}
            className="text-blue-600"
          >
            Next
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

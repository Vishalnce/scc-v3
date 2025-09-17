import Image from "next/image";
import Link from "next/link";
import { NextResponse } from "next/server";
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

async function fetchPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affaris-page/client/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const post: Post = await res.json();
  return post;
}

// genrate metadata for the page

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affaris-page/client/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      description: "The post you are looking for does not exist.",
      keywords: ["not found", "404", "current affairs"],
    };
  }

  const post = await res.json();

  return {
    title: post.title || "Best SCC Website",
    description: post.description || "Best SCC Website",
    keywords: post.keywords || "current affairs,current news, news, updates",
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affaris-page/client/${slug}`,
      siteName: "SSC ExamLife Info",
      images: [
        {
          url: post.image,
          alt: post.alt || post.title,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: post.createdAt,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affaris-page/client/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CurrentAffarisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await fetchPost(slug);

  console.log("Post fetched:", post?.toc);

  return (
    <>
      {/* header */}
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className="flex flex-col justify-center items-center  min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <p className="text-sm text-gray-600">
            <span className="hover:underline cursor-pointer text-[#007076]">
              Home
            </span>
            <span className="mx-1 text-[#007076]"> &gt; </span>
            <span className="hover:underline cursor-pointer text-[#007076]">
              Current Affairs
            </span>{" "}
            <span className="mx-1 text-[#007076]"> &gt; </span>
            <span className="font-semibold dark:text-white">{post?.title}</span>
          </p>

          <h1 className="text-3xl font-bold max-sm:text-2xl">
            <p className="text-center dark:text-white py-2"> {post?.title} </p>
          </h1>
        </div>
      </header>

      <div className="bg-white dark:bg-black pt-12">
        <div className="w-[90%]  mx-auto flex flex-row gap-10 justify-between">
          {/* left box */}
          <div className="w-[30%]  bg-[#FAFCFC] border-1 rounded-2xl border-[#E6F1F1] px-4 dark:border-[#E6F1F1] dark:bg-[#313131] ">
            <div className=" border-2">
              {post?.toc &&
                (() => {
                  let h1 = 0,
                    h2 = 0,
                    h3 = 0;
                  return JSON.parse(post.toc).map(
                    (item: any, index: number) => {
                      if (item.tag === "h1") {
                        h1++;
                        h2 = 0;
                        h3 = 0;
                      } else if (item.tag === "h2") {
                        h2++;
                        h3 = 0;
                      } else if (item.tag === "h3") {
                        h3++;
                      }
                      let numbering = "";
                      if (item.tag === "h1") numbering = `${h1}`;
                      if (item.tag === "h2") numbering = `${h1}.${h2}`;
                      if (item.tag === "h3") numbering = `${h1}.${h2}.${h3}`;
                      let indent = "";
                      if (item.tag === "h1") indent = " my-3 text-xl";
                      if (item.tag === "h2") indent = "ml-4 my-2 text-md";
                      if (item.tag === "h3") indent = "ml-8 my-1 text-sm";
                      return (
                        <div key={index} className={indent}>
                          <a
                            href={`#${item.id}`}
                            className="hover:underline text-my-text-color"
                          >
                            <p className="">
                              {" "}
                              {numbering} {item.text}
                            </p>
                          </a>
                        </div>
                      );
                    }
                  );
                })()}
            </div>

             <div className="">
              {post?.toc &&
                (() => {
                  let h1 = 0,
                    h2 = 0,
                    h3 = 0;
                  return JSON.parse(post.toc).map(
                    (item: any, index: number) => {
                      if (item.tag === "h1") {
                        h1++;
                        h2 = 0;
                        h3 = 0;
                      } else if (item.tag === "h2") {
                        h2++;
                        h3 = 0;
                      } else if (item.tag === "h3") {
                        h3++;
                      }
                      let numbering = "";
                      if (item.tag === "h1") numbering = `${h1}`;
                      if (item.tag === "h2") numbering = `${h1}.${h2}`;
                      if (item.tag === "h3") numbering = `${h1}.${h2}.${h3}`;
                      let indent = "";
                      if (item.tag === "h1") indent = " my-3 text-xl";
                      if (item.tag === "h2") indent = "ml-4 my-2 text-md";
                      if (item.tag === "h3") indent = "ml-8 my-1 text-sm";
                      return (
                        <div key={index} className={indent}>
                          <a
                            href={`#${item.id}`}
                            className="hover:underline text-my-text-color"
                          >
                            <p className="">
                              {" "}
                              {numbering} {item.text}
                            </p>
                          </a>
                        </div>
                      );
                    }
                  );
                })()}
            </div>
          </div>

          {/* right box  */}
          <div className="w-[70%]  bg-[#FAFCFC] border-1 rounded-2xl border-[#E6F1F1] dark:border-[#E6F1F1] dark:bg-[#313131] ">
            {/* <div className="h-[100vh]">


            </div> */}

            <div className=" w-full max-md:hidden flex justify-center items-center ">
              <Image
                src={post!.image}
                alt={post!.alt}
                width={520} // natural width
                height={485} // natural height
                className="object-contain w-full h-auto rounded-2xl"
              />
            </div>

            <div className="px-2  pt-6 dark:text-my-text-color" dangerouslySetInnerHTML={{ __html: post?.editorHtml || "" }} />
          </div>
        </div>
      </div>
    </>
  );
}

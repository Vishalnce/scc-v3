import CommentWrapper from "@/Components/client/comment/CommentWrapper";
import NextPrev from "@/Components/ui/client/nextPrevButton/NextPrev";
import SideBar from "@/Components/ui/client/sidebar/SideBar";
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

type FetchResponse = {
  posts: Post[];
  page: number;
};

async function fetchPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept-page/client/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const post: Post = await res.json();
  return post;
}

async function fetchConceptAll(pageNumber: number): Promise<FetchResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept/client/?page=${pageNumber}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return { posts: [], page: 1 }; // fallback
    }

    const raw = await res.json();

    return {
      posts: raw.posts ?? [],
      page: raw.page ?? null, // fallback to 1 if API doesn’t send page
    };
  } catch (error) {
    console.log(`error while fetching ${error}`);
    return { posts: [], page: 1 }; // fallback
  }
}

// genrate metadata for the page

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept-page/client/${slug}`,
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
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept-page/client/${slug}`,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept-page/client/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ConceptPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: number | null }>;
}) {
  const { slug } = await params;

  const post = await fetchPost(slug);

  let pageNumber = (await searchParams).page ?? 1;
  const { posts, page } = await fetchConceptAll(pageNumber);


  //

  // 3️⃣ Compute prev/next
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  let prevPost: Post | null = posts[currentIndex - 1] ?? null;
  let nextPost: Post | null = posts[currentIndex + 1] ?? null;
  // this comes in pagination so it willl no cause performance issues
  let prevNumber = page;

  // fetchon next is null and return post and cext current page number
  async function fetchNextConcept(page: number) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/concept/client/?page=${page}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        return { posts: [], page: 1 }; // fallback
      }

      const raw = await res.json();

      return {
        posts: raw.posts ?? [],
        page: raw.page ?? 1, // fallback to 1 if API doesn’t send page
      };
    } catch (error) {
      console.log(`Error is ${error}`);

      return { posts: [], page: 1 }; // ✅ always return
    }
  }

  if (nextPost == null) {
    const { posts, page } = await fetchNextConcept(Number(pageNumber) + 1);
    // console.log(posts)

    if (posts.length == 0) {
      pageNumber = page - 1;
      nextPost = null;
    } else {
      nextPost = posts[0];
      pageNumber = page;
    }
  }

  if (prevPost == null) {
    // console.log(posts)

    if (pageNumber == 1) {
      prevPost = null;
    } else {
      const { posts, page } = await fetchNextConcept(Number(pageNumber) - 1);
      prevPost = posts[2];
      prevNumber = page;
    }
  }

  return (
    <>
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className="flex flex-col justify-center items-center  min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <p className="text-sm text-gray-600">
            <span className="hover:underline cursor-pointer text-[#007076]">
              <Link href={"/"}>Home</Link>
            </span>
            <span className="mx-1 text-[#007076]"> &gt; </span>
            <span className="hover:underline cursor-pointer text-[#007076]">
              <Link href="/concept">Concept</Link>
            </span>{" "}
    
          </p>

          <h1 className="text-3xl font-bold max-sm:text-2xl">
            <p className="text-center dark:text-white py-2"> {post?.title} </p>
          </h1>
        </div>
      </header>

      <div className="bg-white dark:bg-black pt-12">
        <div className="w-[90%]  mx-auto flex flex-row gap-10 justify-between">
          {/*left box   */}

          <div className="w-[30%] flex flex-col gap-4  max-md:hidden sticky top-24 self-start h-fit">
            {/* table of content */}
            <div className=" border-2 bg-[#FAFCFC]  rounded-2xl border-[#E6F1F1] px-4 dark:border-[#E6F1F1] dark:bg-[#313131] py-2 pb-4">
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

            {/* latest current affaris and one liner side bar  */}
            <SideBar/>
          </div>

          {/* right box  */}
          <div className="w-[70%] max-md:w-[90%] max-md:mx-auto  ">
            {/* <div className="h-[100vh]">


            </div> */}
            

            <div className="px-2 pt-6 text-my-text-color">
              <div
                dangerouslySetInnerHTML={{ __html: post?.editorHtml || "" }}
              />
            </div>
          </div>
        </div>
      </div>
      <NextPrev
        nextPost={nextPost}
        prevPost={prevPost}
        pageNumber={pageNumber}
        prevNumber={prevNumber}
        parentType="concept-page"
      />

      <CommentWrapper parentId={post?.id} parentType="conceptId" />
    </>
  );
}

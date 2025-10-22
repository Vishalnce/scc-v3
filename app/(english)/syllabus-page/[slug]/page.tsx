import SideBar from "@/Components/ui/client/sidebar/SideBar";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
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
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/syllabus-page/client/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const post: Post = await res.json();
  return post;
}


// fetch all current affaris by number return posts and current page number

// fetch one line3r


// genrate metadata for the page

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/syllabus-page/client/${slug}`,
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
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/syllabus-page/client/${slug}`,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/syllabus-page/client/${slug}`,
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


  
    const session = await getServerSession(NEXT_AUTH)

   
  return (
    <>
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl">
            Syllabus for <span className="text-my-green">SSC CGL</span> Success
          </h1>
          <p className="mt-1 text-sm text-my-text-color">
            Stay Ahead with latest syllabus updates and resources
          </p>
        </div>
      </header>
      {/* for edit post  */}

      
         { (session?.user?.role === "ADMIN" ? (   <div className="w-[90%] dark:bg-[#191919] mx-auto m-6">
          <Link href="/admin/syllabus-editor?slug=syllabus-for-ssc-cgl">
            <button className="bg-my-green rounded p-2 text-white">
             Edit Syllabus            </button>
          </Link>
        </div> ) : "") }
       
      
      <div className="bg-white dark:bg-black pt-12">
        <div className="w-[90%]  mx-auto flex flex-row gap-10 justify-between">
          {/* left box  */}

          <div className="w-[30%] flex flex-col gap-4  max-md:hidden ">
            {/* table of content  */}

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

            {/* latest current Affaris  and  one liner  */}
            <SideBar/>



          </div>

          {/* right box  */}

          <div className="w-[70%] max-md:w-[90%] max-md:mx-auto ">
                     {/* <div className="h-[100vh]">
         
         
                     </div> */}
                     {post && (
                       <div className="w-full  flex justify-center items-center">
                         <Image
                           src={post.image}
                           alt={post.alt}
                           width={520}
                           height={485}
                           className="object-contain w-full h-auto rounded-2xl"
                         />
                       </div>
                     )}
         
                     <div className="px-2 pt-6 text-my-text-color">
                       <div
                         dangerouslySetInnerHTML={{ __html: post?.editorHtml || "" }}
                       />
                     </div>
                   </div>
        </div>
      </div>
      {/* <div>{post?.title}</div>;
      <div dangerouslySetInnerHTML={{ __html: post?.editorHtml || "" }} />
      <div>
        <h2>Table of Contents</h2>
        <ul>
          {post?.toc &&
            JSON.parse(post.toc).map((item: any, index: number) => (
              <li key={index}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
        </ul>
      </div> */}
    </>
  );
}

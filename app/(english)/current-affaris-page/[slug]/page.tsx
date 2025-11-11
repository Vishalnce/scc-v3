import NextPrev from "@/Components/ui/client/nextPrevButton/NextPrev";
import Image from "next/image";
import React from "react";
import QuizWrapper from "@/Components/client/post-quiz/QuizWrapper";
import CommentWrapper from "@/Components/client/comment/CommentWrapper";
import SideBar from "@/Components/ui/client/sidebar/SideBar";
import parse from "html-react-parser";
// Type for the related quiz items
type QuizPostItem = {
  id: number;
  quizId: number;
  postId: number;
  // Include other fields from PostQuiz if you have any
};
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
  timeLimit: number;
  createdAt: string;
  quizposts: QuizPostItem[];
};

type FetchResponse = {
  posts: Post[];
  page: number;
};

// only fetch by slug
async function fetchPost(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affaris-page/client/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const post: Post = await res.json();
    return post;
  } catch (error) {
    console.log(`erronwhile fetching ${error}`);
  }
}

// fetch all current affaris by number return posts and current page number
async function fetchCurrentAffairs(): Promise<FetchResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affaris/client/?limit=5`,
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

// main components
export default async function CurrentAffarisPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;

  searchParams: Promise<{ page?: number | null }>;
}) {
  const { slug } = await params;

  let pageNumber = (await searchParams).page ?? 1;

  const post = await fetchPost(slug);

  const { posts, page } = await fetchCurrentAffairs();

  // console.log("Page:", page);
  // console.log("Posts:", posts);



  // 3️⃣ Compute prev/next
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  let prevPost: Post | null = posts[currentIndex - 1] ?? null;
  let nextPost: Post | null = posts[currentIndex + 1] ?? null;
  // this comes in pagination so it willl no cause performance issues
  let prevNumber = page;

  // fetchon next is null and return post and cext current page number
  async function fetchNextCurrentAffaris(page: number) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affaris/client/?page=${page}`,
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
    const { posts, page } = await fetchNextCurrentAffaris(
      Number(pageNumber) + 1
    );
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
      const { posts, page } = await fetchNextCurrentAffaris(
        Number(pageNumber) - 1
      );
      prevPost = posts[2];
      prevNumber = page;
    }
  }

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
        <div className="w-[90%] relative  mx-auto flex flex-row gap-10 justify-between">
          {/* left box */}
          <div className="w-[30%]  flex flex-col gap-4  max-md:hidden sticky top-24 self-start h-fit ">
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

            {/* Latest Current Affaris */}

           <SideBar/>
          </div>

          {/* right box  */}
          <div className="w-[70%]  max-md:w-[100%] max-md:mx-auto   ">
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

            <div className="sm:px-2 pt-6 text-my-text-color max-sm:text-xl  max-sm:w-[100%] mt-8 rounded-2xl dark:bg-[#313131] border-white relative border-2 px-2">
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
        parentType="current-affaris-page"
      />

      {/* want toadd a componeten that handle quiz from post it is can be fetcher */}
      {post?.id && (
        <QuizWrapper
          postId={post.id}
          timeLimit={post.timeLimit}
          topic={post.topic}
        />
      )}

      {/* //vcurtial typeerror */}

      <CommentWrapper parentId={post?.id} parentType="postId" />
    </>
  );
}

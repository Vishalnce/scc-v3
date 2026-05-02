import DeleteButton from "@/Components/client/blog/DeleteButton";
import EditButton from "@/Components/client/blog/EditButton";

import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarMinus } from "react-icons/fa6";

import NextAuth, { getServerSession } from "next-auth/next";
import { NEXT_AUTH } from "@/lib/auth"; // your NextAuth config
import BlogFilter from "@/Components/ui/client/blogfilter/BlogFilter";
import { SlCalender } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";

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
  timetoread: string;
  createdAt: string;
};

async function fetchPosts(
  page: number = 1,
  limit: number = 10,
  topic?: string,
  date?: string,
): Promise<{ posts: Post[]; totalCount: number }> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (topic) params.append("topic", topic);
  if (date) params.append("date", date);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/en/blog/client?${params.toString()}`, {
    cache: "no-store",
  });

  // if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    topic?: string;
    date?: string;
    limit?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const topic = params.topic;
  const date = params.date;
  const limit = Number(params.limit) || 10;

  const { posts, totalCount } = await fetchPosts(page, limit, topic, date);
  const totalPages = Math.ceil(totalCount / limit);

  const session = await getServerSession(NEXT_AUTH);
  const colorObject = [
    {
      border: "border-[#87D5E2]",
      bg: "bg-[#F8FBFF]",
      tagbg: "bg-[#E9F3FF]",
      bgButton: "bg-[#24B3CB]",
    },

    {
      border: "border-[#93E4A6]",
      bg: "bg-[#F6FFF3]",
      tagbg: "bg-[#EBFFE4]",
      bgButton: "bg-[#11C352]",
    },

    {
      border: "border-[#E6C69C]",
      bg: "bg-[#FFFDFA]",
      tagbg: "bg-[#FFF1DF]",
      bgButton: "bg-[#F89716]",
    },
  ];
  return (
    <>
      {/* Header */}
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-4xl font-bold max-sm:text-2xl ">
            Blogs for <span className="text-my-green">SSC CGL</span> Success
          </h1>
          <p className="mt-1 text-sm max-md:text-sm text-my-text-color">
            Stay Ahead with latest blog updates and resources
          </p>
        </div>
      </header>

      <div className="dark:bg-[#191919]">
        {/* Filter + Alert */}
        <div className="flex dark:bg-[#191919] flex-row justify-between items-center mx-auto w-[90%] pt-2">
          <BlogFilter />
          <div className="max-md:hidden">
            <p className="bg-[image:var(--color-my-yellow-alert)] dark:text-black max-lg:text-sm px-4 py-2 rounded-4xl text-center">
              New Blogs Just Dropped!
            </p>
          </div>
        </div>

        {/* admin roiute button for adding blog  */}

        {session?.user?.role === "ADMIN" ? (
          <div className="w-[90%] dark:bg-[#191919] mx-auto m-6">
            <Link href="/admin/blog-editor ">
              <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
                Add Blog
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}

        {/* post boady */}
        <div className="flex flex-col w-[90%] mx-auto">
           {posts.map((post, index) => {
              const color = colorObject[index % colorObject.length];

              return (
                <div
                  key={post.id}
                  className={`flex flex-row rounded-2xl m-3 border ${color.bg} ${color.border} hover:scale-[1.01] transition-all duration-300`}
                >
                  <Link
                    href={{
                      pathname: `/blog-page/${post.slug}`,
                      query: { page: page },
                    }}
                    className="flex flex-row w-full max-md:flex-col"
                  >
                    {/* Image */}
                    <div className="w-[35%] max-md:w-[90%] max-md:h-[200px] max-md:mx-auto relative m-3 h-[224px]">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.alt || "post"}
                          fill
                          className="object-cover rounded-xl"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col w-[65%] m-3 justify-between max-md:w-[90%] max-md:mx-auto">
                      {/* Title */}
                      <p className="text-xl font-semibold leading-snug line-clamp-2 min-h-[56px]">
                        {post.title}
                      </p>

                      {/* Tag */}
                      <div className="mt-2">
                        <p
                          className={`text-sm px-3 py-1 rounded-full inline-flex whitespace-nowrap ${color.tagbg}`}
                        >
                          {post.topic}
                        </p>
                      </div>

                      {/* Divider */}
                      <span className={`border mt-3 mb-3 ${color.border}`} />

                      {/* Summary */}
                      <p className="line-clamp-2 text-[#6F6F6F] text-sm">
                        {post.summary}
                      </p>

                      {/* Date + Time */}
                      <div className="flex flex-row  justify-between items-center mt-3 flex-wrap gap-2 ">
                        <div className="flex flex-row gap-3  max-md:mx-auto">
                          {/* Date */}
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full ${color.tagbg}`}
                          >
                            <SlCalender />
                            <p className="text-xs">
                              {new Date(post.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>

                          {/* Time */}
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full ${color.tagbg}`}
                          >
                            <CiClock2 className="size-4" />
                            <p className="text-xs">
                              {post.timetoread} min read
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="max-md:hidden block font-bold">
                            Read More
                          </p>
                        </div>
                      </div>

                      <button
                        className={`mt-3 text-sm rounded-lg py-2 text-white md:hidden max-md:block ${color.bgButton}`}
                      >
                        Read More
                      </button>

                      {/* Button */}
                    </div>
                  </Link>

                  {/* Admin Controls */}
                  {session?.user?.role === "ADMIN" && (
                    <div className="grid items-center justify-center px-2 max-md:hidden">
                      <EditButton slug={post.slug} />
                      <DeleteButton slug={post.slug} />
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Pagination */}
        <div className="flex  justify-center items-center gap-4 mt-6 mb-8  ">
          <Link
            href={{
              pathname: "/blog",
              query: { page: page - 1, topic, date },
            }}
            className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${
              page === 1 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Previous
          </Link>
          <span className="text-sm dark:text-white">
            Page {page} of {totalPages}
          </span>
          <Link
            href={{
              pathname: "/blog",
              query: { page: page + 1, topic, date },
            }}
            className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </>
  );
}

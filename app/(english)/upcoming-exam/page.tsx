import DeleteButton from "@/Components/client/upcoming-exam/DeleteButton";
import EditButton from "@/Components/client/upcoming-exam/EditButton";
import Filter from "@/Components/client/Filter";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarMinus } from "react-icons/fa6";


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

async function fetchPosts(
  page: number = 1,
  limit: number = 3,
  topic?: string,
  date?: string
): Promise<{ posts: Post[]; totalCount: number }> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (topic) params.append("topic", topic);
  if (date) params.append("date", date);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/upcoming-exam/client?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

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
  const limit = Number(params.limit) || 3;

  const { posts, totalCount } = await fetchPosts(page, limit, topic, date);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      {/* Header */}
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl">
            Upcomning Exam for <span className="text-my-green">SSC CGL</span>{" "}
            Success
          </h1>
          <p className="mt-1 text-sm text-my-text-color">
            Stay Ahead with latest syllabus updates and resources
          </p>
        </div>
      </header>

      <div className="dark:bg-[#191919]">
        {/* Filter + Alert */}
        <div className="flex dark:bg-[#191919] flex-row justify-between items-center mx-auto w-[90%] pt-2">
          <Filter />
          <div className="max-md:hidden">
            <p className="bg-[image:var(--color-my-yellow-alert)] dark:text-black max-lg:text-sm px-4 py-2 rounded-4xl text-center">
              New Current Affairs Just Dropped!
            </p>
          </div>
        </div>

        {/* Posts */}

        <div className="w-[90%] dark:bg-[#191919] mx-auto m-6">
          <Link href="/admin/upcoming-exam-editor ">
            <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
              Add post
            </button>
          </Link>
        </div>

        {/* post boady */}
        <div className="flex flex-col w-[90%] mx-auto #191919">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-row border-2 max-h-[288px] m-3 justify-center dark:bg-[#313131] "
            >
              {/* images */}
              <Link
                href={`/upcoming-exam-page/${post.slug}`}
                className="flex flex-row w-full"
              >
                <div className="w-[30%]  relative border-red-600 border-2 m-2">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.alt || "ssc"}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                {/* info */}
                <div className="flex flex-col  w-[60%] m-2 justify-start border-2 ">
                  <h2 className="text-xl font-bold dark:text-[#FFFFFF]">
                    {post.title}
                  </h2>

                  <p className="text-my-text-color  mt-3 text-fade">
                    Summary: {post.summary}
                  </p>
                  {/* nav button */}
                  <div className="flex flex-row justify-between mt-3">
                    <p className="text-sm dark:text-[#FFFFFF]">Read More</p>

                    <div className="flex flex-row gap-1">
                      <FaRegCalendarMinus />
                      <p className="font-semibold text-sm  dark:text-[#FFFFFF]">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long", // 👈 "April"
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* edit and delete button */}

              <div className="grid grid-col-1 items-center  justify-center ">
                <EditButton slug={post.slug} />

                <DeleteButton slug={post.slug} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex  justify-center items-center gap-4 mt-6 mb-8  ">
          <Link
            href={{
              pathname: "",
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
              pathname: "",
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

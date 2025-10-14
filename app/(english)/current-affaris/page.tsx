import DeleteButton from "@/Components/client/current-affaris/DeleteButton";
import EditButton from "@/Components/client/current-affaris/EditButton";
import Filter from "@/Components/client/Filter";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarMinus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";

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
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/current-affaris/client?${params.toString()}`,
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
  const session  = await getServerSession(NEXT_AUTH);

 
  return (
    <>
      {/* Header */}
      <header className="bg-[image:var(--color-my-gradient)] ">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl">
            Current Affairs for <span className="text-my-green">SSC CGL</span>{" "}
            Success
          </h1>
          <p className="mt-1 text-sm text-my-text-color">
            Stay Ahead with Daily Updates Tailored for SSC CGL General
            Awareness!
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


            { (session?.user?.role === "ADMIN" ? (   <div className="w-[90%] dark:bg-[#191919] mx-auto m-6 max-md:hidden">
          <Link href="/admin/current-affaris-editor ">
            <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
              Add Current Affaris
            </button>
          </Link>
        </div> ) : "") }
        

        {/* post boady */}
        <div className="flex flex-col w-[90%] mx-auto #191919">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-row  rounded-2xl  md:max-h-[288px] m-3 justify-center dark:bg-[#313131] "
            >
              <Link
                href={{
                  pathname: `/current-affaris-page/${post.slug}`,
                  query: { page:page }, // pass your page variable here
                }}
                className="flex flex-row w-full max-md:flex-col"
              >
                {/* images */}
                <div className="w-[35%] max-md:w-[90%] max-md:h-[200px] max-md:mx-auto  relative  rounded-xl  m-2  h-[224px]  ">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.alt || "ssc"}
                      fill
                      className="object-cover rounded-xl"
                    />
                  )}
                </div>
                {/* info */}
                <div className="flex flex-col  w-[60%] m-2 justify-start   max-md:mx-auto max-md:w-[90%]">
                  <h2 className="text-xl font-bold dark:text-[#FFFFFF]  min-h-[64px]">
                    {post.title}
                  </h2>

                  <p className="text-my-text-color  mt-3  text-fade h-[100px]  overflow-hidden">
                    Summary: {post.summary}
                  </p>

                  {/* nav button */}
                  <div className="flex flex-row justify-between mt-3 ">
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

              <div className="grid grid-col-1 items-center  justify-center max-md:hidden ">
                <EditButton slug={post.slug} />

                <DeleteButton slug={post.slug} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex  justify-center items-center gap-4 pt-6 pb-8  ">
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

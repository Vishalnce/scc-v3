import DeleteButton from "@/Components/client/quiz/DeleteButton";
import EditButton from "@/Components/client/quiz/EditButton";
import Filter from "@/Components/client/concept/Filter";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarMinus } from "react-icons/fa6";

type Post = {
  id: number;
  title: string;
  summary: string;
  keywords: string;
  description: string;
  category: string; // e.g. "pre" or "mains"
  subject: string; // e.g. "reasoning", "gs1"
  topic: string;

  createdAt: string;
};

async function fetchPosts(
  page: number = 1,
  limit: number = 3,
  category?: string,
  subject?: string,
  topic?: string,
  date?: string
): Promise<{ posts: Post[]; totalCount: number }> {

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (topic) params.append("topic", topic);
  if (date) params.append("date", date);
  if (category) params.append("category", category);
  if (subject) params.append("subject", subject);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/quiz/client?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    topic?: string;
    category?: string;
    subject?: string;
    date?: string;
    limit?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const topic = params.topic;
  const category = params.category;
  const subject = params.subject;
  const date = params.date;
  const limit = Number(params.limit) || 3;

  const { posts, totalCount } = await fetchPosts(
    page,
    limit,
    category,
    subject,
    topic,
    date
  );
  const totalPages = Math.ceil(totalCount / limit);

  console.log("Posts:", posts);



  // Subject Images Map

  const subjectImages: Record<string, string> = {
  "quantitative-apptitude": "/ui/client/quiz/math.svg",
  "reasoning-general": "/ui/client/quiz/reso.svg",
  "english-comprehension": "/ui/client/quiz/english.svg",
  "general-awareness": "/ui/client/quiz/general.svg",
  "mathematical-abilities": "/ui/client/quiz/math.svg",
  "computer-knowledge": "/ui/client/quiz/computer.svg",
};


  return (
    <>
      {/* Header */}
      <header className="bg-[image:var(--color-my-gradient)]">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl">
           Elevate Your SSC CGL Success with <span className="text-my-green"> Expert Quizzes</span> 
          </h1>
          <p className="mt-1 text-sm text-my-text-color">
           Practice Smarter by Choosing Quizzes Tailored to Your Strengths and Weaknesses!
          </p>
        </div>
      </header>

      <div className="dark:bg-[#191919]">
        {/* Filter + Alert */}
        <div className="flex dark:bg-[#191919] flex-row justify-between items-center mx-auto w-[90%] pt-2 ">
          <Filter />
          <div className="max-md:hidden">
            <p className="bg-[image:var(--color-my-yellow-alert)] dark:text-black max-lg:text-sm px-4 py-2 rounded-4xl text-center">
              New Quiz Just Dropped!
            </p>
          </div>
        </div>

      

        {/* Add Post Button */}
        <div className="w-[90%] dark:bg-[#191919] mx-auto m-6">
          <Link href="/admin/quiz-editor">
            <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
              Add post
            </button>
          </Link>
        </div>

        {/* Post List */}
        <div className="flex flex-col w-[90%] mx-auto">
          {posts.map((post) => (
             <div
              key={post.id}
              className="flex flex-row  rounded-2xl  md:max-h-[288px] m-3 justify-center dark:bg-[#313131] "
            >
              <Link
                href={{
                  pathname: `/quiz-test/${post.id}`,
                  // query: { page:page }, // pass your page variable here
                }}
                className="flex flex-row w-full justify-center max-md:flex-col bg-[#FAFCFC] border-2 border-[#E6F1F1] rounded-2xl py-4 px-4 "
              >
                {/* images */}
                <div className="   rounded-xl  m-2   ">

                    <Image
                      src={subjectImages[post.subject]}
                      alt={"ssc"}
                      width={60}
                      height={60}
                      className="object-cover rounded-xl"
                    />
                 
                </div>
                {/* info */}
                <div className="flex flex-col  w-[90%] m-2 justify-start    ">

                  <h2 className="text-xl font-bold dark:text-[#FFFFFF] ">
                    {post.title}
                  </h2>

                  <p className="text-my-text-color  mt-3  text-fade h-[50px]  overflow-hidden">
                    Summary: {post.summary}
                  </p>

                  {/* nav button */}
                  <div className="flex flex-row justify-between mt-3 ">
                    <p className="text-sm dark:text-[#FFFFFF] px-4 py-2 bg-[#007076] rounded-full text-white">Start Quiz</p>

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
                <EditButton id={post.id} />

                <DeleteButton id={post.id} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6 mb-8">
          <Link
            href={{
              pathname: "",
              query: { page: page - 1, topic, date, category, subject },
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
              query: { page: page + 1, topic, date, category, subject },
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

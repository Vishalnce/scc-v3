import DeleteButton from "@/Components/client/quiz/DeleteButton";
import EditButton from "@/Components/client/quiz/EditButton";
import QuizFilter from "@/Components/client/quiz/QuizFilter";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarMinus } from "react-icons/fa6";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { SlCalender } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { GoChevronRight } from "react-icons/go";

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
  limit: number = 10,
  category?: string,
  subject?: string,
  topic?: string,
  date?: string,
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
    },
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
  const limit = Number(params.limit) || 10;

  const { posts, totalCount } = await fetchPosts(
    page,
    limit,
    category,
    subject,
    topic,
    date,
  );
  const totalPages = Math.ceil(totalCount / limit);

  const session = await getServerSession(NEXT_AUTH);

  // Subject Images Map

  const subjectImages: Record<string, string> = {
    "quantitative-apptitude": "/ui/client/quiz/math.svg",
    "reasoning-general": "/ui/client/quiz/reso.svg",
    "english-comprehension": "/ui/client/quiz/english.svg",
    "general-awareness": "/ui/client/quiz/general.svg",
    "mathematical-abilities": "/ui/client/quiz/math.svg",
    "computer-knowledge": "/ui/client/quiz/computer.svg",
    pyq: "/ui/client/quiz/computer.svg",
  };

  const colors = [
    {
      bg: "bg-[#E9F3FF]",
      icon: "text-[#3B82F6]", // blue-ish
    },
    {
      bg: "bg-[#EBFFE4]",
      icon: "text-[#22C55E]", // green
    },
    {
      bg: "bg-[#FFF1DF]",
      icon: "text-[#F59E0B]", // orange
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-[image:var(--color-my-gradient)]">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-4xl font-bold max-sm:text-2xl">
            <p className="max-md:hidden">    Elevate Your SSC CGL Success with{" "}
            <span className="text-my-green"> Expert Quizzes</span></p>
            <p className=" font-bold max-sm:text-2xl md:hidden">Master SSC CGL with expert quizzes.</p>
         
          </h1>
          <p className="mt-1 text-lg max-sm:text-sm text-my-text-color max-md:hidden">
            Practice Smarter by Choosing Quizzes Tailored to Your Strengths and
            Weaknesses!
          </p>
          <p className="mt-1 text-lg max-sm:text-sm text-my-text-color md:hidden"> Quiz smarter: match your strengths and weaknesses.</p>
        </div>
      </header>

      <div className="dark:bg-[#191919]">
        {/* Filter + Alert */}
        <div className="flex dark:bg-[#191919] flex-row justify-between items-center mx-auto w-[90%] pt-2 ">
          <QuizFilter />
          <div className="max-md:hidden">
            <p className="bg-[image:var(--color-my-yellow-alert)] dark:text-black max-lg:text-sm px-4 py-2 rounded-4xl text-center">
              New Quiz Just Dropped!
            </p>
          </div>
        </div>

        {/* Add Post Button */}

        {session?.user?.role === "ADMIN" ? (
          <div className="w-[90%] dark:bg-[#191919] mx-auto m-6">
            <Link href="/admin/quiz-editor">
              <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
                Add Quiz
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}

        {/* Post List */}
        <div className="flex md:flex-wrap  max-md:flex-col max-md:items-center justify-between w-[90%] mx-auto   gap-9">
          {posts.map((post: any, index: number) => {
            const color = colors[index % colors.length];

            return (
              <div
                key={post.id}
                className="flex flex-col w-[30%] max-md:w-[90%] rounded-2xl bg-white shadow-[0_0_6px_rgba(0,0,0,0.2)]"
              >
                {/* Header */}
                <div
                  className={`flex flex-col items-start ${color.bg} px-8 pt-4 rounded-t-2xl min-h-[93px]`}
                >
                  <p className="bg-[#FFFFFF80] text-sm px-3 rounded-full py-1 inline-block capitalize">
                    {post.subject}
                  </p>

                  <p className="text-lg font-bold py-4 line-clamp-2">
                    {post.title}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-row gap-4 relative bg-white py-4 px-8 rounded-2xl">
                  <div className="flex items-center gap-2 text-my-text-color">
                    <SlCalender />
                    <p>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-my-text-color">
                    <CiClock2 />
                    <p>{Math.ceil(post.timeLimit)} Min</p>
                  </div>

                  {/* Floating Icon */}
                  <Link
                    href={{
                      pathname: `/quiz-test/${post.id}`,
                      // query: { page:page }, // pass your page variable here
                    }}
                  >
                    <div className="absolute -top-5 right-8 p-2 bg-white shadow-[0_0_6px_rgba(0,0,0,0.2)] rounded-full pointer">
                      <GoChevronRight
                        className={`my-auto size-6 ${color.icon}`}
                      />
                    </div>
                  </Link>
                </div>

                {session?.user?.role === "ADMIN" ? (
                  <div className="flex flex-row items-center  justify-around max-md:hidden">
                    <EditButton id={post.id} />

                    <DeleteButton id={post.id} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>

        {/* edit and delete button */}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 py-6">
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

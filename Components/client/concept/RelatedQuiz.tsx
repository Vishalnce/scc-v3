"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SlCalender } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { GoChevronRight } from "react-icons/go";

type Quiz = {
  id: number | string;
  title: string;
  slug?: string;
  subject: string;
  createdAt: string;
  timeToRead: number;
};

const colors = [
  {
    bg: "bg-[#E9F3FF]",
    icon: "text-[#24B3CB]",
  },
  {
    bg: "bg-[#EBFFE4]",
    icon: "text-[#11C352]",
  },
  {
    bg: "bg-[#FFF1DF]",
    icon: "text-[#F89716]",
  },
];

export default function RelatedQuiz({
  topic,
}: {
  topic: string;
}) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchRelatedQuizzes = async () => {
      if (!topic) return;

      try {
        setLoading(true);

        const res = await fetch(
          `/api/en/quiz/client?topic=${encodeURIComponent(topic)}&limit=6`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          setQuizzes([]);
          return;
        }

        const data = await res.json();

        setQuizzes(data.posts || []);
      } catch (error) {
        console.error("Error fetching related quizzes:", error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedQuizzes();
  }, [topic]);

  return (
    <section className="w-[90%]  mx-auto mt-12">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold px-1 sm:px-4 py-4 dark:text-white">
        Related Quizzes
      </h2>

      {/* Loading */}
      {loading && (
        <div className="flex gap-6 overflow-hidden px-1 sm:px-4 py-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="
                shrink-0
                w-[85%]
                sm:w-[45%]
                lg:w-[31%]
                h-[170px]
                rounded-2xl
                bg-gray-200
                dark:bg-[#252525]
                animate-pulse
              "
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && quizzes.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 font-semibold">
            No related quizzes found.
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Try another concept or explore more quizzes.
          </p>
        </div>
      )}

      {/* Quizzes */}
      {!loading && quizzes.length > 0 && (
        <div
          className="
            flex
            gap-5
            overflow-x-auto
            px-1 sm:px-4
            py-4
            scrollbar-hide
            snap-x
          "
        >
          {quizzes.map((quiz, index) => {
            const color = colors[index % colors.length];

            return (
              <article
                key={quiz.id}
                onClick={() => router.push(`/quiz-test/${quiz.id}`)}
                className="
                  group
                  shrink-0
                  snap-start
                  cursor-pointer
                  w-[85%]
                  sm:w-[45%]
                  lg:w-[31%]
                  rounded-2xl
                  bg-white
                  dark:bg-[#1e1e1e]
                  shadow-[0_0_6px_rgba(0,0,0,0.15)]
                  dark:shadow-[0_0_8px_rgba(0,0,0,0.5)]
                  overflow-hidden 

                 hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.45)]
                  transition-all duration-300 ease-out
                "
              >
                {/* Header */}
                <div
                  className={`
                    ${color.bg}
                    dark:bg-[#303030]
                    px-5
                    pt-4
                    min-h-[105px]
                  `}
                >
                  <p
                    className="
                      inline-block
                      bg-[#FFFFFF80]
                      dark:bg-[#ffffff15]
                      text-xs
                      px-3
                      py-1
                      rounded-full
                      capitalize
                      text-gray-800
                      dark:text-gray-200
                    "
                  >
                    {quiz.subject}
                  </p>

                  <h3
                    className="
                      text-base
                      font-bold
                      mt-3
                      pb-4
                      line-clamp-2
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {quiz.title}
                  </h3>
                </div>

                {/* Footer */}
                <div
                  className="
                    relative
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    bg-white
                    dark:bg-[#1e1e1e]
                  "
                >
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <SlCalender className="shrink-0" />

                    <span>
                      {new Date(quiz.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <CiClock2 className="shrink-0 text-base" />

                    <span>
                      {Math.ceil(quiz.timeToRead)} min
                    </span>
                  </div>

                  {/* Arrow */}
                  <div
                    className="
                      absolute
                      -top-5
                      right-5
                      p-2
                      rounded-full
                      bg-white
                      dark:bg-[#303030]
                      shadow-[0_0_6px_rgba(0,0,0,0.2)]
                      dark:shadow-[0_0_6px_rgba(0,0,0,0.6)]
                    "
                  >
                    <GoChevronRight
                      className={`size-5 ${color.icon} transition-transform group-hover:translate-x-0.5`}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
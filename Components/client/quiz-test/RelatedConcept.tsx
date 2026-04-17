"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SlCalender } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { GoChevronRight } from "react-icons/go";

type Post = {
  id: string;
  slug: string;
  title: string;
  subject: string;
  createdAt: string;
  timeToRead: number;
};

const colors = [
  { bg: "bg-[#E9F3FF]", icon: "text-[#24B3CB]" },
  { bg: "bg-[#EBFFE4]", icon: "text-[#11C352]" },
  { bg: "bg-[#FFF1DF]", icon: "text-[#F89716]" },
];

export default function RelatedConcept({
  topic,
  session,
}: {
  topic: string;
  session?: any;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchConcepts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/en/concept/client?topic=${encodeURIComponent(topic)}&limit=6`
        );
        const data = await res.json();

        setPosts(data.posts || []);
      } catch (err) {
        console.error("Error fetching concepts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (topic) fetchConcepts();
  }, [topic]);

  return (
    <div className=" mt-6  max-w-[1400px] mx-auto w-[90%]">
      {/* Heading */}
      <h2 className="text-xl font-bold py-4 px-4 dark:text-white">
        Related Concepts 
      </h2>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="flex md:flex-wrap max-md:flex-col gap-6 w-[90%] mx-auto">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-[30%] max-md:w-full h-[160px] rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!loading && posts.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-10 text-center">
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            No concepts found 😕
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Try exploring another topic or attempt more questions
          </p>
        </div>
      )}

      {/* ================= DATA ================= */}
      {!loading && posts.length > 0 && (
       <div className="flex  flex-row  overflow-x-auto    max-md:scrollbar-hide   gap-6 w-[100%] py-4 px-4 ">
          {posts.map((post, index) => {
            const color = colors[index % colors.length];

            return (
              <div
                key={post.id}
                onClick={() => router.push(`/concept-page/${post.slug}`)}
                className="flex flex-col w-[30%] max-md:w-[90%] rounded-2xl bg-white dark:bg-[#1e1e1e] shadow-[0_0_6px_rgba(0,0,0,0.2)]  "
              >
                {/* Header */}
                <div
                  className={`flex flex-col items-start ${color.bg} px-6 pt-4 rounded-t-2xl min-h-[90px]`}
                >
                  <p className="bg-[#FFFFFF80] text-xs px-3 rounded-full py-1 capitalize">
                    {post.subject}
                  </p>

                  <p className="text-md font-bold py-3 line-clamp-2">
                    {post.title}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-row gap-4 relative py-4 px-6 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                    <SlCalender />
                    <p>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
                    <CiClock2 />
                    <p>{Math.ceil(post.timeToRead)} min</p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute -top-5 right-6 p-2 bg-white dark:bg-[#2a2a2a] shadow-md rounded-full">
                    <GoChevronRight className={`size-5 ${color.icon}`} />
                  </div>
                </div>

                {/* Admin Buttons */}
                {session?.user?.role === "ADMIN" && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex justify-around border-t py-2 text-sm"
                  >
                    <button className="text-blue-500">Edit</button>
                    <button className="text-red-500">Delete</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
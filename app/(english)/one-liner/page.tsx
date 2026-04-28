import CommentWrapper from "@/Components/client/comment/CommentWrapper";
import DateWise from "@/Components/client/one-liner/DateWise";
import FilterOneLiner from "@/Components/client/one-liner/FilterOneLiner";
import React from "react";
import Link from "next/link";

type postType = {
  id: number;
  content: string;
  createdAt: string | Date;
};

export default async function ({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; page?: string }>;
}) {
  const params = await searchParams;

  const date = params.date;
  const page = params.page || "1";

  const res = await fetch(
    `/api/en/one-liner/client/?date=${date || ""}&page=${page}&limit=10`,
    { cache: "no-store" },
  );

  const data = await res.json();

  // ✅ SAFE FALLBACKS (IMPORTANT)
  const contents: postType[] = data.contents || [];
  const totalPages: number = data.totalPages || 1;

  const formatDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);

    const day = date.getDate();
    const year = date.getFullYear();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[date.getMonth()];

    const getSuffix = (d: number) => {
      if (d >= 11 && d <= 13) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getSuffix(day)}, ${month} ${year}`;
  };

  return (
    <>
      {/* Header */}
      <header className="bg-[image:var(--color-my-gradient)]">
        <div className="flex flex-col justify-center items-center min-h-[150px] mx-auto max-w-[1400px] max-sm:w-[90%] text-center">
          <h1 className="text-3xl font-bold max-sm:text-2xl dark:text-white">
            One-Liner Current Affairs
          </h1>
          <p className="mt-1 text-sm text-my-text-color">
            Stay Ahead with Daily Updates
          </p>
        </div>
      </header>

      {/* Filter */}
      <div className="dark:bg-[#191919] md:py-8 py-4">
        <div className="flex justify-between items-center mx-auto w-[90%] pt-2">
          <FilterOneLiner />
        </div>
      </div>

      {/* Main */}
      <div className="dark:bg-[#191919]">
        <div className="flex w-[80%] max-md:flex-col mx-auto">
          {/* Sidebar */}
          <div className="w-[20%] max-md:w-full max-md:pb-4 ">
            <DateWise />
          </div>

          {/* Content */}
          <div className="w-[70%] max-sm:w-full">
            {/* LIST */}
            <div className="flex flex-col gap-4">
              {contents.length > 0 ? (
                contents.map((item: postType, index: number) => {
                  const formattedIndex = String(index + 1).padStart(2, "0");

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 border-[#DADADA] border rounded-lg p-3 dark:bg-[#313131]"
                    >
                      {/* Number */}
                      <div className="w-[50px] h-[40px] bg-gradient-to-b rounded-lg from-[#047077] to-[#2FC6C7] shrink-0">
                        <p className="text-2xl text-center text-white font-bold pt-1">
                          {formattedIndex}
                        </p>
                      </div>

                      {/* Content */}
                      <div>
                        <p className="dark:text-white text-lg font-bold">
                          {item.content}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No data found
                </p>
              )}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-6">
              {/* Prev */}
              <Link
                href={`?date=${date || ""}&page=${Number(page) - 1}`}
                className={`px-4 py-2 border rounded-md ${
                  Number(page) <= 1
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-gray-100 dark:hover:bg-[#222]"
                }`}
              >
                ← Prev
              </Link>

              {/* Page Info */}
              <p className="text-sm dark:text-white">
                Page {page} of {totalPages}
              </p>

              {/* Next */}
              <Link
                href={`?date=${date || ""}&page=${Number(page) + 1}`}
                className={`px-4 py-2 border rounded-md ${
                  Number(page) >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-gray-100 dark:hover:bg-[#222]"
                }`}
              >
                Next →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

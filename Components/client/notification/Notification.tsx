"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Notification = {
  id: string;
  title: string;
  path: string;
  createdAt: string;
};

function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();
  const TAKE = 10;

  // 🔹 Fetch data using skip/take
  async function fetchNotifications(currentPage: number) {
    try {
      setLoading(true);

      const skip = (currentPage - 1) * TAKE;

      const res = await fetch(
        `/api/en/notification/client?take=${TAKE}&skip=${skip}`,
      );

      const data = await res.json();

      setNotifications(data.notifications);
      setHasMore(data.notifications.length === TAKE);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 initial load + cleanup
  useEffect(() => {
    async function init() {
      const alreadyCleaned = sessionStorage.getItem("noti_cleaned");

      if (!alreadyCleaned) {
        await fetch("/api/en/notification/client", { method: "DELETE" });
        sessionStorage.setItem("noti_cleaned", "true");
      }

      fetchNotifications(1);
    }

    init();
  }, []);

  // 🔹 page navigation
  function goToPage(p: number) {
    if (p < 1) return;

    setPage(p);
    fetchNotifications(p);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0e0e0e] px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Notifications
        </h1>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto relative">
       

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-center text-gray-500">No notifications</p>
        ) : (
          <div className="flex flex-col gap-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => router.push(n.path)}
                className="group bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#2a2a2a] rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-gray-50 dark:hover:bg-[#202020]"
              >
                {/* Title */}
                <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-green-500 transition">
                  {n.title}
                </p>

                {/* Time */}
                <p className="text-sm text-gray-500 mt-2">
             {new Date(n.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Buttons */}
        {!loading && (
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-[#2a2a2a] rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm dark:text-white">Page {page}</span>

            <button
              onClick={() => goToPage(page + 1)}
              disabled={!hasMore}
              className="px-4 py-2 bg-gray-200 dark:bg-[#2a2a2a] rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;

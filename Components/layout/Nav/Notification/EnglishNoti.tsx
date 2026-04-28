"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

type Notification = {
  id: string;
  title: string;
  path: string;
  createdAt: string;
};

function EnglishNoti() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // 🔹 fetch notifications
  useEffect(() => {
    async function fetchNotifications() {
      const res = await fetch("/api/en/notification/client?limit=6");
      const data = await res.json();
      setNotifications(data.notifications || []);
    }
    fetchNotifications();
  }, []);

  // 🔹 close on outside click (mobile UX)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // 🔹 today's count
  const today = new Date().toDateString();
  const todayCount = notifications.filter(
    (n) => new Date(n.createdAt).toDateString() === today,
  ).length;

  return (
    <div ref={ref} className="relative">
      {/*  Icon */}
      <div
        onClick={() => setOpen((prev) => !prev)} 
        className="inline-flex items-center justify-center p-2 rounded-xl bg-white dark:bg-[#2a2a2a] shadow-md hover:shadow-lg transition cursor-pointer"
      >
        <IoMdNotificationsOutline className="size-6 text-my-text-color" />

        {todayCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-semibold text-white bg-red-500 rounded-full">
            {todayCount}
          </span>
        )}
      </div>

      {/* 🔽 Dropdown */}
      <div
        className={`
    fixed sm:absolute
    top-16 sm:top-auto
    left-1/2 sm:left-auto
    right-auto sm:right-0
    -translate-x-1/2 sm:translate-x-0

    w-[92vw] sm:w-80 max-w-md

    rounded-2xl border border-gray-200 dark:border-[#3a3a3a]
    bg-white dark:bg-[#1f1f1f]
    shadow-[0_10px_30px_rgba(0,0,0,0.25)]

    transition-all duration-200 z-50
    ${open ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-[#3a3a3a]">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Notifications
          </h3>
          <span className="text-xs text-gray-400">{notifications.length}</span>
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              No notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  setOpen(false); // close on click
                  router.push(n.path);
                }}
                className="px-4 py-3 border-b border-gray-100 dark:border-[#2a2a2a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] cursor-pointer transition"
              >
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {n.title}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          onClick={() => {
            setOpen(false);
            router.push("/notification");
          }}
          className="px-4 py-3 text-center text-sm font-medium text-blue-500 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] rounded-b-2xl cursor-pointer"
        >
          View All Notifications →
        </div>
      </div>
    </div>
  );
}

export default EnglishNoti;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle, FaRegCircle, FaRegHourglass } from "react-icons/fa";
import { GoCircle, GoClock, GoStopwatch } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { PiClockCountdown } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { SiSpeedtest } from "react-icons/si";
import { BsSpeedometer2 } from "react-icons/bs";
import { CiKeyboard, CiLock } from "react-icons/ci";
import Link from "next/link";
import { LuTriangleAlert } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";

function Page() {
  const [latestResult, setLatestResult] = useState<any | null>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("typingResults");
    if (storedResults) {
      try {
        const results = JSON.parse(storedResults);
        console.log("result");
        if (Array.isArray(results) && results.length > 0) {
          setLatestResult(results[results.length - 1]); // only latest
        }
      } catch (error) {
        console.error(
          "Failed to parse typing results from localStorage",
          error,
        );
      }
    }
  }, []);

  if (!latestResult) {
    return <p>No typing results found.</p>;
  }

  const accuracy = latestResult.accuracy;

  let message = "";
  let textColor = "";
  let borderColor = "";

  if (accuracy >= 80) {
    message = "Excellent!";
    textColor = "text-green-600";
    borderColor = "border-green-500";
  } else if (accuracy >= 40) {
    message = "Good Job!";
    textColor = "text-yellow-500";
    borderColor = "border-yellow-400";
  } else {
    message = "Needs Improvement";
    textColor = "text-red-600";
    borderColor = "border-red-500";
  }

const formatDuration = (seconds: number | string) => {
  const totalSeconds = Math.round(Number(seconds));

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}m ${remainingSeconds}s`;
};

  return (
    <>
      <div className="dark:bg-black py-10">
        <div className="w-[90%] mx-auto bg-white dark:bg-[#1c1c1c] rounded-3xl shadow-[0_0_9px_rgba(0,0,0,0.2)] p-6 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-yellow-400 text-3xl">⭐</div>

            <h2 className={`text-2xl md:text-3xl font-bold ${textColor}`}>
              {message}
            </h2>

            <p className="text-gray-500 dark:text-gray-300">Test Completed</p>
          </div>

          {/* Accuracy Circle */}
          <div className="flex justify-center mb-8">
            <div
              className={`relative w-36 h-36 md:w-44 md:h-44 rounded-full border-[10px] flex items-center justify-center ${borderColor}`}
            >
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold dark:text-white">
                  {accuracy}%
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Accuracy
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <StatCard
              value={latestResult.correctWords}
              label="Correct"
              color="green"
            />

            <StatCard
              value={latestResult.incorrectWords}
              label="Incorrect"
              color="red"
            />

            <StatCard
              value={formatDuration(latestResult.totalDuration)}
              label="Total Duration"
              color="blue"
            />

            <StatCard
  value={formatDuration(latestResult.timeTaken)}
  label="Time Taken"
  color="pink"
/>

            <StatCard
              value={latestResult.totalTypedWords}
              label="Typed Words"
              color="purple"
            />

            <StatCard
              value={latestResult.skippedWords}
              label="Skipped Words"
              color="yellow"
            />
          </div>

          {/* Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="/typing-test/intro"
              className="bg-[#047077] hover:bg-[#035e63] text-white px-6 py-3 rounded-full transition"
            >
              Retake Test
            </Link>
          </div>
        </div>
      </div>

      <div className=" dark:bg-black">
        <div className="w-[90%] mx-auto rounded-2xl shadow-[0_0_9px_rgba(0,0,0,0.2)] py-4 bg-white dark:bg-[#1c1c1c]">
          <div className="flex flex-col w-[95%] mx-auto gap-4">
            {/* Error Percentage */}
            <div className="flex justify-between items-center gap-3">
              <div className="flex flex-row items-center gap-3 min-w-0">
                <div className="p-2 bg-[#FDE9E9] dark:bg-[#4a2525] rounded-full shrink-0">
                  <LuTriangleAlert className="text-[#F14343] size-7" />
                </div>

                <p className="text-lg md:text-xl font-bold dark:text-white">
                  Error Percentage
                </p>
              </div>

              <div className="flex flex-row items-center gap-1 text-white bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 md:px-4 py-1 rounded-full shrink-0">
                <CiLock className="size-5 md:size-6" />
                <p className="text-sm md:text-xl">Pro</p>
              </div>
            </div>

            {/* Speed */}
            <div className="flex justify-between items-center gap-3">
              <div className="flex flex-row items-center gap-3 min-w-0">
                <div className="p-2 bg-[#F3E6FF] dark:bg-[#3d2848] rounded-full shrink-0">
                  <IoSpeedometerOutline className="text-[#9F38D6] size-7" />
                </div>

                <p className="text-lg md:text-xl font-bold dark:text-white">
                  Speed (WPM)
                </p>
              </div>

              <div className="flex items-center gap-1 text-white bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 md:px-4 py-1 rounded-full shrink-0">
                <CiLock className="size-5 md:size-6" />
                <p className="text-sm md:text-xl">Pro</p>
              </div>
            </div>

            {/* Net Typing Speed */}
            <div className="flex justify-between items-center gap-3">
              <div className="flex flex-row items-center gap-3 min-w-0">
                <div className="p-2 bg-[#EBFFE4] dark:bg-[#254524] rounded-full shrink-0">
                  <IoSpeedometerOutline className="text-[#11C352] size-7" />
                </div>

                <p className="text-lg md:text-xl font-bold dark:text-white">
                  Net Typing Speed (WPM)
                </p>
              </div>

              <div className="flex items-center gap-1 text-white bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 md:px-4 py-1 rounded-full shrink-0">
                <CiLock className="size-5 md:size-6" />
                <p className="text-sm md:text-xl">Pro</p>
              </div>
            </div>

            {/* Gross WPM */}
            <div className="flex justify-between items-center gap-3">
              <div className="flex flex-row items-center gap-3 min-w-0">
                <div className="p-2 bg-[#FFF1DF] dark:bg-[#49391f] rounded-full shrink-0">
                  <IoSpeedometerOutline className="text-[#F89716] size-7" />
                </div>

                <p className="text-lg md:text-xl font-bold dark:text-white">
                  Gross WPM
                </p>
              </div>

              <div className="flex items-center gap-1 text-white bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 md:px-4 py-1 rounded-full shrink-0">
                <CiLock className="size-5 md:size-6" />
                <p className="text-sm md:text-xl">Pro</p>
              </div>
            </div>

            {/* Keystroke */}
            <div className="flex justify-between items-center gap-3">
              <div className="flex flex-row items-center gap-3 min-w-0">
                <div className="p-2 bg-[#E9F3FF] dark:bg-[#243b4a] rounded-full shrink-0">
                  <IoSpeedometerOutline className="text-[#24B3CB] size-7" />
                </div>

                <p className="text-lg md:text-xl font-bold dark:text-white">
                  Keystroke
                </p>
              </div>

              <div className="flex items-center gap-1 text-white bg-gradient-to-r from-[#047077] to-[#2FC6C7] px-3 md:px-4 py-1 rounded-full shrink-0">
                <CiLock className="size-5 md:size-6" />
                <p className="text-sm md:text-xl">Pro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ value, label, color }: any) {
  const styles: any = {
    green: "bg-green-100 text-green-600 border-green-300 border-2",
    red: "bg-red-100 text-red-600 border-red-300 border-2",
    blue: "bg-blue-100 text-blue-600 border-blue-300 border-2",
    pink: "bg-pink-100 text-pink-600 border-pink-300 border-2",
    purple: "bg-purple-100 text-purple-600 border-purple-300 border-2",
    yellow: "bg-yellow-100 text-yellow-600 border-yellow-300 border-2",
  };

  return (
    <div
      className={`p-5 rounded-xl border text-center dark:bg-[#1c1c1c] ${styles[color]}`}
    >
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}
export default Page;

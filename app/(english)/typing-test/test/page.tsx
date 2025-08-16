"use client";
import CountdownTimer from "@/Components/client/typing-test/CountdownTimer";
import Image from "next/image";
import React from "react";

export default function page({
  searchParams,
}: {
  searchParams: { time?: string; level?: string };
}) {
  const time = searchParams.time;
  const level = searchParams.level;

  // Validate params (allow only permitted values)
  const allowedTimes = ["3", "5", "10"];
  const allowedLevels = ["Easy", "Medium", "Hard"];

  const validTime = time && allowedTimes.includes(time) ? time : null;
  const validLevel = level && allowedLevels.includes(level) ? level : null;

  if (!validTime || !validLevel) {
    // Redirect to home or show error
    // return redirect("/typing-test/start"); // Uncomment to redirect if params tampered
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Typing Test</h1>
        <p>
          Invalid or missing parameters detected! and Dont change the parameter
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center bg-[#FAFCFC] w-[90%] mx-auto m-2 ">
        {/* Level And Timer */}
        <div className="flex flex-row items-center justify-between w-[90%]">
          <div className="bg-[#007076] px-3 py-2 rounded mr-4">
            <p className="text-white">{validLevel}</p>
          </div>

          <div>
            <p className="text-2xl font-bold">Typing Test</p>
          </div>

          <div className="flex flex-row items-center">
            <Image
              src="/typing-test/stop-watch-black.svg"
              alt="Stop Watch"
              width={40}
              height={40}
            />
            <CountdownTimer minutes={Number(validTime)} />
          </div>
        </div>

        {/* Typing paragraph */}
        <div className="mt-8 w-full max-w-3xl p-4 bg-white rounded shadow">
          <p className="text-lg leading-relaxed">
            {/* Replace this text with your actual typing test paragraph */}
            The quick brown fox jumps over the lazy dog. This sentence contains
            every letter of the alphabet and is often used for typing practice.
          </p>
        </div>

        {/* Input box */}
        <div className="mt-4 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Start typing here..."
            className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#007076]"
            // Add handlers here for user input if needed
          />
        </div>
      </div>
    </>
  );
}

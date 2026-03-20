"use client";

import { AiOutlineThunderbolt } from "react-icons/ai";

type Props = {
  total: number;
  onStart: () => void;
};

export default function QuizIntro({ total, onStart }: Props) {
  return (
    <div className="dark:bg-black">
      <div className="max-w-[1400px] mx-auto w-[90%] py-4">
        <div className="flex flex-col border-2 mx-auto py-8 bg-[#FAFCFC] border-[#E6F1F1] rounded-2xl px-12 max-sm:px-6 dark:bg-[#313131]">

          {/* 🔥 Top Section (Merged Banner + Heading) */}
          <div className="flex flex-row items-center justify-between w-full flex-wrap gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="bg-[#047077] rounded-xl p-2">
                <AiOutlineThunderbolt className="text-white text-3xl" />
              </div>

              {/* Title */}
              <div className="flex flex-col text-start">
                <p className="font-montserrat font-bold text-2xl dark:text-white">
                  Quick Quiz
                </p>
                <p className="text-my-text-color">
                  Test Your Knowledge
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {/* Live badge */}
              <div className="bg-[#F4F4FC] px-4 py-1 rounded-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#11C352] inline-block"></span>
                <span className="text-sm font-medium">Live</span>
              </div>

              {/* Share button */}
              <button className="hidden max-md:hidden sm:block bg-[#2CBB0180] px-5 py-2 rounded-full font-semibold text-sm">
                Share
              </button>
            </div>
          </div>

          {/* 🔥 Middle Info */}
          <div className="flex items-center gap-2 mt-6">
            <p className="dark:text-white">
              <span className="font-semibold px-3 py-1 bg-[#EEF5FF] text-[#24B3CB] rounded-full mr-2">
                {total}
              </span>
              Questions
            </p>
          </div>

          {/* 🔥 Instructions */}
          <div className="flex flex-row max-sm:flex-col justify-between pt-6 pb-4 max-sm:gap-6">
            <ul className="font-bold space-y-2 dark:text-white text-left">
              <li>Click "Start Quiz" to begin.</li>
              <li>Answer all questions (or skip if unsure).</li>
              <li>Timer will auto-submit when time ends.</li>
              <li>Click "Check Result" to see your score.</li>
              <li>Review explanations to improve.</li>
            </ul>

            {/* Start Button */}
            <div className="flex items-end">
              <button
                onClick={onStart}
                className="px-6 py-2 bg-[#FFE332] rounded-full font-semibold"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
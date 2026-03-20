"use client";

import { useState, useEffect, useRef } from "react";
import { QuizItem } from "./quiz";


type Props = {
  quizData: QuizItem[];
  timeLimit: number; // in seconds
  onSubmit: (answers: string[], timeTaken: number) => void;
};

export default function QuizTest({
  quizData,
  timeLimit,
  onSubmit,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(quizData.length).fill("")
  );

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const startTimeRef = useRef(Date.now());

  const currentQuestion = quizData[current];

  // ✅ TIMER
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ SELECT (toggle)
  const handleSelect = (option: string) => {
    const updated = [...answers];

    updated[current] =
      updated[current] === option ? "" : option;

    setAnswers(updated);
  };

  // ✅ NAVIGATION
  const handleNext = () => {
    if (current < quizData.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  // ✅ SUBMIT
  const handleSubmit = () => {
    const now = Date.now();
    const timeTaken = Math.floor(
      (now - startTimeRef.current) / 1000
    );

    onSubmit(answers, timeTaken);
  };

  return (
    <div className="dark:bg-black">
      <div className="md:p-6 max-md:py-4 max-md:px-2 mx-auto shadow-[0_0_12px_rgba(0,0,0,0.3)] max-md:w-[100%] w-[70%] bg-white rounded-2xl my-4 dark:bg-[#313131]">

        {/* 🔥 TOP BAR (progress + timer) */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-left text-gray-500 dark:text-gray-300">
            {current + 1} / {quizData.length}
          </p>

          {/* TIMER */}
          <p className="text-sm font-semibold text-red-500">
            ⏱ {timeLeft}s
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="bg-gray-200 h-2 w-[60%] rounded mb-4 mx-auto">
          <div
            className="bg-[#047077] h-2 rounded"
            style={{
              width: `${((current + 1) / quizData.length) * 100}%`,
            }}
          />
        </div>

        {/* QUESTION */}
        <h3 className="text-lg font-semibold mb-4 dark:text-white">
          {currentQuestion.question}
        </h3>

        {/* OPTIONS */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = answers[current] === option;

            return (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="w-full flex justify-between items-center px-4 py-3 border border-[#DADADA] shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-xl transition hover:bg-gray-50 dark:hover:bg-[#222]"
              >
                <span className="text-left dark:text-white">
                  {option}
                </span>

                {/* DOT */}
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${
                    isSelected
                      ? "border-[#047077]"
                      : "border-gray-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-[#047077]" : ""
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* NAVIGATION */}
        <div className="mt-6 flex justify-between">
          <button
            disabled={current === 0}
            onClick={handlePrev}
            className="px-4 py-2 bg-[#047077] text-white rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#047077] text-white rounded-xl"
          >
            {current === quizData.length - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
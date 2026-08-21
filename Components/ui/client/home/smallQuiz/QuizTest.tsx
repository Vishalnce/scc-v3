"use client";

import { useState } from "react";
import { QuizItem } from "./quiz";

type Props = {
  quizData: QuizItem[];
  onSubmit: (answers: string[]) => void;
};

export default function QuizTest({ quizData, onSubmit }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(quizData.length).fill(""),
  );


  const [answered, setAnswered] = useState(false);

  const currentQuestion = quizData[current];

  // Handle option select
const handleSelect = (option: string) => {
  if (answered) return;

  const updated = [...answers];
  updated[current] = option;

  setAnswers(updated);
  setAnswered(true);
};

  // Next / Submit
const handleNext = () => {
  if (current < quizData.length - 1) {
    setCurrent((prev) => prev + 1);
    setAnswered(false);
  } else {
    onSubmit(answers);
  }
};

  return (
    <div className="md:p-6 max-md:py-4 max-md:px-2 mx-auto shadow-[0_0_12px_rgba(0,0,0,0.3)] max-md:w-[100%] w-[70%] bg-white dark:bg-[#141212] dark:text-white rounded-2xl my-4">
      {/* Progress */}
      <p className="text-sm text-left text-gray-500 mb-2">
        {current + 1} / {quizData.length}
      </p>
      <div className=" bg-gray-200 dark:bg-[#F8FAFC1A] h-2 w-[60%] rounded mb-4 mx-auto">
        <div
          className="bg-[#047077] h-2 rounded"
          style={{
            width: `${((current + 1) / quizData.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>

      {/* Options */}
<div className="space-y-3">
  {currentQuestion.options.map((option, index) => {
    const isSelected = answers[current] === option;
    const isCorrect = option === currentQuestion.answer;

    let borderClass = "border-[#DADADA]";

    if (answered) {
      if (isCorrect) {
        borderClass = "border-green-500";
      } else if (isSelected) {
        borderClass = "border-red-500";
      }
    }

    return (
      <button
        key={index}
        disabled={answered}
        onClick={() => handleSelect(option)}
        className={`w-full flex justify-between items-center px-4 py-3 border-2 ${borderClass} shadow-[0_0_2px_rgba(0,0,0,0.3)] rounded-xl transition`}
      >
        <span className="text-left">{option}</span>

        <span
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
            ${
              answered && isCorrect
                ? "border-green-500"
                : answered && isSelected
                  ? "border-red-500"
                  : "border-gray-400"
            }
          `}
        >
          <span
            className={`w-2 h-2 rounded-full
              ${
                answered && isCorrect
                  ? "bg-green-500"
                  : answered && isSelected
                    ? "bg-red-500"
                    : ""
              }
            `}
          />
        </span>
      </button>
    );
  })}
</div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          disabled={current === 0}
         onClick={() => {
  setCurrent((prev) => prev - 1);
  setAnswered(false);
}}
          className="px-4 py-2 bg-[#047077] text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2 bg-[#047077] text-white rounded-xl"
        >
          {current === quizData.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

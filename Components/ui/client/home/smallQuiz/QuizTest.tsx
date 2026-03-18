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

  const currentQuestion = quizData[current];

  // Handle option select
  const handleSelect = (option: string) => {
    const updated = [...answers];
    updated[current] = option;
    setAnswers(updated);
  };

  // Next / Submit
  const handleNext = () => {
    if (current < quizData.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      onSubmit(answers);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Progress */}
      <p className="text-sm text-gray-500 mb-2">
        Question {current + 1} of {quizData.length}
      </p>
      <div className="w-full bg-gray-200 h-2 rounded mb-4">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{
            width: `${((current + 1) / quizData.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>

      {/* Options */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            className={`w-full text-left px-4 py-2 border rounded transition
              ${
                answers[current] === option
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          disabled={current === 0}
          onClick={() => setCurrent((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          {current === quizData.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

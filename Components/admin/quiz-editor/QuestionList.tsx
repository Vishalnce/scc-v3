"use client";

import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import Image from "next/image";

type QuestionWrapperProps = {
  id: number | null;
  setQuesId: (id: string | null) => void;
};

type OptionType = {
  text?: string;
  image?: string;
};

type QuestionType = {
  id: string;
  quizId: number;
  questionText?: string;
  questionImage?: string;
  options: OptionType[];
  solution?: string;
 
  correctOption: number;
  marksPositive: number;
  marksNegative: number;
  level: string;
  createdAt: string;
  updatedAt: string;
};

const QuestionList = ({ id, setQuesId }: QuestionWrapperProps) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = () => {
    if (!id) {
      setQuestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/en/question/admin?quizId=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((data: QuestionType[]) => {
        setQuestions(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  if (!id) return <div>No quiz selected.</div>;
  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (questions.length === 0) return <div>No questions found.</div>;

  console.log("Fetched questions:", questions);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Questions List
      </h2>

      <ul className="space-y-8">
        {questions.map((q, index) => (
          <li
            key={q.id}
            className="border rounded-xl p-5 bg-gray-50 dark:bg-[#1c1c1c] shadow-sm"
          >
            {/* Question Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Question {index + 1}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setQuesId(q.id)}
                  className="px-4 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
                >
                  Edit
                </button>
                <DeleteButton
                  quesId={q.id}
                  onDeleted={() => fetchQuestions()}
                />
              </div>
            </div>

            {/* Question Text & Image */}
            <div className="space-y-3">
              {q.questionText && (
                <p className="text-gray-800 dark:text-gray-300 text-base">
                  {q.questionText}
                </p>
              )}

              {q.questionImage && (
                <div className="relative w-full max-w-[500px] aspect-[16/9] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                  <Image
                    src={q.questionImage}
                    alt="Question image"
                    fill
                    className="object-contain bg-white dark:bg-[#111]"
                  />
                </div>
              )}
            </div>

            {/* Options (2x2 grid) */}
            <div className="mt-5">
              <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Options
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col gap-2 p-4 rounded-lg border ${
                      q.correctOption === idx + 1
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : "border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#2a2a2a]"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Option {idx + 1}
                    </p>
                    {opt.text && (
                      <p className="text-gray-700 dark:text-gray-300">
                        {opt.text}
                      </p>
                    )}
                    {opt.image && (
                      <img
                        src={opt.image}
                        alt={`Option ${idx + 1}`}
                        className="w-full max-w-[250px] h-[180px] object-contain rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e1e1e]"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Section */}
            {q.solution && (
              <div className="mt-2 text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Solution:</span>
                <div
                  className="mt-1 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: q.solution }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;

"use client";

import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

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
  solutionText?: string;
  solutionImage?: string;
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

    fetch(`/api/en/post-quiz/admin?postId=${id}`)
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

  return (
   <div className="max-w-[95%] mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-sm mt-4">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Questions List</h2>
  <ul className="space-y-8">
    {questions.map((q) => (
      <li key={q.id} className="flex justify-between items-start border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <div className="flex-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">Question:</label>
          {q.questionText && <p className="mb-3 text-gray-900">{q.questionText}</p>}
          {q.questionImage && (
            <img
              src={q.questionImage}
              alt="Question"
              className="w-[200px] h-[150px] object-cover rounded mb-4"
            />
          )}

          <label className="block font-semibold text-gray-700 mb-1">Options:</label>
          <ul className="list-decimal list-inside space-y-2 mb-4">
            {q.options.map((opt, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                {opt.text && <span className="text-gray-800">{opt.text}</span>}
                {opt.image && (
                  <img
                    src={opt.image}
                    alt={`Option ${idx + 1}`}
                    className="w-[150px] h-[100px] object-cover rounded"
                  />
                )}
              </li>
            ))}
          </ul>

          <div>
            {q.solutionText && (
              <p className="mb-2 text-green-700 font-semibold">Solution: {q.solutionText}</p>
            )}
            {q.solutionText && (
              <p className="mb-2 font-semibold">
                Correct option number: <span className="text-green-600">{q.correctOption}</span>
              </p>
            )}
            {q.solutionImage && (
              <img
                src={q.solutionImage}
                alt="Solution"
                className="w-[200px] h-[150px] object-cover rounded"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col ml-6 space-y-3">
          <button
            onClick={() => setQuesId(q.id)}
            className="btn-edit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <DeleteButton quesId={q.id} onDeleted={() => fetchQuestions()} />
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default QuestionList;

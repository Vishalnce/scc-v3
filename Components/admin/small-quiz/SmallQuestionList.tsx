"use client";

import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

type QuestionWrapperProps = {
 
  setQuesId: (id: string | null) => void;
};

type OptionType = {
  text?: string;
  image?: string;
};

type QuestionType = {
  id: string;

  questionText?: string;

  options: OptionType[];

  subject:string;
  correctOption: number | "";

 
  createdAt: string;
  updatedAt: string;
};


const QuestionList = ({ setQuesId }: QuestionWrapperProps) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = () => {
   

    setLoading(true);
    setError(null);

    fetch(`/api/en/small-quiz/admin/`)
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
  }, []);

  // if (!id) return <div>No quiz selected.</div>;
  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (questions.length === 0) return <div>No questions found.</div>;


  return (
<div className="max-w-[90%] mx-auto bg-white p-4 rounded-xl shadow space-y-4 border mt-5">
  <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
    Questions List
  </h2>

  <ul className="space-y-4">
    {questions.map((q) => (
      <li
        key={q.id}
        className="flex justify-between items-start bg-gray-50 p-4 rounded-xl border shadow-sm hover:shadow-md transition"
      >
        <div className="w-full space-y-3">

          {/* Question Row */}
          <div className="flex gap-3">
            <span className="font-semibold text-gray-500 ">Question:</span>
            <p className="text-gray-900 font-medium">{q.questionText}</p>
          </div>

          {/* Subject Row */}
          <div className="flex gap-3">
            <span className="font-semibold text-gray-500 ">Subject:</span>
            <p className="text-gray-800 capitalize">{q.subject}</p>
          </div>

          {/* Options Row */}
          <div className="flex gap-3 items-start">
            <span className="font-semibold text-gray-500">Options:</span>
            <ul className="space-y-0.5 text-gray-700">
              {q.options.map((opt, idx) => (
                <li key={idx} className="flex gap-1">
                  <span className="font-semibold">{idx + 1}.</span>
                  <span>{opt.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Correct Option Row */}
          <div className="flex gap-3">
            <span className="font-semibold text-gray-500 w-28">Correct:</span>
            <p className="font-bold text-green-700">{q.correctOption}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center ml-4 space-y-2">
          <button
            onClick={() => setQuesId(q.id)}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition w-20 text-sm"
          >
            Edit
          </button>

          <DeleteButton
            quesId={q.id}
            onDeleted={() => fetchQuestions()}
          />
        </div>
      </li>
    ))}
  </ul>
</div>


  );
};

export default QuestionList;

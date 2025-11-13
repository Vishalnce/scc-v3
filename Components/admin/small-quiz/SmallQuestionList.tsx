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
    <div className="max-w-[90%] mx-auto bg-white p-6 rounded-xl shadow space-y-8 border mt-5">
  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">Questions List</h2>
  <ul className="space-y-6">
    {questions.map((q) => (
      <li
        key={q.id}
        className="flex justify-between items-start bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-md transition"
      >
        <div className="w-full">
          {q.questionText && (
            <p className="text-lg font-semibold text-gray-900 mb-3">{q.questionText}</p>
          )}

          <ul className="list-decimal list-inside space-y-1 text-gray-700">
            {q.options.map((opt, idx) => (
              <li key={idx} className="">
                {opt.text && <span>{opt.text}</span>}
              </li>
            ))}
          </ul>

          <p className="mt-3 font-medium text-green-700">
            Correct Option number: <span className="font-bold">{q.correctOption}</span>
          </p>
        </div>

        <div className="flex flex-col items-center ml-6 space-y-3">
          <button
            onClick={() => setQuesId(q.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-20"
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

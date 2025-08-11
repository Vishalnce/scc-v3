"use client";

import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

type QuestionWrapperProps = {
  id: number | null;
  setQuesId: (id: string | null) => void;
};

type QuestionType = {
  id: string;
  quizId: number;
  question: string;
  options: string[];
  correctOption: number;
  solution: string;
  marksPositive: number;
  marksNegative: number;
  level: string;
  createdAt: string;
  updatedAt: string;
};

const QuestionList = ({ id,setQuesId  }: QuestionWrapperProps) => {
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

  return (
    <div>
      <h2>Questions List</h2>
      <ul>
        {questions.map((q) => (
          <div className="flex flex-row justify-between">
            {/* question list  */}
            <li key={q.id}>
              <strong>{q.question}</strong>
              <ul>
                {q.options.map((opt, idx) => (
                  <li key={idx}>
                    {idx + 1}. {opt}
                  </li>
                ))}
              </ul>
            </li>

            {/* edit button and delete button */}
            <div className="flex flex-col">
              <button onClick={() => setQuesId(q.id)} className="btn-edit">
                Edit
              </button>

              <DeleteButton quesId={q.id} onDeleted={fetchQuestions} />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;

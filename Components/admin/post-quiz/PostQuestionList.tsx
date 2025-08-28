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
    <div>
      <h2>Questions List</h2>
      <ul>
        {questions.map((q) => (
          <div className="flex flex-row justify-between mb-4" key={q.id}>
            <li>
              <div>
                {q.questionText && <p>{q.questionText}</p>}
                {q.questionImage && (
                  <img
                    src={q.questionImage}
                    alt="Question"
                    className="w-[200px] h-[150px] object-cover rounded"
                  />
                )}
              </div>

              <ul className="mt-2">
                {q.options.map((opt, idx) => (
                  <li key={idx} className="mb-1">
                    {opt.text && (
                      <span>
                        {idx + 1}. {opt.text}
                      </span>
                    )}
                    {opt.image && (
                      <img
                        src={opt.image}
                        alt={`Option ${idx + 1}`}
                        className="w-[150px] h-[100px] object-cover rounded ml-2"
                      />
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-2">
                {q.solutionText && <p>Solution: {q.solutionText}</p>}
                {q.solutionText && <p>Solution: {typeof(q.id)}</p>}

                {q.solutionImage && (
                  <img
                    src={q.solutionImage}
                    alt="Solution"
                    className="w-[200px] h-[150px] object-cover rounded"
                  />
                )}
              </div>
            </li>

            {/* edit and delete */}
            <div className="flex flex-col ml-4">
              <button onClick={() => setQuesId(q.id)} className="btn-edit mb-2">
                Edit
              </button>
              <DeleteButton quesId={q.id} onDeleted={() => fetchQuestions()} />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;

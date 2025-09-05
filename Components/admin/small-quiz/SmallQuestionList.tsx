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
    <div>
      <h2>Questions List</h2>
      <ul>
        {questions.map((q) => (
          <div className="flex flex-row justify-between mb-4" key={q.id}>
            <li>
              <div>
                {q.questionText && <p>{q.questionText}</p>}
               
              </div>

              <ul className="mt-2">
                {q.options.map((opt, idx) => (
                  <li key={idx} className="mb-1">
                    {opt.text && (
                      <span>
                        {idx + 1}. {opt.text}
                      </span>
                    )}
                  
                  </li>
                ))}
              </ul>

                   <div>
                <p>
                  Correct Option number {q.correctOption}
                </p>
               
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

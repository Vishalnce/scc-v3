"use client";

import { useEffect, useState } from "react";
import QuizIntro from "./QuizIntro";
import QuizTest from "./QuizTest";
import QuizResult from "./QuizResult";
import { QuizItem, QuizAPI } from "./quiz";

type Step = "intro" | "test" | "result";

export default function QuizContainer() {
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleRestart = () => {
    setStep("intro");
    setAnswers([]);
  };
  useEffect(() => {
    async function fetchQuiz() {
      try {
        setLoading(true);

        const res = await fetch(`/api/en/small-quiz/client`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data: QuizAPI[] = await res.json();

        const transformed: QuizItem[] = data.map((q) => ({
          question: q.questionText,
          subject: q.subject,
          options: q.options.map((opt) => opt.text),
          answer: q.options[q.correctOption - 1]?.text || "",
        }));

        setQuizData(transformed);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, []);

  const handleStart = () => setStep("test");

  const handleSubmit = (userAnswers: string[]) => {
    setAnswers(userAnswers);
    setStep("result");
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div>
        <div className="p-6 max-md:px-2 text-center max-w-[1400px] w-[90%] mx-auto flex flex-col items-center justify-center bg-[#F8FAFC]">
          {/* gor heading */}
          <div>
            <p className="text-2xl font-bold"> Live Quiz</p>
            <p className="text-[#6F6F6F]">Your Daily Exam Prep Partner</p>
          </div>
          {step === "intro" && (
            <QuizIntro total={quizData.length} onStart={handleStart} />
          )}

          {step === "test" && (
            <QuizTest quizData={quizData} onSubmit={handleSubmit} />
          )}

          {step === "result" && (
            <QuizResult
              quizData={quizData}
              answers={answers}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </>
  );
}

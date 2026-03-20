"use client";

import { useEffect, useState } from "react";
import QuizIntro from "./QuizIntro";
import QuizTest from "./QuizTest";
import QuizResult from "./QuizResult";

type Step = "intro" | "test" | "result";

export type QuizItem = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

export default function QuizContainer({
  postId,
  timeLimit,
  topic,
}: {
  postId: number;
  timeLimit: number;
  topic: string;
}) {
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeTaken, setTimeTaken] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ FETCH FROM YOUR ORIGINAL API
  useEffect(() => {
    async function fetchQuiz() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/en/post-quiz/client?postId=${postId}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        // ✅ NORMALIZE DATA (IMPORTANT)
const transformed: QuizItem[] = data.map((q: any) => ({
  id: q.id,
  question: q.questionText, // ✅ FIX HERE
  options: q.options.map((opt: any) => opt.text), // ✅ already needed
  correctAnswer: q.options[q.correctOption - 1]?.text || "",
  explanation: q.solutionText,
}));

        setQuizData(transformed);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading quiz");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [postId]);

  // ✅ HANDLERS
  const handleStart = () => setStep("test");

  const handleSubmit = (userAnswers: string[], time: number) => {
    setAnswers(userAnswers);
    setTimeTaken(time);
    setStep("result");
  };

  const handleRestart = () => {
    setStep("intro");
    setAnswers([]);
    setTimeTaken(0);
  };

  // ✅ STATES
  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!quizData.length) return null;

  return (
    <div className="dark:bg-black">
      <div className="p-6 max-md:px-2 text-center max-w-[1400px] w-[90%] mx-auto bg-[#F8FAFC] dark:bg-black">

        {/* OPTIONAL HEADER */}
        <div className="mb-6">
          <p className="text-2xl font-bold dark:text-white">
            Live Quiz
          </p>
          <p className="text-[#6F6F6F]">
            {topic}
          </p>
        </div>

        {/* FLOW */}
        {step === "intro" && (
          <QuizIntro onStart={handleStart}  total={quizData.length}  />
        )}

        {step === "test" && (
          <QuizTest
            quizData={quizData}
            timeLimit={timeLimit}
            onSubmit={handleSubmit}
          />
        )}

        {step === "result" && (
          <QuizResult
            quizData={quizData}
            answers={answers}
            timeTaken={timeTaken}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
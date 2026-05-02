"use client";
import { useEffect, useState } from "react";
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
import QuizLogin from "./QuizLogin";
import QuizResult from "./QuizResult";

export default function QuizSection({
  postId,

  topic,
}: {
  postId: number;
  
  topic: string;
}) {
  const [stage, setStage] = useState<"intro" | "quiz" | "login" | "result">(
    "intro"
  );

  const [answers, setAnswers] = useState<
    { questionId: string; answer: number | null }[]
  >([]);

  const [timeTaken, setTimeTaken] = useState<number>(0);

  const [questions, setQuestion] = useState<any[]>([]);

  const totalQuestion = questions.length;

  async function fetchQuizPost(postId: number) {
    try {
      const res = await fetch(
        `/api/en/editorial-quiz/client?postId=${postId}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setQuestion(data);
    } catch (error) {
      console.error("The error in quiz part is", error);
    }
  }

  useEffect(() => {
    fetchQuizPost(postId);
  }, [postId]);

  if (questions.length === 0) return null;

  let content;

  if (stage === "intro") {
    content = (
      <QuizIntro
   
        totalQuestion={totalQuestion}
        onStart={() => setStage("quiz")}
      />
    );
  }

  if (stage === "quiz") {
    content = (
      <QuizQuestion
        questions={questions}
        topic={topic}
      
        setTimeTaken={setTimeTaken}
        onFinish={(a) => {
          setAnswers(a);
          setStage("result");
        }}
      />
    );
  }

  if (stage === "result") {
    content = (
      <QuizResult
        quizData={questions}
    answers={answers}
    onRestart={() => setStage("intro")}
      />
    );
  }

  //  single wrapper for all
  return (
    <div className="dark:bg-black bg-[#F8FAFC] ">
      <div className="max-w-[1400px] mx-auto w-[70%]  max-md:w-[90%] py-4 flex flex-col items-center justify-center">
        
        {/* Header */}
        <div className="py-4 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">Live quiz</p>
          <p className="text-[#6F6F6F]">Your Daily Exam Prep Partner</p>
        </div>

        {/* Dynamic Component */}
        {content}
      </div>
    </div>
  );
}
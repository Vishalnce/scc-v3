"use client";
import { useEffect, useState } from "react";
import QuizIntro from "./QuizIntro"
import QuizQuestion from "./QuizQuestion";
import QuizLogin from "./QuizLogin";
import QuizResult from "./QuizResult";
import { constructFromSymbol } from "date-fns/constants";
import { set } from "date-fns";



export default function QuizSection({ postId,timeLimit }: { postId: number,timeLimit:number }) {


  const [stage, setStage] = useState<"intro" | "quiz" | "login" | "result">("intro");

    const [answers, setAnswers] = useState<{ questionId: string; answer: number | null }[]>([]);

  const [timeTaken,setTimeTaken] = useState<number>(0)

  const [questions,setQuestion] =useState<string[]>([])

 async function fetchQuizPost(postId: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/post-quiz/client?postId=${postId}`,
      { cache: "no-store" } // optional: to avoid stale data in Next.js
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();  // ✅ parse JSON
    setQuestion(data);

    return data; // should be your array of objects
  } catch (error) {
    console.error("The error in quiz part is", error);
    return null;
  }
}
 

  useEffect(() => {
    fetchQuizPost(postId)
  },[postId])



  if (stage === "intro") 
    return <QuizIntro onStart={() => setStage("quiz")} />;

   if (stage === "quiz")
    return (
      <QuizQuestion
        questions={questions}
        timeLimit={timeLimit}
        setTimeTaken={setTimeTaken}
        onFinish={(a: { questionId: string; answer: number | null }[]) => {
          setAnswers(a);        // store answers as objects
          setStage("result");   // move to result page
        }}
      />
    );


    // add login check feature 
    // you add feature same as pass one function result 

  if (stage === "result") 
    return <QuizResult questions={questions} timeTaken={timeTaken} answers={answers} onRestart={() => {
      setStage("intro")
    }} />;

  return null;
}

"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import LevelWise from "./LevelWise";
import MarksCard from "./MarksCard";
import Explanation from "./Explanation";
import RankCard from "./RankCard";
import RelatedConcept from "./RelatedConcept";
import RelatedQuiz from "./RelatedQuiz";
export default function QuizResult({
  questions,
  quizId,
  answers,
  topic,
  timeTaken,
  timeLimit,
  onRestart,
}: {
  questions: any[];
  quizId: number;
  timeTaken: number;
  timeLimit: number;
  topic: string;
  answers: { questionId: string; answer: number | null }[];
  onRestart: () => void;
}) {
  const marksCardRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (marksCardRef.current) {
    const top = marksCardRef.current.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: top - 100, // adjust this number (50, 80, 120…)
      behavior: "smooth",
    });
  }
}, []);


  return (
    <div className="max-w-[1400px] mx-auto dark:bg-black  sm:py-14 pt-14 pb-4 ">
      {/* Header card */}

      <div ref={marksCardRef}>
        <MarksCard
          questions={questions}
          answers={answers}
          timeTaken={timeTaken}
          timeLimit={timeLimit}
          onRestart={onRestart}
          quizId={quizId}
        />
      </div>

      {/* Explanation section */}

      <Explanation questions={questions} answers={answers} topic={topic} />

      {/* Performance by Level */}
      <LevelWise questions={questions} answers={answers} />

      <RankCard quizId={quizId} />

      <RelatedConcept topic = {topic}/>
      <RelatedQuiz topic = {topic}/>



    </div>
  );
}

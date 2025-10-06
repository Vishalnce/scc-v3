import React from "react";

type Props = {
  questions: any;
  answers: any;
};

export default function LevelWise({ questions, answers }: Props) {
  const calculatePerformanceByLevel = () => {
    const levels = ["easy", "medium", "hard"]; // adjust if you use lowercase
    const stats: Record<
      string,
      { total: number; attempted: number; correct: number; incorrect: number }
    > = {};

    levels.forEach((lvl) => {
      stats[lvl] = { total: 0, attempted: 0, correct: 0, incorrect: 0 };
    });

    questions.forEach((q: any) => {
      const level = q.level; // e.g., "Easy" | "Medium" | "Hard"
      if (!stats[level]) return;

      stats[level].total++;

      const userAnswer = answers.find(
        (a: any) => a.questionId === q.id
      )?.answer;
      const correctIndex = q.correctOption - 1;

      if (userAnswer != null) {
        stats[level].attempted++;
        if (userAnswer === correctIndex) {
          stats[level].correct++;
        } else {
          stats[level].incorrect++;
        }
      }
    });

    return stats;
  };

  const performanceByLevel = calculatePerformanceByLevel();
  return (
    <>
      <div className="w-[90%] mx-auto py-8">
        <h2 className="text-lg font-bold dark:text-white mb-4  text-center">
          Level wise Performance Report Card
        </h2>

        <div className="mx-auto w-full max-sm:w-full">
          <p className="font-bold text-lg text-center">Performance by Level</p>

          <div className="flex flex-col py-4">
            {/* Header */}
            <div className="flex flex-row justify-between py-2 text-sm  text-center bg-[#E6F1F1] dark:bg-gray-700 font-bold px-4 rounded-t-2xl">
              <p className="w-[20%]">Level</p>
              <p className="w-[20%]">Total </p>
              <p className="w-[20%]">Attempt</p>
              <p className="w-[20%]">Correct</p>
              <p className="w-[20%]">Incorrect</p>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-2 text-center bg-[#FAFCFC] py-2 rounded-b-2xl">
              {Object.entries(performanceByLevel).map(([level, data]) => (
                <div
                  key={level}
                  className="flex flex-row justify-between items-center px-4 py-1  "
                >
                  <p className="w-[20%] capitalize">
                    {level === "easy"
                      ? "Easy"
                      : level === "medium"
                        ? "Medium"
                        : "Hard"}
                  </p>
                  <p className="w-[20%]">{data.total}</p>
                  <p className="w-[20%]">{data.attempted}</p>
                  <p className="w-[20%] text-green-600">{data.correct}</p>
                  <p className="w-[20%] text-red-500">{data.incorrect}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

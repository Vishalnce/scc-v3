import React from 'react'


type Props = {
  questions:any
  answers:any
}

export default function LevelWise( {questions , answers}:Props) {

    const calculatePerformanceByLevel = () => {
    const levels = ["easy", "medium", "hard"]; // adjust if you use lowercase
    const stats: Record<
      string,
      { total: number; attempted: number; correct: number; incorrect: number }
    > = {};

    levels.forEach((lvl) => {
      stats[lvl] = { total: 0, attempted: 0, correct: 0, incorrect: 0 };
    });

    questions.forEach((q:any) => {
      const level = q.level; // e.g., "Easy" | "Medium" | "Hard"
      if (!stats[level]) return;

      stats[level].total++;

      const userAnswer = answers.find((a:any) => a.questionId === q.id)?.answer;
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

        <table className="table-auto w-full border-collapse     ">
          <thead className="bg-[#E6F1F1] dark:bg-gray-700 ">
            <tr>
              <th className=" px-4 py-2">Level</th>
              <th className=" px-4 py-2">Total Questions</th>
              <th className="px-4 py-2">Attempted</th>
              <th className=" px-4 py-2 ">Correct</th>
              <th className=" px-4 py-2 ">Incorrect</th>
            </tr>
          </thead>
          <tbody className="bg-[#FAFCFC]">
            {Object.entries(performanceByLevel).map(([level, data]) => (
              <tr
                key={level}
                className=""
              >
                <td className=" px-4 py-2  text-center">{level === "easy" ? "Easy" : level === "medium" ? "Medium" : "Hard"}
</td>
                <td className=" px-4 py-2 text-center">{data.total}</td>
                <td className=" px-4 py-2 text-center">{data.attempted}</td>
                <td className="px-4 py-2 text-center ">
                  {data.correct}
                </td>
                <td className=" px-4 py-2 text-center ">
                  {data.incorrect}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

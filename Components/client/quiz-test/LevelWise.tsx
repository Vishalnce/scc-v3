import React from "react";

type Props = {
  questions: any;
  answers: any;
};

type MetricKey = "total" | "attempted" | "correct" | "incorrect";

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
        (a: any) => a.questionId === q.id,
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

  const levels = ["easy", "medium", "hard"];

  const metrics: { key: MetricKey; label: string }[] = [
    { key: "total", label: "Total" },
    { key: "attempted", label: "Attempt" },
    { key: "correct", label: "Correct" },
    { key: "incorrect", label: "Incorrect" },
  ];
  return (
    <div className="w-[90%] max-md:w-[90%] mx-auto overflow-x-auto">
  <table className="w-full border-collapse text-center border border-[#DADADA] dark:border-[#444444]">

    {/* Header */}
    <thead>
      <tr className="dark:bg-[#191919] dark:text-white">

        <th className="border border-[#DADADA] dark:border-[#444444] p-2">
          Level
        </th>

        {levels.map((lvl) => (
          <th
            key={lvl}
            className={`border border-[#DADADA] dark:border-[#444444] p-2 capitalize ${
              lvl === "easy"
                ? "text-[#11C352] bg-[#F6FFF3] dark:bg-[#17351f]"
                : lvl === "medium"
                  ? "text-[#F89716] bg-[#FFFDFA] dark:bg-[#392d1c]"
                  : "text-[#F14343] bg-[#FEF5F5] dark:bg-[#3a2222]"
            }`}
          >
            {lvl}
          </th>
        ))}
      </tr>
    </thead>

    {/* Body */}
    <tbody className="bg-[#FAFCFC] dark:bg-[#242424] dark:text-white">

      {metrics.map((metric) => (
        <tr key={metric.key}>

          {/* Metric Name */}
          <td className="border border-[#DADADA] dark:border-[#444444] p-2 dark:bg-[#242424]">
            {metric.label}
          </td>

          {/* Values for each level */}
          {levels.map((lvl) => {
            const value =
              performanceByLevel[lvl]?.[metric.key] ?? 0;

            return (
              <td
                key={lvl}
                className={`border border-[#DADADA] dark:border-[#444444] p-2 ${
                  lvl === "easy"
                    ? "bg-[#F6FFF3] dark:bg-[#17351f]"
                    : lvl === "medium"
                      ? "bg-[#FFFDFA] dark:bg-[#392d1c]"
                      : "bg-[#FEF5F5] dark:bg-[#3a2222]"
                }`}
              >
                {value}
              </td>
            );
          })}

        </tr>
      ))}

    </tbody>

  </table>
</div>
  );
}

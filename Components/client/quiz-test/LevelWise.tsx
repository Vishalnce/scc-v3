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
    <div className="w-[90%] mx-auto py-8 rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.2)]">
      <h2 className="text-lg font-bold dark:text-white mb-4 text-center">
        Level wise Performance Report Card
      </h2>

      <div className=" w-[90%] max-md:w-[90%] mx-auto">
        <table className="w-full border-collapse border-[#DADADA] text-center">
          {/* Header */}
          <thead>
            <tr className=" dark:bg-[#191919] dark:text-white">
              <th className="border border-[#DADADA] p-2">Level</th>
              {levels.map((lvl) => (
                <th
                  key={lvl}
                  className={`border border-[#DADADA] p-2 capitalize ${
                    lvl === "easy"
                      ? "text-[#11C352] bg-[#F6FFF3]"
                      : lvl === "medium"
                        ? "text-[#F89716] bg-[#FFFDFA]"
                        : "text-[#F14343] bg-[#FEF5F5]"
                  }`}
                >
                  {lvl}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-[#FAFCFC] dark:bg-[#313131] dark:text-white">
            {metrics.map((metric) => (
              <tr key={metric.key}>
                {/* Metric Name */}
                <td className="border border-[#DADADA] p-2 ">
                  {metric.label}
                </td>

                {/* Values for each level */}
                {levels.map((lvl) => {
                  const value = performanceByLevel[lvl]?.[metric.key] ?? 0;

                  return (
                    <td
                      key={lvl}
                      className={`border border-[#DADADA] p-2 ${
                        lvl === "easy"
                          ? "bg-[#F6FFF3]"
                          : lvl === "medium"
                            ? "bg-[#FFFDFA]"
                            : "bg-[#FEF5F5]"
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
    </div>
  );
}

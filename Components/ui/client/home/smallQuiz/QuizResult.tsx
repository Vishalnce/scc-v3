import { QuizItem } from "./quiz";

type Props = {
  quizData: QuizItem[];
  answers: string[];
  onRestart: () => void;
};

export default function QuizResult({ quizData, answers, onRestart }: Props) {
  const total = quizData.length;

  const correct = quizData.reduce((acc, q, i) => {
    return acc + (answers[i] === q.answer ? 1 : 0);
  }, 0);

  const notAttempted = answers.filter((a) => !a).length;

  const incorrect = total - correct - notAttempted;

  const percentage = Math.round((correct / total) * 100);

  // 🎨 Color logic
  let color = "text-red-500";
  let stroke = "#ef4444";

  if (percentage >= 80) {
    color = "text-green-500";
    stroke = "#22c55e";
  } else if (percentage >= 30) {
    color = "text-yellow-500";
    stroke = "#eab308";
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <div className="p-6 max-w-xl mx-auto text-center">

      {/* 🎯 Circle Score */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg width="160" height="160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />

          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={stroke}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className={`text-2xl font-bold ${color}`}>
            {correct}/{total}
          </p>
          <p className="text-sm text-gray-500">{percentage}%</p>
        </div>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-3 rounded">
          <p className="font-bold text-green-600">{correct}</p>
          <p className="text-sm">Correct</p>
        </div>

        <div className="bg-red-100 p-3 rounded">
          <p className="font-bold text-red-600">{incorrect}</p>
          <p className="text-sm">Incorrect</p>
        </div>

        <div className="bg-gray-100 p-3 rounded">
          <p className="font-bold text-gray-600">{notAttempted}</p>
          <p className="text-sm">Not Attempted</p>
        </div>
      </div>

      {/* 🔁 Restart Button */}
      <button
        onClick={onRestart}
        className="px-6 py-2 bg-blue-500 text-white rounded"
      >
        Restart Quiz
      </button>

      {/* 📘 Detailed Answers */}
      
    </div>
  );
}
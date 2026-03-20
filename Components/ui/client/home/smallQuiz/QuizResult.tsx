import Image from "next/image";
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

  const messageShow = [
    {
      image: "/ui/client/TestIcons/1.png",
      mess: "Excellent!",
      color: "#11C352",
    },
    {
      image: "/ui/client/TestIcons/2.png",
      mess: "Good Job",
      color: "#24B3CB",
    },
    {
      image: "/ui/client/TestIcons/1.png",
      mess: "Needs Improvement!",
      color: "#F14343",
    },
  ];

  let messageIndex = 2; // default: Needs Improvement

  if (percentage >= 80) {
    messageIndex = 0; // Excellent
  } else if (percentage >= 40) {
    messageIndex = 1; // Good Job
  }

  const selectedMessage = messageShow[messageIndex];

  return (
    <div className="md:p-6 max-md:py-4 max-md:px-4 mx-auto shadow-[0_0_12px_rgba(0,0,0,0.3)] max-md:w-[100%] w-[70%] bg-white rounded-2xl my-4">
      {/* Ecellent good job and ineed imoprovement  */}
      <div className="flex flex-col items-center py-4">
        <div className="w-[4%]">
          <Image
            src={selectedMessage.image}
            width={300}
            height={300}
            alt="result"
            className="w-full h-auto object-contain"
          />
        </div>

        <p
          className="font-bold text-2xl"
          style={{ color: selectedMessage.color }}
        >
          {selectedMessage.mess}
        </p>

        <p className="text-[#6F6F6F]">Quiz Completed!</p>
      </div>

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
      <div className="grid grid-cols-3 gap-4 mb-6 ">
        <div className="bg-[#F8FAFC]  shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded md:py-8 py-2  pt-4">
          <p className="font-extrabold text-green-600 text-3xl">{correct}</p>
          <p className="text-lg text-[#6F6F6F] max-md:text-sm">Correct</p>
        </div>

        <div className="bg-[#F8FAFC] shadow-[0_0_4px_rgba(0,0,0,0.3)] md:py-8  py-2  pt-4 rounded">
          <p className="font-bold text-3xl text-red-600 ">{incorrect}</p>
          <p className="text-lg text-[#6F6F6F] max-md:text-sm">Incorrect</p>
        </div>

        <div className="bg-[#F8FAFC] shadow-[0_0_4px_rgba(0,0,0,0.3)] md:py-8  py-2 pt-2 rounded">
          <p className="font-bold text-3xl text-gray-600">{notAttempted}</p>
          <p className="text-lg text-[#6F6F6F] max-md:text-sm">Not Attempted</p>
        </div>
      </div>

      {/* 🔁 Restart Button */}
      <div className="flex flex-row justify-between ">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-[#047077] text-white rounded w-[45%] max-md:text-sm"
        >
          Restart Quiz
        </button>

        <button
    
          className="px-6 py-2 bg-[#F89716] text-white rounded w-[45%] max-md:text-sm"
        >
        More Quiz
        </button>
      </div>

      {/* 📘 Detailed Answers */}
    </div>
  );
}

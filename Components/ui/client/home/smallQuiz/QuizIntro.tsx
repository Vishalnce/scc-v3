type Props = {
  total: number;
  onStart: () => void;
};

export default function QuizIntro({ total, onStart }: Props) {
  const duration = 10; // minutes (dummy)

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Quiz</h2>

      <p className="mt-4 text-lg">
        Total Questions: <span className="font-semibold">{total}</span>
      </p>

      <p className="mt-2 text-lg">
        Duration: <span className="font-semibold">{duration} minutes</span>
      </p>

      <button
        onClick={onStart}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Start Quiz
      </button>
    </div>
  );
}
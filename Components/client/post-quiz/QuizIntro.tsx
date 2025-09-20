export default function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="p-6 border rounded-lg text-center">
      <h2 className="text-xl font-bold">Current Affairs Quiz</h2>
      <p className="text-sm text-gray-600 py-2">
        Test your knowledge with quick MCQs.
      </p>
      <button 
        onClick={onStart} 
        className="px-4 py-2 bg-[#007076] text-white rounded-lg"
      >
        Start Quiz
      </button>
    </div>
  );
}

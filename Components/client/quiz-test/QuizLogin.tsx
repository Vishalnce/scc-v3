import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SignInModal from "@/Components/ui/client/signin/SignInModal";

type LoginProps = {
  onFinish: () => void;
};

export default function QuizLogin({ onFinish }: LoginProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      onFinish();
    }
  }, [status, onFinish]);

  if (status === "loading") {
    return (
      <div className="p-6 border rounded-lg text-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="p-6 border rounded-lg text-center">
        <h2 className="text-lg font-bold">Login Required</h2>
        <p className="text-sm text-gray-600">
          Please login to attempt the quiz.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-[#007076] text-white rounded-lg"
        >
          Login
        </button>

        {isModalOpen && (
          <SignInModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    );
  }

  // Optional fallback while redirecting
  
}

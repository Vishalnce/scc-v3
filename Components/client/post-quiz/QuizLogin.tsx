import Link from "next/link";

export default function QuizLogin() {
  return (
    <div className="p-6 border rounded-lg text-center">
      <h2 className="text-lg font-bold">Login Required</h2>
      <p className="text-sm text-gray-600">Please login to attempt the quiz.</p>
      <Link href="/auth/login">
        <button className="mt-4 px-4 py-2 bg-[#007076] text-white rounded-lg">
          Login
        </button>
      </Link>
    </div>
  );
}

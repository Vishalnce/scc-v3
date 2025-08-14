"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeleteButton({ id }: { id: number}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleOnDelete() {
    try {
      const res = await fetch(
        `/api/en/quiz/admin?id=${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      // Reuse the full current query string
      const currentParams = searchParams.toString();
      router.push(`/quiz?${currentParams}`);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong while deleting.");
    }
  }

  return (
    <MdDelete
      onClick={handleOnDelete}
      className="text-red-500 size-6 cursor-pointer"
    />
  );
}

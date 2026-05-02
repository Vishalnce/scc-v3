"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function DeleteButton({
  quesId,
  onDeleted,
}: {
  quesId: string;
  onDeleted: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleOnDelete() {
    //  Prevent double click
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/en/blog-quiz/admin?quesId=${quesId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Failed to delete question");
      }

      onDeleted();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong while deleting.");
    } finally {
      setLoading(false); // ✅ always reset
    }
  }

  return (
    <button
      onClick={handleOnDelete}
      disabled={loading} // ✅ disable click
      className="disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <MdDelete
        className={`size-6 ${
          loading ? "text-gray-400" : "text-red-500"
        }`}
      />
    </button>
  );
}
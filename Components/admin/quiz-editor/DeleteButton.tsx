// /Components/client/current-affairs/EditButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeleteButton({
  quesId,
  onDeleted,
}: {
  quesId: string;
  onDeleted: () => void;
}) {
  const router = useRouter();

  async function handleOnDelete() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/question/admin?quesId=${quesId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      onDeleted(); // Trigger refresh after delete
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

// /Components/client/current-affairs/EditButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();

  async function handleOnDelete() {
    try {
      const res = await fetch(`/api/en/upcoming-exam/admin?slug=${slug}`, {
        method: "DELETE",
      });


      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      router.push("/upcoming-exam/");
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

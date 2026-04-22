"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { deleteImage } from "@/Components/admin/shared-admin-code/DeleteURL";
import { extractImages } from "@/Components/admin/shared-admin-code/ExtractHTML";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  async function handleOnDelete() {
    if (loading) return;
    setLoading(true);

    try {
      // 1️ get questions
      const qRes = await fetch(`/api/en/question/admin?quizId=${id}`);
      const questions = await qRes.json();

      const allImages: string[] = [];

      // 2️ collect all images
      for (const q of questions) {
        if (q.questionImage) {
          allImages.push(q.questionImage);
        }

        if (q.options) {
          const opts =
            typeof q.options === "string"
              ? JSON.parse(q.options)
              : q.options;

          for (const opt of opts) {
            if (opt?.image) {
              allImages.push(opt.image);
            }
          }
        }

        if (q.solution) {
          const imgs = extractImages(q.solution);
          allImages.push(...imgs);
        }
      }

      // 3️ delete all images in parallel
      await Promise.all(
        allImages.map((img) =>
          deleteImage(img).catch(() =>
            console.error("Failed:", img)
          )
        )
      );

      // 4️ delete quiz
      const res = await fetch(`/api/en/quiz/admin?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      // 5️ redirect
      const currentParams = searchParams.toString();
      router.push(`/quiz?${currentParams}`);

    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MdDelete
      onClick={handleOnDelete}
      className={`size-6 ${
        loading
          ? "text-gray-400 cursor-not-allowed"
          : "text-red-500 cursor-pointer"
      }`}
    />
  );
}
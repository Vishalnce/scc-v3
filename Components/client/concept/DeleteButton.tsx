"use client";

import { deleteImage } from "@/Components/admin/shared-admin-code/DeleteURL";
import { extractImages } from "@/Components/admin/shared-admin-code/ExtractHTML";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  async function handleOnDelete() {
    if (loading) return; 
    setLoading(true);

    try {
      //  Fetch concept
      const resGet = await fetch(`/api/en/concept/admin?slug=${slug}`);
      const data = await resGet.json();

    
      if (!resGet.ok) {
        throw new Error("Failed to fetch concept");
      }

   

      //  Collect images (same pattern as your post)
      const editorImages = extractImages(data.editorHtml || "");

      const allImages = [...editorImages];

      //  Delete images (parallel)
      await Promise.all(allImages.map((url) => deleteImage(url)));

      //   existing delete
      const res = await fetch(`/api/en/concept/admin?slug=${slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      //  Your existing redirect (UNCHANGED)
      const currentParams = searchParams.toString();
      router.push(`/concept?${currentParams}`);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MdDelete
      onClick={!loading ? handleOnDelete : undefined}
      className={`size-6 ${
        loading
          ? "text-gray-400 cursor-not-allowed pointer-events-none"
          : "text-red-500 cursor-pointer"
      }`}
    />
  );
}

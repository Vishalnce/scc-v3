"use client";

import { deleteImage } from "@/Components/admin/shared-admin-code/DeleteURL";
import { extractImages } from "@/Components/admin/shared-admin-code/ExtractHTML";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleOnDelete() {
    if (loading) return; // prevent double click

    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    setLoading(true);

    try {
      // 1. Fetch post
      const postRes = await fetch(
        `/api/en/current-affaris/admin?slug=${slug}`
      );

      const postData = await postRes.json();

      if (!postRes.ok) {
        throw new Error("Failed to fetch post");
      }

      const post = postData.post;

      // 2. Extract images
      const editorImages = extractImages(post.editorHtml || "");
      const coverImage = post.image ? [post.image] : [];

      const allImages = [...editorImages, ...coverImage];

      // 3. Delete images (parallel)
      await Promise.all(allImages.map((url) => deleteImage(url)));

      // 4. Delete post
      const res = await fetch(
        `/api/en/current-affaris/admin?slug=${slug}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      // 5. Redirect
      router.push("/current-affaris/");
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
      className={`size-6 cursor-pointer transition ${
        loading
          ? "text-gray-400 cursor-not-allowed animate-pulse"
          : "text-red-500 hover:text-red-600"
      }`}
    />
  );
}
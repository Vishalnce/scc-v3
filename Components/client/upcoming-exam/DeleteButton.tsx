"use client";

import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { deleteImage } from "@/Components/admin/shared-admin-code/DeleteURL";
import { extractImages } from "@/Components/admin/shared-admin-code/ExtractHTML";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleOnDelete() {
    if (isDeleting) return; // ✅ prevent double click

    setIsDeleting(true);

    try {
      console.log("Deleting post with slug:", slug);

      // 1. Fetch post
      const postRes = await fetch(
        `/api/en/upcoming-exam/admin?slug=${slug}`
      );
      const postData = await postRes.json();

      if (!postRes.ok) {
        throw new Error("Failed to fetch post");
      }

      const post = postData.post;

      // 2. Collect images
      const editorImages = extractImages(post.editorHtml || "");
      const coverImage = post.image ? [post.image] : [];

      const allImages = [...editorImages, ...coverImage];

      // 3. Delete images
      await Promise.all(allImages.map((url) => deleteImage(url)));

      // 4. Delete post
      const res = await fetch(
        `/api/en/upcoming-exam/admin?slug=${slug}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      // 5. Redirect
      router.push("/upcoming-exam/");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong while deleting.");
    } finally {
      setIsDeleting(false); // ✅ always reset
    }
  }

  return (
    <MdDelete
      onClick={handleOnDelete}
      className={`size-6 ${
        isDeleting
          ? "text-gray-400 cursor-not-allowed"
          : "text-red-500 cursor-pointer"
      }`}
    />
  );
}
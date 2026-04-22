// /Components/client/current-affairs/EditButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { deleteImage } from "@/Components/admin/shared-admin-code/DeleteURL";
import { extractImages } from "@/Components/admin/shared-admin-code/ExtractHTML"; 
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
    console.log("Deleting post with quesId:", quesId);
    // 1. Fetch post
    const postRes = await fetch(`/api/en/post-quiz/admin?quesId=${quesId}`);
    const postData = await postRes.json();

    if (!postRes.ok) {
      throw new Error("Failed to fetch post");
    }

    const post = postData.post;

    // 2. Collect images
    const editorImages = extractImages(post.editorHtml || []);
    const coverImage = post.image ? [post.image] : [];

    const allImages = [...editorImages, ...coverImage];

    // 3. Delete all images (parallel)
    await Promise.all(allImages.map((url) => deleteImage(url)));

    // 4. Delete post
    const res = await fetch(
      `/api/en/post-quiz/admin?quesId=${quesId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete post");
    }

    onDeleted();

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

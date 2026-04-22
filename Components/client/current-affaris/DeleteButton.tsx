// /Components/client/current-affairs/EditButton.tsx
"use client";

import { deleteImage } from "@/Components/admin/shared-admin-code/DeleteURL";
import { extractImages } from "@/Components/admin/shared-admin-code/ExtractHTML";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();

async function handleOnDelete() {
  try {
    console.log("Deleting post with slug:", slug);

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
  }
}

  return (
    <MdDelete
      onClick={handleOnDelete}
      className="text-red-500 size-6 cursor-pointer"
    />
  );
}

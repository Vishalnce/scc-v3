"use client";
import React, { useRef } from "react";
import { FaRegCommentDots } from "react-icons/fa";

type Props = {
  parentType: "postId" | "conceptId" | "quizId" | "blogId";
  parentId: number | undefined;
  onSuccess: () => void;
};

export default function CommentForm({
  parentType,
  parentId,
  onSuccess,
}: Props) {
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  async function handleSubmit() {
    try {
      if (!parentId) return;
      const comment = contentRef.current?.value;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/comment/client?${parentType}=${parentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: comment }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }
      const data = await res.json();
      console.log("Comment saved:", data);
      if (contentRef.current) contentRef.current.value = "";
      // Here you can call your API to save the comment
      // After success:
      onSuccess();
    } catch (error) {
      console.log("Eroor while save the Comment form ", error);
    }
  }

  return (
    <>
      <div className="bg-white ">
        <div className="w-[90%] mx-auto  flex flex-col border-2 border-[#E6F1F1] bg-[#FAFCFC] rounded-2xl px-2">
          {/* icon and heading */}

          <div className="flex flex-row   gap-3 py-4">
            <FaRegCommentDots className="my-auto size-8 text-[#007076] " />
            <p className="font-montserrat font-bold text-2xl"> Comments</p>
          </div>

          {/* inpur box and form  */}

          <div className="flex flex-col gap-2 pb-4">
            <textarea
              rows={4}
              placeholder="Write your comment here..."
              className="py-2 border-2 rounded-2xl bg-white text-my-text-color focus:outline-none  px-2 border-none"
              ref={contentRef}
            />

            <div className="">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#007076]  rounded-full text-white border-2"
              >
                Submmit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

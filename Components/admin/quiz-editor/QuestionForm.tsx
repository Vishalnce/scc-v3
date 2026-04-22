"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Editor from "@/Components/admin/editor-page";
import type { TocItem } from "@/Components/admin/toc";
import { extractImages } from "@/Components/admin/shared-admin-code/ExtractHTML";
import { deleteImage } from "@/Components/admin/shared-admin-code/DeleteURL";
type QuestionFormProps = {
  id: number | null;
  onSuccess: () => void;
  quesId: string | null;
  setQuesId: (id: string | null) => void;
};

type QuestionFormData = {
  questionText?: string; // matches optional questionText in model
  questionImage?: string; // matches optional questionImage in model

  options: {
    text?: string;
    image?: string;
  }[]; // matches Json array of options in model

  solution: string;

  correctOption: number;
  marksPositive: number;
  marksNegative: number;
  level: string;
};

type FormDataType = {};

function QuestionForm({ id, onSuccess, quesId, setQuesId }: QuestionFormProps) {
  const initialSolutionRef = useRef<string>(""); // ✅ ADD THIS
  const {
    register: registerQ,
    handleSubmit: handleSubmitQ,
    reset: resetQ,
    getValues,
  } = useForm<QuestionFormData>({
    defaultValues: {
      questionText: "",
      questionImage: "",
      options: [
        { text: "", image: "" },
        { text: "", image: "" },
        { text: "", image: "" },
        { text: "", image: "" },
      ],
      solution: "",
      correctOption: undefined,
      marksPositive: undefined,
      marksNegative: undefined,
      level: "easy",
    },
  });

  async function onSubmitQuestion(data: any) {
    const payload = {
      ...data,
      solution: editorData.html, // ✅ only string
    };

    console.log("Submitting question data:", payload);
    if (id === null) {
      console.error("Quiz ID is missing");
      return;
    }

    const fullData = {
      ...payload,
      quizId: id, // id comes from props //
    };

    try {
      const res = await fetch("/api/en/question/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit question: ${res.statusText}`);
      }

      const result = await res.json();
      console.log("Question submitted successfully:", result);
      // Optionally reset form here or show success message

      onSuccess();
      resetQ({
        questionText: "",
        questionImage: "",
        options: [
          { text: "", image: "" },
          { text: "", image: "" },
          { text: "", image: "" },
          { text: "", image: "" },
        ],
        solution: "",
        correctOption: undefined,
        marksPositive: undefined,
        marksNegative: undefined,
        level: "easy",
      });

      // Reset image previews and file states
      setQuestionImageFile(null);
      setQuestionImageUrl("");
      setOptionImageFiles([null, null, null, null]);
      setOptionImageUrls(["", "", "", ""]);
      initialSolutionRef.current = data.solution || "";
      setEditorData({
        html: "",
        toc: [],
      });

      setQuesId(null);
    } catch (error) {
      console.error("Error submitting question:", error);
      // Optionally show error notification to user
    }
  }

  useEffect(() => {
    if (!quesId) {
      resetQ();
      setEditorData({ html: "", toc: [] }); // ✅ also reset editor
      return;
    }

    fetch(`/api/en/question/admin?quesId=${quesId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resetQ({
          questionText: data.questionText || "",
          questionImage: data.questionImage || "",
          options: [
            {
              text: data.options?.[0]?.text ?? "",
              image: data.options?.[0]?.image ?? "",
            },
            {
              text: data.options?.[1]?.text ?? "",
              image: data.options?.[1]?.image ?? "",
            },
            {
              text: data.options?.[2]?.text ?? "",
              image: data.options?.[2]?.image ?? "",
            },
            {
              text: data.options?.[3]?.text ?? "",
              image: data.options?.[3]?.image ?? "",
            },
          ],
          solution: data.solution || "",
          correctOption: data.correctOption ?? undefined,
          marksPositive: data.marksPositive ?? undefined,
          marksNegative: data.marksNegative ?? undefined,
          level: data.level || "easy",
        });
        initialSolutionRef.current = data.solution || "";
        //  THIS IS THE FIX
        setEditorData({
          html: data.solution || "",
          toc: [],
        });

        setQuestionImageUrl(data.questionImage || "");
        setOptionImageUrls([
          data.options?.[0]?.image ?? "",
          data.options?.[1]?.image ?? "",
          data.options?.[2]?.image ?? "",
          data.options?.[3]?.image ?? "",
        ]);
      })
      .catch(console.error);
  }, [quesId, resetQ]);

async function updateQuestion(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();

  if (!quesId) {
    console.error("No question selected to update");
    return;
  }

  if (id === null) {
    console.error("Quiz ID is missing");
    return;
  }

  const data = getValues();

  const payload = {
    ...data,
    solution: editorData.html,
  };

  const fullData = {
    ...payload,
    quizId: id,
    quesId,
  };

  try {
    const res = await fetch("/api/en/question/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });

    if (!res.ok) throw new Error("Update failed");

    // ✅ DELETE ONLY AFTER SUCCESS
    const oldSolution = initialSolutionRef.current;
    const newSolution = editorData.html;

    if (oldSolution !== newSolution) {
      const oldImgs = extractImages(oldSolution);
      const newImgs = extractImages(newSolution);

      for (const img of oldImgs) {
        if (!newImgs.includes(img)) {
          await deleteImage(img);
        }
      }
    }

    // ✅ IMPORTANT: update reference for next edit cycle
    initialSolutionRef.current = newSolution;

    // ✅ RESTORE YOUR ORIGINAL FUNCTIONALITY
    onSuccess();

    resetQ({
      questionText: "",
      questionImage: "",
      options: [
        { text: "", image: "" },
        { text: "", image: "" },
        { text: "", image: "" },
        { text: "", image: "" },
      ],
      solution: "",
      correctOption: undefined,
      marksPositive: undefined,
      marksNegative: undefined,
      level: "easy",
    });

    setQuestionImageFile(null);
    setQuestionImageUrl("");
    setOptionImageFiles([null, null, null, null]);
    setOptionImageUrls(["", "", "", ""]);

    setEditorData({
      html: "",
      toc: [],
    });

    setQuesId(null);

  } catch (err) {
    console.error(err);
  }
}

  const [questionImageFile, setQuestionImageFile] = useState<File | null>(null);
  const [questionImageUrl, setQuestionImageUrl] = useState("");
  const [optionImageFiles, setOptionImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [optionImageUrls, setOptionImageUrls] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  const { data: session } = useSession();
  const [uploadingStatus, setUploadingStatus] = useState({
    question: false,
    solution: false,
    options: [false, false, false, false],
  });

  const questionFileRef = useRef<HTMLInputElement | null>(null);

  const [deletingStatus, setDeletingStatus] = useState({
    question: false,
    solution: false,
    options: [false, false, false, false], // ✅ FIXED
  });

  const uploadImage = async (
    file: File,
    callback: (url: string) => void,
    type: "question" | "solution" | { optionIndex: number },
  ) => {
    // set loading
    if (typeof type === "string") {
      setUploadingStatus((prev) => ({ ...prev, [type]: true }));
    } else {
      setUploadingStatus((prev) => {
        const newOptions = [...prev.options];
        newOptions[type.optionIndex] = true;
        return { ...prev, options: newOptions };
      });
    }

    try {
      // 1️ Get pre-signed URL from backend
      const res = await fetch("/api/aws/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const { uploadUrl, fileUrl } = await res.json();

      if (!uploadUrl) throw new Error("Failed to get upload URL");

      // 2️ Upload directly to S3
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("S3 upload failed");

      // 3️ Return final file URL
      callback(fileUrl);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    } finally {
      // reset loading
      if (typeof type === "string") {
        setUploadingStatus((prev) => ({ ...prev, [type]: false }));
      } else {
        setUploadingStatus((prev) => {
          const newOptions = [...prev.options];
          newOptions[type.optionIndex] = false;
          return { ...prev, options: newOptions };
        });
      }
    }
  };

  const deleteImageFromS3 = async (
    fileUrl: string,
    type: "question" | "solution" | { optionIndex: number },
    onSuccess?: () => void,
  ) => {
    if (!fileUrl) return;

    // set loading
    if (typeof type === "string") {
      setDeletingStatus((prev) => ({ ...prev, [type]: true }));
    } else {
      setDeletingStatus((prev) => {
        const newOptions = [...prev.options];
        newOptions[type.optionIndex] = true;
        return { ...prev, options: newOptions };
      });
    }

    try {
      // 1️⃣ Get delete presigned URL from backend
      const res = await fetch("/api/aws/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          fileUrl,
        }),
      });

      const { deleteUrl } = await res.json();

      if (!deleteUrl) throw new Error("Failed to get delete URL");

      // 2️⃣ Call S3 delete
      const deleteRes = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!deleteRes.ok) throw new Error("S3 delete failed");

      // 3️⃣ UI cleanup
      onSuccess?.();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting image");
    } finally {
      // reset loading
      if (typeof type === "string") {
        setDeletingStatus((prev) => ({ ...prev, [type]: false }));
      } else {
        setDeletingStatus((prev) => {
          const newOptions = [...prev.options];
          newOptions[type.optionIndex] = false;
          return { ...prev, options: newOptions };
        });
      }
    }
  };

  // handle options
  const uploadOptionImage = async (idx: number) => {
    const file = optionImageFiles[idx];
    if (!file) return alert("Select an image first");

    // loading ON
    setUploadingStatus((prev) => ({
      ...prev,
      options: prev.options.map((v, i) => (i === idx ? true : v)),
    }));

    try {
      // 1️⃣ get presigned URL from backend
      const res = await fetch("/api/aws/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const { uploadUrl, fileUrl } = await res.json();
      if (!uploadUrl) throw new Error("No upload URL");

      // 2️⃣ upload to S3
      const s3Res = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!s3Res.ok) throw new Error("S3 upload failed");

      // 3️⃣ update UI + form
      const newUrls = [...optionImageUrls];
      newUrls[idx] = fileUrl;
      setOptionImageUrls(newUrls);

      const currentOptions = getValues("options");
      currentOptions[idx].image = fileUrl;
      resetQ({ ...getValues(), options: currentOptions });
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      // loading OFF
      setUploadingStatus((prev) => ({
        ...prev,
        options: prev.options.map((v, i) => (i === idx ? false : v)),
      }));
    }
  };

  const removeOptionImage = async (idx: number) => {
    const url = optionImageUrls[idx];
    if (!url) return;

    setDeletingStatus((prev) => ({
      ...prev,
      options: prev.options.map((v, i) => (i === idx ? true : v)),
    }));

    try {
      // 1️⃣ CALL YOUR API (POST, not DELETE)
      const res = await fetch("/api/aws/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ fileUrl: url }),
      });

      const data = await res.json();

      if (!data.deleteUrl) throw new Error("No delete URL");

      // 2️⃣ ACTUAL DELETE TO S3
      const deleteRes = await fetch(data.deleteUrl, {
        method: "DELETE",
      });

      if (!deleteRes.ok) throw new Error("S3 delete failed");

      // 3️⃣ UI UPDATE
      setOptionImageUrls((prev) => {
        const newUrls = [...prev];
        newUrls[idx] = "";
        return newUrls;
      });

      setOptionImageFiles((prev) => {
        const newFiles = [...prev];
        newFiles[idx] = null;
        return newFiles;
      });

      const currentOptions = [...getValues("options")];
      currentOptions[idx] = {
        ...currentOptions[idx],
        image: "",
      };

      resetQ({
        ...getValues(),
        options: currentOptions,
      });
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    } finally {
      setDeletingStatus((prev) => ({
        ...prev,
        options: prev.options.map((v, i) => (i === idx ? false : v)),
      }));
    }
  };
  // for editor

  const [editorData, setEditorData] = useState<{
    html: string;
    toc: TocItem[];
  }>({
    html: "",
    toc: [],
  });

  //  const value = post?.editorHtml || "";

  const [isEditorTouched, setIsEditorTouched] = useState(false);
  return (
    <>
      <form
        onSubmit={handleSubmitQ(onSubmitQuestion)}
        className="p-6 space-y-6 border rounded-xl shadow bg-white dark:bg-[#111]"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-b pb-2">
          Add Question
        </h2>

        {/* QUESTION TEXT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Question Text
          </label>
          <textarea
            {...registerQ("questionText")}
            placeholder="Enter your question here"
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-[#1c1c1c] dark:text-white"
          />
        </div>

        {/* QUESTION IMAGE UPLOAD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Question Image (optional)
          </label>
          <div className="flex items-center gap-3">
            <input
              ref={questionFileRef}
              type="file"
              accept="image/*"
              onChange={(e) =>
                setQuestionImageFile(e.target.files?.[0] || null)
              }
              className="border p-2 rounded bg-gray-50 dark:bg-[#1c1c1c]"
            />
            <button
              type="button"
              disabled={uploadingStatus.question || !!questionImageUrl}
              onClick={() => {
                if (!questionImageFile) return alert("Select an image first");

                uploadImage(
                  questionImageFile,
                  (url) => {
                    setQuestionImageUrl(url);
                    resetQ({ ...getValues(), questionImage: url });

                    if (questionFileRef.current)
                      questionFileRef.current.value = "";
                  },
                  "question",
                );
              }}
              className={`px-4 py-2 rounded-lg text-white
    ${
      uploadingStatus.question || questionImageUrl
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
            >
              {uploadingStatus.question ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {questionImageUrl && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1 flex  items-center">
                Uploaded Image
                <button
                  type="button"
                  disabled={deletingStatus.question}
                  onClick={() =>
                    deleteImageFromS3(questionImageUrl, "question", () => {
                      setQuestionImageUrl("");
                      setQuestionImageFile(null);
                      resetQ({ ...getValues(), questionImage: "" });
                    })
                  }
                  className={`text-red-500 hover:text-red-600 ${
                    deletingStatus.question
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {deletingStatus.question ? "Removing..." : "Remove"}
                </button>
              </p>
              <img
                src={questionImageUrl}
                alt="Question Preview"
                className="object-cover w-48 h-32 rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* OPTIONS */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="p-3 border rounded-lg space-y-2 bg-gray-50 dark:bg-[#1c1c1c]"
          >
            <p className="font-semibold text-gray-700 dark:text-gray-200">
              Option {idx + 1}
            </p>

            {/* Option Text */}
            <input
              {...registerQ(`options.${idx}.text`)}
              placeholder={`Option ${idx + 1} text`}
              className="w-full p-2 border rounded bg-white dark:bg-[#2a2a2a] dark:text-white"
            />

            {/* File Input + Upload Button */}
            <div className="flex items-center gap-3">
              <input
                key={optionImageUrls[idx] || idx} // 👈 important for reset
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setOptionImageFiles((prev) => {
                    const newFiles = [...prev];
                    newFiles[idx] = file;
                    return newFiles;
                  });
                }}
                className="border p-2 rounded bg-gray-50 dark:bg-[#1c1c1c]"
              />

              <button
                type="button"
                disabled={
                  uploadingStatus.options[idx] || !!optionImageUrls[idx]
                }
                onClick={() => uploadOptionImage(idx)}
                className={`px-4 py-2 rounded-lg text-white ${
                  uploadingStatus.options[idx] || optionImageUrls[idx]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {uploadingStatus.options[idx] ? "Uploading..." : "Upload Image"}
              </button>
            </div>

            {/* Preview */}
            {optionImageUrls[idx] && (
              <div className="mt-2">
                <img
                  src={optionImageUrls[idx]}
                  alt={`Option ${idx + 1}`}
                  className="object-cover w-40 h-28 rounded border"
                />
                <button
                  type="button"
                  disabled={deletingStatus.options[idx]}
                  onClick={() => removeOptionImage(idx)}
                  className={`text-sm mt-1 ${
                    deletingStatus.options[idx]
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500"
                  }`}
                >
                  {deletingStatus.options[idx] ? "Removing..." : "Remove Image"}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* OTHER FIELDS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correct Option Number
            </label>
            <input
              type="number"
              {...registerQ("correctOption", { valueAsNumber: true })}
              className="w-full p-2 border rounded bg-gray-50 dark:bg-[#1c1c1c]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty Level
            </label>
            <select
              {...registerQ("level")}
              className="w-full p-2 border rounded bg-gray-50 dark:bg-[#1c1c1c]"
              defaultValue=""
            >
              <option value="" disabled>
                Select level
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Positive Marks
            </label>
            <input
              type="number"
              step="0.01"
              {...registerQ("marksPositive", { valueAsNumber: true })}
              className="w-full p-2 border rounded bg-gray-50 dark:bg-[#1c1c1c]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Negative Marks
            </label>
            <input
              type="number"
              step="0.01"
              {...registerQ("marksNegative", { valueAsNumber: true })}
              className="w-full p-2 border rounded bg-gray-50 dark:bg-[#1c1c1c]"
            />
          </div>
        </div>

        {/* SOLUTION */}
        <div>
          <Editor
            key={quesId || editorData.html}
            value={editorData.html}
            onSync={setEditorData}
            setIsEditorChange={setIsEditorTouched}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Add Question
          </button>
          <button
            type="button"
            onClick={updateQuestion}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
          >
            Update Question
          </button>
        </div>
      </form>
    </>
  );
}

export default QuestionForm;

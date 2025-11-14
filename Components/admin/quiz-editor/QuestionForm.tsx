"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useSession } from "next-auth/react";

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

  solutionText?: string; // matches optional solutionText
  solutionImage?: string; // matches optional solutionImage

  correctOption: number;
  marksPositive: number;
  marksNegative: number;
  level: string;
};

type FormDataType = {};

function QuestionForm({ id, onSuccess, quesId, setQuesId }: QuestionFormProps) {
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
      solutionText: "",
      solutionImage: "",
      correctOption: undefined,
      marksPositive: undefined,
      marksNegative: undefined,
      level: "easy",
    },
  });

  async function onSubmitQuestion(data: any) {
    if (id === null) {
      console.error("Quiz ID is missing");
      return;
    }

    const fullData = {
      ...data,
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
        solutionText: "",
        solutionImage: "",
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
      setSolutionImageFile(null);
      setSolutionImageUrl("");
      setQuesId(null);
    } catch (error) {
      console.error("Error submitting question:", error);
      // Optionally show error notification to user
    }
  }

  useEffect(() => {
    if (!quesId) {
      resetQ();
      setQuestionImageUrl("");
      setOptionImageUrls(["", "", "", ""]);
      setSolutionImageUrl("");
      return;
    }

    fetch(`/api/en/question/admin?quesId=${quesId}`)
      .then((res) => res.json())
      .then((data) => {
        // Update RHF form values
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
          solutionText: data.solutionText || "",
          solutionImage: data.solutionImage || "",
          correctOption: data.correctOption ?? undefined,
          marksPositive: data.marksPositive ?? undefined,
          marksNegative: data.marksNegative ?? undefined,
          level: data.level || "easy",
        });

        // Update preview states
        setQuestionImageUrl(data.questionImage || "");
        setOptionImageUrls([
          data.options?.[0]?.image ?? "",
          data.options?.[1]?.image ?? "",
          data.options?.[2]?.image ?? "",
          data.options?.[3]?.image ?? "",
        ]);
        setSolutionImageUrl(data.solutionImage || "");
      })
      .catch(console.error);
  }, [quesId, resetQ]);

  async function updateQuestion(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevent form submit

    if (!quesId) {
      console.error("No question selected to update");
      return;
    }

    if (id === null) {
      console.error("Quiz ID is missing");
      return;
    }

    // Get current form values
    const data = getValues();

    const fullData = {
      ...data,
      quizId: id,
      quesId, // send question id to update specific question
    };

    try {
      const res = await fetch("/api/en/question/admin", {
        method: "PATCH", // or PATCH depending on your API design
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      });

      if (!res.ok) {
        throw new Error(`Failed to update question: ${res.statusText}`);
      }

      const result = await res.json();
      console.log("Question updated successfully:", result);

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
        solutionText: "",
        solutionImage: "",
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
      setSolutionImageFile(null);
      setSolutionImageUrl("");
      setQuesId(null);
    } catch (error) {
      console.error("Error updating question:", error);
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
  const [solutionImageFile, setSolutionImageFile] = useState<File | null>(null);
  const [solutionImageUrl, setSolutionImageUrl] = useState("");
  const { data: session } = useSession();
  const [uploadingStatus, setUploadingStatus] = useState({
    question: false,
    solution: false,
    options: [false, false, false, false],
  });


  const questionFileRef = useRef<HTMLInputElement | null>(null);




  const uploadImage = async (
    file: File,
    callback: (url: string) => void,
    type: "question" | "solution" | { optionIndex: number }
  ) => {
    const formData = new FormData();
    formData.append("image", file);

    // set uploading true for specific image
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/api/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data?.url) {
        callback(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    } finally {
      // set uploading false
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
              onClick={() => {
                if (!questionImageFile) return alert("Select an image first");
                uploadImage(
                  questionImageFile,
                  (url) => {
                    setQuestionImageUrl(url);
                    resetQ({ ...getValues(), questionImage: url });

                     if (questionFileRef.current) questionFileRef.current.value = "";
                  },
                  "question"
                );
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
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
                  onClick={async () => {
                    if (!questionImageUrl) return;
                    try {
                      await fetch(
                        `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/api/delete?url=${questionImageUrl}`,
                        { method: "DELETE" }
                      );
                    } catch (error) {
                      console.error("Error deleting image:", error);
                    }
                    setQuestionImageUrl("");
                    setQuestionImageFile(null);
                    resetQ({ ...getValues(), questionImage: "" });
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
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
        disabled={uploadingStatus.options[idx]} // 👈 disable when uploading
        onClick={() => {
          const file = optionImageFiles[idx];
          if (!file) return alert("Select an image first");

          // 🔹 Set uploading true for this index
          setUploadingStatus((prev) => ({
            ...prev,
            options: prev.options.map((v, i) => (i === idx ? true : v)),
          }));

          uploadImage(
            file,
            (url) => {
              // 🔹 Update uploaded URL
              const newUrls = [...optionImageUrls];
              newUrls[idx] = url;
              setOptionImageUrls(newUrls);

              // 🔹 Update form
              const currentOptions = getValues("options");
              currentOptions[idx].image = url;
              resetQ({ ...getValues(), options: currentOptions });

              // 🔹 Reset upload state
              setUploadingStatus((prev) => ({
                ...prev,
                options: prev.options.map((v, i) => (i === idx ? false : v)),
              }));
            },
            { optionIndex: idx }
          );
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-60"
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
          onClick={() => {
            const newUrls = [...optionImageUrls];
            newUrls[idx] = "";
            setOptionImageUrls(newUrls);

            const newFiles = [...optionImageFiles];
            newFiles[idx] = null;
            setOptionImageFiles(newFiles);

            const currentOptions = getValues("options");
            currentOptions[idx].image = "";
            resetQ({ ...getValues(), options: currentOptions });
          }}
          className="text-red-500 hover:text-red-600 text-sm mt-1"
        >
          Remove Image
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Solution Text
          </label>
          <textarea
            {...registerQ("solutionText")}
            placeholder="Enter solution details"
            className="w-full p-3 border rounded bg-gray-50 dark:bg-[#1c1c1c]"
          />
        </div>

        {/* SOLUTION IMAGE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Solution Image (optional)
          </label>
          <div className="flex items-center gap-3">
            <input
            ref={questionFileRef}
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSolutionImageFile(e.target.files?.[0] || null)
              }
              className="border p-2 rounded bg-gray-50 dark:bg-[#1c1c1c]"
            />
            <button
              type="button"
              onClick={() => {
                if (!solutionImageFile) return alert("Select an image first");
                uploadImage(
                  solutionImageFile,
                  (url) => {
                    setSolutionImageUrl(url);
                    resetQ({ ...getValues(), solutionImage: url });
                      if (questionFileRef.current) questionFileRef.current.value = "";
                  },
                  "solution"
                );
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {uploadingStatus.solution ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {solutionImageUrl && (
            <div className="mt-3">
              <img
                src={solutionImageUrl}
                alt="Solution preview"
                className="object-cover w-48 h-32 rounded border"
              />
              <button
                type="button"
                onClick={() => {
                  setSolutionImageUrl("");
                  setSolutionImageFile(null);
                  resetQ({ ...getValues(), solutionImage: "" });
                }}
                className="text-red-500 hover:text-red-600 text-sm mt-1"
              >
                Remove
              </button>
            </div>
          )}
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

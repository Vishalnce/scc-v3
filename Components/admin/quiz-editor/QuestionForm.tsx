"use client";
import React, { useEffect, useState } from "react";
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
  const uploadImage = async (file: File, callback: (url: string) => void) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data?.url) {
        callback(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmitQ(onSubmitQuestion)}
        className="p-4 space-y-4 border rounded-md"
      >
        <h2 className="font-bold text-lg">Add Question</h2>
        <textarea
          {...registerQ("questionText")}
          placeholder="Question text"
          className="w-full p-2 border rounded"
        />
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setQuestionImageFile(e.target.files?.[0] || null)}
            className="border p-2"
          />

          {/* button  */}
          <button
            type="button"
            onClick={() => {
              if (!questionImageFile) return alert("Select an image first");
              uploadImage(questionImageFile, (url) => {
                setQuestionImageUrl(url); // preview
                resetQ({ ...getValues(), questionImage: url }); // update form value
              });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upload Image
          </button>

          {questionImageUrl && (
            <div className="relative w-[30%] h-[150px]">
              <p className="text-sm text-gray-600 flex justify-between items-center">
                Uploaded Image:
                <button
                  type="button"
                  className="text-red-500 text-sm ml-2"
                  onClick={async () => {
                    // Only delete if there is a URL

                    if (!questionImageUrl) return;
                    try {
                      const res = await fetch(
                        `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/api/delete?url=${questionImageUrl}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                          },
                        }
                      );
                    } catch (error) {
                      console.error("Fetch error:", error);
                    }
                    // Now clear state
                    setQuestionImageUrl("");
                    setQuestionImageFile(null);
                    resetQ({ ...getValues(), questionImage: "" });
                  }}
                >
                  Cancel
                </button>
              </p>
              <img
                src={questionImageUrl}
                alt="Question preview"
                className="object-cover w-full h-full rounded border"
              />
            </div>
          )}
        </div>

        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <input
              {...registerQ(`options.${idx}.text`)}
              placeholder={`Option ${idx + 1} text`}
              className="w-full p-2 border rounded"
            />

            {/* Image upload for option */}
            <input
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
              className="border p-2"
            />

            <button
              type="button"
              onClick={() => {
                const file = optionImageFiles[idx];
                if (!file) return alert("Select a file first");

                uploadImage(file, (url) => {
                  setOptionImageUrls((prev) => {
                    const newUrls = [...prev];
                    newUrls[idx] = url;
                    return newUrls;
                  });

                  // also set in form
                  const currentOptions = getValues("options");
                  currentOptions[idx].image = url;
                  resetQ({ ...getValues(), options: currentOptions });
                });
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Upload Image
            </button>

            {optionImageUrls[idx] && (
              <div className="relative w-[30%] h-[150px]">
                <p className="text-sm text-gray-600 flex justify-between items-center">
                  Uploaded Image:
                  <button
                    type="button"
                    className="text-red-500 text-sm ml-2"
                    onClick={() => {
                      const newUrls = [...optionImageUrls];
                      newUrls[idx] = "";
                      setOptionImageUrls(newUrls);

                      const newFiles = [...optionImageFiles];
                      newFiles[idx] = null;
                      setOptionImageFiles(newFiles);

                      // Reset form value
                      const currentOptions = getValues("options");
                      currentOptions[idx].image = "";
                      resetQ({ ...getValues(), options: currentOptions });

                      // Optionally: delete from server
                      // fetch(`/api/upload/delete?url=${optionImageUrls[idx]}`, { method: 'DELETE' });
                    }}
                  >
                    Cancel
                  </button>
                </p>
                <img
                  src={optionImageUrls[idx]}
                  alt={`Option ${idx + 1} preview`}
                  className="object-cover w-full h-full rounded border"
                />
              </div>
            )}
          </div>
        ))}

        <input
          type="number"
          {...registerQ("correctOption", { valueAsNumber: true })}
          placeholder="Correct option number "
          className="w-full p-2 border rounded"
        />

        <textarea
          {...registerQ("solutionText")}
          placeholder="Solution"
          className="w-full p-2 border rounded"
        />
        {/* for solution imaeg upload  */}

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSolutionImageFile(e.target.files?.[0] || null)}
            className="border p-2"
          />

          {/* button  */}
          <button
            type="button"
            onClick={() => {
              if (!solutionImageFile) return alert("Select an image first");
              uploadImage(solutionImageFile, (url) => {
                setSolutionImageUrl(url);
                resetQ({ ...getValues(), solutionImage: url });
              });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upload Image
          </button>

          {solutionImageUrl && (
            <div className="relative w-[30%] h-[228px]">
              <p className="text-sm text-gray-600 flex justify-between items-center">
                Uploaded Image:
                <button
                  type="button"
                  className="text-red-500 text-sm ml-2"
                  onClick={() => {
                    setSolutionImageUrl("");
                    setSolutionImageFile(null);
                    resetQ({ ...getValues(), solutionImage: "" });
                    // Optionally: delete from server
                    // fetch(`/api/upload/delete?url=${solutionImageUrl}`, { method: 'DELETE' });
                  }}
                >
                  Cancel
                </button>
              </p>
              <img
                src={solutionImageUrl}
                alt={"Uploaded image preview"}
                className="object-cover w-full h-full rounded border"
              />
            </div>
          )}
        </div>
        <input
          type="number"
          {...registerQ("marksPositive", { valueAsNumber: true })}
          placeholder="Marks Positive"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          {...registerQ("marksNegative", { valueAsNumber: true })}
          placeholder="Marks Negative"
          className="w-full p-2 border rounded"
          step="0.01"
        />
        <select
          {...registerQ("level")}
          className="w-full p-2 border rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Select difficulty level
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Question
        </button>
        <button onClick={updateQuestion}>Upadate question</button>
      </form>
    </>
  );
}

export default QuestionForm;

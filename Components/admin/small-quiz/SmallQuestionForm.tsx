"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Select from "react-select";
import { subjectOptions } from "@/constants/admin-quiz/options";
type QuestionFormProps = {
  // id: number | null;
  onSuccess: () => void;
  quesId: string | null;
  setQuesId: (id: string | null) => void;
};

type QuestionFormData = {
  questionText?: string; // matches optional questionText in model
  // questionImage?: string; // matches optional questionImage in model
  subject?: string; // ✅ ADD THIS
  options: {
    text?: string;
    // image?: string;
  }[]; // matches Json array of options in model

  correctOption: number | "";
};

type FormDataType = {};

type OptionType = { value: string; label: string };

function QuestionForm({ onSuccess, quesId, setQuesId }: QuestionFormProps) {
  const {
    register: registerQ,
    handleSubmit: handleSubmitQ,
    reset: resetQ,
    getValues,
  } = useForm<QuestionFormData>({
    defaultValues: {
      questionText: "",

      options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],

      correctOption: undefined,
    },
  });

  async function onSubmitQuestion(data: any) {
    if ("topic" in data) {
      delete data.topic;
    }

    console.log("Submitting question data:", data);

    try {
      const res = await fetch("/api/en/small-quiz/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],

        correctOption: "",
      });
    } catch (error) {
      console.error("Error submitting question:", error);
      // Optionally show error notification to user
    }
  }

  useEffect(() => {
    if (!quesId) {
      resetQ();

      return;
    }

    fetch(`/api/en/small-quiz/admin?quesId=${quesId}`)
      .then((res) => res.json())
      .then((data) => {
        // Update RHF form values
        resetQ({
          questionText: data.questionText || "",

          options: [
            {
              text: data.options?.[0]?.text ?? "",
            },
            {
              text: data.options?.[1]?.text ?? "",
            },
            {
              text: data.options?.[2]?.text ?? "",
            },
            {
              text: data.options?.[3]?.text ?? "",
            },
          ],

          correctOption: data.correctOption ?? undefined,
        });

        // Update preview states
      })
      .catch(console.error);
  }, [quesId, resetQ]);

  async function updateQuestion(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevent form submit

    if (!quesId) {
      console.error("No question selected to update");
      return;
    }

    // Get current form values
    const data = getValues();

    const fullData = {
      ...data,

      quesId, // send question id to update specific question
    };

    try {
      const res = await fetch("/api/en/small-quiz/admin", {
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

        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],

        correctOption: "",
      });

      // Reset image previews and file states

      setQuesId(null);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  }

  const [selectedSubject, setSelectedSubject] = useState<OptionType | null>(
    null
  );

  const handleSubjectChange = (option: OptionType | null) => {
    setSelectedSubject(option);
    resetQ({
      ...getValues(),
      subject: option?.value || "",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmitQ(onSubmitQuestion)}
        className="max-w-[90%] mx-auto bg-white p-8 rounded-xl shadow space-y-6 border"
      >
        <h2 className="font-bold text-2xl mb-6 text-gray-800">
          Add Question To Home Page
        </h2>

        <label className="block mb-2 font-medium text-gray-700">
          Question text
          <textarea
            {...registerQ("questionText")}
            placeholder="Enter your question here"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            rows={3}
          />
        </label>

        <label className="block mb-2 font-medium text-gray-700">
          Select Subject
          <Select
            options={subjectOptions}
            value={selectedSubject}
            onChange={handleSubjectChange}
            instanceId="subject-select"
            placeholder="Select Subject"
            className="w-full"
          />
        </label>

        <input type="hidden" {...registerQ("subject")} />

        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx}>
              <label className="block mb-1 font-medium text-gray-700">
                Option {idx + 1}
              </label>
              <input
                {...registerQ(`options.${idx}.text`)}
                placeholder={`Option ${idx + 1} text`}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
            </div>
          ))}
        </div>

        <label className="block font-medium text-gray-700">
          Correct option number
          <input
            type="number"
            {...registerQ("correctOption", { valueAsNumber: true })}
            placeholder="Enter the correct option number"
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          />
        </label>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add Question
          </button>
          <button
            type="button"
            onClick={updateQuestion}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Question
          </button>
        </div>
      </form>
    </>
  );
}

export default QuestionForm;

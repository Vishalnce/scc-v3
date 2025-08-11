"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type QuestionFormProps = {
  id: number | null;
  onSuccess: () => void;
  quesId: string | null;
  setQuesId: (id: string | null) => void;
};

type QuestionFormData = {
  question: string;
  options: string[];
  correctOption: number;
  solution: string;
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
      question: "",
      options: ["", "", "", ""],
      correctOption: undefined,
      solution: "",
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
      quizId: id, // id comes from props
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
      resetQ();
      setQuesId(null);
    } catch (error) {
      console.error("Error submitting question:", error);
      // Optionally show error notification to user
    }
  }

  useEffect(() => {
    if (!quesId) {
      resetQ(); // clear form if no question is selected
      return;
    }

    // Fetch question details by quesId
    fetch(`/api/en/question/admin?quesId=${quesId}`)
      .then((res) => res.json())
      .then((data) => {
        resetQ({
          question: data.question,
          options: data.options,
          correctOption: data.correctOption,
          solution: data.solution,
          marksPositive: data.marksPositive,
          marksNegative: data.marksNegative,
          level: data.level,
        });
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
        question: "",
        options: ["", "", "", ""],
        correctOption: undefined,
        solution: "",
        marksPositive: undefined,
        marksNegative: undefined,
        level: "easy",
      });
      setQuesId(null);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmitQ(onSubmitQuestion)}
        className="p-4 space-y-4 border rounded-md"
      >
        <h2 className="font-bold text-lg">Add Question</h2>
        <textarea
          {...registerQ("question")}
          placeholder="Question text"
          className="w-full p-2 border rounded"
        />

        {Array.from({ length: 4 }).map((_, idx) => (
          <input
            key={idx}
            {...registerQ(`options.${idx}`)}
            placeholder={`Option ${idx + 1}`}
            className="w-full p-2 border rounded"
          />
        ))}

        <input
          type="number"
          {...registerQ("correctOption", { valueAsNumber: true })}
          placeholder="Correct option number "
          className="w-full p-2 border rounded"
        />

        <textarea
          {...registerQ("solution")}
          placeholder="Solution"
          className="w-full p-2 border rounded"
        />
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

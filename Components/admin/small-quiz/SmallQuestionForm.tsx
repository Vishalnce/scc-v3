"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

type QuestionFormProps = {
  // id: number | null;
  onSuccess: () => void;
  quesId: string | null;
  setQuesId: (id: string | null) => void;
};

type QuestionFormData = {
  questionText?: string; // matches optional questionText in model
  // questionImage?: string; // matches optional questionImage in model

  options: {
    text?: string;
    // image?: string;
  }[]; // matches Json array of options in model

  solutionText?: string; // matches optional solutionText
  // solutionImage?: string; // matches optional solutionImage

correctOption: number | "";
marksPositive: number | "";
marksNegative: number | "";

  level: string;
};

type FormDataType = {};

function QuestionForm({ onSuccess, quesId, setQuesId }: QuestionFormProps) {
  const {
    register: registerQ,
    handleSubmit: handleSubmitQ,
    reset: resetQ,
    getValues,
  } = useForm<QuestionFormData>({
    defaultValues: {
      questionText: "",
      
      options: [
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "" },
      ],
      solutionText: "",
  
      correctOption: undefined,
      marksPositive: undefined,
      marksNegative: undefined,
      level: "easy",
    },
  });

  async function onSubmitQuestion(data: any) {
  
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
   
        options: [
          { text: "" },
          { text: "" },
          { text: "" },
          { text: "" },
        ],
        solutionText: "",

        correctOption: "",
        marksPositive:  "" ,
        marksNegative: "",
        level: "",
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
          solutionText: data.solutionText || "",
 
          correctOption: data.correctOption ?? undefined,
          marksPositive: data.marksPositive ?? undefined,
          marksNegative: data.marksNegative ?? undefined,
          level: data.level || "easy",
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

        options: [
          { text: "" },
          { text: ""},
          { text: "" },
          { text: "" },
        ],
        solutionText: "",

        correctOption: "",
        marksPositive: "",
        marksNegative: "",
        level: "",
      });

      // Reset image previews and file states

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
          {...registerQ("questionText")}
          placeholder="Question text"
          className="w-full p-2 border rounded"
        />
        

        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <input
              {...registerQ(`options.${idx}.text`)}
              placeholder={`Option ${idx + 1} text`}
              className="w-full p-2 border rounded"
            />


          
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

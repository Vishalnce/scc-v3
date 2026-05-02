"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


type QuestionFormProps = {
  id: number | null;
  onSuccess: () => void;
  quesId: string | null;
  setQuesId: (id: string | null) => void;
};

type QuestionFormData = {
  questionText?: string; // matches optional questionText in model


  options: {
    text?: string;

  }[]; // matches Json array of options in model

  solutionText?: string; // matches optional solutionText


  correctOption: number | "";
  marksPositive: number | "";
  marksNegative: number | "";
  level: string;
};

type FormDataType = {};

function EditorialQuizForm({ id, onSuccess, quesId, setQuesId }: QuestionFormProps) {
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
 
      correctOption: "",
    
    },
  });

  async function onSubmitQuestion(data: any) {
    
    if (id === null) {
      console.error("Quiz ID is missing");
      return;
    }

    const fullData = {
      ...data,
        editorialId: id
    };
   

    try {
      const res = await fetch("/api/en/editorial-quiz/admin", {
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
        
      });

      // Reset image previews and file states
  
      setQuesId(null);
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

    fetch(`/api/en/editorial-quiz/admin?quesId=${quesId}`)
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

    if (id === null) {
      console.error("Quiz ID is missing");
      return;
    }

    // Get current form values
    const data = getValues();

    const fullData = {
      ...data,
      editorialId: id,
      quesId, // send question id to update specific question
    };

    try {
      const res = await fetch("/api/en/editorial-quiz/admin", {
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
          { text: "" },
          { text: "" },
          { text: "" },
        ],
        solutionText: "",

        correctOption: "",
      
      });

      // Reset image previews and file states
   
      setQuesId(null);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  }



  return (
    <>
    <p className="text-xl text-center text-red-500 mt-4"> Before adding Question save the Blog*</p>
     <form
  onSubmit={handleSubmitQ(onSubmitQuestion)}
  className="p-6 space-y-6 rounded-md max-w-[95%] mx-auto bg-white shadow-sm mt-4 border border-gray-300 "
>
  <h2 className="font-bold text-xl text-gray-800">Add Question</h2>

  <div>
    <label htmlFor="questionText" className="block mb-2 font-semibold text-gray-700">
      Question text
    </label>
    <textarea
      id="questionText"
      {...registerQ("questionText")}
      placeholder="Question text"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      rows={4}
    />
  </div>

  {Array.from({ length: 4 }).map((_, idx) => (
    <div key={idx}>
      <label htmlFor={`option-${idx}`} className="block mb-2 font-semibold text-gray-700">
        Option {idx + 1} text
      </label>
      <input
        id={`option-${idx}`}
        {...registerQ(`options.${idx}.text`)}
        placeholder={`Option ${idx + 1} text`}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        type="text"
      />
    </div>
  ))}

  <div>
    <label htmlFor="correctOption" className="block mb-2 font-semibold text-gray-700">
      Correct option number
    </label>
    <input
      id="correctOption"
      type="number"
      {...registerQ("correctOption", { valueAsNumber: true })}
      placeholder="Correct option number"
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
    />
  </div>

  <div>
    <label htmlFor="solutionText" className="block mb-2 font-semibold text-gray-700">
      Solution
    </label>
    <textarea
      id="solutionText"
      {...registerQ("solutionText")}
      placeholder="Solution"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      rows={3}
    />
  </div>



  <div className="flex space-x-4">
    <button
      type="submit"
      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition flex-1"
    >
      Add Question
    </button>
    <button
      type="button"
      onClick={updateQuestion}
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex-1"
    >
      Update Question
    </button>
  </div>
</form>

    </>
  );
}

export default EditorialQuizForm;

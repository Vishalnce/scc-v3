"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  categoryOptions,
  subjectOptions,
  topicOptions,
} from "@/constants/admin-quiz/options";
import QuestionWarpper from "./QuestionWarpper";
type PostFormQuizProps = {
  id?: number;
  title: string;
  summary: string;
  description: string;
  keywords: string;
  category: string;
  subject: string;
  topic: string;
  timeLimit: number;
};





type OptionType = { value: string; label: string };

function PostFormQuiz({ post,editId }: { post?: PostFormQuizProps; editId?: string | number; }) {

  const [postId ,setPostId ] =useState<number | null >(null)

  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState<OptionType | null>(
    null
  );
  const [selectedTopic, setSelectedTopic] = useState<OptionType | null>(null);

  const { register, handleSubmit, setValue,getValues } = useForm<PostFormQuizProps>({
    defaultValues: post || {},
  });


  const [filteredTopics, setFilteredTopics] = useState<OptionType[]>([]);

  const onSubmitQuiz = async (data: PostFormQuizProps) => {
    try {
      const res = await fetch("/api/en/quiz/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit quiz: ${res.statusText}`);
      }

      const result = await res.json();
     
      setPostId(result.id)


    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

 

 

  const handleCategoryChange = (option: OptionType | null) => {
    setSelectedCategory(option);
    setValue("category", option?.value || "");
  };

  const handleSubjectChange = (option: OptionType | null) => {
    setSelectedSubject(option);
    setValue("subject", option?.value ?? "");
    // 🔄 Filter topic options
    const relevantTopics = topicOptions.filter(
      (topic) => topic.subject === option?.value
    );
    setFilteredTopics(relevantTopics);
  };

  useEffect(() => {
    if (post?.category) {
      const matched = categoryOptions.find(
        (opt) => opt.value === post.category
      );
      if (matched) {
        setSelectedCategory(matched);
        setValue("category", matched.value);
      }
    }

    if (post?.subject) {
      const matched = subjectOptions.find((opt) => opt.value === post.subject);
      if (matched) {
        setSelectedSubject(matched);
        setValue("subject", matched.value);
      }
    }

    if (post?.topic) {
      const matched = topicOptions.find((opt) => opt.value === post.topic);
      if (matched) {
        setSelectedTopic(matched);
        setValue("topic", matched.value);
      }
    }
  }, [post, setValue]);

  async function updateQuiz(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  try {
    const formData = {
      title: getValues("title"),
      summary: getValues("summary"),
      keywords: getValues("keywords"),
      description: getValues("description"),
      category: getValues("category"),
      subject: getValues("subject"),
      topic: getValues("topic"),
      timeLimit: getValues("timeLimit"),
    };

    const res = await fetch(`/api/en/quiz/admin?id=${editId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Failed to update quiz: ${res.statusText}`);
    }

    const result = await res.json();
    console.log("Quiz updated:", result);
    alert("Quiz updated successfully!");
  } catch (error) {
    console.error("Error updating quiz:", error);
    alert("Failed to update quiz.");
  }
}


  return (
    <div className="max-w-[80%] mx-auto space-y-8 p-4">
      {/* QUIZ FORM */}
      <form
        onSubmit={handleSubmit(onSubmitQuiz)}
        className="p-4 space-y-4 border rounded-md"
      >
        <input
          {...register("title")}
          placeholder="Enter quiz title"
          className="w-full p-2 border rounded"
        />
        <textarea
          {...register("summary")}
          placeholder="Short summary"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("keywords")}
          placeholder="Keywords"
          className="w-full p-2 border rounded"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />

        <Select<OptionType>
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange} // ✅ this will call setSelectedOption + setValue("category", ...)
          instanceId="category-select"
          placeholder="Select Category"
        />
        <Select<OptionType>
          options={subjectOptions}
          value={selectedSubject}
          onChange={handleSubjectChange}
          instanceId="subject-select"
          placeholder="Select Subject"
        />

        <Select<OptionType>
          options={filteredTopics}
          value={selectedTopic}
          onChange={(option) => {
            setSelectedTopic(option);
            setValue("topic", option?.value ?? "");
          }}
          instanceId="topic-select"
          placeholder="Select Topic"
        />
        <input type="hidden" {...register("category")} />
        <input type="hidden" {...register("subject")} />
        <input type="hidden" {...register("topic")} />

        <input
          type="number"
          {...register("timeLimit", { valueAsNumber: true })}
          placeholder="Time limit"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
         Save Quiz
        </button>

        <button onClick={updateQuiz}>Upadate question</button>
      </form>

      <h2>Before adding question Click save quiz button</h2>

      {/* QUESTION EDITOR */}
      
      <QuestionWarpper id={editId ? Number(editId) : postId}   />


      {/* QUESTION LIST */}
      {/* <div className="p-4 border rounded-md">
        <h2 className="font-bold text-lg">Questions List</h2>
        {questions.length === 0 && <p>No questions yet.</p>}
        {questions.map((q) => (
          <div key={q.id} className="border p-2 rounded my-2">
            <p className="font-medium">{q.question}</p>
            <ul className="list-disc pl-6">
              {q.options.map((opt: string, idx: number) => (
                <li
                  key={idx}
                  className={
                    idx === q.correctOption ? "font-bold text-green-600" : ""
                  }
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default PostFormQuiz;

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

function PostFormQuiz({ post, editId }: { post?: PostFormQuizProps; editId?: string | number; }) {

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 200 && result.message === "Quiz already exists") {
      alert("⚠️ Quiz already exists!");
      setPostId(result.quiz.id);
    } else if (res.status === 201) {
      alert("✅ Quiz created successfully!");
      setPostId(result.quiz.id);
    } else {
      alert("❌ Failed to create quiz. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting quiz:", error);
    alert("❌ Something went wrong while submitting the quiz.");
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

    const result = await res.json();

    if (res.ok) {
      alert("✅ Quiz updated successfully!");
      console.log("Quiz updated:", result);
    } else {
      alert(result.message || "❌ Failed to update quiz.");
    }
  } catch (error) {
    console.error("Error updating quiz:", error);
    alert("❌ Something went wrong while updating.");
  }
}


  return (
   <div className="max-w-[90%] mx-auto space-y-8 p-4">
  {/* QUIZ FORM */}
  <form
    onSubmit={handleSubmit(onSubmitQuiz)}
    className="p-4 space-y-6 border border-gray-500 rounded-md"
  >
    <div>
      <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">
        Quiz Title
      </label>
      <input
        id="title"
        {...register("title")}
        placeholder="Enter quiz title"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    <div>
      <label htmlFor="summary" className="block mb-2 font-semibold text-gray-700">
        Short Summary
      </label>
      <textarea
        id="summary"
        {...register("summary")}
        placeholder="Short summary"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    <div>
      <label htmlFor="keywords" className="block mb-2 font-semibold text-gray-700">
        Keywords
      </label>
      <input
        id="keywords"
        {...register("keywords")}
        placeholder="Keywords"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    <div>
      <label htmlFor="description" className="block mb-2 font-semibold text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        {...register("description")}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    <div>
      <label htmlFor="category-select" className="block mb-2 font-semibold text-gray-700">
        Select Category
      </label>
      <Select<OptionType>
        options={categoryOptions}
        value={selectedCategory}
        onChange={handleCategoryChange}
        instanceId="category-select"
        placeholder="Select Category"
        className="w-full"
      />
    </div>

    <div>
      <label htmlFor="subject-select" className="block mb-2 font-semibold text-gray-700">
        Select Subject
      </label>
      <Select<OptionType>
        options={subjectOptions}
        value={selectedSubject}
        onChange={handleSubjectChange}
        instanceId="subject-select"
        placeholder="Select Subject"
        className="w-full"
      />
    </div>

    <div>
      <label htmlFor="topic-select" className="block mb-2 font-semibold text-gray-700">
        Select Topic
      </label>
      <Select<OptionType>
        options={filteredTopics}
        value={selectedTopic}
        onChange={(option) => {
          setSelectedTopic(option);
          setValue("topic", option?.value ?? "");
        }}
        instanceId="topic-select"
        placeholder="Select Topic"
        className="w-full"
      />
      <input type="hidden" {...register("category")} />
      <input type="hidden" {...register("subject")} />
      <input type="hidden" {...register("topic")} />
    </div>

    <div>
      <label htmlFor="timeLimit" className="block mb-2 font-semibold text-gray-700">
        Time limit
      </label>
      <input
        id="timeLimit"
        type="number"
        {...register("timeLimit", { valueAsNumber: true })}
        placeholder="Time limit"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    <div className="flex flex-row gap-4">
   <button
      type="submit"
      className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full"
    >
      Save Quiz
    </button>

    <button
      type="button"
      onClick={updateQuiz}
      className="w-full  px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition"
    >
      Update quiz
    </button>

    </div>

 
  </form>

  <h2 className="text-lg font-semibold">Before adding question Click save quiz button</h2>

  {/* QUESTION EDITOR */}
  <QuestionWarpper id={editId ? Number(editId) : postId} />
</div>

  );
}

export default PostFormQuiz;

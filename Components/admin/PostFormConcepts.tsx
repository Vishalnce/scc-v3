"use client";

// import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import Editor from "@/Components/admin/editor-page"; // adjust path if needed
import type { TocItem } from "@/Components/admin/toc";
import Image from "next/image";
import {
  categoryOptions,
  subjectOptions,
  topicOptions,
} from "@/constants/admin-quiz/options";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { extractImages } from "./shared-admin-code/ExtractHTML";
import { deleteImage } from "./shared-admin-code/DeleteURL";

type PostType = {
  title: string;
  slug: string;
  topic: string;
  subject: string; // ✅ Add this
  category: string;

  keywords: string;
  description: string;
  editorHtml: string;
  timeToRead: string;
  toc: string;
};

type OptionType = { value: string; label: string };

export default function Page({ post }: { post?: PostType }) {
  const { register, handleSubmit, setValue, watch } = useForm<PostType>({
    defaultValues: post || {},
    shouldUseNativeValidation: true,
  });

  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null,
  );
  const [selectedSubject, setSelectedSubject] = useState<OptionType | null>(
    null,
  );
  const [selectedTopic, setSelectedTopic] = useState<OptionType | null>(null);

  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const [filteredTopics, setFilteredTopics] = useState<OptionType[]>([]);
  // const [isUploading, setIsUploading] = useState(false);

  const [isEditorTouched, setIsEditorTouched] = useState(false);
  const router = useRouter();

  const handleSubjectChange = (option: OptionType | null) => {
    setSelectedSubject(option);
    setValue("subject", option?.value ?? "");
    //  Filter topic options
    const relevantTopics = topicOptions.filter(
      (topic) => topic.subject === option?.value,
    );
    setFilteredTopics(relevantTopics);
  };

  useEffect(() => {
    if (post) {
      setEditorData({
        html: post.editorHtml || "",
        toc: JSON.parse(post.toc || "[]"),
      });
    }
  }, [post]);

  const [editorData, setEditorData] = useState<{
    html: string;
    toc: TocItem[];
  }>({
    html: "",
    toc: [],
  });

  const title = watch("title"); // 👈 watch the title field
  // const { theme } = useTheme();
  const slugTransform = useCallback((value: string) => {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    if (title) {
      const newSlug = slugTransform(title);
      setValue("slug", newSlug, { shouldValidate: true });
    }
  }, [title, slugTransform, setValue]);

  const value = post?.editorHtml || "";

  const isEdit = !!post;
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: PostType) => {
    if (isLoading) return; // prevent double submit
    setIsLoading(true);
    try {
      if (!isEditorTouched && post) {
        data.editorHtml = post.editorHtml;
        data.toc = post.toc;
      }

      //  Editor touched → user manually clicked Sync Now
      if (isEditorTouched) {
        data.editorHtml = editorData.html;
        data.toc = JSON.stringify(editorData.toc);
      }

      if (post?.editorHtml !== data.editorHtml) {
        const oldImgs = extractImages(post?.editorHtml || "");
        const newImgs = extractImages(data.editorHtml || "");

        for (const img of oldImgs) {
          if (!newImgs.includes(img)) {
            await deleteImage(img);
          }
        }
      }

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch("/api/en/concept/admin", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert(isEdit ? "Post updated successfully!" : "Post created!");
        router.push("/concept");
      } else {
        alert("Failed to save post");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting");
    }
  };

  const handleCategoryChange = (option: OptionType | null) => {
    setSelectedCategory(option);
    setValue("category", option?.value || "");
  };

  const handleTopicChange = (option: OptionType | null) => {
    setSelectedTopic(option);
    setValue("topic", option?.value || "");
  };

  // image upload

  const { data: session } = useSession();

  useEffect(() => {
    setValue("editorHtml", editorData.html);
    setValue("toc", JSON.stringify(editorData.toc));
  }, [editorData, setValue]);

  // for editor
  useEffect(() => {
    if (post?.category) {
      const matched = categoryOptions.find(
        (opt) => opt.value === post.category,
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

  useEffect(() => {
    if (post?.subject) {
      const relevantTopics = topicOptions.filter(
        (topic) => topic.subject === post.subject,
      );
      setFilteredTopics(relevantTopics);
    }
  }, [post?.subject]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 max-w-[95%] mx-auto bg-white border border-gray-300 rounded-lg shadow-sm"
    >
      <div>
        <label
          htmlFor="title"
          className="block mb-2 font-semibold text-gray-700"
        >
          Title <span className="text-red-500"> *</span>
        </label>
        <input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Title"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="text"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block mb-2 font-semibold text-gray-700"
        >
          Slug
        </label>
        <input
          id="slug"
          {...register("slug", { required: true })}
          placeholder="Slug"
          className="border border-gray-300 p-2 w-full rounded-md bg-gray-100 cursor-not-allowed focus:outline-none"
          readOnly
          type="text"
        />
      </div>

      <div>
        <label
          htmlFor="category-select"
          className="block mb-2 font-semibold text-gray-700"
        >
          Select Category <span className="text-red-500"> *</span>
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
        <label
          htmlFor="subject-select"
          className="block mb-2 font-semibold text-gray-700"
        >
          Select Subject <span className="text-red-500"> *</span>
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
        <label
          htmlFor="topic-select"
          className="block mb-2 font-semibold text-gray-700"
        >
          Select Topic <span className="text-red-500"> *</span>
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
        <input
          type="hidden"
          {...register("category", { required: "Category is required" })}
        />
        <input
          type="hidden"
          {...register("subject", { required: "Subject is required" })}
        />
        <input
          type="hidden"
          {...register("topic", { required: "Topic is required" })}
        />
      </div>

      <div>
        <label
          htmlFor="keywords"
          className="block mb-2 font-semibold text-gray-700"
        >
          Enter Keywords separated by commas{" "}
          <span className="text-red-500"> *</span>
        </label>
        <input
          id="keywords"
          {...register("keywords", { required: "Keywords is required" })}
          placeholder=" Keywords "
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="text"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-2 font-semibold text-gray-700"
        >
          Description <span className="text-red-500"> *</span>
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          placeholder="Description"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          rows={4}
        />
      </div>

      <div>
        <label
          htmlFor="timeToRead"
          className="block mb-2 font-semibold text-gray-700"
        >
          Time to Read <span className="text-red-500">*</span>
        </label>

        <input
          id="timeToRead"
          type="number"
          step="0.1" // adjust precision if needed
          min="0"
          max="200"
          {...register("timeToRead", {
            required: "Time To Read",
            valueAsNumber: true, // ✅ important for number parsing
          })}
          placeholder="Time to Read (in minutes)"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <Editor
          value={value}
          onSync={setEditorData}
          setIsEditorChange={setIsEditorTouched}
        />
      </div>

      <input type="hidden" {...register("editorHtml")} />
      <input type="hidden" {...register("toc")} />
      <button
        type="submit"
        disabled={isLoading}
        className={`px-6 py-2 rounded-md text-white transition
    ${
      isLoading
        ? "bg-green-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }`}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

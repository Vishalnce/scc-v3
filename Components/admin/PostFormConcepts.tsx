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

type PostType = {
  title: string;
  slug: string;
  topic: string;
  subject: string; // ✅ Add this
  category: string;
  image: string;
  alt: string;
  summary: string;
  keywords: string;
  description: string;
  editorHtml: string;
  toc: string;
};





type OptionType = { value: string; label: string };

export default function Page({ post }: { post?: PostType }) {
  const { register, handleSubmit, setValue, watch } = useForm<PostType>({
    defaultValues: post || {},
  });

  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState<OptionType | null>(
    null
  );
  const [selectedTopic, setSelectedTopic] = useState<OptionType | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

 
const [filteredTopics, setFilteredTopics] = useState<OptionType[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  
const handleSubjectChange = (option: OptionType | null) => {
  setSelectedSubject(option);
  setValue("subject", option?.value ?? "");
  // 🔄 Filter topic options
  const relevantTopics = topicOptions.filter(
    (topic) => topic.subject === option?.value
  );
  setFilteredTopics(relevantTopics);
};


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

  const onSubmit = async (data: PostType) => {
    console.log("Form data:", data);
    try {
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch("/api/en/concept/admin", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert(isEdit ? "Post updated successfully!" : "Post created!");
        console.log("Result:", result);
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

const handleImageUpload = async () => {
    if (session?.user?.role !== "ADMIN") {
      alert("Access denied");
      return;
    }
    if (!imageFile) return alert("Please select an image to upload");

    setIsUploading(true); // start uploading

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data?.url) {
        setUploadedImageUrl(data.url);
        setValue("image", data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setIsUploading(false); // stop uploading
    }
  };


  const handleCancelUpload = async () => {
    if (!uploadedImageUrl) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/api/delete?url=${uploadedImageUrl}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
    } catch (error) {
      console.error("Delete error:", error);
    }

    setUploadedImageUrl("");
    setImageFile(null);
    setValue("image", "");
  };

  useEffect(() => {
    setValue("editorHtml", editorData.html);
    setValue("toc", JSON.stringify(editorData.toc));
  }, [editorData, setValue]);

  // for editor
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

  useEffect(() => {
  if (post?.subject) {
    const relevantTopics = topicOptions.filter(
      (topic) => topic.subject === post.subject
    );
    setFilteredTopics(relevantTopics);
  }
}, [post?.subject]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 max-w-[95%] mx-auto bg-white border border-gray-300 rounded-lg shadow-sm">
  <div>
    <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">Title</label>
    <input
      id="title"
      {...register("title")}
      placeholder="Title"
      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      type="text"
    />
  </div>

  <div>
    <label htmlFor="slug" className="block mb-2 font-semibold text-gray-700">Slug</label>
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
    <label htmlFor="summary" className="block mb-2 font-semibold text-gray-700">Summary</label>
    <textarea
      id="summary"
      {...register("summary")}
      placeholder="Summary"
      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      rows={4}
    />
  </div>

  <div>
    <label htmlFor="category-select" className="block mb-2 font-semibold text-gray-700">Select Category</label>
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
    <label htmlFor="subject-select" className="block mb-2 font-semibold text-gray-700">Select Subject</label>
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
    <label htmlFor="topic-select" className="block mb-2 font-semibold text-gray-700">Select Topic</label>
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
    <label htmlFor="image-upload" className="block mb-2 font-semibold text-gray-700">Upload Image</label>
    <input
      id="image-upload"
      type="file"
      accept="image/*"
      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      className="border border-gray-300 p-2 rounded-md w-fit"
    />
    <button
      type="button"
      onClick={handleImageUpload}
      disabled={isUploading}
      className={`mt-2 px-4 py-2 rounded text-white transition ${
        isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isUploading ? "Uploading..." : "Upload Image"}
    </button>

    {uploadedImageUrl && (
      <div className="relative w-[30%] h-[228px] border border-gray-200 rounded-md overflow-hidden mt-4">
        <div className="flex justify-between items-center px-1 pt-1">
          <p className="text-sm text-gray-600">Uploaded Image:</p>
          <button
            type="button"
            onClick={handleCancelUpload}
            className="text-red-500 text-sm hover:underline"
          >
            Cancel
          </button>
        </div>
        <div className="relative w-full h-[200px]">
          <Image
            src={uploadedImageUrl}
            alt={watch("alt") || "Uploaded image preview"}
            fill
            className="object-cover rounded-b-md"
          />
        </div>
      </div>
    )}
    <input type="hidden" {...register("image")} value={uploadedImageUrl} />
  </div>

  <div>
    <label htmlFor="alt" className="block mb-2 font-semibold text-gray-700">Alt tag for image</label>
    <input
      id="alt"
      {...register("alt")}
      placeholder="Alt tag for image"
      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      type="text"
    />
  </div>

  <div>
    <label htmlFor="keywords" className="block mb-2 font-semibold text-gray-700">Enter Keywords separated by commas</label>
    <input
      id="keywords"
      {...register("keywords")}
      placeholder=" Keywords "
      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      type="text"
    />
  </div>

  <div>
    <label htmlFor="description" className="block mb-2 font-semibold text-gray-700">Description</label>
    <textarea
      id="description"
      {...register("description")}
      placeholder="Description"
      className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      rows={4}
    />
  </div>

  <div>
    <Editor value={value} onSync={setEditorData} />
  </div>

  <input type="hidden" {...register("editorHtml")} />
  <input type="hidden" {...register("toc")} />

  <button
    type="submit"
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition "
  >
    Save
  </button>
</form>

  );
}

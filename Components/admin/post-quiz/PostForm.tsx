"use client";

import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import Editor from "@/Components/admin/editor-page"; // adjust path if needed
import type { TocItem } from "@/Components/admin/toc";
import Image from "next/image";
import PostFormQuiz from "./PostQuizForm";
import QuestionWarpper from "./PostQuestionWarpper";

type PostType = {
  title: string;
  slug: string;
  topic: string;
  image: string;
  alt: string;
  summary: string;
  keywords: string;
  description: string;
  editorHtml: string;
   timeLimit: number; 
  toc: string;
};
const options = [
  { value: "Polity & Governance", label: "Polity & Governance" },
  { value: "International Relations", label: "International Relations" },
  { value: "Indian Economy", label: "Indian Economy" },
  { value: "Environment & Ecology", label: "Environment & Ecology" },

  { value: "Science & Technology", label: "Science & Technology" },

  { value: "Social Issues", label: " Social Issues" },

  { value: "Internal Security", label: "Internal Security" },
  { value: "Disaster Management", label: "Disaster Management" },
  { value: "Art & Culture", label: " Art & Culture" },

  {
    value: "Reports, Indices & Rankings",
    label: "Reports, Indices & Rankings",
  },

  {
    value: "Government Schemes & Policies",
    label: "Government Schemes & Policies",
  },
];
type SetPostId = (id: number | null) => void;
type OptionType = { value: string; label: string };

export default function Page({
  post,
  setPostId,
}: {
  post?: PostType;
  setPostId: SetPostId;
}) {
  const { register, handleSubmit, setValue, watch } = useForm<PostType>({
    defaultValues: post || {},
  });

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

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

  // const value = `<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">asdsadasdasdasdassszzzzzzzzzzz</span></p>;`;

  const isEdit = !!post;

  const onSubmit = async (data: PostType) => {
   
    try {
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch("/api/en/current-affaris/admin", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        
       console.log("Newly:", result.post.id);
        setPostId(result.post.id); // pass the new post ID to parent
        alert(isEdit ? "Post updated successfully!" : "Post created!");
        
  
      } else {
        alert("Failed to save post");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting");
    }
  };

  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
    setValue("topic", option?.value || ""); //  sets the category field
  };

  // image upload
  const handleImageUpload = async () => {
    if (!imageFile) return alert("Please select an image to upload");

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.url) {
        setUploadedImageUrl(data.url);
        setValue("image", data.url); // ✅ Set in form
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
  };

  useEffect(() => {
    setValue("editorHtml", editorData.html);
    setValue("toc", JSON.stringify(editorData.toc));
  }, [editorData, setValue]);

  // for editor
  useEffect(() => {
    if (post?.topic) {
      const matched = options.find((opt) => opt.value === post.topic);
      if (matched) {
        setSelectedOption(matched);
      }
    }
  }, [post]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      <input
        {...register("title")}
        placeholder="Title"
        className="border p-2 w-full"
      />

      <input
        {...register("slug", { required: true })}
        placeholder="Slug"
        className="border p-2 w-full bg-gray-100"
        readOnly // Optional: make it read-only since it's auto-generated
      />
      <textarea
        {...register("summary")}
        placeholder="Summary"
        className="border p-2 w-full"
      />

      <Select<OptionType>
        options={options}
        value={selectedOption}
        onChange={handleChange} // ✅ this will call setSelectedOption + setValue("category", ...)
        instanceId="topic-select"
        placeholder="Select a topic"
      />
      <input type="hidden" {...register("topic")} />

      {/* image upload  */}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="border p-2"
      />

      <button
        type="button"
        onClick={handleImageUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Image
      </button>

      {uploadedImageUrl && (
        <div className="relative w-[30%] h-[228px] ">
          <p className="text-sm text-gray-600">Uploaded Image:</p>
          <Image
            src={uploadedImageUrl}
            alt={watch("alt") || "Uploaded image preview"}
            fill
            className="object-cover"
          />
        </div>
      )}

      <input type="hidden" {...register("image")} value={uploadedImageUrl} />

      {/* alt tag */}

      <input
        {...register("alt")}
        placeholder="Alt tag for image"
        className="border p-2 w-full"
      />

      {/* key word and description */}
      <div className=" norder-2 border-green-600">
        <input
          {...register("keywords")}
          placeholder="keywords"
          className="border p-2 w-full"
        />

        <textarea
          {...register("description")}
          placeholder="Description"
          className="border p-2 w-full"
        />
      </div>

      <Editor value={value} onSync={setEditorData} />

<input
  type="number"
  step="0.000001"          
  min="0"              
  max="200"            
  {...register("timeLimit", { valueAsNumber: true })} 
  placeholder="Time limit FOR QUIZ"
  className="w-full p-2 border rounded"
/>


      <input type="hidden" {...register("editorHtml")} />

      <input type="hidden" {...register("toc")} />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>

      {/* <QuestionWarpper id={editId ? Number(editId) : postId} /> */}
    </form>
  );
}

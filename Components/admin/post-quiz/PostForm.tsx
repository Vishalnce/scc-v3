"use client";

import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect, use } from "react";
import Editor from "@/Components/admin/editor-page"; // adjust path if needed
import type { TocItem } from "@/Components/admin/toc";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
  const [isUploading, setIsUploading] = useState(false);


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

  useEffect(() => {
  if (post?.image) {
    setUploadedImageUrl(post.image);
    setValue("image", post.image);
  }
}, [post, setValue]);


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
      className="border border-gray-300 p-2 rounded-md w-fit"
    />

    {/* Upload button */}
    <button
      type="button"
      onClick={handleImageUpload}
      disabled={isUploading}
      className={`px-4 py-2 rounded text-white transition ${
        isUploading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isUploading ? "Uploading..." : "Upload Image"}
    </button>

    {/* Uploaded Image Preview */}
    {uploadedImageUrl && (
      <div className="relative w-[30%] h-[228px] border border-gray-200 rounded-md overflow-hidden">
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

        {/* Image Preview */}
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

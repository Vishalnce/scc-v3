"use client";

import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect, use } from "react";
import Editor from "@/Components/admin/editor-page"; // adjust path if needed
import type { TocItem } from "@/Components/admin/toc";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    shouldUseNativeValidation: true,
  });

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const [isEditorTouched, setIsEditorTouched] = useState(false);

  const router = useRouter();

  const [editorData, setEditorData] = useState<{
    html: string;
    toc: TocItem[];
  }>({
    html: "",
    toc: [],
  });

  useEffect(() => {
    if (post) {
      setEditorData({
        html: post.editorHtml || "",
        toc: JSON.parse(post.toc || "[]"),
      });
    }
  }, [post]);

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
    if (!isEditorTouched && post) {
      data.editorHtml = post.editorHtml;
      data.toc = post.toc;
    }

    // CASE 2 → Editor touched → user manually clicked Sync Now
    if (isEditorTouched) {
      data.editorHtml = editorData.html;
      data.toc = JSON.stringify(editorData.toc);
    }
    console.log("FINAL DATA", data);

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
        router.push("/current-affaris");
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/api/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: formData,
        }
      );

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
      await fetch(
        `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/api/delete?url=${uploadedImageUrl}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
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
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          className="border border-gray-300 p-3 w-full rounded-md bg-gray-100 cursor-not-allowed focus:outline-none"
          readOnly
        />
      </div>

      <div>
        <label
          htmlFor="summary"
          className="block mb-2 font-semibold text-gray-700"
        >
          Summary <span className="text-red-500"> *</span>
        </label>
        <textarea
          id="summary"
          {...register("summary", { required: "Summary is  is required" })}
          placeholder="Summary"
          rows={4}
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label
          htmlFor="topic-select"
          className="block mb-2 font-semibold text-gray-700"
        >
          Select a topic <span className="text-red-500"> *</span>
        </label>
        <Select<OptionType>
          options={options}
          value={selectedOption}
          onChange={handleChange} // calls setSelectedOption + setValue("category", ...)
          instanceId="topic-select"
          placeholder="Select a topic"
          className="w-full"
        />
        <input type="hidden" {...register("topic" , { required: "Topic is required" })} />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Upload Image <span className="text-red-500"> *</span>
        </label>
        <input
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
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
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
        <label htmlFor="alt" className="block mb-2 font-semibold text-gray-700">
          Alt tag for image
        </label>
        <input
          id="alt"
          {...register("alt")}
          placeholder="Alt tag for image"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label
          htmlFor="keywords"
          className="block mb-2 font-semibold text-gray-700"
        >
          Keywords (Enter in comma seprated){" "}
          <span className="text-red-500"> *</span>
        </label>
        <input
          id="keywords"
          {...register("keywords"  , { required: "Keyword is required" })}
          placeholder="Keywords enter in comma seprated"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          {...register("description"  , { required: "Description is required" })}
          placeholder="Description"
          rows={4}
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <Editor
          value={value}
          onSync={setEditorData}
          setIsEditorChange={setIsEditorTouched}
        />
      </div>

      <div>
        <label
          htmlFor="timeLimit"
          className="block mb-2 font-semibold text-gray-700"
        >
          Time limit FOR QUIZ
        </label>
        <input
          id="timeLimit"
          type="number"
          step="0.000001"
          min="0"
          max="200"
          {...register("timeLimit", { valueAsNumber: true })}
          placeholder="Time limit FOR QUIZ"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <input type="hidden" {...register("editorHtml")} />
      <input type="hidden" {...register("toc")} />

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
      >
        Save
      </button>
    </form>
  );
}

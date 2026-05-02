"use client";

import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect, use, useRef } from "react";
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
  timeToRead: string;
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditorTouched, setIsEditorTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const deleteImage = async (url: string) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      // 1. Get presigned delete URL
      const res = await fetch("/api/aws/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileUrl: url }),
        signal: controller.signal,
      });

      if (!res.ok) {
        console.error("Failed to get deleteUrl:", res.status);
        return;
      }

      const data = await res.json();

      if (!data?.deleteUrl) {
        console.error("deleteUrl missing in response");
        return;
      }

      //  Call S3 delete URL
      const s3Res = await fetch(data.deleteUrl, {
        method: "DELETE",
      });

      if (!s3Res.ok) {
        console.error("S3 delete failed:", s3Res.status);
        return;
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.error("Request timed out:", url);
      } else {
        console.error("Delete failed:", url, err);
      }
    } finally {
      clearTimeout(timeout);
    }
  };

  // extrtact html
  const extractImages = (html: string): string[] => {
    if (!html) return [];

    const div = document.createElement("div");
    div.innerHTML = html;

    const imgs = div.querySelectorAll("img");

    return Array.from(imgs)
      .map((img) => img.getAttribute("src"))
      .filter((src): src is string => !!src);
  };

  const onSubmit = async (data: PostType) => {
    if (isLoading) return; // prevent double submit
    setIsLoading(true);

    try {
      if (!isEditorTouched && post) {
        data.editorHtml = post.editorHtml;
        data.toc = post.toc;
      }

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

      const res = await fetch("/api/en/current-affairs/admin", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setPostId(result.post.id);
        alert(isEdit ? "Post updated successfully!" : "Post created!");
        router.push("/current-affairs");
      } else {
        alert("Failed to save post");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting");
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
    setValue("topic", option?.value || ""); //  sets the category field
  };

  // image upload

  const { data: session } = useSession();

  const handleImageUpload = async () => {
    if (uploadedImageUrl) {
      alert("Please delete the existing image before uploading a new one.");
      return;
    }

    if (!imageFile) {
      alert("Please select an image to upload");
      return;
    }

    setIsUploading(true);

    try {
      //  get presigned URL
      const presignRes = await fetch("/api/aws/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          fileName: imageFile.name,
          fileType: imageFile.type,
        }),
      });

      //  response validation
      if (!presignRes.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { uploadUrl, fileUrl } = await presignRes.json();

      if (!uploadUrl || !fileUrl) {
        throw new Error("Invalid presign response");
      }

      //  upload to S3
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": imageFile.type,
        },
        body: imageFile,
      });

      //  S3 upload validation
      if (!uploadRes.ok) {
        throw new Error("Upload to S3 failed");
      }

      // STEP 3: success
      setUploadedImageUrl(fileUrl);
      setValue("image", fileUrl);

      //  reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancelUpload = async () => {
    if (!uploadedImageUrl || isDeleting) return;

    setIsDeleting(true);

    try {
      //  get presigned delete URL
      const res = await fetch("/api/aws/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          fileUrl: uploadedImageUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get delete URL");
      }

      const { deleteUrl } = await res.json();

      if (!deleteUrl) {
        throw new Error("Invalid delete URL");
      }

      //  actually delete from S3
      const deleteRes = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!deleteRes.ok) {
        throw new Error("Failed to delete from S3");
      }

      //  clear UI
      setUploadedImageUrl("");
      setImageFile(null);
      setValue("image", "");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image. Try again.");
    } finally {
      setIsDeleting(false);
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
        <input
          type="hidden"
          {...register("topic", { required: "Topic is required" })}
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Upload Image <span className="text-red-500"> *</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="border border-gray-300 p-2 rounded-md w-fit"
        />
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={isUploading || !!uploadedImageUrl}
          className={`mt-2 px-4 py-2 rounded text-white ${
            isUploading || uploadedImageUrl
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
                disabled={isDeleting}
                className={`text-red-500 text-sm hover:underline ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Cancel"}
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
          {...register("keywords", { required: "Keyword is required" })}
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
          {...register("description", { required: "Description is required" })}
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

      <div>
        <label
          htmlFor="timeLimit"
          className="block mb-2 font-semibold text-gray-700"
        >
          Time limit For Read BLog
        </label>
        <input
          id="timeLimit"
          type="number"
          step="0.000001"
          min="0"
          max="200"
          {...register("timeToRead", { valueAsNumber: true })}
          placeholder="Time limit FOR QUIZ"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

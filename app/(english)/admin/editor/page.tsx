"use client";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "next-themes";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import Editor from "@/Components/admin/editor-page"; // adjust path if needed
import type { TocItem } from "@/Components/admin/toc";

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

type OptionType = { value: string; label: string };

export default function Page() {
  const { register, handleSubmit, setValue, watch } = useForm();
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

  const value = `<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">asdsadasdasdasdassszzzzzzzzzzz</span></p>;`;

  const onSubmit = (data: any) => {
  // Ensure the latest editor HTML is stored in form data
  setValue("editorHtml", editorData.html);

  // Wait for React Hook Form to update values
  setTimeout(() => {
    console.log("Form Data:", data);
    console.log("Editor HTML (from hidden field):", data.editorHtml);
    console.log("Editor TOC:", editorData.toc);

    // Now send `data.editorHtml` to backend — it's a string
  }, 0);
};


  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
    setValue("topic", option?.value || ""); // 👈 sets the category field
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
        setValue("imageUrl", data.url); // ✅ Set in form
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
  };

  // for editor
  useEffect(() => {
  setValue("editorHtml", editorData.html);
}, [editorData.html, setValue]);

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
        <div>
          <p className="text-sm text-gray-600">Uploaded Image:</p>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            className="h-32 object-contain"
          />
        </div>
      )}

      <input type="hidden" {...register("imageUrl")} value={uploadedImageUrl} />

      {/* alt tag */}

      <input
        {...register("alt")}
        placeholder="Alt tag for image"
        className="border p-2 w-full"
      />

      {/* key word and description */}
      <div className=" norder-2 border-green-600">
        <input
          {...register("keyword")}
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

      <input type="hidden" {...register("editorHtml")} />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}

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

      <input type="hidden" {...register("editorHtml")} />

      <input type="hidden" {...register("toc")} />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}

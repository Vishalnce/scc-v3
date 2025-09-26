"use client";

// import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import Editor from "@/Components/admin/editor-page"; // adjust path if needed
import type { TocItem } from "@/Components/admin/toc";
import Image from "next/image";

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



const categoryOptions = [
  { value: "Pre", label: "Pre" },
  { value: "Mains", label: "Mains" },
];

const subjectOptions = [
  { value: "Quantitative-Apptitude", label: "quantitative apptitude" },
  { value: "Reasoning-General", label: "reasoning & General Intelligence" },
  { value: "English-Comprehension", label: "English Comprehension" },
  { value: "General-Awareness", label: "General Awareness" },

  { value: "Mathematical-Abilities", label: "Mathematical Abilities" },

  { value: "Computer-knowledge", label: "Computer Knowledge" },
];

// const topicOptions = [
//   { value: "history", label: " Vocabulary" },
//   { value: "quantitative", label: "Grammar" },
//   { value: "quantitative", label: "Error Spotting and Sentence Improvement" },

//   { value: "quantitative", label: "Comprehension and Usage" },

//   { value: "quantitative", label: "Arithmetic" },

//   { value: "quantitative", label: "Data Interpretation" },

//   { value: "quantitative", label: "Area & Volume" },

//   {
//     value: "quantitative",
//     label: "Simple Interest (SI) & Compound Interest (CI)",
//   },

//   { value: "quantitative", label: "Time, Speed, Distance" },
//   { value: "quantitative", label: "Time & Work" },
//   { value: "quantitative", label: "Ratio & Proportion" },
//   { value: "quantitative", label: "Profit & Loss" },

//   { value: "quantitative", label: "Percentages" },

//   { value: "quantitative", label: "Averages" },

//   { value: "quantitative", label: "Numbers" },

//   { value: "quantitative", label: "Mixture and Allegation" },

//   { value: "quantitative", label: "Advanced Mathematics" },

//   { value: "quantitative", label: "Mensuration" },

//   { value: "quantitative", label: "Trigonometry" },
//   { value: "quantitative", label: "Statistics " },
//   { value: "quantitative", label: "Geometry" },

//   { value: "quantitative", label: "Seating Arrangement" },

//   { value: "quantitative", label: " Syllogism" },

//   { value: "quantitative", label: "Blood Relations" },

//   { value: "quantitative", label: "Inequalities" },
//   { value: "quantitative", label: "Input-Output" },

//   { value: "quantitative", label: "Coding-Decoding" },

//   { value: "quantitative", label: " Data Sufficiency" },

//   { value: "quantitative", label: "Order and Ranking" },
//   { value: "quantitative", label: "Alphanumeric Series" },

//   { value: "quantitative", label: "Directions" },

//   { value: "quantitative", label: "Analogy" },

//   { value: "quantitative", label: "Classification/Odd One Out" },

//   { value: "quantitative", label: "Statement and Conclusion" },

//   { value: "quantitative", label: "Statement and Assumption" },

//   { value: "quantitative", label: "Statement and Arguments" },

//   { value: "quantitative", label: "Cause and Effect" },
//   { value: "quantitative", label: "Logical Venn Diagrams" },

//   { value: "quantitative", label: "Number Series" },

//   { value: "quantitative", label: "Clock" },

//   {
//     value: "quantitative",
//     label:
//       "Non-Verbal Reasoning (Mirror Image, Water Image, Paper Folding, etc.)",
//   },

//   { value: "quantitative", label: "Embedded Figures" },

//   { value: "quantitative", label: "Cube and Dice" },

//   { value: "quantitative", label: "Embedded Figures" },

//   { value: "quantitative", label: "Figure Series" },

//   { value: "quantitative", label: "Basics of Computers" },

//   { value: "quantitative", label: "Operating System (OS)" },

//   { value: "quantitative", label: " Software" },

//   { value: "quantitative", label: "Internet and Web" },

//   { value: "quantitative", label: "Networking and Communication" },

//   { value: "quantitative", label: "MS Office Tools" },
//   { value: "quantitative", label: "Cyber Security & Malware" },

//   { value: "quantitative", label: "Computer Abbreviations and Terminology" },

//   { value: "quantitative", label: " History" },

//   { value: "quantitative", label: "Geography" },

//   { value: "quantitative", label: "Indian Polity" },

//   { value: "quantitative", label: "Indian Economy" },
//   { value: "quantitative", label: "General Science" },

//   { value: "quantitative", label: "Current Affairs" },

//   { value: "quantitative", label: "Static General Knowledge" },

//   { value: "quantitative", label: "Environment and Ecology" },

//   { value: "quantitative", label: "Government Schemes and Policies" },

//   { value: "quantitative", label: "Important Days and Events" },

//   { value: "quantitative", label: "Books and Authors" },

//   { value: "quantitative", label: "Sports and Awards" },
//   { value: "quantitative", label: "Miscellaneous GK" },
// ];

const topicOptions = [
  // English Comprehension
{ subject: "english-comprehension", label: "vocabulary", value: "vocabulary" },
{ subject: "english-comprehension", label: "grammar", value: "grammar" },
{ subject: "english-comprehension", label: "error Spotting and Sentence Improvement", value: "error-spotting-sentence-improvement" },
{ subject: "english-comprehension", label: "comprehension and Usage", value: "comprehension-usage" },


  // Quantitative Aptitude
{ subject: "quantitative-apptitude", label: "arithmetic", value: "Arithmetic" },
{ subject: "quantitative-apptitude", label: "data Interpretation", value: "Data-interpretation" },
{ subject: "quantitative-apptitude", label: "area & Volume", value: "Area-volume" },
{ subject: "quantitative-apptitude", label: "simple Interest (SI) & Compound Interest (CI)", value: "Si-Ci" },
{ subject: "quantitative-apptitude", label: "time, Speed, Distance", value: "Time-Speed-Distance" },
{ subject: "quantitative-apptitude", label: "time & Work", value: "Time-Work" },
{ subject: "quantitative-apptitude", label: "ratio & Proportion", value: "Ratio-Proportion" },
{ subject: "quantitative-apptitude", label: "profit & Loss", value: "Profit-Loss" },
{ subject: "quantitative-apptitude", label: "percentages", value: "Percentages" },
{ subject: "quantitative-apptitude", label: "averages", value: "Averages" },
{ subject: "quantitative-apptitude", label: "numbers", value: "Numbers" },
{ subject: "quantitative-apptitude", label: "mixture and Allegation", value: "Mixture-Allegation" },
{ subject: "quantitative-apptitude", label: "advanced Mathematics", value: "Advanced-Mathematics" },
{ subject: "quantitative-apptitude", label: "mensuration", value: "Mensuration" },
{ subject: "quantitative-apptitude", label: "trigonometry", value: "Trigonometry" },
{ subject: "quantitative-apptitude", label: "statistics", value: "Statistics" },
{ subject: "quantitative-apptitude", label: "geometry", value: "Geometry" },


  // Reasoning
{ subject: "reasoning-general", label: "seating Arrangement", value: "Seating-Arrangement" },
{ subject: "reasoning-general", label: "syllogism", value: "Syllogism" },
{ subject: "reasoning-general", label: "blood Relations", value: "Blood-Relations" },
{ subject: "reasoning-general", label: "puzzles", value: "Puzzles" },

{ subject: "reasoning-general", label: "inequalities", value: "Inequalities" },
{ subject: "reasoning-general", label: "input-Output", value: "Input-Output" },
{ subject: "reasoning-general", label: "coding-Decoding", value: "Coding-Decoding" },
{ subject: "reasoning-general", label: "data Sufficiency", value: "Data-Sufficiency" },
{ subject: "reasoning-general", label: "order and Ranking", value: "Order-Ranking" },
{ subject: "reasoning-general", label: "alphanumeric Series", value: "Alphanumeric-Series" },
{ subject: "reasoning-general", label: "directions", value: "Directions" },
{ subject: "reasoning-general", label: "analogy", value: "Analogy" },
{ subject: "reasoning-general", label: "classification/Odd One Out", value: "Classification" },
{ subject: "reasoning-general", label: "statement and Conclusion", value: "Statement-Conclusion" },
{ subject: "reasoning-general", label: "statement and Assumption", value: "Statement-Assumption" },
{ subject: "reasoning-general", label: "statement and Arguments", value: "Statement-Arguments" },
{ subject: "reasoning-general", label: "cause and Effect", value: "Cause-Effect" },
{ subject: "reasoning-general", label: "logical Venn Diagrams", value: "Logical-Venn-Diagrams" },
{ subject: "reasoning-general", label: "number Series", value: "Number-Series" },
{ subject: "reasoning-general", label: "calender", value: "Calender" },

{ subject: "reasoning-general", label: "clock", value: "Clock" },
{ subject: "reasoning-general", label: "non-Verbal Reasoning (Mirror Image, Water Image, Paper Folding, etc.)", value: "Non-Verbal-Reasoning" },
{ subject: "reasoning-general", label: "embedded Figures", value: "Embedded-Figures" },
{ subject: "reasoning-general", label: "cube and Dice", value: "Cube-Dice" },
{ subject: "reasoning-general", label: "figure Series", value: "Figure-Series" },
{ subject: "reasoning-general", label: "coding using Symbols", value: "Coding" },



  // Computer Knowledge
{ subject: "computer-knowledge", label: "basics of Computers", value: "Basics-Computers" },
{ subject: "computer-knowledge", label: "operating System (OS)", value: "OS" },
{ subject: "computer-knowledge", label: "software", value: "Software" },
{ subject: "computer-knowledge", label: "internet and Web", value: "Internet-Web" },
{ subject: "computer-knowledge", label: "networking and Communication", value: "Networking" },
{ subject: "computer-knowledge", label: "ms Office Tools", value: "MS-Office" },
{ subject: "computer-knowledge", label: "cyber Security & Malware", value: "Cyber-Security" },
{ subject: "computer-knowledge", label: "computer Abbreviations and Terminology", value: "Computer-Abbreviations" },


  // General Awareness
{ subject: "general-awareness", label: "history", value: "History" },
{ subject: "general-awareness", label: "geography", value: "Geography" },
{ subject: "general-awareness", label: "indian Polity", value: "Indian-Polity" },
{ subject: "general-awareness", label: "indian Economy", value: "Indian-Economy" },
{ subject: "general-awareness", label: "general Science", value: "General-Science" },
{ subject: "general-awareness", label: "current Affairs", value: "Current-Affairs" },
{ subject: "general-awareness", label: "static General Knowledge", value: "Static-Gk" },
{ subject: "general-awareness", label: "art and Culture", value: "Art-Culture" },

{ subject: "general-awareness", label: "environment and Ecology", value: "Environment-Ecology" },
{ subject: "general-awareness", label: "government Schemes and Policies", value: "Govt-Schemes" },
{ subject: "general-awareness", label: "important Days and Events", value: "Important-Days" },
{ subject: "general-awareness", label: "books and Authors", value: "Books-Authors" },
{ subject: "general-awareness", label: "sports and Awards", value: "Sports-Awards" },
{ subject: "general-awareness", label: "miscellaneous GK", value: "Miscellaneous-Gk" },

];



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

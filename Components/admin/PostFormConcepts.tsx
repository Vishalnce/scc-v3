"use client";

import "react-datepicker/dist/react-datepicker.css";

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
  { value: "pre", label: "Pre" },
  { value: "mains", label: "Mains" },
];

const subjectOptions = [
  { value: "quantitative-apptitude", label: "Quantitative Apptitude" },
  { value: "reasoning-general", label: "Reasoning & General Intelligence" },
  { value: "english-comprehension", label: "English Comprehension" },
  { value: "general-awareness", label: "General Awareness" },

  { value: "mathematical-abilities", label: "Mathematical Abilities" },

  { value: "computer-knowledge", label: "Computer Knowledge" },
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
  { subject: "english-comprehension", label: "Vocabulary", value: "vocabulary" },
  { subject: "english-comprehension", label: "Grammar", value: "grammar" },
  { subject: "english-comprehension", label: "Error Spotting and Sentence Improvement", value: "error-spotting-sentence-improvement" },
  { subject: "english-comprehension", label: "Comprehension and Usage", value: "comprehension-usage" },

  // Quantitative Aptitude
  { subject: "quantitative-apptitude", label: "Arithmetic", value: "arithmetic" },
  { subject: "quantitative-apptitude", label: "Data Interpretation", value: "data-interpretation" },
  { subject: "quantitative-apptitude", label: "Area & Volume", value: "area-volume" },
  { subject: "quantitative-apptitude", label: "Simple Interest (SI) & Compound Interest (CI)", value: "si-ci" },
  { subject: "quantitative-apptitude", label: "Time, Speed, Distance", value: "time-speed-distance" },
  { subject: "quantitative-apptitude", label: "Time & Work", value: "time-work" },
  { subject: "quantitative-apptitude", label: "Ratio & Proportion", value: "ratio-proportion" },
  { subject: "quantitative-apptitude", label: "Profit & Loss", value: "profit-loss" },
  { subject: "quantitative-apptitude", label: "Percentages", value: "percentages" },
  { subject: "quantitative-apptitude", label: "Averages", value: "averages" },
  { subject: "quantitative-apptitude", label: "Numbers", value: "numbers" },
  { subject: "quantitative-apptitude", label: "Mixture and Allegation", value: "mixture-allegation" },
  { subject: "quantitative-apptitude", label: "Advanced Mathematics", value: "advanced-mathematics" },
  { subject: "quantitative-apptitude", label: "Mensuration", value: "mensuration" },
  { subject: "quantitative-apptitude", label: "Trigonometry", value: "trigonometry" },
  { subject: "quantitative-apptitude", label: "Statistics", value: "statistics" },
  { subject: "quantitative-apptitude", label: "Geometry", value: "geometry" },

  // Reasoning
  { subject: "reasoning-general", label: "Seating Arrangement", value: "seating-arrangement" },
  { subject: "reasoning-general", label: "Syllogism", value: "syllogism" },
  { subject: "reasoning-general", label: "Blood Relations", value: "blood-relations" },
  { subject: "reasoning-general", label: "Puzzles", value: "puzzles" },

  { subject: "reasoning-general", label: "Inequalities", value: "inequalities" },
  { subject: "reasoning-general", label: "Input-Output", value: "input-output" },
  { subject: "reasoning-general", label: "Coding-Decoding", value: "coding-decoding" },
  { subject: "reasoning-general", label: "Data Sufficiency", value: "data-sufficiency" },
  { subject: "reasoning-general", label: "Order and Ranking", value: "order-ranking" },
  { subject: "reasoning-general", label: "Alphanumeric Series", value: "alphanumeric-series" },
  { subject: "reasoning-general", label: "Directions", value: "directions" },
  { subject: "reasoning-general", label: "Analogy", value: "analogy" },
  { subject: "reasoning-general", label: "Classification/Odd One Out", value: "classification" },
  { subject: "reasoning-general", label: "Statement and Conclusion", value: "statement-conclusion" },
  { subject: "reasoning-general", label: "Statement and Assumption", value: "statement-assumption" },
  { subject: "reasoning-general", label: "Statement and Arguments", value: "statement-arguments" },
  { subject: "reasoning-general", label: "Cause and Effect", value: "cause-effect" },
  { subject: "reasoning-general", label: "Logical Venn Diagrams", value: "logical-venn-diagrams" },
  { subject: "reasoning-general", label: "Number Series", value: "number-series" },
  { subject: "reasoning-general", label: "Calender", value: "calender" },

  { subject: "reasoning-general", label: "Clock", value: "clock" },
  { subject: "reasoning-general", label: "Non-Verbal Reasoning (Mirror Image, Water Image, Paper Folding, etc.)", value: "non-verbal-reasoning" },
  { subject: "reasoning-general", label: "Embedded Figures", value: "embedded-figures" },
  { subject: "reasoning-general", label: "Cube and Dice", value: "cube-dice" },
  { subject: "reasoning-general", label: "Figure Series", value: "figure-series" },
  { subject: "reasoning-general", label: "Coding using Symbols", value: "coding" },


  // Computer Knowledge
  { subject: "computer-knowledge", label: "Basics of Computers", value: "basics-computers" },
  { subject: "computer-knowledge", label: "Operating System (OS)", value: "os" },
  { subject: "computer-knowledge", label: "Software", value: "software" },
  { subject: "computer-knowledge", label: "Internet and Web", value: "internet-web" },
  { subject: "computer-knowledge", label: "Networking and Communication", value: "networking" },
  { subject: "computer-knowledge", label: "MS Office Tools", value: "ms-office" },
  { subject: "computer-knowledge", label: "Cyber Security & Malware", value: "cyber-security" },
  { subject: "computer-knowledge", label: "Computer Abbreviations and Terminology", value: "computer-abbreviations" },

  // General Awareness
  { subject: "general-awareness", label: "History", value: "history" },
  { subject: "general-awareness", label: "Geography", value: "geography" },
  { subject: "general-awareness", label: "Indian Polity", value: "indian-polity" },
  { subject: "general-awareness", label: "Indian Economy", value: "indian-economy" },
  { subject: "general-awareness", label: "General Science", value: "general-science" },
  { subject: "general-awareness", label: "Current Affairs", value: "current-affairs" },
  { subject: "general-awareness", label: "Static General Knowledge", value: "static-gk" },
  { subject: "general-awareness", label: "Art and Culture", value: "art-culture" },

  { subject: "general-awareness", label: "Environment and Ecology", value: "environment-ecology" },
  { subject: "general-awareness", label: "Government Schemes and Policies", value: "govt-schemes" },
  { subject: "general-awareness", label: "Important Days and Events", value: "important-days" },
  { subject: "general-awareness", label: "Books and Authors", value: "books-authors" },
  { subject: "general-awareness", label: "Sports and Awards", value: "sports-awards" },
  { subject: "general-awareness", label: "Miscellaneous GK", value: "miscellaneous-gk" }
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

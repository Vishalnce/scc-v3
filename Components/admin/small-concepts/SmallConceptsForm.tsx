"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import Editor from "@/Components/admin/editor-page";
import { TocItem } from "../toc";

type Announce = {
  id: number;
  title: string;
  content: string;
  topic: string;
};

type AnnounceFormProps = {
  announce?: Announce | null;
  onSuccess: () => void;
};

type AnnounceFormInput = {
  title: string;
  content: string;
  topic: string;
};

type OptionType = { value: string; label: string };

function AnnounceForm({ announce, onSuccess }: AnnounceFormProps) {
  const router = useRouter();
  const id = announce ? announce.id : undefined;




  const [editorDatad, setEditorDatad] = useState<{
    html: string;
    toc: TocItem[];
  }>({
    html: "",
    toc: [],
  });

  console.log("editorDatad", editorDatad);

  const [isEditorTouchedd, setIsEditorTouchedd] = useState(false);
const [valued, setValued] = useState("");
  const { handleSubmit, reset } = useForm({
    defaultValues: { title: "", content: "", topic: "" },
  });


  console.log( valued);


useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/en/small-concepts/admin");
      const data = await res.json();

      if (data?.post?.content) {
        setValued(data.post.content); // ✅ preload editor
      }
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  fetchData();
}, []);

  const handleSave = async () => {
    try {
      if (!editorDatad.html) {
        alert("Content required ❌");
        return;
      }

      const response = await fetch("/api/en/small-concepts/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: editorDatad.html, // ✅ only this
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Saved successfully ✅");
        onSuccess();
      } else {
  console.log(result.error);
      }
    } catch {
      alert("Something went wrong ❌");
    }
  };

  // const valued = post?.editorHtml || "";

  return (
    <>
      <div className="border-2 border-gray-300 rounded-lg w-[90%] mx-auto p-6 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          <p>Edit Home Concept</p>
        </h2>
        <form className="space-y-5">
          <Editor
            value={valued}
            onSync={setEditorDatad}
            setIsEditorChange={setIsEditorTouchedd}
          />

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AnnounceForm;

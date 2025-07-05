// app/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Editor from "@/Components/admin/editor-page" // adjust path if needed
import type { TocItem } from "@/Components/admin/toc";

export default function Page() {
  const { register, handleSubmit } = useForm();
  const [editorData, setEditorData] = useState<{ html: string; toc: TocItem[] }>({
    html: "",
    toc: [],
  });

  const value = ` <p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">asdsadasdasdasdassszzzzzzzzzzz</span></p>`

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    console.log("Editor HTML:", editorData.html);
    console.log("Editor TOC:", editorData.toc);
    // Save all of this to backend/database
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      <input {...register("title")} placeholder="Title" className="border p-2 w-full" />
      <input {...register("category")} placeholder="Category" className="border p-2 w-full" />

      <Editor value={value} onSync={setEditorData} />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}

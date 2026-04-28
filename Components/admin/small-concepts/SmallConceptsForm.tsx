"use client";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import Editor from "@/Components/admin/editor-page";
import { TocItem } from "../toc";
import { extractImages } from "@/Components/admin/shared-admin-code/ExtractHTML";
import { deleteImage } from "@/Components/admin/shared-admin-code/DeleteURL";

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

function SmallConceptForm({ announce, onSuccess }: AnnounceFormProps) {
  const router = useRouter();
  const id = announce ? announce.id : undefined;
  const [saving, setSaving] = useState(false);

  const prevHtmlRef = useRef("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/en/small-concepts/admin");
        const data = await res.json();

        const html = data?.post?.content || "";

        setValued(html);
        prevHtmlRef.current = html; // store old
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);

    try {
      const newHtml = editorDatad.html;
      const oldHtml = prevHtmlRef.current;

      if (!newHtml) {
        alert("Content required ❌");
        setSaving(false);
        return;
      }

      const oldImgs = extractImages(oldHtml);
      const newImgs = extractImages(newHtml);

      for (const img of oldImgs) {
        if (!newImgs.includes(img)) {
          await deleteImage(img);
        }
      }

      const res = await fetch("/api/en/small-concepts/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newHtml }),
      });

      if (!res.ok) throw new Error();

      alert("Saved ✅");

      prevHtmlRef.current = newHtml;
      onSuccess();
    } catch {
      alert("Error");
    } finally {
      setSaving(false);
    }
  };

  // const valued = post?.editorHtml || "";

  return (
    <>
      <div className=" border-gray-300 rounded-lg w-[90%] mx-auto p-6 bg-white shadow-sm">
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
              disabled={saving}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SmallConceptForm;

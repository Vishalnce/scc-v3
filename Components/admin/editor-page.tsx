"use client";
// app/page.tsx (Server Component - default)

import LexicalEditorClientWrapper from "@/Components/editor/LexicalEditorClientWrapper";
import { useState, useRef } from "react";
import "./globals.css";
import { extractTocFromHtml } from "@/Components/admin/toc";

export default function Home() {
  const editorContentRef = useRef<string>("");

  const [value, setValue] = useState("");
  const [toc, setToc] = useState([]);

  const tocAndHtml = () => {
    const rawHtml = editorContentRef.current;

    console.log("Raw HTML:\n", rawHtml);

    const { toc, html: updatedHtml } = extractTocFromHtml(rawHtml);

    console.log("Extracted TOC:\n", toc);
    console.log("Extracted HTML:\n", updatedHtml);
  };

  console.log(editorContentRef.current);
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full max-w-4xl">
        <LexicalEditorClientWrapper
          value={value}
          onChange={(newValue) => {
            editorContentRef.current = newValue;
          }}
        />
      </div>
      <button className="p-1" onClick={tocAndHtml}>
        Sync Now
      </button>
    </div>
  );
}

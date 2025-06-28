"use client"
// app/page.tsx (Server Component - default)

import LexicalEditorClientWrapper from "@/Components/editor/LexicalEditorClientWrapper";
import { useState,useRef } from "react";

export default function Home() {
    const editorContentRef = useRef<string>("");
  const [value, setValue] = useState("");

  console.log(editorContentRef.current);
  return (
    <div className="flex flex-col items-center justify-center ">
     
      <div className="w-full max-w-4xl">
        <LexicalEditorClientWrapper value={value}
        onChange={(newValue) => {
           editorContentRef.current = newValue;
        }} />
      </div>
      <button
        className="p-1"
        onClick={() => {
          setValue(editorContentRef.current); // ✅ manually sync when needed
        }}
      >
        Sync Now
      </button>
    </div>
  );
}

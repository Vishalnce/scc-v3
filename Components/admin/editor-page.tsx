"use client";

import LexicalEditorClientWrapper from "@/Components/editor/LexicalEditorClientWrapper";
import { useEffect, useRef, useState } from "react";
import { extractTocFromHtml } from "@/Components/admin/toc";
import type { TocItem } from "@/Components/admin/toc";

import "./globals.css";

type EditorProps = {
  value?: string; // NEW: make value optional for initial content
  onSync: (data: { html: string; toc: TocItem[] }) => void;
};

export default function Editor({ value = "", onSync }: EditorProps) {
  const editorContentRef = useRef<string>(value); // store current content

  const [editorValue, setEditorValue] = useState(value); // local state

  useEffect(() => {
    // If value changes (e.g. on blog fetch), update local state and ref
    setEditorValue(value);
    editorContentRef.current = value;
  }, [value]);

  const tocAndHtml = () => {
    const rawHtml = editorContentRef.current;
    const { toc, html: updatedHtml } = extractTocFromHtml(rawHtml);
    onSync({ html: updatedHtml, toc });
    console.log("TOC:", toc);
    console.log("HTML:", updatedHtml);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <LexicalEditorClientWrapper
          value={editorValue} // pass prefilled value
          onChange={(newValue) => {
            editorContentRef.current = newValue;
          }}
        />
      </div>
      <button type="button" className="p-1 mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={tocAndHtml}>
        Sync Now
      </button>
    </div>
  );
}

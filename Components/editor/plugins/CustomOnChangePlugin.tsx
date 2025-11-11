"use client";
import React, { useRef, useState, useEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $insertNodes } from "lexical";
import { useSession } from "next-auth/react";

export default function CustomOnChangePlugin({ value, onChange }: any) {
  const { data: session } = useSession();
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const prevImageUrls = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!value || !isFirstRender) return;

    setIsFirstRender(false);
    editor.update(() => {
      const currentHTML = $generateHtmlFromNodes(editor);
      if (currentHTML !== value) {
        $getRoot().clear();
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        $insertNodes(nodes);
      }
    });
  }, [editor, value, isFirstRender]);

  useEffect(() => {
    setIsFirstRender(true);
  }, [value]);

  return (
    <OnChangePlugin
      onChange={(editorState: EditorState) => {
        editorState.read(() => {
          const html = $generateHtmlFromNodes(editor);
          onChange(html);

          // --- 👇 Detect deleted images
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const currentUrls = new Set(
            Array.from(doc.querySelectorAll("img")).map((img) => img.src)
          );

          // Find deleted URLs
          for (const url of prevImageUrls.current) {
            if (!currentUrls.has(url)) {
              fetch(
                `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/api/delete/?url=${encodeURIComponent(url)}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                  },
                }
              ).catch(console.error);
            }
          }

          // Update reference
          prevImageUrls.current = currentUrls;
        });
      }}
    />
  );
}

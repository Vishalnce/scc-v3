"use client";

import dynamic from "next/dynamic";
import { SettingsContext } from "./context/SettingsContext";
import { FlashMessageContext } from "./context/FlashMessageContext";
import type { EditorProps } from "./App";

const LexicalEditor = dynamic(() => import("./App"), {
  ssr: false,
});

export default function LexicalEditorClientWrapper(props: EditorProps) {
  return (
    <SettingsContext>
      <FlashMessageContext>
        <LexicalEditor {...props} />
      </FlashMessageContext>
    </SettingsContext>
  );
}

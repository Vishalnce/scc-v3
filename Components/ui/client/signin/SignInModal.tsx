"use client";

import React from "react";
import SignInModalForm from "./SignInModalForm";


export default function SignInModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-[90%] max-w-lg relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black dark:text-gray-300"
        >
          ✕
        </button>
        <SignInModalForm />
      </div>
    </div>
  );
}

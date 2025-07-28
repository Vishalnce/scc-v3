"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  onSuccess: () => void;
  content: string | undefined;
  id?: number;
};

type LinerFormInput = {
  text: string;
};

export default function OneLinerForm({ onSuccess, content, id }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<LinerFormInput>({
    defaultValues: { text: content || "" },
  });

  // ✅ Reset form when content or id changes
  useEffect(() => {
    reset({ text: content || "" });
  }, [content, id, reset]);

  const handleAdd = async (data: LinerFormInput) => {
    const response = await fetch("/api/en/one-liner/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      onSuccess();
      reset({ text: "" }); // ✅ Clear input after adding
    }
  };

  const handleUpdate = async (data: LinerFormInput) => {
    if (!id) return;
    const response = await fetch(`/api/en/one-liner/admin?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: data.text })

    });
    if (response.ok) {
      onSuccess();
      // reset({ text: "" }); // ✅ Clear input after update (optional)
    }
  };

  return (
    <div className="border-2 w-[80%] mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Update One-Liner" : "Add One-Liner"}
      </h2>
      <form className="space-y-4">
        <textarea
          {...register("text", { required: "One-liner is required" })}
          placeholder="Enter a one-liner..."
          className="w-full p-2 border border-gray-300 rounded"
        />

        
          <button
            type="button"
            onClick={handleSubmit(handleAdd)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
       
          <button
            type="button"
            onClick={handleSubmit(handleUpdate)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update
          </button>
       
      </form>
    </div>
  );
}

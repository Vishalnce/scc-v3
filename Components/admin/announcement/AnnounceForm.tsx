"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

type Announce = {
  id: number;
  title: string;
  link: string;
};

type AnnounceFormProps = {
  announce?: Announce | null;
  onSuccess: () => void;
};

type AnnounceFormInput = {
 
  title: string;
  link: string;
};

function AnnounceForm({ announce, onSuccess }: AnnounceFormProps) {
  const router = useRouter(); 
  const id = announce? announce.id : undefined;

  const {

    register,
    handleSubmit,
    reset,
    // formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: { title:  "", link: "" },
  });

   useEffect(() => {
    if (announce) {
      reset({
        title: announce.title || "",
        link: announce.link || "",
      });
    } else {
      reset({ title: "", link: "" }); // clear when adding
    }
  }, [announce, reset]);

  const handleAdd = async (data: AnnounceFormInput) => {
    const response = await fetch("/api/en/announcement/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      onSuccess();
      reset(); // ✅ Clear input after adding
    }
  };
  const handleUpdate = async (data: AnnounceFormInput) => {
    const modifiedData = { ...data, id: id }; 
    const response = await fetch(`/api/en/announcement/admin?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( modifiedData),
    });
    if (response.ok) {
      onSuccess();
      reset({ title: "", link: "" });
          router.push("/admin/notice");
    }
  };

  return (
    <>
      <div className="border-2 w-[80%] mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {announce?.id ? "Update One-Liner" : "Add One-Liner"}
        </h2>
        <form className="space-y-4">
          <textarea
            {...register("title", { required: "One-liner is required" })}
            placeholder="Enter a title..."
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            {...register("link", { required: "One-liner is required" })}
            placeholder="Enter a link..."
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
    </>
  );
}

export default AnnounceForm;

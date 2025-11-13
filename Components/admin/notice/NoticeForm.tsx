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
    const response = await fetch("/api/en/notice/admin", {
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
    const response = await fetch(`/api/en/notice/admin?id=${id}`, {
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
      <div className="border-2 border-gray-300 rounded-lg w-[90%] mx-auto p-6 bg-white shadow-sm">
  <h2 className="text-xl font-bold mb-6 text-gray-800">
   <p> Edit Upcoming Exam at Home</p>
  </h2>
  <form className="space-y-6">
    <textarea
      {...register("title", { required: "One-liner is required" })}
      placeholder="Enter a title..."
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      rows={3}
    />
    <textarea
      {...register("link", { required: "One-liner is required" })}
      placeholder="Enter a link..."
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      rows={3}
    />

    <div className="flex space-x-4">
      <button
        type="button"
        onClick={handleSubmit(handleAdd)}
        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add
      </button>
      <button
        type="button"
        onClick={handleSubmit(handleUpdate)}
        className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Update
      </button>
    </div>
  </form>
</div>

    </>
  );
}

export default AnnounceForm;

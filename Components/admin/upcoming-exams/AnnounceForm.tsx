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
  const id = announce ? announce.id : undefined;

  const {
    register,
    handleSubmit,
    reset,
    // formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: { title: "", link: "" },
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
    const response = await fetch("/api/en/home-upcoming/admin", {
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
    const response = await fetch(`/api/en/home-upcomingadmin?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedData),
    });
    if (response.ok) {
      onSuccess();
      reset({ title: "", link: "" });
      router.push("/admin/notice");
    }
  };

  return (
    <>
      <div className="w-[90%] mx-auto border-2 border-gray-300 rounded-lg p-6 bg-white shadow-sm">
  <h2 className="text-xl font-bold mb-6 text-gray-800">
    <p>Edit Announcement</p>
  </h2>
  <form className="space-y-5">
    <div>
      <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">
        Title
      </label>
      <textarea
        id="title"
        {...register("title", { required: "One-liner is required" })}
        placeholder="Enter a title..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        rows={3}
      />
    </div>

    <div>
      <label htmlFor="link" className="block mb-2 font-semibold text-gray-700">
        Link
      </label>
      <textarea
        id="link"
        {...register("link", { required: "One-liner is required" })}
        placeholder="Enter a link..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        rows={3}
      />
    </div>

    <div className="flex gap-4">
      <button
        type="button"
        onClick={handleSubmit(handleAdd)}
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Add
      </button>

      <button
        type="button"
        onClick={handleSubmit(handleUpdate)}
        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
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

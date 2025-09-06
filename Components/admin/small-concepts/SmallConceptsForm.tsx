"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

type Announce = {
  id: number;
  title: string;
  content: string;
  topic: string;
};

type AnnounceFormProps = {
  announce?: Announce | null;
  onSuccess: () => void;
};

type AnnounceFormInput = {
  title: string;
  content: string;
  topic: string;
};

type OptionType = { value: string; label: string };

function AnnounceForm({ announce, onSuccess }: AnnounceFormProps) {
  const router = useRouter();
  const id = announce ? announce.id : undefined;

  const {
    register,
    handleSubmit,
    reset,
    control,
    // formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: { title: "", content: "", topic: "" },
  });

  useEffect(() => {
    if (announce) {
      reset({
        title: announce.title || "",
        content: announce.content  || "",
        topic: announce.topic || "",
      });
    } else {
      reset({ title: "",  content: "", topic: "" }); // clear when adding
    }
  }, [announce, reset]);

  const handleAdd = async (data: AnnounceFormInput) => {
  try {
    const response = await fetch("/api/en/small-concepts/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Record added successfully ✅");
      onSuccess();
      reset(); // Clear form
    } else {
      alert(result.error || "Failed to add record ❌");
    }
  } catch (err) {
    alert("Something went wrong. Please try again ❌");
  }
};

  const handleUpdate = async (data: AnnounceFormInput) => {
    const modifiedData = { ...data, id: id };
    const response = await fetch(`/api/en/small-concepts/admin?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedData),
    });
    if (response.ok) {
      onSuccess();
      reset({ title: "", content: "", topic: "" });
      router.push("/admin/small-concepts");
    }
  };

  const topicOptions: OptionType[] = [
    { value: "Quantitative Apptitude", label: "Quantitative Apptitude" },
    {
      value: "Reasoning & General Intelligence",
      label: "Reasoning & General Intelligence",
    },
    { value: "English Comprehension", label: "English Comprehension" },
    { value: "General Awareness", label: "General Awareness" },
    { value: "Computer Knowledge", label: "Computer Knowledge" },
    { value: "Mathematical Abilities", label: "Mathematical Abilities" },
  ];

  return (
    <>
      <div className="border-2 w-[80%] mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {announce?.id ? "Update One-Liner" : "Add One-Liner"}
        </h2>
        <form className="space-y-4">
          <input
            {...register("title", { required: "One-liner is required" })}
            placeholder="Enter a title..."
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            {...register("content", { required: "One-liner is required" })}
            placeholder="Enter a content..."
            className="w-full p-2 border border-gray-300 rounded"
          />

          <Controller
            name="topic"
            control={control}
            rules={{ required: "topic is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={topicOptions}
                isClearable
                // react-select expects the value to be the whole option object, so find matching option here:
                value={
                  topicOptions.find((option) => option.value === field.value) ||
                  null
                }
                onChange={(option) =>
                  field.onChange(option ? option.value : "")
                }
                placeholder="Select a topic"
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "1px solid #E6F1F1",
                    borderRadius: "",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    outline: "none",
                    width: "100%",
                  }),
                  placeholder: (base) => ({ ...base }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#007076"
                      : state.isFocused
                        ? "#E6F1F1"
                        : "transparent",
                    color: "black",
                    cursor: "pointer",
                  }),
                  singleValue: (base) => ({ ...base }),
                  menu: (base) => ({ ...base, width: "100%" }),
                }}
                className="w-[290px]"
                classNames={{ control: () => "min-w-[160px]" }}
              />
            )}
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

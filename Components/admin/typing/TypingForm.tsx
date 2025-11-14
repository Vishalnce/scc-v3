"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

type Announce = {
  id: number;
  title: string;
  level: string;
};

type AnnounceFormProps = {
  announce?: Announce | null;
  onSuccess: () => void;
};

type AnnounceFormInput = {
  title: string;
  level: string;
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
    defaultValues: { title: "", level: "" },
  });

  useEffect(() => {
    if (announce) {
      reset({
        title: announce.title || "",
        level: announce.level || "",
      });
    } else {
      reset({ title: "", level: "" }); // clear when adding
    }
  }, [announce, reset]);

  const handleAdd = async (data: AnnounceFormInput) => {
    const response = await fetch("/api/en/typing/admin", {
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
    const response = await fetch(`/api/en/typing/admin?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedData),
    });
    if (response.ok) {
      onSuccess();
      reset({ title: "", level: "" });
      router.push("/admin/typing");
    }
  };



  const levelOptions: OptionType[] = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  return (
    <>
     <div className=" w-[90%] mx-auto p-6 rounded-md shadow-sm bg-white">
  <h2 className="text-xl font-bold mb-4">
    Add or Update Typing Test
  </h2>
  <form className="space-y-4">
    <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">
      Title
    </label>
    <textarea
      id="title"
      {...register("title", { required: "One-liner is required" })}
      placeholder="Enter a title..."
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />

    <label htmlFor="level" className="block mb-2 font-semibold text-gray-700">
      Level
    </label>
    <Controller
      name="level"
      control={control}
      rules={{ required: "Level is required" }}
      render={({ field }) => (
        <Select
          {...field}
          options={levelOptions}
          isClearable
          value={
            levelOptions.find((option) => option.value === field.value) || null
          }
          onChange={(option) =>
            field.onChange(option ? option.value : "")
          }
          placeholder="Select a level"
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
          inputId="level"
        />
      )}
    />

    <div className="flex gap-4">
      <button
        type="button"
        onClick={handleSubmit(handleAdd)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add
      </button>

      <button
        type="button"
        onClick={handleSubmit(handleUpdate)}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
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

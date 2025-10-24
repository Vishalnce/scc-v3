"use client";
import React, { useState } from "react";
import Select from "react-select";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
// Define option type
type OptionType = { value: string; label: string };

// Static options (DO NOT wrap these in state)
const timeOptions: OptionType[] = [
  { value: "3", label: "3 minutes" },
  { value: "5", label: "5 minutes" },
  { value: "10", label: "10 minutes" },
];

const levelOptions: OptionType[] = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

const Filter = () => {
  const { theme } = useTheme();
const router = useRouter();
  // Selected values (state)
  const [selectedTime, setSelectedTime] = useState<OptionType | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<OptionType | null>(null);

  // Handle submit
  function handleSubmit(): void {
    if (!selectedTime || !selectedLevel) {
      alert(
        "⚠️ Please select both Time Limit and Difficulty Level before starting!"
      );
      return;
    }

      const params = new URLSearchParams();

     if (selectedTime?.value) {
    params.set("time", selectedTime.value);
  }

  if (selectedLevel?.value) {
    params.set("level", selectedLevel.value);
  }

  // Navigate with params
  router.push(`/typing-test/test?${params.toString()}`);
  }

  return (
    <>
      <div className="w-full flex flex-row items-center justify-center gap-12">
        {/* Left side: Time */}
        <div className="flex flex-col m-2">
          <div className="flex flex-row pb-4">
            <Image
              src="/typing-test/stop-watch.svg"
              alt="stop-watch"
              width={24}
              height={24}
            />
            <p className="dark:text-white">Time Limit</p>
          </div>

          <Select
            isClearable
            value={selectedTime}
            onChange={setSelectedTime}
            options={timeOptions}
            placeholder="Select a time"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid bg-[#E6F1F1]",
                borderRadius: "",
                backgroundColor: "transparent",
                color: theme === "dark" ? "white" : "black",
                boxShadow: "none",
                outline: "none",
                // "&:hover": {
                //   border:
                //     theme === "dark" ? "2px solid white" : "2px solid black",
                // },
                width: "100%",
              }),
              placeholder: (base) => ({
                ...base,
                color: theme === "dark" ? "#C2C2C2" : "#6C6C6C",
              }),
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
              singleValue: (base) => ({
                ...base,
                color: theme === "dark" ? "#C2C2C2" : "#6C6C6C",
              }),
              menu: (base) => ({
                ...base,
                width: "100%",
              }),
            }}
            className="w-[290px]"
            classNames={{
              control: () => "min-w-[160px]",
            }}
          />
        </div>

        {/* Right side: Difficulty */}
        <div className="flex flex-col m-2">
          <div className="flex flex-row pb-4">
            <Image
              src="/typing-test/auto-conversations.svg"
              alt="difficulty"
              width={24}
              height={24}
            />
            <p className="dark:text-white">Difficulty Level</p>
          </div>

          <Select
            isClearable
            value={selectedLevel}
            onChange={setSelectedLevel}
            options={levelOptions}
            placeholder="Select a level"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #E6F1F1",
                borderRadius: "",
                backgroundColor: "transparent",
                color: theme === "dark" ? "white" : "black",
                boxShadow: "none",
                outline: "none",
                // "&:hover": {
                //   border:
                //     theme === "dark" ? "2px solid white" : "2px solid black",
                // },
                width: "100%",
              }),
              placeholder: (base) => ({
                ...base,
                color: theme === "dark" ? "#C2C2C2" : "#6C6C6C",
              }),
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
              singleValue: (base) => ({
                ...base,
                color: theme === "dark" ? "#C2C2C2" : "#6C6C6C",
              }),
              menu: (base) => ({
                ...base,
                width: "100%",
              }),
            }}
            className="w-[290px]"
            classNames={{
              control: () => "min-w-[160px]",
            }}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center my-4">
        <button
          onClick={handleSubmit}
          className="px-12 rounded-4xl py-2 text-white bg-[#007076]"
        >
          Start Test
        </button>
      </div>
    </>
  );
};

export default Filter;

"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import { FiCalendar } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "next-themes";
import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { topicOptionsBySubject } from "@/constants/concepts/topicOptionsBySubject";
type OptionType = { value: string; label: string };

// const options = [
//   { value: "Polity & Governance", label: "Polity & Governance" },
//   { value: "International Relations", label: "International Relations" },
//   { value: "Indian Economy", label: "Indian Economy" },
//   { value: "Environment & Ecology", label: "Environment & Ecology" },

//   { value: "Science & Technology", label: "Science & Technology" },

//   { value: "Social Issues", label: " Social Issues" },

//   { value: "Internal Security", label: "Internal Security" },
//   { value: "Disaster Management", label: "Disaster Management" },
//   { value: "Art & Culture", label: " Art & Culture" },

//   {
//     value: "Reports, Indices & Rankings",
//     label: "Reports, Indices & Rankings",
//   },

//   {
//     value: "Government Schemes & Policies",
//     label: "Government Schemes & Policies",
//   },
// ];

const Filter = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<OptionType | null>(null);
  const [topicOptions, setTopicOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  // console.log(date);
  const subject = searchParams.get("subject") || "";
  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
  };

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  useEffect(() => {
    if (subject) {
      const options = topicOptionsBySubject[subject] || [];
      setTopicOptions(options);
    }
  }, [subject]);

function handleSubmit(): void {
  const params = new URLSearchParams(searchParams);

  if (subject) {
    params.set("subject", subject);
  }

  if (selectedTopic?.value) {
    params.set("topic", selectedTopic.value);
  } else {
    params.delete("topic");
  }

  params.set("page", "1");

  router.push(`/quiz?${params.toString()}`);
}




  // console.log(selectedOption);
  //  console.log(date);


  return (
    <>
      {/* left side  */}
      <div className="max-md:w-full max-md:flex-wrap flex flex-row items-center max-md:justify-around gap-4 max-sm:gap-1   ">
        {/* date  */}

        {/* <div className="relative w-[160px]">
          <DatePicker
          isClearable
            className="w-full pl-8 pr-4 py-2 text-md border-2 rounded-full bg-transparent placeholder:text-[#6C6C6C] dark:placeholder:text-[#C2C2C2] focus:outline-none focus:ring-0"
            selected={date}
            onChange={handleDateChange}
            closeOnScroll={false}
            placeholderText="DD/MM/YYYY"
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            calendarClassName="z-50 "
          />
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        </div>
         */}

        {/*  selection */}
        <Select
  isClearable
  value={selectedTopic}
  onChange={setSelectedTopic}
  options={topicOptions}
  placeholder="Select a topic"
  styles={{
    control: (base) => ({
      ...base,
      border: theme === "dark" ? "2px solid white" : "2px solid black",
      borderRadius: "9999px",
      backgroundColor: "transparent",
      color: theme === "dark" ? "white" : "black",
      boxShadow: "none",
      outline: "none",
      "&:hover": {
        border: theme === "dark" ? "2px solid white" : "2px solid black",
      },
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
      width: "240px",
      right: "1px",
    }),
  }}
  className="w-[160px]"
  classNames={{
    control: () => "min-w-[160px]",
  }}
/>

        <button
          onClick={handleSubmit}
          className="px-7  rounded-4xl  py-2 text-[#FFFFFF] my-auto  max-sm:mt-3 max-md: bg-[#007076]"
        >
          Submmit
        </button>
      </div>

      {/* right side */}
    </>
  );
};

export default Filter;

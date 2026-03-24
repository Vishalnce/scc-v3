"use client";
import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "next-themes";
import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";

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
            <div className="w-[160px] max-md:w-[110px] min-w-[110px] shrink-0">
          <Select
            isClearable
            value={selectedTopic}
          onChange={setSelectedTopic}
          options={topicOptions}
            placeholder="Topic"
            components={{
              DropdownIndicator: null, // ✅ remove arrow (fix overflow)
              IndicatorSeparator: null, // optional cleaner UI
            }}
            styles={{
              control: (base) => ({
                ...base,
                border:
                  theme === "dark" ? "1px solid white" : "1px solid black",
                borderRadius: "9999px",
                minHeight: "34px",
                height: "34px",
                backgroundColor: "transparent",
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
              }),

              valueContainer: (base) => ({
                ...base,
                padding: "0 10px",
                paddingRight: "2px", // ✅ space for ❌
                height: "34px",
                display: "flex",
                alignItems: "center",
              }),

              input: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
              }),

              placeholder: (base) => ({
                ...base,
                margin: 0,
                lineHeight: "34px",
                fontSize: "14px",
                color: theme === "dark" ? "#C2C2C2" : "#6C6C6C",
              }),

              singleValue: (base) => ({
                ...base,
                margin: 0,
                lineHeight: "34px",
                fontSize: "14px",
                color: theme === "dark" ? "#C2C2C2" : "#6C6C6C",
              }),

              indicatorsContainer: (base) => ({
                ...base,
                height: "34px",
                display: "flex",
                alignItems: "center",
                paddingRight: "6px",
              }),

              clearIndicator: (base) => ({
                ...base,
                padding: "0 4px",
                cursor: "pointer",
              }),
            }}
          />
        </div>
       

        <button
          onClick={handleSubmit}
          className="px-7  rounded-4xl  py-1.5 text-[#FFFFFF]   bg-[#007076]"
        >
          Submmit
        </button>
      </div>

      {/* right side */}
    </>
  );
};

export default Filter;

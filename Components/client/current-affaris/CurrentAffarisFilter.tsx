"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import { FiCalendar } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "next-themes";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

type OptionType = { value: string; label: string };

const options = [
  { value: "Polity & Governance", label: "Polity & Governance" },
  { value: "International Relations", label: "International Relations" },
  { value: "Indian Economy", label: "Indian Economy" },
  { value: "Environment & Ecology", label: "Environment & Ecology" },

  { value: "Science & Technology", label: "Science & Technology" },

  { value: "Social Issues", label: " Social Issues" },

  { value: "Internal Security", label: "Internal Security" },
  { value: "Disaster Management", label: "Disaster Management" },
  { value: "Art & Culture", label: " Art & Culture" },

  {
    value: "Reports, Indices & Rankings",
    label: "Reports, Indices & Rankings",
  },

  {
    value: "Government Schemes & Policies",
    label: "Government Schemes & Policies",
  },
];

const Filter = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const { theme } = useTheme();
  const router = useRouter();
  // console.log(date);

  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
  };

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      params.set("date", formattedDate);
      // console.log(formattedDate); // ✅ formatted date
    }
    if (selectedOption?.value) {
      params.set("topic", selectedOption.value);
      // console.log(selectedOption.value);
    }

    // console.log(params.toString());
    router.push(`/current-affaris?${params.toString()}`); // ✅ adjust route if needed
  };

  // console.log(selectedOption);
  //  console.log(date);

  return (
    <>
      {/* left side  */}
      <div
        className="flex flex-row items-center max-md:justify-between max-md:mx-auto gap-4 max-sm:gap-1  max-md:w-[90%]
                max-md:flex-nowrap  max-md:gap-2"
      >
        {/* Date */}
        <div className="relative w-[160px] max-md:w-[110px] shrink-0">
          <DatePicker
            popperPlacement="bottom-start"
            isClearable
            className="w-full pl-7 pr-8 py-1.5 text-sm 
      max-md:text-xs max-md:pl-6 max-md:pr-8 max-md:py-2
      border rounded-full bg-transparent 
      placeholder:text-[#6C6C6C] dark:placeholder:text-[#C2C2C2] 
      focus:outline-none focus:ring-0 dark:border-white"
            selected={date}
            onChange={handleDateChange}
            placeholderText="Date"
            dateFormat="dd/MM/yyyy"
          />

          <FiCalendar className="absolute left-3 max-md:left-2 top-1/2 -translate-y-1/2 text-gray-600 dark:text-white text-xs pointer-events-none" />
        </div>

        {/* Select */}
        <div className="w-[160px] max-md:w-[110px] min-w-[110px] shrink-0">
          <Select
            isClearable
            value={selectedOption}
            onChange={handleChange}
            options={options}
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

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="px-7 py-2 text-white  rounded-4xl 
               max-md:px-2 max-md:py-2 max-md:rounded-full shrink-0 md:bg-[#047077]"
        >
          <span className=" max-md:hidden">Submit</span>
          <span className="hidden max-md:block">🔍</span>
        </button>
      </div>

      {/* right side */}
    </>
  );
};

export default Filter;

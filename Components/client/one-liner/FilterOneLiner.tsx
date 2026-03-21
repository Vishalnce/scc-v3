"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import { FiCalendar } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "next-themes";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
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

const FilterOneLiner = () => {
  const [date, setDate] = useState<Date | null>(null);

  const router = useRouter();
  // console.log(date);

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (date) {
      const formattedDate = format(date, "dd-MM-yyyy");
      params.set("date", formattedDate);
      console.log(formattedDate); // ✅ formatted date
    }

    console.log(params.toString());
    router.push(`/one-liner?${params.toString()}`); // ✅ adjust route if needed
  };

  // console.log(selectedOption);
  //  console.log(date);

  return (
    <>
      {/* left side  */}
      <div className="max-md:w-full max-md:flex-wrap flex flex-row items-center max-md:justify-around gap-4 max-sm:gap-1   ">
        {/* date  */}
        <div className="relative w-[140px] max-md:w-[110px] shrink-0">
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

       <button
          onClick={handleSubmit}
          className="px-7 py-2 text-white  rounded-4xl 
               max-md:px-8 max-md:py-1.5 max-md:rounded-full shrink-0 border-2 bg-[#047077]"
        >
          <span className=" ">Submit</span>
          {/* <span className="hidden max-md:block">🔍</span> */}
        </button>

        <Link href="/admin/one-liner " className="max-sm:hidden">
          <button className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
            Add post
          </button>
        </Link>
      </div>

      {/* right side */}
    </>
  );
};

export default FilterOneLiner;

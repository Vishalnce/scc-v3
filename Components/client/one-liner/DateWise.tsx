"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, parse } from "date-fns";

function DateWise() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSelectedDate = searchParams.get("date");

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    // Update selected date from URL
    setSelectedDate(currentSelectedDate);
  }, [currentSelectedDate]);

  const getLast10Dates = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      // ✅ Format: DD-MM-YYYY
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      dates.push(`${day}-${month}-${year}`);
    }
    return dates;
  };

  const handleClick = (date: string) => {
    if (selectedDate === date) {
      // De-select: navigate to all
      setSelectedDate(null);
      router.push("/one-liner");
    } else {
      // Select: navigate with date
      setSelectedDate(date);
      router.push(`/one-liner?date=${date}`);
    }
  };

  const last10Dates = getLast10Dates();

  return (
<div className="w-full dark:bg-[#313131]">

  <div className="flex flex-col max-md:flex-row max-md:overflow-x-auto  justify-start items-center gap-2 max-md:items-stretch px-2 max-md:py-2 no-scrollbar">

    {last10Dates.map((date) => {
      const parsedDate = parse(date, "dd-MM-yyyy", new Date());
      const formatted = format(parsedDate, "d EEE");

      return (
        <div
          key={date}
          onClick={() => handleClick(date)}
          className={`flex flex-row justify-center items-center gap-2 py-4 cursor-pointer text-center rounded-xl transition-all duration-200 w-[60%] max-md:w-[30%] max-md:px-4 shadow-md max-md:shrink-0 max-md:shadow-[0_0_6px_rgba(0,0,0,0.4)] 
          
          ${
            selectedDate === date
              ? "bg-gradient-to-r from-[#289AA2] to-[#8CD6DB] dark:bg-black scale-[0.97]"
              : "dark:bg-[#313131] hover:bg-gradient-to-r from-[#289AA2] to-[#8CD6DB] dark:hover:bg-[#191919]"
          }
        `}
        >
          <div className="flex flex-row md:gap-2  max-md:flex-col">
            <p className="font-bold text-lg">
              {formatted.split(" ")[0]}
            </p>

            <p className="font-bold dark:text-gray-400">
              {formatted.split(" ")[1]}
            </p>
          </div>
        </div>
      );
    })}

  </div>
</div>
  );
}

export default DateWise;

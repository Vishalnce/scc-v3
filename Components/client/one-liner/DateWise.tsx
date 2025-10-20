"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
      dates.push(date.toISOString().split("T")[0]); // Format: YYYY-MM-DD
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
    <div className="w-full bg-[#FAFCFC] border-1 border-[#E6F1F1] dark:bg-[#313131]   rounded-lg shadow-2xl ">
      <h2 className="text-center font-bold py-4 dark:text-white">Date Wise Record</h2>
      <div className="flex flex-col gap-2">
        {last10Dates.map((date) => (
          <div key={date} className="w-full ">
            <li
              onClick={() => handleClick(date)}
              className={` list-inside text-center py-2 cursor-pointer dark:bg-[#313131] dark:text-white rounded-lg ${
                selectedDate === date
                  ? "bg-[#E6F1F1]  dark:bg-black"
                  : "hover:bg-[#E6F1F1] bg-[#FAFCFC] dark:hover:bg-[#191919]"
              }`}
            >
              {date}
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateWise;

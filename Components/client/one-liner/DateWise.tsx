"use client";

import React from "react";

function DateWise() {
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
    console.log("Clicked Date:", date);
  };

  const last10Dates = getLast10Dates();

  return (
    <div className="w-full bg-[#FAFCFC]  border-1 rounded-lg shadow-lg">
      <h2 className="text-center font-bold py-4">Date Wise Record</h2>
      <div className="flex flex-col gap-2">
        {last10Dates.map((date) => (
          <div key={date} className="w-full ">
            <li
              onClick={() => handleClick(date)}
              className=" bg-[#FAFCFC]] hover:bg-[#E6F1F1]  text-center py-2 "
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

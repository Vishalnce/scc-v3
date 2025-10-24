"use client";
import React, { useEffect, useState } from "react";

export default function CountdownTimer({ minutes }: { minutes: number }) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    setSecondsLeft(minutes * 60); // Reset if minutes prop changes
  }, [minutes]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const min = Math.floor(secondsLeft / 60);
  const sec = secondsLeft % 60;

  return (
    <div className="text-2xl font-bold dark:text-white ">
      {min}:{sec.toString().padStart(2, "0")}
    </div>
  );
}

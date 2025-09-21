"use client";
import { useState, useEffect } from "react";

type CountdownTimerProps = {
  minutes: number;
  onFinish?: () => void;
};

export default function CountdownTimer({ minutes, onFinish }: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  // Reset timer if minutes change
  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  // Countdown logic
  useEffect(() => {
    if (secondsLeft <= 0) {
      onFinish?.();
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, onFinish]);

  const displayMinutes = Math.floor(secondsLeft / 60);
  const displaySeconds = secondsLeft % 60;

  return (
    <div className="text-2xl font-bold">
      {displayMinutes}:{displaySeconds.toString().padStart(2, "0")}
    </div>
  );
}

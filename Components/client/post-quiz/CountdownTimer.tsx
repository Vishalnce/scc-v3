"use client";
import { useState, useEffect,useRef } from "react";

type CountdownTimerProps = {
  minutes: number;
   setTimeTaken: (second:number) => void;
  onFinish?: () => void;
};

export default function CountdownTimer({ minutes,setTimeTaken, onFinish }: CountdownTimerProps) {


  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const startTimeRef = useRef(Date.now()); 


  // Reset timer if minutes change
  useEffect(() => {
    setSecondsLeft(minutes * 60);
        startTimeRef.current = Date.now();
  }, [minutes]);

  // Countdown logic
  useEffect(() => {
    if (secondsLeft <= 0) {

      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      setTimeTaken(timeSpent );
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

    <>
<div className="flex justify-end mb-3">
  <div className="flex items-center gap-2 border border-red-200 bg-red-50 px-3 py-1.5 rounded-lg">
    
    <span className="text-red-500 text-sm">⏱</span>

    <p className="text-sm font-semibold text-red-600">
      {displayMinutes.toString().padStart(2, "0")}:
      {displaySeconds.toString().padStart(2, "0")}
    </p>

    <span className="text-xs text-red-400">left</span>
  </div>
</div>
    </>
   
  );
}

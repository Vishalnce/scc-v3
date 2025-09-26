"use client";
import { useState, useEffect,useRef } from "react";
import { CiClock1 } from "react-icons/ci";

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

     <div className=" font-bold  min-w-[60px] py-3 text-center flex flex-row gap-2" >
      <CiClock1 className="my-auto size-6"/>
    <p className=" text-[#6C6C6C]">
      {displayMinutes}:{displaySeconds.toString().padStart(2, "0")}
    </p>
      
    </div>
    </>
   
  );
}

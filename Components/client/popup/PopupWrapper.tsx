"use client";

import { useEffect, useRef, useState } from "react";
import PopupPreparing from "./PopupPreparing";
import PopupUnlock from "./PopupUnlock";

type Popup = {
  id: string;
  type: "A" | "B";
  isActive: boolean;
  showAfter1: number;
  showAfter2: number;
  showAfter3: number;
};

export default function PopupWrapper() {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const countA = useRef(0);
  const countB = useRef(0);

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

 const load = async () => {
  try {
    const res = await fetch("/api/en/popup/client");

    
    if (!res.ok) {
      console.error("Popup API failed:", res.status);
      return; 
    }

    const data: Popup[] = await res.json();

    // check valid data
    if (!Array.isArray(data) || data.length === 0) {
      return; 
    }

 

    data.forEach((popup) => {
      if (!popup.isActive) return;

      const times = [
        popup.showAfter1,
        popup.showAfter2,
        popup.showAfter3,
      ];

      times.forEach((time) => {
        //  ignore invalid time
        if (typeof time !== "number" || time <= 0) return;

        const t = setTimeout(() => {
          if (popup.type === "A" && countA.current < 3) {
            setShowA(true);
            countA.current++;
          }

          if (popup.type === "B" && countB.current < 3) {
            setShowB(true);
            countB.current++;
          }
        }, time * 1000);

        timers.push(t);
      });
    });
  } catch (err) {
    //  network error / JSON error
    console.error("Popup fetch error:", err);

   
  }
};
    load();

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {showA && <PopupPreparing onClose={() => setShowA(false)} />}
      {showB && <PopupUnlock onClose={() => setShowB(false)} />}
    </>
  );
}
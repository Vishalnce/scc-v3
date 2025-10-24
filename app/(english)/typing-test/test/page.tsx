"use client";
import CountdownTimer from "@/Components/client/typing-test/CountdownTimer";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GoStopwatch } from "react-icons/go";

export default function Page() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const time = searchParams.get("time");
  const level = searchParams.get("level");

  // Allowed params
  const allowedTimes = ["3", "5", "10"];
  const allowedLevels = ["Easy", "Medium", "Hard"];

  const validTime = time && allowedTimes.includes(time) ? time : null;
  const validLevel = level && allowedLevels.includes(level) ? level : null;

  /** States */
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [posts, setPosts] = useState<{ title: string; id: number }[]>([]);
  const [targetText, setTargetText] = useState("");
  const fetchText = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/typing/client?level=${validLevel}`
      );
      const data = await response.json();
      if (data.success && data.post.length > 0) {
        setPosts(data.post);

        const randomIndex = Math.floor(Math.random() * data.post.length);
        setTargetText(data.post[randomIndex].title);
      } else {
        setTargetText(
          "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet."
        );
      }
    } catch (error) {
      console.error("Error fetching text data:", error);
    }
  };

  useEffect(() => {
    fetchText();
  }, []);

  /**  Target text */

  const targetWords = targetText.split(" ");

  // Handle typing
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setInput(e.target.value);

    // Auto-scroll to bottom
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

  /**  Save results to localStorage */
  const saveResultToStorage = (result: any) => {
    const prevResults = JSON.parse(
      localStorage.getItem("typingResults") || "[]"
    );
    const newResults = [...prevResults, result];
    localStorage.setItem("typingResults", JSON.stringify(newResults));

    console.log("Typing Test Result:", result); // ✅ console log
  };

  /** ✅ Calculate and save typing stats */
  const finishTest = () => {
    const typedWords = input.trim().split(/\s+/);

    let correct = 0;
    let incorrect = 0;

    // Count correct/incorrect words by comparing typed word vs target word at same index
    targetWords.forEach((word, idx) => {
      const typed = typedWords[idx];
      if (typed === undefined) return; // skipped word - counted later
      if (typed === word) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // Skipped words: target words not typed (typed fewer words than target)
    const skipped =
      targetWords.length - typedWords.length > 0
        ? targetWords.length - typedWords.length
        : 0;

    // Total duration from the selected time param in minutes
    const totalDurationSeconds = Number(validTime) ? Number(validTime) * 60 : 0;

    // Time taken in seconds (from first keystroke to now)
    const timeTakenSeconds = startTime ? (Date.now() - startTime) / 1000 : 0;

    // Accuracy percentage = (correct words / total typed words) * 100
    const accuracy =
      typedWords.length > 0 ? (correct / typedWords.length) * 100 : 0;

    // Error percentage = 100 - accuracy
    const errorPercentage = 100 - accuracy;

    // Gross WPM: total typed words / (time taken in minutes)
    const grossWPM =
      timeTakenSeconds > 0 ? typedWords.length / (timeTakenSeconds / 60) : 0;

    // Net WPM: (correct words - incorrect words) / (time taken in minutes)
    // Net WPM should not be negative
    const netWPM =
      timeTakenSeconds > 0
        ? Math.max((correct - incorrect) / (timeTakenSeconds / 60), 0)
        : 0;

    // Keystrokes = total characters typed including spaces
    const keystrokes = input.length;
    const speedWPM =
      timeTakenSeconds > 0 ? correct / (timeTakenSeconds / 60) : 0;
    // Prepare result object with all stats
    const result = {
      totalDuration: totalDurationSeconds, // in seconds
      timeTaken: timeTakenSeconds.toFixed(1), // in seconds as string with 1 decimal
      totalTypedWords: typedWords.length,
      correctWords: correct,
      incorrectWords: incorrect,
      skippedWords: skipped,
      accuracy: accuracy.toFixed(2), // in %
      errorPercentage: errorPercentage.toFixed(2), // in %
      grossWPM: grossWPM.toFixed(2),
      netWPM: netWPM.toFixed(2),
      speedWPM: speedWPM.toFixed(2),
      keystrokes: keystrokes,
      level: validLevel,
      duration: validTime,
      date: new Date().toLocaleString(),
    };

    saveResultToStorage(result); // ✅ save + log
    router.push("/typing-test/result");
  };

  function clearTypingResultsStorage() {
    localStorage.removeItem("typingResults");
  }

  // Auto-finish when timer ends
  useEffect(() => {
    clearTypingResultsStorage();
    if (validTime) {
      const timer = setTimeout(
        () => {
          finishTest();
        },
        Number(validTime) * 60 * 1000
      ); // minutes → ms
      return () => clearTimeout(timer);
    }
  }, [validTime]);

  if (!validTime || !validLevel) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Typing Test</h1>
        <p>
          Invalid or missing parameters detected! Don’t change the parameter.
        </p>
      </div>
    );
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <div className="dark:bg-black pt-18">
        <div className="flex flex-col items-center bg-[#FAFCFC] w-[90%] mx-auto py-2 dark:bg-[#313131] rounded-2xl ">
          {/* Level And Timer */}
          <div className="flex flex-row items-center justify-between w-[90%] pt-4">
            <div className="bg-[#007076] px-3 py-2 rounded mr-4">
              <p className="text-white">{validLevel}</p>
            </div>

            <div>
              <p className="text-2xl font-bold dark:text-white">Typing Test</p>
            </div>

            <div className="flex flex-row items-center gap-1">
              <GoStopwatch size={48} className="dark:text-white" />
              <CountdownTimer minutes={Number(validTime)} />
            </div>
          </div>

          {/* Typing paragraph */}
          <div className="mt-8 p-4 bg-white dark:bg-[#191919] rounded shadow dark:border-1 dark:border-white h-[200px] overflow-y-auto w-[95%]">
            <p className="text-lg leading-relaxed dark:text-white">{targetText}</p>
          </div>

          {/* Input box */}
          <div className="mt-4 w-[95%]">
            <textarea
              placeholder="Start typing here..."
              value={input}
              onPaste={(e) => e.preventDefault()}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#007076] resize-none dark:text-white dark:bg-[#191919]"
              rows={5}
            />
          </div>

          {/* Manual finish button (optional) */}
          <button
            onClick={finishTest}
            className="mt-4 px-4 py-2 bg-[#007076] text-white rounded"
          >
            Finish Test
          </button>
        </div>
      </div>
    </>
  );
}

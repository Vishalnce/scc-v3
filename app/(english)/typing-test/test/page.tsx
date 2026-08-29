"use client";

import CountdownTimer from "@/Components/client/typing-test/CountdownTimer";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoStopwatch } from "react-icons/go";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading typing test...</div>}>
      <TypingTestClient />
    </Suspense>
  );
}

function TypingTestClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const time = searchParams.get("time");
  const level = searchParams.get("level");

  // =========================
  // VALIDATION
  // =========================

  const allowedTimes = ["3", "5", "10"];
  const allowedLevels = ["Easy", "Medium", "Hard"];

  const validTime =
    time && allowedTimes.includes(time)
      ? Number(time)
      : null;

  const validLevel =
    level && allowedLevels.includes(level)
      ? level
      : null;

  // =========================
  // STATE
  // =========================

  const [input, setInput] = useState("");
  const [targetText, setTargetText] = useState("");

  // =========================
  // REFS
  // =========================

  // Test starts when component loads
  const startTimeRef = useRef<number>(Date.now());

  // Always contains latest input
  const inputRef = useRef<string>("");

  // Keystroke counter
  const keystrokesRef = useRef<number>(0);

  // Textarea reference
  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  // Prevent duplicate submission
  const hasFinishedRef =
    useRef<boolean>(false);

  // =========================
  // FETCH TARGET TEXT
  // =========================

  useEffect(() => {
    if (!validLevel) return;

    const fetchText = async () => {
      try {
        const response = await fetch(
          `/api/en/typing/client?level=${validLevel}`
        );

        const data = await response.json();

        if (
          data.success &&
          data.post &&
          data.post.length > 0
        ) {
          const randomIndex = Math.floor(
            Math.random() * data.post.length
          );

          setTargetText(
            data.post[randomIndex].title
          );
        } else {
          setTargetText(
            "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet."
          );
        }
      } catch (error) {
        console.error(
          "Error fetching typing text:",
          error
        );

        setTargetText(
          "The quick brown fox jumps over the lazy dog."
        );
      }
    };

    fetchText();
  }, [validLevel]);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    // Store latest value in ref
    inputRef.current = value;

    // Update UI
    setInput(value);

    // Scroll textarea
    if (textareaRef.current) {
      textareaRef.current.scrollTop =
        textareaRef.current.scrollHeight;
    }
  };

  // =========================
  // KEYSTROKES
  // =========================

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    /*
      Count actual typed characters.

      Count:
      - letters
      - numbers
      - punctuation
      - symbols
      - spaces

      Do not count:
      - Shift
      - Ctrl
      - Alt
      - Arrow keys
      - Backspace
      - Enter
    */

    if (e.key.length === 1) {
      keystrokesRef.current += 1;
    }
  };

  // =========================
  // FINISH TEST
  // =========================

  const finishTest = () => {
    // Prevent double click
    if (hasFinishedRef.current) {
      return;
    }

    hasFinishedRef.current = true;

    // =========================
    // TIME TAKEN
    // =========================

    const totalDuration =
      validTime !== null
        ? validTime * 60
        : 0;

    const elapsedTime =
      (Date.now() - startTimeRef.current) /
      1000;

    // Do not allow time to exceed test duration
    const timeTaken = Math.min(
      elapsedTime,
      totalDuration
    );

    // =========================
    // TYPED WORDS
    // =========================

    const currentInput =
      inputRef.current.trim();

    const typedWords =
      currentInput.length > 0
        ? currentInput.split(/\s+/)
        : [];

    // =========================
    // TARGET WORDS
    // =========================

    const targetWords =
      targetText
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    // =========================
    // CORRECT / INCORRECT
    // =========================

    let correctWords = 0;
    let incorrectWords = 0;

    typedWords.forEach(
      (typedWord, index) => {
        const targetWord =
          targetWords[index];

        if (
          targetWord !== undefined &&
          typedWord === targetWord
        ) {
          correctWords++;
        } else {
          incorrectWords++;
        }
      }
    );

    // =========================
    // SKIPPED WORDS
    // =========================

    const skippedWords = Math.max(
      targetWords.length -
        typedWords.length,
      0
    );

    // =========================
    // ACCURACY
    // =========================

    const accuracy =
      typedWords.length > 0
        ? (correctWords /
            typedWords.length) *
          100
        : 0;

    // =========================
    // ERROR PERCENTAGE
    // =========================

    const errorPercentage =
      typedWords.length > 0
        ? (incorrectWords /
            typedWords.length) *
          100
        : 0;

    // =========================
    // WPM
    // =========================

    const minutes =
      timeTaken / 60;

    const grossWPM =
      minutes > 0
        ? typedWords.length /
          minutes
        : 0;

    const netWPM =
      minutes > 0
        ? Math.max(
            (correctWords -
              incorrectWords) /
              minutes,
            0
          )
        : 0;

    const speedWPM =
      minutes > 0
        ? correctWords /
          minutes
        : 0;

    // =========================
    // RESULT OBJECT
    // =========================

    const result = {
      totalDuration,

      timeTaken:
        timeTaken.toFixed(1),

      totalTypedWords:
        typedWords.length,

      correctWords,

      incorrectWords,

      skippedWords,

      accuracy:
        accuracy.toFixed(2),

      errorPercentage:
        errorPercentage.toFixed(2),

      grossWPM:
        grossWPM.toFixed(2),

      netWPM:
        netWPM.toFixed(2),

      speedWPM:
        speedWPM.toFixed(2),

      keystrokes:
        keystrokesRef.current,

      level: validLevel,

      duration:
        validTime?.toString() ?? null,

      date:
        new Date().toLocaleString(),
    };

    // =========================
    // SAVE RESULT
    // =========================

    localStorage.setItem(
      "typingResults",
      JSON.stringify([result])
    );

    console.log(
      "FINAL TYPING RESULT:",
      result
    );

    // =========================
    // GO TO RESULT PAGE
    // =========================

    router.push(
      "/typing-test/result"
    );
  };

  // =========================
  // INVALID PARAMETERS
  // =========================

  if (
    validTime === null ||
    validLevel === null
  ) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">
          Typing Test
        </h1>

        <p>
          Invalid or missing parameters
          detected! Don&apos;t change the
          parameter.
        </p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="dark:bg-black pt-18">
      <div className="flex flex-col items-center bg-[#FAFCFC] w-[90%] mx-auto py-2 dark:bg-[#313131] rounded-2xl">

        {/* HEADER */}

        <div className="flex flex-row items-center justify-between w-[90%] pt-4">

          <div className="bg-[#007076] px-3 py-2 rounded mr-4">
            <p className="text-white">
              {validLevel}
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold dark:text-white">
              Typing Test
            </p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <GoStopwatch
              size={48}
              className="dark:text-white"
            />

            <CountdownTimer
              minutes={validTime}
            />
          </div>

        </div>

        {/* TARGET TEXT */}

        <div className="mt-8 p-4 bg-white dark:bg-[#191919] rounded shadow dark:border dark:border-white h-[200px] overflow-y-auto w-[95%]">

          <p className="text-lg leading-relaxed dark:text-white">
            {targetText}
          </p>

        </div>

        {/* INPUT */}

        <div className="mt-4 w-[95%]">

          <textarea
            ref={textareaRef}
            placeholder="Start typing here..."
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={(e) =>
              e.preventDefault()
            }
            className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#007076] resize-none dark:text-white dark:bg-[#191919]"
            rows={5}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />

        </div>

        {/* FINISH BUTTON */}

        <button
          onClick={finishTest}
          className="w-full sm:w-auto mt-6 px-8 sm:px-12 py-3 bg-[#007076] hover:bg-[#005f63] active:scale-[0.98] text-white rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-sm"
        >
          Finish Test
        </button>

      </div>
    </div>
  );
}
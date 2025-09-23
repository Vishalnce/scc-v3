export default function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <>
      <div className="max-w-[1400px] mx-auto  w-[90%] py-4">
        <div className="flex flex-col  justify-between  border-2 mx-auto py-8 bg-[#FAFCFC] border-[#E6F1F1] rounded-2xl px-12 ">
          {/* top heading  */}
          <div className="flex flex-row items-center justify-between w-full ">
            <div className="  flex flex-col items-start ">
              <p className=" font-montserrat font-bold text-2xl dark:text-white">
                Test Your Knowledge with Quizzes
              </p>
              <p className="text-my-text-color">
                Read below Instructions Carefully
              </p>
            </div>

            <div>
              <button className="bg-[#2CBB0180] px-6 py-2 rounded-full font-semibold text-sm ">
                Share this post on
              </button>
            </div>
          </div>

          {/* below heading */}

          <div className="  flex flex-row justify-between pt-6 pb-4">
            <div className="">
              <ul className="font-bold space-y-2">
                <li>Click "Start Quiz" to begin.</li>
                <li>Answer all questions (or skip if unsure).</li>
                <li>After the last question, make sure you login</li>
                <li>Click "Check Result" to see your score and rank.</li>
                <li>Scroll to view solutions and improve.</li>
              </ul>
            </div>

            <div className=" flex items-end ">
              <button
                onClick={onStart}
                className="px-4 py-2 bg-[#FFE332]  rounded-full"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
}

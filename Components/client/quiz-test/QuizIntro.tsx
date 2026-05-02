import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegCheckCircle, FaRegClock, FaRegThumbsUp } from "react-icons/fa";
import { GoChecklist, GoDotFill } from "react-icons/go";
import { IoPlayOutline, IoTrophyOutline } from "react-icons/io5";
import { LuClock3, LuPlay } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import { CgDanger } from "react-icons/cg";
import Image from "next/image";
type IntroProps = {
  onStart: () => void;
  subject: string;
  timeLimt: number;
  noOfQuestion: number;
};

export default function QuizIntro({
  onStart,
  subject,
  timeLimt,
  noOfQuestion,
}: IntroProps) {

const handleShare = async () => {
  const url = window.location.href;

  // ✅ Try native share
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Quiz",
        text: "Try this quiz",
        url,
      });
      return;
    } catch (err) {
      console.log("User cancelled or failed", err);
    }
  }

  // 🔁 Fallback (mobile + desktop)
  try {
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
  } catch {
    // ❌ Clipboard may fail on mobile → final fallback
    prompt("Copy this link:", url);
  }
};
  return (
    <>

     <div className="  max-w-[1400px] max-md:w-[90%]  md:w-[90%] mx-auto">
        <header className="bg-gradient-to-r from-[#289AA2] to-[#8CD6DB] rounded-2xl shadow pb-5 relative  md:min-h-[380px] ">
          {/* main div */}

          <div className="flex flex-row items-center justify-center max-md:justify-start md:pt-10 pt-6 md:px-6 px-3">
            {/* text */}
            <div className=" flex flex-col  justify-between items-start md:gap-6 w-[70%] max-md:w-[70%]   ">
              <p className=" bg-[#F4F4FC] text-xl flex flex-row rounded-xl px-4 max-md:px-2 max-md:text-sm"> <GoDotFill className="text-green-600 my-auto " /> Live</p>
              <p className="text-4xl max-md:text-lg text-white font-montserrat font-semibold max-md:hidden">
                Conquer the SSC CGL Exam and Secure Your dream Career!
             
              </p>
              <p className="text-4xl max-md:text-lg text-white font-montserrat font-semibold md:hidden max-md:pt-1"> Test your Knowledge</p>

              <p className="text-white text-xl max-md:text-sm max-md:pt-2 max-md:leading-4 max-md:hidden">
                Empower your prep with Top-Notch study material, Mock Test, Quizzes and Exclusive SSC CGL Updates to help You succeed in exam.
           
              </p>
              <p className="text-white text-xl max-md:text-sm max-md:pt-1 max-md:leading-4 md:hidden">Attempt Today’s Quiz on Polity Topic: Hoisting or Unfurling! </p>

              
            </div>

            {/* image */}
            <div className="w-[20%] max-md:w-[30%] max-md:absolute right-2 bottom-2">
              <Image
                src="/ui/client/quiz/quizgirl1.png"
                width={300}
                height={300}
                alt="hero"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </header>

        {/* instruction  */}
      </div>
      <div className=" mx-auto  w-[90%] max-w-[1400px]  flex rounded-xl flex-col border-1 border-[#DADADA] md:px-8 py-2">
        <div
          className=" w-full flex  flex-col my-4 
          md:px-8"
        >
          {/* heading */}
          <div className="flex flex-col my-4">
            <p className="font-semibold text-2xl">Quiz Instructions</p>
          </div>

          {/* cards */}

          <div className="grid grid-cols-1 max-md:grid-cols-1 gap-1">
            <div className="flex flex-row py-2 gap-3 sm:gap-4 items-start sm:items-center">
              {/* icon */}
              <div
                className="bg-[#EBFFE4] rounded-full 
                    p-2 sm:p-3 md:p-4 
                    shrink-0 flex items-center justify-center"
              >
                <FaRegCheckCircle
                  className="text-[#11C352] 
                                   size-4 sm:size-5 md:size-6"
                />
              </div>

              {/* content */}
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  Marking System
                </p>
                <p className="text-[#6F6F6F] text-xs sm:text-sm leading-snug">
                  Each correct answer earns you
                  <span className="text-green-500"> +4 marks</span>, while
                  incorrect answers deduct
                  <span className="text-green-500"> -1 Mark.</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {/* Item 1 */}
              <div className="flex flex-row py-2 gap-3 sm:gap-4 items-start sm:items-center">
                <div
                  className="bg-[#F3E6FF] rounded-full 
                    p-2 sm:p-3 md:p-4 
                    shrink-0 flex items-center justify-center"
                >
                  <FaRegClock className="text-[#9F38D6] size-4 sm:size-5 md:size-6" />
                </div>

                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Time Management
                  </p>
                  <p className="text-[#6F6F6F] text-xs sm:text-sm leading-snug">
                    You have a fixed time limit i.e 20 Mins to complete the
                    quiz. The timer will change color as red in the final
                    minute.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex flex-row py-2 gap-3 sm:gap-4 items-start sm:items-center">
                <div
                  className="bg-[#FDE9E9] rounded-full 
                    p-2 sm:p-3 md:p-4 
                    shrink-0 flex items-center justify-center"
                >
                  <LuPlay className="text-[#F14343] size-4 sm:size-5 md:size-6" />
                </div>

                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Navigation & Controls
                  </p>
                  <p className="text-[#6F6F6F] text-xs sm:text-sm leading-snug">
                    Use the Previous and Next buttons to move between questions.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex flex-row py-2 gap-3 sm:gap-4 items-start sm:items-center">
                <div
                  className="bg-[#E9F3FF] rounded-full 
                    p-2 sm:p-3 md:p-4 
                    shrink-0 flex items-center justify-center"
                >
                  <FaRegThumbsUp className="text-[#24B3CB] size-4 sm:size-5 md:size-6" />
                </div>

                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Submission Process
                  </p>
                  <p className="text-[#6F6F6F] text-xs sm:text-sm leading-snug">
                    When you're ready to submit, click the Submit Quiz button
                    and check your score then.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}

          <div className=" w-full flex flex-row  items-center justify-between py-4">

             <button   onClick={handleShare} className="w-[45%] border-[#047077] text-[#047077] border-2 py-3 rounded-xl  ">
              Share quiz 
              
            </button>
            <button
              onClick={onStart}
              className=" w-[45%] bg-[#047077] py-3 rounded-xl  border-2 border-[#047077] text-white"
            >
              Start Quiz
            </button>
           
          </div>
        </div>

        <div className="px-8 bg-[#F4F4FC] py-2 rounded-2xl">
          <div className=" w-full flex  flex-col   ">
            <div className="flex flex-row items-center my-4 gap-2">
              <CgDanger className="size-7" />
              <p className="font-semibold text-2xl">Pro Tips</p>
            </div>
          </div>

          <div>
            <ul className="text-[#6F6F6F] text-lg py-2 space-y-2">
              <li>Click “Start Quiz” to begin. </li>
              <li>Answer all questions(or skip if unsure). </li>
              <li>After the last question, enter you name email.</li>
              <li>Click “Check Result” to see your score.</li>
              <li>Scroll to view solutions and improve. </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

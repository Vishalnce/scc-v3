import { AiOutlineThunderbolt } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";

export default function QuizIntro({ onStart , totalQuestion }: { onStart: () => void ,totalQuestion :number  }) {
  return (
    <>
 
      

          <div className="w-full bg-white  my-4 flex flex-col justify-center px-4 shadow-[0_2px_10px_rgba(0,0,0,0.3)] rounded-xl pt-8 pb-12">
            <div className=" flex flex-row justify-between gap-2  my-4">
              <div className="flex flex-row gap-4 ">
                <div className="bg-[#047077] rounded-xl p-auto">
                  <AiOutlineThunderbolt className=" size-14 pt-3 pb-2 text-white" />
                </div>

                <div className="flex flex-col text-start">
                  <p className="font-bold text-2xl ">Quick Quiz </p>
                  <p className="text-[#6F6F6F] "> Test Your Knowledge </p>
                </div>
              </div>

              <div className="bg-[#F4F4FC] px-4 py-1 rounded-xl flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#11C352] inline-block"></span>
                Live
              </div>
            </div>

            <div className="flex flex-row justify-start my-4 gap-6">
              <p className="text-[#6F6F6F]">
                {" "}
                <span className="font-semibold p-2 bg-[#EEF5FF] text-[#24B3CB] rounded-full">
                  {totalQuestion }
                        </span>{" "}
                Questions
              </p>
              
              
            </div>

            <div>
              <p className="font-bold text-xl">Read below Instructions carefully:</p>

              <ul className="text-[#6F6F6F] text-lg py-2 space-y-2">

                <li>Click “Start Quiz” to begin. </li>
                <li>Answer all questions(or skip if unsure). </li>
                <li>After the last question, enter you name email.</li>
                <li>Click “Check Result” to see your score.</li>
                <li>Scroll to view solutions and improve. </li>
           
              </ul>
              



            </div>

            <div className="">
              <button
                onClick={onStart}
                className="bg-[#047077] text-white rounded-2xl py-2 px-4 w-full"
              >
                Start Quiz
              </button>
            </div>
          </div>
      
   
    </>
  );
}

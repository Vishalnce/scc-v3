import { LuClock3 } from "react-icons/lu";


type IntroProps = {

  onStart: () => void;
  subject: string;
  timeLimt: number;
  noOfQuestion: number;

}






export default function QuizIntro({ onStart ,subject, timeLimt,noOfQuestion }:  IntroProps) {
  return (
    <>
    <div className="dark:bg-black">
<div className="max-w-[1400px] mx-auto  w-[90%] py-4  ">
        <div className="flex flex-col  justify-between  border-2 mx-auto py-8 bg-[#FAFCFC] dark:bg-[#313131] border-[#E6F1F1] rounded-2xl  max-sm:px-4 px-12 ">
          {/* top heading  */}
          <div className="flex flex-row items-center justify-between w-full   ">
            <div className="  flex flex-col items-start ">
              <p className=" font-montserrat font-bold text-2xl dark:text-white">
                Test Your Knowledge with Quizzes
              </p>
              <div className="flex flex-row gap-4 py-2">
                {/* time section */}
                <div className="flex flex-row justify-center items-center  gap-1  px-3 py-1 bg-[#E6F1F1] text-my-text-color dark:bg-black rounded-lg">

                  <LuClock3  />
                  <p className="text-sm ">{timeLimt}</p>
                  <p>m</p>

                </div>

                  <div className="  bg-[#E6F1F1] text-my-text-color px-3 py-1  rounded-lg dark:bg-black">

                    <p>Question {noOfQuestion}</p>

                  </div>


              </div>
            </div>

            <div className="max-sm:hidden">
              <button className="bg-[#2CBB0180] px-6 py-2 rounded-full font-semibold text-sm capitalize dark:text-white  ">
                {subject}
              </button>
            </div>
          </div>

          {/* below heading */}

          <div className="  flex flex-row max-sm:flex-col gap-4 justify-between pt-6 pb-4">
            <div className="">
              <p className="font-bold dark:text-white">Intructions</p>
              <ul className=" space-y-2 text-my-text-color">
                <li>Click "Start Quiz" to begin.</li>
                <li>Negative marking is applicable, so choose wisely</li>
                <li>Click "Submit" after the last question to check your score and rank.</li>
                <li>View your detailed report card, see solutions and Improve your performance.</li>
            
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
    </div>
      

    
    </>
  );
}

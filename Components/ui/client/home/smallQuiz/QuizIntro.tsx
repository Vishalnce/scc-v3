import { AiOutlineThunderbolt } from "react-icons/ai";

type Props = {
  total: number;
  onStart: () => void;
};

export default function QuizIntro({ total, onStart }: Props) {
  const duration = 10; // minutes (dummy)

  return (
    <>

        {/*  card  banner */}

        <div className="w-[70%] bg-white  my-4 flex flex-col justify-center px-4">
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

          <div className="flex flex-row justify-start my-4">
            <p>
              {" "}
              <span className="font-semibold p-2 bg-[#EEF5FF] text-[#24B3CB] rounded-full">
                {total}
              </span>{" "}
              Questions
            </p>
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
        {/* <h2 className="text-2xl font-bold">Quiz</h2>

      <p className="mt-4 text-lg">
        Total Questions: <span className="font-semibold">{total}</span>
      </p>

      <p className="mt-2 text-lg">
        Duration: <span className="font-semibold">{duration} minutes</span>
      </p>

      <button
     
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Start Quiz
      </button> */}
   </>
  );
}

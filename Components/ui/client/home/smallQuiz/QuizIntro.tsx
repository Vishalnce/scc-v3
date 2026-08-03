import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineThunderbolt } from "react-icons/ai";

type Props = {
  total: number;
  onStart: () => void;
};

export default function QuizIntro({ total, onStart }: Props) {
  const duration = 10; // minutes (dummy)

  const { data: session, status } = useSession();
  return (
    <>

        {/*  card  banner */}

        <div className="w-[80%] bg-white dark:bg-[#141212] dark:text-white  my-4 flex flex-col justify-center rounded-xl p-10 max-md:w-full">
          <div className=" flex flex-row justify-between gap-2  my-4">
            <div className="flex flex-row gap-4 ">
              <div className="bg-[#047077] rounded-xl p-auto max-sm:h-16">
                <AiOutlineThunderbolt className=" size-14 pt-3 pb-2 text-white" />
              </div>

              <div className="flex flex-col text-start">
                <p className="font-bold text-2xl ">Quick Quiz </p>
                <p className="text-[#6F6F6F] dark:text-white max-md:text-sm"> Knowledge Check </p>
              </div>

              
            </div>


            <div className="bg-[#F4F4FC] px-4 py-1 rounded-xl flex items-center dark:bg-[#353535] gap-2 h-8">
              <span className="w-3 h-3 rounded-full bg-[#11C352] inline-block"></span>
              Live
            </div>
          </div>

          <div className="flex flex-row justify-start my-4   ">
            <p className =" flex flex-row gap-4">
           
             <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EEF5FF] text-[#24B3CB] font-semibold">
  {total}
</div>
              <p className = "my-auto">     Questions </p>
             
         
            </p>
          </div>

          <div className=" ">
            <button
              onClick={onStart}
              className="bg-[#047077] text-white rounded-2xl py-2 px-4 w-full"
            >
              Start Quiz
            </button>

             {/* Admin Button */}
        {session?.user?.role === "ADMIN" ? (
          <div className="w-[90%] dark:bg-[#191919] mx-auto m-6 max-md:hidden">
            <Link href="/admin/small-quiz ">
              <div className="p-2 px-6 bg-[#007076] rounded-full text-center text-white">
                Add quiz
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}

           
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

import { title } from "process";
import React from "react";
import { CiClock2 } from "react-icons/ci";
import { FiAlertTriangle } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { IoIosRepeat } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
import { IoDocumentTextOutline } from "react-icons/io5";
function Smart() {
  const data = [
    {
      bg: "bg-[#F6FFF3]",
      border: "border-[#11C352] 1px",
      textcolour: " text-[#11C352]",
      title: " Reasoning",
      percentage: "78%",
      des: " Subject wise accuracy",
      icon: <GoGraph className="text-base text-[#11C352] size-6 " />,
      icontext: "text-[#11C352]",
      iconbg: "bg-[#F6FFF3]",
    },
    {
      bg: "bg-[#FFF4F4]",
      border: "border-[#F14343] 1px",
      textcolour: " text-[#F14343]",
      title: "Below Target",
      percentage: "45s",
      des: " Time per Ques",
      icon: <CiClock2 className="text-base text-[#F14343] size-6 " />,
      icontext: "text-[#F14343]",
      iconbg: "bg-[#FFF4F4]",
    },
    {
      bg: "bg-[#F8FBFF]",
      border: "border-[#24B3CB] 1px",
      textcolour: " text-[#24B3CB]",
      title: "Topics to Improve",
      percentage: "3",
      des: " Weak Topic Alert",
      icon: <FiAlertTriangle className="text-base text-[#24B3CB] size-6 " />,
      icontext: "text-[#24B3CB]",
      iconbg: "bg-[#F8FBFF]",
    },

    {
      bg: "bg-[#FCF4F8]",
      border: "border-[#D63895] 1px",
      textcolour: " text-[#D63895]",
      title: "Last 5 Tests",
      percentage: "+12%",
      des: " Score Trend",
      icon: <GiProgression className="text-base text-[#D63895] size-6 " />,
      icontext: "text-[#D63895]",
      iconbg: "bg-[#FCF4F8]",
    },
  ];

  const stats = [
    { value: "142", label: "Average Score" },
    { value: "87%", label: "Accuracy" },
    { value: "5%", label: "Top Rank" },
  ];

  return (
    <>
      <div className=" mx-auto    flex rounded-xl flex-col shadow-[0_0_9px_rgba(0,0,0,0.2)] md:px-8 py-2">
        <div className=" grid grid-cols-2 max-md:grid-cols-1 space-x-6">
          {/* card 1 */}
          <div className=" border-2  ">
            {/* heafding */}
            <div>
              <p className="font-bold text-2xl">Smart Performance Reports</p>
              <p className="text-[#6F6F6F]">
                Identify gaps and improve accuracy.
              </p>
            </div>
            {/* boady  */}

            <div className=" grid grid-cols-2 gap-3 py-4">
              {data.map((item) => (
                <div key={item.title}>
                  <div
                    className={`border-2 rounded-2xl ${item.border} flex flex-col items-center py-6 ${item.bg}`}
                  >
                    <p
                      className={`font-bold text-3xl max-md:text-lg ${item.textcolour}`}
                    >
                      {" "}
                      {item.percentage}
                    </p>
                    <p className="text-xl text-[#6F6F6F] "> {item.title}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-center">
                    <div className={`p-1 rounded-2xl ${item.iconbg}`}>
                      {item.icon}
                    </div>

                    <p className="text-lg">{item.des}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* card 2 */}
          <div className="  border-2">
            <div className="  rounded-3xl px-6 w-full mx-auto">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#0F766E] p-3 rounded-xl">
                  <IoDocumentTextOutline className="text-2xl size-8 text-white " />
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-semibold">
                    Conquer SSC CGL Exam
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base">
                    With our mock tests and test series
                  </p>
                </div>
              </div>

              {/* Improvement badge */}
              <div className="inline-block bg-[#F4F4FC] text-green-400 px-4 py-1 rounded-full text-sm mb-6">
                18% Improvement
              </div>

              {/* Graph bars */}
              <div className="flex items-end justify-between h-40 md:h-52 gap-4 mb-8">
                <div className="w-12 bg-red-500 h-[40%] rounded-md"></div>
                <div className="w-12 bg-yellow-400 h-[60%] rounded-md"></div>
                <div className="w-12 bg-green-500 h-[85%] rounded-md"></div>
                <div className="w-12 bg-yellow-400 h-[70%] rounded-md"></div>
                <div className="w-12 bg-green-500 h-[80%] rounded-md"></div>
                <div className="w-12 bg-green-600 h-[95%] rounded-md"></div>
              </div>

              {/* Bottom stats */}
              <div className="flex justify-between text-center">
                {stats.map((item) => (
                  <div key={item.label}>
                    <p className="text-2xl md:text-4xl font-extrabold">
                      {item.value}
                    </p>
                    <p className="text-gray-400 text-sm md:text-base">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Smart;

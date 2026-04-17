"use client";

import { IoClose } from "react-icons/io5";
import { FaBullseye, FaCheckCircle } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { MdOutlineInsights } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";

export default function PopupUI({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 sm:px-4  ">
      <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-white rounded-2xl  p-5 sm:p-6 md:p-8 shadow-[0_0_9px_rgba(0,0,0,0.2)]">
        
        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-black text-xl sm:text-2xl">
          <IoClose />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="bg-teal-700 text-white p-2.5 sm:p-3 rounded-xl text-base sm:text-lg">
            <FaBullseye />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
              Preparing For SSC CGL?
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
              Boost your score with our latest SSC CGL Test Series designed as per the latest pattern.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-100 rounded-full text-teal-700">
              <BsGraphUp size={14} />
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              Full-Length Mock Tests
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-100 rounded-full text-teal-700">
              <FiTarget size={14} />
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              Sectional Tests
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-100 rounded-full text-teal-700">
              <FaCheckCircle size={14} />
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              Detailed Solution & Analysis
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-100 rounded-full text-teal-700">
              <MdOutlineInsights size={16} />
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              Performance Ranking & All India Comparison
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition">
            Start Practicing Now
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-orange-500 mt-3 sm:mt-4 text-xs sm:text-sm flex items-center justify-center gap-1">
          ⏳ Limited Time Access Available
        </p>
      </div>
    </div>
  );
}
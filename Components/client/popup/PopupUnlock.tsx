"use client";

import { IoClose } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { FiTrendingUp, FiTarget } from "react-icons/fi";
import { MdInsights } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
// { onClose }: { onClose: () => void }
export default function ProPopupUI({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
        
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl">
          <IoClose />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 rounded-xl text-lg">
            <FaCrown />
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold">
              Unlock Pro Pass
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              Go beyond practice. Analyze. Improve. Dominate SSC CGL
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
              <BsGraphUp />
            </div>
            <p className="text-gray-700">Detailed Performance Analysis</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
              <FiTrendingUp />
            </div>
            <p className="text-gray-700">Track Your Daily Progress</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
              <FiTarget />
            </div>
            <p className="text-gray-700">
              Deep Quiz Evaluation with Strength & Weakness Breakdown
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
              <MdInsights />
            </div>
            <p className="text-gray-700">
              Smart Insights to improve Accuracy & Speed
            </p>
          </div>
        </div>

        {/* Price Tag */}
        <div className="mt-6 flex justify-center">
          <span className="border border-purple-500 text-purple-600 px-4 py-2 rounded-full text-sm">
            Less than ₹2 per day
          </span>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-full font-medium">
            Continue with Pro
          </button>
        </div>
      </div>
    </div>
  );
}
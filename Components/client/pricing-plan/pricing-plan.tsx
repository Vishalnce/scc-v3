"use client";

import { FaCrown } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";

export default function PricingPlans() {
  return (
    <div className="w-full py-10 px-4 bg-white dark:bg-[#1e1e1e]">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-black dark:text-white">
        Choose Your Plan
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {/* Monthly Card */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl text-xl bg-[#e6f4f6] text-[#2fa4b3]">
              <CiCalendar />
            </div>
            <h3 className="text-lg font-medium text-black dark:text-white">
              Monthly Plan
            </h3>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-semibold text-black dark:text-white">
              ₹49
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">
              /month
            </span>
          </div>

          <ul className="space-y-3 mb-6">
            {[
              "Full Pro Performance Analysis",
              "AI Quiz & overall Scorecard",
              "Personalized Insights",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="bg-green-100 text-green-600 p-1 rounded-full">
                  <IoCheckmark size={14} />
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <button className="w-full py-3 rounded-xl text-white text-sm font-medium bg-[#2fa4b3] hover:bg-[#258a96]">
            Continue with Pro
          </button>
        </div>

        {/* 6 Months Card (Highlight) */}
        <div className="relative rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-[2px] scale-[1.04] shadow-[0_10px_30px_rgba(168,85,247,0.35)]">
          
          <div className="h-full w-full rounded-2xl p-6 bg-white dark:bg-[#2a2a2a]">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-md px-4 py-2 rounded-full">
              Most Popular
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl text-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <FaCrown />
              </div>
              <h3 className="text-lg font-medium text-black dark:text-white">
                6 Months Plan
              </h3>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-semibold text-black dark:text-white">
                ₹249
              </span>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                "All Pro Features",
                "Best value for regular practice",
                "Priority AI insights",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-600 p-1 rounded-full">
                    <IoCheckmark size={14} />
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 rounded-xl text-white text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
              Continue with Pro
            </button>
          </div>
        </div>

        {/* Yearly Card */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl text-xl bg-[#e6f4f6] text-[#2fa4b3]">
              <CiCalendar />
            </div>
            <h3 className="text-lg font-medium text-black dark:text-white">
              Yearly Plan
            </h3>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-semibold text-black dark:text-white">
              449
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">
              /month
            </span>
          </div>

          <ul className="space-y-3 mb-6">
            {[
              "Full Pro Performance Analysis",
              "AI Quiz & overall Scorecard",
              "Personalized Insights",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="bg-green-100 text-green-600 p-1 rounded-full">
                  <IoCheckmark size={14} />
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <button className="w-full py-3 rounded-xl text-white text-sm font-medium bg-[#2fa4b3] hover:bg-[#258a96]">
            Continue with Pro
          </button>
        </div>

      </div>
    </div>
  );
}
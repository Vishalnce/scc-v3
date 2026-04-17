"use client";

import SignInModal from "@/Components/ui/client/signin/SignInModal";
import { stat } from "fs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiTrophy } from "react-icons/ci";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";

type Rank = {
  rankId: string;
  quizId: number;
  name: string;
  score: number;
  maxMarks: number;
  timeTaken: number;
};

type RankProps = {
  quizId: number;
};

export default function RankCard({ quizId }: RankProps) {
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { status } = useSession();

  async function fetchRank() {
    try {
      setLoading(true);
      const res = await fetch(`/api/en/rankCard/client/?quizId=${quizId}`);
      if (!res.ok) throw new Error("Failed to fetch ranks");

      const data = await res.json();
      setRanks(data || []);
    } catch (error) {
      console.error("Error fetching ranks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (quizId && status === "authenticated") {
      fetchRank();
    }
  }, [quizId, status]);

  return (
    <>
      <>
        {/* Modal */}
        {isModalOpen && <SignInModal onClose={() => setIsModalOpen(false)} />}

        <div className=" shadow-[0_0_12px_rgba(0,0,0,0.2)] w-[90%] mx-auto  my-6 flex justify-center rounded-xl">
          {status === "unauthenticated" ? (
            <div className="flex flex-col items-center justify-center gap-3 py-8  dark:bg-[#313131] dark:text-white w-[90%]">
              <div className="w-full flex items-center  py-2  rounded-t-xl gap-4 max-md:gap-4">
                {/* icon */}
                <div className="rounded-xl bg-gradient-to-r p-2 sm:p-3 from-[#047077] to-[#2FC6C7] flex items-center justify-center">
                  <CiTrophy className="text-white size-8 md:size-12" />
                </div>

                {/* text */}
                <div>
                  <p className="font-bold text-xl max-md:text-lg">
                   Login to check your Rank?
                  </p>
                  <p className="text-[#6F6F6F]  max-md:text-sm">
                    Compare insights with pro analysis
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-[#007076] text-white  w-full rounded-full"
              >
             Check Rank
              </button>
            </div>
          ) : (
            <div className="mx-auto w-[90%]">
              <p className="font-bold text-lg text-center dark:text-white">
                Quiz Rank Card
              </p>

              <div className="overflow-x-auto rounded-2xl dark:border-2 dark:border-white">
                <table className="w-full text-center border-collapse">
                  {/* Header */}
                  <thead className="bg-[#E6F1F1] dark:bg-[#191919] dark:text-white">
                    <tr className="text-lg font-bold">
                      <th className="py-2 px-4">Position</th>
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Duration</th>
                      <th className="py-2 px-4">Score</th>
                    </tr>
                  </thead>

                  {/* Body */}
                  <tbody className="dark:bg-[#313131] dark:text-white">
                    {ranks.map((rank, index) => {
                      const rankImage =
                        index === 0
                          ? "/ui/client/rankCard/1.svg"
                          : index === 1
                            ? "/ui/client/rankCard/2.svg"
                            : index === 2
                              ? "/ui/client/rankCard/3.svg"
                              : null;

                      return (
                        <tr key={index} className="border-t">
                          {/* Position */}
                          <td className="py-2 px-4">
                            <div className="flex items-center justify-center gap-1">
                              {rankImage && (
                                <Image
                                  src={rankImage}
                                  alt={`Position ${index + 1}`}
                                  height={30}
                                  width={30}
                                />
                              )}
                              <span className="font-medium">{index + 1}</span>
                            </div>
                          </td>

                          {/* Name */}
                          <td className="py-2 px-4 truncate">{rank.name}</td>

                          {/* Duration */}
                          <td className="py-2 px-4">{rank.timeTaken}</td>

                          {/* Score */}
                          <td className="py-2 px-4">
                            {rank.score}/{rank.maxMarks}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}

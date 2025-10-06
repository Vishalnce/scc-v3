"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

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
    if (quizId) fetchRank();
  }, [quizId]);

  if (loading) return <p>Loading ranks...</p>;

  if (ranks.length === 0) return <p>No rank data available yet.</p>;

  return (
    <>
      <div className=" mx-auto w-[90%] ">
        <p className="font-bold text-lg text-center">Quiz Rank Card</p>

        <div className="flex flex-col  py-4 ">
          {/* heading */}
          <div className="flex flex-row justify-between  py-2 text-lg text-center bg-[#E6F1F1] font-bold px-4 rounded-t-2xl ">
            <p className="w-[20%] ">Position</p>
            <p className="w-[20%] ">Name</p>
            <p className="w-[20%]">Duration</p>
            <p className="w-[20%]">Score</p>
          </div>

          {/* boady */}

          <div className=" flex flex-col gap-2 text-center max-h-[120px] overflow-y-auto py-2">
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
                <div
                  key={index}
                  className=" flex flex-row justify-between items-center px-4"
                >
                  <div
                    className={`flex flex-row justify-center items-center w-[20%] ${
                      rankImage ? "" : ""
                    }`}
                  >
                    {rankImage && (
                      <Image
                        src={rankImage}
                        alt={`Position ${index + 1}`}
                        height={30}
                        width={30}
                      />
                    )}

                    <p className="font-medium">{index + 1}</p>
                  </div>

                  <p className="w-[20%]">{rank.name}</p>
                  <p className=" w-[20%] text-center">{rank.timeTaken}</p>

                  <p className="w-[20%]">
                    {rank.score}/{rank.maxMarks}
                  </p>
                </div>
              );
            })}
          </div>

       
        </div>

           {/* instruction */}
          <div className="flex flex-row  gap-2">
            <FaStar className="text-[#FFE332] my-auto" />
            <p>Rank will be displayed only for your first attempt. </p>
          </div>
      </div>
    </>
  );
}

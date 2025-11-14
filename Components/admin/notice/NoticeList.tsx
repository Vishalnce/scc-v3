"use client";
import React, { useState, useEffect } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

type Announce = {
  id: number;
  title: string;
  link: string;
};

export default function AnnounceList() {
  const [announces, setAnnounces] = useState<Announce[]>([]);

  const fetchAnnounces = async () => {
    const res = await fetch(
      `/api/en/notice/client`
    );
    const body = await res.json();
  
    // body.post contains the array
    setAnnounces(body.post || []);
  };

  useEffect(() => {
    fetchAnnounces();
  }, []);

  return (
   <div className="w-[90%] mx-auto border-2 border-gray-300 rounded-lg p-6 bg-white shadow-sm mt-4">
  {/* Header */}
  <div className="flex justify-between my-4">
    <h2 className="text-xl font-bold text-my-text-color">Upcoming Exam</h2>
  </div>

  {/* Content list */}
  <div className="space-y-4">
    {announces.map((item) => (
      <div
        key={item.id}
        className="border border-gray-200 rounded-lg bg-[#FAFCFC] p-4 flex justify-between items-center shadow-sm hover:shadow-md transition "
      >
        <div className="flex-1 flex flex-col md:flex-col md:space-x-6">
          <p className="p-2 bg-white rounded mb-2 md:mb-0 flex-1">  Title: {item.title}</p>
          <p className="p-2 bg-white rounded flex-1 break-words">Link: {item.link}</p>
        </div>

        <div className="flex flex-col gap-3 p-2">
          <EditButton id={item.id} />
          <DeleteButton id={item.id} onDelete={fetchAnnounces} />
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

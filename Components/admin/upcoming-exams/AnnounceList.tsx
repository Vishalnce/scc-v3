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
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/home-upcoming/client`
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
    <h2 className="text-xl font-bold text-my-text-color">Announcement</h2>
  </div>

  {/* Content list */}
  <div className="space-y-4">
    {announces.map((item) => (
      <div
        key={item.id}
        className="border border-gray-200 rounded-lg bg-[#FAFCFC] p-4 shadow-sm flex justify-between items-start"
      >
        <div className="flex flex-col space-y-3 flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
            <p className="p-2 bg-white rounded">{item.title}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Link</label>
            <p className="p-2 bg-white rounded break-words">{item.link}</p>
          </div>
        </div>

        <div className="flex gap-2 ml-6 p-2">
          <EditButton id={item.id} />
          <DeleteButton id={item.id} onDelete={fetchAnnounces} />
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

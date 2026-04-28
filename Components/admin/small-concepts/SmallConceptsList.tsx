"use client";
import React, { useState, useEffect } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

type Announce = {
  id: number;
  title: string;
  content: string;
  topic: string;
};

export default function SmallConceptList() {
  const [announces, setAnnounces] = useState<Announce[]>([]);

  const fetchAnnounces = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/en/small-concepts/client`);
    const body = await res.json();

    // body.post contains the array
    setAnnounces(body.post || []);
  };

  useEffect(() => {
    fetchAnnounces();
  }, []);

  return (
    <div className="w-[90%] mx-auto border-2 border-gray-300 rounded-lg p-6 bg-white shadow-sm mt-4">
      {/* Header text */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">smallConcepts</h2>
      </div>

      {/* Content list */}
      <div className="space-y-4">
  {announces.map((item) => (
    <div
      key={item.id}
      className="border border-gray-200 rounded-lg flex justify-between items-start bg-[#FAFCFC] shadow-sm hover:shadow-md transition p-4"
    >
      <div className="space-y-2">
     

        {/* ✅ HTML Render */}
        <div
          className="text-gray-700 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />

      </div>

      {/* <div className="flex gap-3">
        <EditButton id={item.id} />
        <DeleteButton id={item.id} onDelete={fetchAnnounces} />
      </div> */}
    </div>
  ))}
</div>
    </div>
  );
}

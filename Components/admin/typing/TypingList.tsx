"use client";
import React, { useState, useEffect } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

type Announce = {
  id: number;
  title: string;
  level: string;
};

export default function AnnounceList() {
  const [announces, setAnnounces] = useState<Announce[]>([]);

  const fetchAnnounces = async () => {
    const res = await fetch(
      `/api/en/typing/client`
    );
    const body = await res.json();

    // body.post contains the array
    setAnnounces(body.post || []);
  };

  useEffect(() => {
    fetchAnnounces();
  }, []);

  return (
   <div className="w-[90%] mx-auto  rounded-md p-4 shadow-sm bg-white mt-4">

  {/* Section label */}
  <div className="flex flex-row justify-between my-4 items-center">
    <h2 className="text-xl font-bold text-my-text-color" aria-label="Typing section title">
      Typing Test List
    </h2>
  </div>

  {/* Content List */}
  <div>
    {announces.map((item) => (
      <div
        key={item.id}
        className=" m-2 flex flex-row justify-between rounded-md bg-[#FAFCFC]"
      >
        <div>
          <p className="p-2" aria-label="Title">
            {item.title}
          </p>
          <p className="p-2" aria-label="Level">
            {item.level}
          </p>
        </div>

        <div className="flex flex-row gap-2 p-2">
          <EditButton id={item.id} />
          <DeleteButton id={item.id} onDelete={fetchAnnounces} />
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

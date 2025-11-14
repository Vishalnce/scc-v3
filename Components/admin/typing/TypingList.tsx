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
    <div className="w-[90%] mx-auto border-2">
      {/* jst text  */}
      <div className="flex flex-row justify-between my-4">
        <h2 className="text-xl text-my-text-color font-bold ">typing</h2>
      </div>

      {/* content */}

      <div className="">
        {announces.map((item) => (
          <div
            key={item.id}
            className="border-2 m-2 flex flex-row justify-between"
          >
            <div >
           
              <p className="p-2 bg-[#FAFCFC]">{item.title}</p>
              <p className="p-2 bg-[#FAFCFC]">{item.level}</p>{" "}
            </div>

            <div className="flex flex-row gap-2  p-2">
              <EditButton id={item.id} />
              <DeleteButton id={item.id} onDelete={fetchAnnounces} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

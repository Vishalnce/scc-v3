"use client"
import React, { useState, useEffect } from "react";
import EditButton from "./EditOneLiner";

import DeleteButton from "./DeleteOneLiner";

type Liner = {
  id: number;
  content: string;
  createdAt: string;
};

function OneLinerDashboard() {
  const [liners, setLiners] = useState<Liner[]>([]);

  const fetchLiners = async () => {
    const res = await fetch("/api/en/one-liner/client");
    const { contents } = await res.json();
    setLiners(contents || []);
  };

  useEffect(() => {
    fetchLiners();
  }, []);

  return (
    <>
     <div className="w-[90%] mx-auto mt-4 rounded-md p-4 shadow-sm bg-white">
  {/* Section Title as label */}
  <div className="flex flex-row justify-between my-4 items-center">
    <h2 className="text-xl font-bold text-my-text-color" aria-label="One-Liner Current Affairs">
      One-Liner Current Affairs
    </h2>
    <p className="text-sm text-gray-500" aria-label="Data update frequency">
      Updated Daily
    </p>
  </div>

  {/* Content List */}
  <div>
    {liners.map((item) => (
      <div
        key={item.id}
        className=" m-2 flex flex-row justify-between rounded-md bg-[#FAFCFC]"
      >
        <p className="p-2">
          {item.content}
        </p>

        <div className="flex flex-row gap-4 p-2">
          <EditButton id={item.id} />
          <DeleteButton id={item.id} onDelete={fetchLiners} />
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  );
}

export default OneLinerDashboard;

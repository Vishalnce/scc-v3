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
      <div className="w-[90%] mx-auto border-2">
        {/* jst text  */}
        <div className="flex flex-row justify-between my-4">
          <h2 className="text-xl text-my-text-color font-bold ">
            One-Liner Current Affairs
          </h2>
          <p className="text-sm text-gray-500 ">Updated Daily</p>
        </div>

        {/* content */}

        <div className="">
          {liners.map((item) => (
            <div
              key={item.id}
              className="border-2 m-2 flex flex-row justify-between"
            >
              <p key={item.id} className="p-2 bg-[#FAFCFC]">
                {item.content}
              </p>

              <div className="flex flex-row gap-2  p-2">
                <EditButton id={item.id} />
                <DeleteButton id={item.id}  onDelete={fetchLiners}/>
              </div>
            </div> 
          ))}
        </div>
      </div>
    </>
  );
}

export default OneLinerDashboard;

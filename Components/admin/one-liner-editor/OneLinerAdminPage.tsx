"use client";

import OneLinerForm from "./OneLinerForm";
import OneLinerDashboard from "./OneLinerDashboard";
import { useState } from "react";

type Liner = {
  id: number;
  content: string;
  createdAt: string | Date;
};

export default function OneLinerAdminPage({ liner }: { liner?: Liner | null }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <OneLinerForm   content={liner?.content}  id={liner?.id} onSuccess={handleRefresh} />
      <OneLinerDashboard key={refreshKey}  />
    </>
  );
}

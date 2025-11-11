// components/DbHealthWatcher.tsx
"use client";

import { useEffect, useState } from "react";

export default function DbHealthWatcher() {
  const [healthy, setHealthy] = useState(true);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();
        setHealthy(data.db);
      } catch {
        setHealthy(false);
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 15000); // check every 15s
    return () => clearInterval(interval);
  }, []);

  if (!healthy) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm z-50">
        ⚠️ Database connection temporarily lost. Some features may not work.
      </div>
    );
  }

  return null;
}

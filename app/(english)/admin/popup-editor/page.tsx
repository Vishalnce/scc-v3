"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Popup = {
  type: "A" | "B";
  isActive: boolean;
  showAfter1: number;
  showAfter2: number;
  showAfter3: number;
};

export default function Page() {
  const [popupA, setPopupA] = useState<Popup | null>(null);
  const [popupB, setPopupB] = useState<Popup | null>(null);
  const [loading, setLoading] = useState(false);

  const [savingType, setSavingType] = useState<"A" | "B" | null>(null);

  // forms
  const formA = useForm<Popup>();

  const formB = useForm<Popup>();

  // fetch
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/en/popup/admin");
      const data: Popup[] = await res.json();

      const A = data.find((p) => p.type === "A") || {
        type: "A",
        isActive: true,
        showAfter1: 120,
        showAfter2: 300,
        showAfter3: 600,
      };

      const B = data.find((p) => p.type === "B") || {
        type: "B",
        isActive: true,
        showAfter1: 180,
        showAfter2: 360,
        showAfter3: 720,
      };

      setPopupA(A);
      setPopupB(B);

      formA.reset(A);
      formB.reset(B);
    };

    fetchData();
  }, []);

  const handleSave = async (data: Popup) => {
    setSavingType(data.type);

    await fetch("/api/en/popup/admin", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setSavingType(null);
  };

  if (!popupA || !popupB) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Popup Admin</h1>

      {/* Popup A */}
      <form
        onSubmit={formA.handleSubmit(handleSave)}
        className="border p-6 rounded-xl space-y-4"
      >
        <h2 className="text-xl font-semibold">Popup A</h2>

        <label className="flex gap-2 items-center">
          <input type="checkbox" {...formA.register("isActive")} />
          Active
        </label>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="1st (sec)"
            register={formA.register("showAfter1", { valueAsNumber: true })}
          />
          <Input
            label="2nd (sec)"
            register={formA.register("showAfter2", { valueAsNumber: true })}
          />
          <Input
            label="3rd (sec)"
            register={formA.register("showAfter3", { valueAsNumber: true })}
          />
        </div>

        {/* hidden type */}
        <input type="hidden" value="A" {...formA.register("type")} />

        <button
          disabled={savingType === "A"}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {savingType === "A" ? "Saving..." : "Save A"}
        </button>
      </form>

      {/* Popup B */}
      <form
        onSubmit={formB.handleSubmit(handleSave)}
        className="border p-6 rounded-xl space-y-4"
      >
        <h2 className="text-xl font-semibold">Popup B</h2>

        <label className="flex gap-2 items-center">
          <input type="checkbox" {...formB.register("isActive")} />
          Active
        </label>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="1st (sec)"
            register={formB.register("showAfter1", { valueAsNumber: true })}
          />
          <Input
            label="2nd (sec)"
            register={formB.register("showAfter2", { valueAsNumber: true })}
          />
          <Input
            label="3rd (sec)"
            register={formB.register("showAfter3", { valueAsNumber: true })}
          />
        </div>

        <input type="hidden" value="B" {...formB.register("type")} />

        <button
          disabled={savingType === "B"}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {savingType === "B" ? "Saving..." : "Save B"}
        </button>
      </form>
    </div>
  );
}

// small reusable input
function Input({ label, register }: any) {
  return (
    <div>
      <label className="text-sm block mb-1">{label}</label>
      <input
        type="number"
        {...register}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}

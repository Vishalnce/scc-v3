// /Components/client/current-affairs/EditButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";

export default function EditButton({ id}: { id: number }) {
  const router = useRouter();

  function handleOnEdit() {
    router.push(`/admin/one-liner?id=${id}`);
  }

  return (
    <MdEdit
      onClick={handleOnEdit}
      className="text-[#007076] size-6 cursor-pointer"
    />
  );
}

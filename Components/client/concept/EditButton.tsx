// /Components/client/current-affairs/EditButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";

export default function EditButton({ slug }: { slug: string }) {
  const router = useRouter();

  function handleOnEdit() {
    router.push(`/admin/concept-editor?slug=${slug}`);
  }

  return (
    <MdEdit
      onClick={handleOnEdit}
      className="text-[#007076] size-6 cursor-pointer"
    />
  );
}

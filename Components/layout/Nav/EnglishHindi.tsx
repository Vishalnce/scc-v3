"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function EnglishHindi() {
  const pathname = usePathname();

  const isHindi = pathname.startsWith("/hi");

  return (
    <div className="rounded-full  flex  justify-between gap-2 bg-[#F4F4FC] py-2 px-6">

      {/* English */}
      <Link
        href="/"
        className={`px-10 py-1 rounded-full text-sm transition
        ${!isHindi ? "bg-white" : "text-black"}`}
      >
        English
      </Link>

      {/* Hindi */}
      <Link
        href="/hi"
        className={`px-10 py-1 rounded-full text-sm transition
        ${isHindi ? "bg-white" : "text-black"}`}
      >
        हिंदी
      </Link>

    </div>
  );
}

export default EnglishHindi;
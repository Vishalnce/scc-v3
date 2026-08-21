

import Link from "next/link";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

async function PopUp() {
   const session = await getServerSession(NEXT_AUTH);
  return (
    <div className="max-w-[1400px] w-[90%]  mx-auto">

      {session?.user?.role === "ADMIN" && (
        <div className="">
          <Link
            href="/admin/popup-editor"
            className="inline-block p-2 px-6 bg-[#007076] rounded-full text-center text-white"
          >
            Edit Popup
          </Link>
        </div>
      )}
    </div>
  );
}

export default PopUp;

// import dynamic from "next/dynamic";

// const EnglishNav = dynamic(() => import("@/Components/layout/EnglishNav"), {
//   ssr: false, // OR remove if SSR is needed
  
// });

import EnglishNav from "@/Components/layout/EnglishNav"

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <EnglishNav />
      {children}
    </>
  );
}
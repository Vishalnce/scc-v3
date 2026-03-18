// import dynamic from "next/dynamic";

// const EnglishNav = dynamic(() => import("@/Components/layout/EnglishNav"), {
//   ssr: false, // OR remove if SSR is needed

// });

import EnglishNav from "@/Components/layout/Nav/EnglishNav";
import Footer from "@/Components/layout/Footer";
import TouchBanner from "@/Components/layout/TouchBanner";
import SmallNav from "@/Components/layout/Nav/SmallNav";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <EnglishNav />

      {children}
      <TouchBanner />

      <Footer />
    </>
  );
}

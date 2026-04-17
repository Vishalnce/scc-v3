// import dynamic from "next/dynamic";

// const EnglishNav = dynamic(() => import("@/Components/layout/EnglishNav"), {
//   ssr: false, // OR remove if SSR is needed

// });

import EnglishNav from "@/Components/layout/Nav/EnglishNav";
import Footer from "@/Components/layout/Footer/Footer";
import TouchBanner from "@/Components/layout/Footer/TouchBanner";
import SmallNav from "@/Components/layout/Nav/SmallNav";
import PopupWrapper from "@/Components/client/popup/PopupWrapper";
import PopupUnlock from "@/Components/client/popup/PopupUnlock";
import PopupPreparing from "@/Components/client/popup/PopupPreparing";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <EnglishNav />
      <PopupWrapper/> 
 

      {children}
      {/* <TouchBanner /> */}

      <Footer />
    </>
  );
}

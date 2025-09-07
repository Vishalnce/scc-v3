import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TouchBanner() {
  const Info = [
    {
      image: "/layout/TouchImages/youtube.png",
      alt: "Youtube ",
      buttonName: " Subscribe Now",
    },
    {
      image: "/layout/TouchImages/tele.png",
      alt: "Telegram ",
      buttonName: " Join Now",
    },
    {
      image: "/layout/TouchImages/whatsapp.png",
      alt: "Whatsapp",
      buttonName: " Join Now",
    },
    {
      image: "/layout/TouchImages/insta.png",
      alt: "Insta ",
      buttonName: " Follow Now",
    },
    {
      image: "/layout/TouchImages/fb.png",
      alt: "Facebook ",
      buttonName: " Follow Now",
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-[#313131] ">
        <div className="max-w-[1400px] mx-auto   w-[90%]">
          {/* heading */}
          <div className="flex flex-col py-12 max-md:py-10 justify-center items-center">
            <p className="text-3xl font-bold max-md:text-lg max-md:text-center dark:text-white ">
              {" "}
              Get in Touch - We’re Here to Help and Chat!
            </p>
            <p className="py-2 text-[#6C6C6C] text-sm max-md:hidden dark:text-[#C2C2C2]">
              Together, Let’s Turn Your SSC CGL Dreams into Reality – Join Us
              Today
            </p>
          </div>

          {/* icons */}
          <div className="flex flex-row justify-between items-center gap-6 md:pb-6 ">
            {Info.map((items, index) => (
              <Link
                key={index}
                href={"/"}
                className="py-2 flex flex-col items-center "
              >
                <div className="flex flex-col items-center max-md:w-[80%]">
                  <div className="pb-4">
                    <Image
                      src={items.image}
                      alt={items.alt}
                      width={62}
                      height={63}
                    />
                  </div>
                  <button className="bg-[#FFE332] text-sm px-3 py-2 rounded-full md:min-w-[110px] max-md:hidden">
                    {items.buttonName}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

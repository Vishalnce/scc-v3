import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TouchBanner() {
  const Info = [
    {
      image: "/layout/TouchImages/youtube.png",
      alt: "Youtube ",
      buttonName: " Subscribe Now",
      link:"https://youtube.com/@sscexamlifedotinfo?si=JZPcyTW1oHcifXav "
    },
    {
      image: "/layout/TouchImages/tele.png",
      alt: "Telegram ",
      buttonName: " Join Now",
      link:"https://t.me/sscexamlifedotinfo"
    },
    {
      image: "/layout/TouchImages/whatsapp.png",
      alt: "Whatsapp",
      buttonName: " Join Now",
      link: "https://whatsapp.com/channel/0029Vb6hQGQCxoAo5TMx4V1R"
    },
    {
      image: "/layout/TouchImages/insta.png",
      alt: "Insta ",
      buttonName: " Follow Now",
        link:"https://www.instagram.com/ssc_cgl_examlife?igsh=eDc1aGFlMDMydjRw"
    },
    {
      image: "/layout/TouchImages/fb.png",
      alt: "Facebook ",
      buttonName: " Follow Now",
      link:"https://www.facebook.com/share/1Ez8r9oKrc/"
    },
  ];

  return (
    <>

        <div className="max-w-[1400px] mx-auto   ">
          {/* heading */}
      

          {/* icons */}
          <div className="flex flex-row justify-start items-center  ">
            {Info.map((items, index) => (
              <Link
                key={index}
                href={items.link}
                className="py-2 flex flex-col "
                target="_blank"
              >
              
                  <div className=" w-[60%] ">
                    <Image
                      src={items.image}
                      alt={items.alt}
                      width={62}
                      height={63}
                    />
             
                
                </div>
              </Link>
            ))}
          </div>
        </div>

    </>
  );
}

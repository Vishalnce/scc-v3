import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function JoinNow() {

  const pre = [
    {
      title: "Quantitative Aptitude"
    },
      {
      title: "English Language"
    },  {
      title: "General Intelligence & Reasoning"
    },  {
      title: "General Awareness"
    },
    
  ]

    const mains = [
    {
      title: "Mathematical Abilities"
    },
      {
      title: "English Language & comprehension"
    },  {
      title: "General Intelligence & Reasoning"
    },  {
      title: "General Awareness"
    },
    
  ]


  return (
    <>

    <div className='bg-white dark:bg-black'>
      <div className='w-[90%] mx-auto max-w-[1400px]   py-16'>
         <div className="flex flex-row justify-between items-center max-md:flex-col max-md:gap-8">
            {/* announcment card */}
            <div className=" w-[46%] max-md:w-[100%] shadow-2xl   ">
              {/* heading */}
              <div className="  bg-[#007076] rounded-t-xl flex flex-row items-center justify-center gap-4  py-1 w-full">
                <div className="my-auto ">
                  <Image
                    src={"/ui/client/home/announce.svg"}
                    alt="announcement"
                    width={60}
                    height={60}
                  />
                </div>
                <div>
                  <p className="text-white text-xl"> Prelims Test Series</p>
                </div>
              </div>

              {/* body  */}

              <div className=" py-3 space-y-3 max-h-[210px]   px-3  dark:bg-[#313131]">
                {pre.map((item: any,index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-start gap-3  py-1.5"
                  >
                    <span className="w-4 h-4 my-auto flex items-center justify-center rounded-full border-4 font-bold dark:border-white"></span>
                    <p className="text-[#6C6C6C] dark:text-[#C2C2C2]  my-auto w-[60%]">
                      {item.title}
                    </p>
                    
                  </div>
                ))}
              </div>

              <div className='w-full  shadow-2xl'>
                <Link href= "/">
                <p className='text-center py-4  rounded-b-lg bg-[#FFE332] font-bold'> Buy Now</p>
                </Link>
                  
              </div>


            </div>

            {/* upcoming exam as notice */}


            <div className=" w-[46%] max-md:w-[100%] shadow-2xl ">
              {/* heading */}
              <div className="  bg-[#007076] rounded-t-xl flex flex-row items-center justify-center gap-4  py-1 w-full ">
                <div className="my-auto ">
                  <Image
                    src={"/ui/client/home/announce.svg"}
                    alt="announcement"
                    width={60}
                    height={60}
                  />
                </div>
                <div>
                  <p className="text-white text-xl"> Mains Test Series</p>
                </div>
              </div>

              {/* body  */}

              <div className=" py-3 space-y-3   px-3  dark:bg-[#313131]">
                {mains.map((item: any,index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-start gap-3  py-1.5"
                  >
                    <span className="w-4 h-4 my-auto flex items-center justify-center rounded-full border-4 font-bold dark:border-white"></span>
                    <p className=" text-[#6C6C6C] dark:text-[#C2C2C2]  my-auto w-[60%]">
                      {item.title}
                    </p>
                    
                  </div>
                ))}
              </div>
   <div className='w-full  shadow-2xl'>
                <Link href= "/">
                <p className='text-center py-4 rounded-b-lg bg-[#FFE332] font-bold'> Buy Now</p>
                </Link>
                  
              </div>

            </div>
          </div>

      </div>

    </div>
    </>
  )
}

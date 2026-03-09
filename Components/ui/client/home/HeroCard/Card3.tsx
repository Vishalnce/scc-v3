import Image from 'next/image'
import React from 'react'

function Card3() {
  return (
        <div className="flex-none w-[80%] px-8 mb-8 ">
               {/* main div */}
               <div className=" bg-gradient-to-r from-[#289AA2] to-[#8CD6DB]  rounded-2xl shadow  ">
                 <div className="flex flex-row items-center justify-center pt-6  px-6">
                   {/* text  */}
                   <div className="  flex flex-col  justify-between items-start gap-6  w-[70%]  pr-4">
                     <p className=" text-4xl text-white font-montserrat font-semibold">Upgrade to Pro for In-Depth Performance Analysis</p>
       
                     <p className="text-white text-xl ">
                      Unlock detailed insights after every test, understand where you went wrong, track your progress over time, and improve your accuracy and speed
                     </p>
       
                     <button className=" mt-6 bg-[#FFFFFFCC]  text-xl px-16 py-2 rounded-2xl font-semibold">Upgrade Now</button>
                   </div>
       
                   {/* image */}
       
                   <div className=" ">
                     <Image
                       src={"/ui/client/home/Hero/boy3.png"}
                          width={300}
                         height={300}
                       alt="hero"
                     />
                   </div>
                 </div>
               </div>
             </div>
  )
}

export default Card3
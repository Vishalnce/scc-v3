import { Linden_Hill } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <>

    <div className='bg-white'>

      <div className='max-w-[1400px] mx-auto border-2 w-[90%] flex flex-row justify-between'>

     

          {/* text */}
        <div className='w-[55%] border-2 flex flex-col items-center justify-center  my-18'>
         
          <p className='text-4xl font-bold font-montserrat py-2'>
            Conquer  <span className='text-[#007076] '>SSC CGL </span>with Our Power-Packed Test Series
          </p>
          <p className='text-my-text-color py-2'>
            Sharpen Your Skills and Track Your Progress with Realistic Mock Tests Designed for SSC CGL Excellence
          </p>

          <div className='self-start space-x-6 py-2'>
            <Link href="/">
                <button className='border-2 px-4 py-2 rounded-full'>
                  Join Test Series
                </button>
            </Link>
                 <Link href="/">
                <button className='border-2 px-4 py-2 rounded-full'>
                  Join Test Series
                </button>
            </Link>
          </div>

        </div>

        {/* image */}

        <div className='w-[40%] border-2'>
          
        </div>  

      </div> 

    </div>


    </>
  )
}

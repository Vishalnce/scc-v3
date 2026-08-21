


import Hero from '@/Components/ui/client/testseries/Hero'


import React from 'react'
import Conquer from '@/Components/ui/client/testseries/Conquer'
import Why from '@/Components/ui/client/testseries/Why'
import Choose from '@/Components/ui/client/testseries/Choose'
import What from '@/Components/ui/client/testseries/What'
import Download from '@/Components/ui/client/testseries/Download'
import So from '@/Components/ui/client/testseries/So'
import Smart from '@/Components/ui/client/testseries/Smart'
import ProCard from '@/Components/ui/client/ProCard/ProCard'

import TestSeriesInfo from '@/Components/ui/client/testseries/ProInfo'
import ProInfo from '@/Components/ui/client/testseries/ProInfo'
import TestSeriesCard from '@/Components/ui/client/TestSeriesCard/TestSeriesCard'


function page() {
  return (
   <>
   <div className="  dark:bg-[#1f1f1f] ">
    <div className="max-w-[1400px]  w-[90%] px-2 mx-auto">
       <Hero/>
       <Conquer/>
       <Why/>
       <Choose/>
       <What/>
       <Download/>
       <So/>
       <Smart />
       <ProInfo/>
       <TestSeriesCard/>
  
    </div>

   </div>
    



   
   



   </>
  )
}

export default page
import React from 'react'
import Slidebar from '@/components/Slidebar'
import HomeNavbar from '@/components/HomeNavbar'

import {Divider} from "@nextui-org/divider";

const page = () => {
  return (
    <main className='flex overflow-hidden'>
      <div className='w-[40vw] min-h-screen'>
      <Slidebar></Slidebar>
      </div>

      <div className='w-full min-h-screen'>
        <HomeNavbar></HomeNavbar>
    </div>

    </main>
  )
}

export default page
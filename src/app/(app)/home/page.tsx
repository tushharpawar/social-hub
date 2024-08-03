import React from 'react'
import Slidebar from '@/components/Slidebar'
import { Separator } from '@radix-ui/react-separator'
import HomeNavbar from '@/components/HomeNavbar'

const page = () => {
  return (
    <main className='flex'>
      <div className='w-[40vw] min-h-screen '>
      <Slidebar></Slidebar>
      </div>

      <div className='w-full min-h-screen'>
        <HomeNavbar></HomeNavbar>
    </div>

    </main>
  )
}

export default page
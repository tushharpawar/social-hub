import React from 'react'
import Slidebar from '@/components/Slidebar'
const page = () => {
  return (
    <main>
      <div className='w-full min-h-screen'>
        <Slidebar className=' w-[20%] text-md min-h-screen fixed border-r-2 border-gray-300'></Slidebar>
    </div>
    </main>
  )
}

export default page
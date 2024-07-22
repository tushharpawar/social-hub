import { Button } from '@/components/ui/button'
import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full h-[10vh] mt-5 flex justify-between items-center">
          <div className=" font-bold text-2xl mx-28 ">Social-Hub</div>
          <div className=" flex gap-7 font-bold mx-28">
            <div ><Button  className=" text-md ">Sign up</Button></div>
            <div ><Button variant="outline" className=" text-md ">Login</Button></div>
          </div>
        </div>
  )
}

export default Navbar
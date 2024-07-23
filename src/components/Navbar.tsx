import { Button } from '@/components/ui/button'
import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full h-[10vh] mt-5 flex gap-[40rem] justify-center items-center">
          <div className=" sm:text-md font-bold text-2xl ">Social-Hub</div>
          <div className=" flex gap-5 font-bold ">
            <div ><Button  className=" text-md ">Log in</Button></div>
            <div ><Button variant="outline" className=" text-md ">Sign up</Button></div>
          </div>
        </div>
  )
}

export default Navbar
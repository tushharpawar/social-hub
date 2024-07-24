import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
const Navbar = () => {
  return (
    <div className="w-full h-[10vh] mt-5 flex gap-[40rem] justify-center items-center">
          <div className=" sm:text-md font-bold text-2xl ">Social-Hub</div>
          <div className=" flex gap-5 font-bold ">
            <div ><Button  className=" text-md "><Link href={'/sign-in'}>Log in</Link></Button></div>
            <div ><Button variant="outline" className=" text-md "><Link href={'/sign-up'}>Sign up</Link></Button></div>
          </div>
        </div>
  )
}

export default Navbar
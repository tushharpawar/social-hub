import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from '../ui/separator'
import { usePathname } from 'next/navigation'
import NoteUpload from '../notes/NoteUpload'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import HomeNavbar from '../HomeNavbar'

const RightSlidebarHeader = () => {

    const pathname = usePathname() 
    const {user} = useSelector((store:any)=>store.auth) 

  return (

    <div className="w-[45%] min-h-screen ">

       <div className="w-full">
       <div className="w-full h-[15vh] flex items-center justify-start ">
        <Link href={`/${user?.username}`} className="flex items-center px-4 w-full justify-start text-lg">
          <div className="text-center">
            <Avatar className="mr-3 h-10 w-10">
              <AvatarImage src={user?.avatar} />
            </Avatar>
          </div>

          <div className="text-base font-semibold">@{user?.username}</div>
        </Link>
    </div>
    <div className="w-[80%] ml-6">
    <Separator></Separator>
    </div>
    </div>


    {/* Note upload component */}

    {
        pathname === '/note' ? (
            <>
            <NoteUpload/></>
        ):(
          <div className='p-3'>
            <HomeNavbar/>
          </div>
        )
    }

 </div>

  )
}

export default RightSlidebarHeader
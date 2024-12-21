import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from '../ui/separator'
import { usePathname } from 'next/navigation'
import NoteUpload from '../notes/NoteUpload'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import HomeNavbar from '../SearchBar'

const RightSlidebarHeader = () => {

    const pathname = usePathname() 
    const {user} = useSelector((store:any)=>store.auth) 

  return (

    <div className="sm:min-h-screen sm:relative">
       <div className="sm:w-full">
       <div className="sm:w-full sm:h-[15vh] sm:flex sm:items-center sm:justify-start ">
        <Link href={`/${user?.username}`} className="sm:flex sm:items-center sm:px-4 sm:w-full sm:justify-start sm:text-lg">
          <div className="text-center">
            <Avatar className=" mr-3 h-10 w-10">
              <AvatarImage src={user?.avatar} />
            </Avatar>
          </div>

          <div className="hidden sm:block text-base font-semibold">@{user?.username}</div>
        </Link>
    </div>
    <div className="hidden sm:block sm:w-[80%] ml-6">
    <Separator></Separator>
    </div>
    </div>


    {/* Note upload component */}

    {
        pathname === '/note' ? (
            <div className="absolute bottom-8 left-2">
              <NoteUpload/>
            </div>
        ):(
          <div className=' hidden sm:p-3 sm:w-full sm:block'>
            <HomeNavbar/>
          </div>
        )
    }

 </div>

  )
}

export default RightSlidebarHeader
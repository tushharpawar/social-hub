import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from '../ui/separator'
import { usePathname } from 'next/navigation'
import NoteUpload from '../notes/NoteUpload'


const RightSlidebarHeader = () => {

    const pathname = usePathname()  

  return (

    <div className="w-[45%] min-h-screen ">

       <div className="w-full">
       <div className="w-full h-[15vh] flex items-center justify-start ">
        <div className="flex items-center px-4 w-full justify-start text-lg">
          <div className="text-center">
            <Avatar className="mr-3 h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="text-base font-normal">@tushharpawar14.___kdosdos</div>
        </div>
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
        ):('kuch bhi nahi')
    }

 </div>

  )
}

export default RightSlidebarHeader
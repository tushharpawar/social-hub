"use client"

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MdOutlineMoreVert } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { Separator } from "@/components/ui/separator"
import axios from "axios";
import { toast } from "@/components/ui/use-toast";


const Page = () => {

  const [isLoading,setIsLoading] = useState(false)
  const [username,setUsername] = useState("")
  const [postSrc,setPostSrc] = useState("")

  useEffect(()=>{
      try {
        const response = axios.get('api/v1/all-posts')
        if(!response){
          toast({
            title:"Failed to fetch posts",
            variant:"destructive"
          })

          console.log(response);
          
        }
      } catch (error) {
        console.log("Error");
      }

  },[])

  return (
    <div className="w-full max-w-md max-h-screen ">
      <div className="h-auto flex justify-center items-center">
        <div className="flex items-center justify-center px-5 py-3">
          <div className="max-w-[300px] w-full flex items-center gap-3 flex-col ">
            <div className="flex items-center gap-10">
              <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full"/>
              <div className="space-y-2">
                <Skeleton className="h-3 w-[170px]" />
              </div>
              </div>
              <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger ><MdOutlineMoreVert className="h-5 w-5"/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Save</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 focus:text-red-500">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            </div>

            <Skeleton className="h-[300px] w-[300px] space-y-5" />

          {/* Post-bottom component */}

            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center gap-5">
              <FaRegHeart className="h-5 w-5 cursor-pointer"/>
              <FaRegComment className="h-5 w-5 cursor-pointer"/>
              <IoPaperPlaneOutline className="h-5 w-5 cursor-pointer"/>
              </div>
              <div className="">
              <FaRegBookmark className="h-5 w-5 cursor-pointer"/>
              </div>
            </div>

            <div className="flex w-full justify-start items-center px-2">
               <p className=" font-semibold text-sm">1200 likes</p>
            </div>

            <div className="flex w-full justify-start items-center px-2">
            <p className="text-sm font-medium">Hello caption here</p>
            </div>

            <Separator />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
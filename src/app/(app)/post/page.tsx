"use client"

import React from "react";
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

const page = () => {
  return (
    <div className="w-full max-w-md min-h-screen ">
      <div className="h-auto flex justify-center items-center mt-10">
        <div className="flex items-center justify-center px-5 py-5">
          <div className="max-w-[300px] w-full flex items-center gap-3 flex-col ">
            <div className="flex items-center gap-10">
              <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
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

            <div className="flex items-center justify-between w-full  px-2">
              <div className="flex items-center gap-5">
              <FaRegHeart className="h-5 w-5 cursor-pointer"/>
              <FaRegComment className="h-5 w-5 cursor-pointer"/>
              <IoPaperPlaneOutline className="h-5 w-5 cursor-pointer"/>
              </div>
              <div className="">
              <FaRegBookmark className="h-5 w-5 cursor-pointer"/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

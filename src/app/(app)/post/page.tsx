"use client"

import React, { useCallback, useEffect, useState } from "react";
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

type PostCardProps = {
  username:string;
  avatar:string;
  postUrl:string;
  caption:string;
};

const PostPage = ({username,avatar,postUrl,caption}:PostCardProps) => {

  return (
    <div className="w-full max-h-screen flex justify-center">
      <div className="h-auto flex justify-center items-center">
        <div className="flex items-center justify-center px-5 py-3">
          <div className="max-w-[350px] w-full flex items-center gap-3 flex-col ">

            {/* post - header */}

            <div className="flex items-center justify-between w-[350px] px-2">
              <div className="flex items-center space-x-4 ">
              {

                avatar ? (
                  <img src={avatar} alt="" className="h-10 w-10 rounded-full"></img>
                ):(
                  <Skeleton className="h-10 w-10 rounded-full"/>
                )

              }
              <div className="space-y-2">
              {

                username ? (
                  <div className="h-3 w-[170px]">
                  <p className=" font-semibold">{username}</p>
                  </div>
                ):(
                  <Skeleton className="h-3 w-[170px]" />
                )

              }

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

              {/* post */}

            {
              postUrl ? (
                <div className="h-[350px] w-[350px] space-y-5">
                  <img src={postUrl} alt="post" className="h-[350px] w-[350px] object-cover overflow-hidden"/>
                </div>
              ):
              (
                <Skeleton className="h-[300px] w-[300px] space-y-5" />
              )
            }

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
            <p className="text-sm font-medium">
              {caption}
            </p>
            </div>

            <Separator />

          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

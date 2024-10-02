import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";

const PostBottom = () => {
  return (
    <>
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

    </>
  )
}

export default PostBottom
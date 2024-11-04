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
import { FaHeart, FaPaperPlane, FaRegHeart, FaRegPaperPlane } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { Separator } from "@/components/ui/separator"
import axios from "axios";
import CommentBox from "./CommentBox";
import { useToast } from "../ui/use-toast";

type PostCardProps = {
  username:string;
  avatar:string;
  postUrl:string;
  caption:string;
  postId:any;
  likeCount:number;
};

const PostPage = ({username,avatar,postUrl,caption,postId,likeCount}:PostCardProps) => {
  const [isLiked,setIsLiked] = useState(false)
  const [likeData,setLikeData] = useState([])
  const [newLikeCount,setNewLikeCount] = useState(likeCount)
  const [isCommentClicked,setIsCommentClicked] = useState(false)
  const {toast} = useToast()

  //increase & decrease like and update state of isLiked on fronted
  //the changes will be appear first on ui and later it will updated in db

  const onLike =async ()=>{
      try {
        if(!isLiked ){
          setNewLikeCount(newLikeCount+1)
        }else{setNewLikeCount(newLikeCount-1)}
        setIsLiked(!isLiked)

        const response = await axios.post(`/api/v1/posts/${postId}/like`)
  
        if(response.status === 201){
          toast({
            title:'Liked'
          })
        }
      } catch (error) {
        console.log(error);
        toast({
          title:'Not Liked'
        })
     }
}

// checks if logged-in user liked post or not if user not liked then isLiked state will be false and if it is liked then isLiked state will be true

const getLikedByLoggedInUser = async()=>{
    try {
    const response = await axios.get(`api/v1/check-logged-in-user-liked/${postId}`)
    if(response.data.message === true){
      setIsLiked(true)
    }
    if(response.data.message === false){
      setIsLiked(false)
    }
    } catch (error) {
      console.log("Error while fething likes",error);
    }
}

useEffect(()=>{
  getLikedByLoggedInUser()
},[])

//opens comment box
const onComment =async () =>{
  setIsCommentClicked(!isCommentClicked)
}

  return (
    <div className="w-full h-auto flex justify-center mt-5">
      <div className="h-auto flex justify-center items-center">
        <div className="flex items-center justify-center px-5 py-3">
          <div className="max-w-[350px] w-full flex items-center gap-3 flex-col ">

            {/* post - header */}

            <div className="flex items-center justify-between w-[350px] px-2">
              <div className="flex items-center gap-2">
              <div className="">
              {
                avatar ? (
                  <img src={avatar} alt="" className="h-10 w-10 rounded-full"></img>
                ):(
                  <Skeleton className="h-10 w-10 rounded-full"/>
                )
              }
              </div>

              {
                username ? (
                  <div className="w-[170px]">
                  <p className="font-semibold">{username}</p>
                  </div>
                ):(
                  <Skeleton className="h-3 w-[170px]" />
                )
              }
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

            {/* conditional rendering based on isliked state */}

              {
                isLiked ? <FaHeart size={22} className="cursor-pointer text-red-600" onClick={onLike}/> : 
                <FaRegHeart size={22} className=" cursor-pointer" onClick={onLike}/>
              }
              
              <FaRegComment size={22} className=" cursor-pointer" onClick={onComment}/>
              <FaRegPaperPlane size={22} className=" cursor-pointer"/>
              </div>
              <div className="">
              <FaRegBookmark size={22} className=" cursor-pointer"/>
              </div>
            </div>

            <div className="flex w-full justify-start items-center px-2">
               <p className=" font-semibold text-sm">{newLikeCount} likes</p>
            </div>

            <div className="flex w-full justify-start items-center px-2">
            <p className="text-sm font-medium">
              {caption}
            </p>
            </div>

            {              
              isCommentClicked ? <CommentBox postId={postId} isCommentClicked={isCommentClicked}></CommentBox> :<></>
            }

             <Separator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
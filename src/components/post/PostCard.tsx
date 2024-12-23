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
import Link from "next/link";
import { FaBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const [isSaved,setIsSaved] = useState(false)
  const [newLikeCount,setNewLikeCount] = useState(likeCount)
  const [isCommentClicked,setIsCommentClicked] = useState(false)
  const [isFetchedLikeStatus,setIsFetchedLikeStatus] = useState(false)
  const [isFetchedSaveStatus,setIsFetchedSaveStatus] = useState(false)
  const {toast} = useToast()

  const onLike =async ()=>{
      try {
        if(!isLiked ){
          setNewLikeCount(newLikeCount+1)
        }else{setNewLikeCount(newLikeCount-1)}
        setIsLiked(!isLiked)

        const response = await axios.post(`/api/v1/posts/${postId}/like`)
  
      } catch (error) {
        console.log(error);
     }
}
  const onSave =async ()=>{
      try {
        setIsSaved(!isSaved)

        const response = await axios.post(`/api/v1/posts/${postId}/save`)
  
        if(response.status === 201){
          toast({
            title:response.data.message
          })
        }
      } catch (error) {
        console.log(error);
        toast({
          title:'Post Unsaved'
        })
     }
}

// checks if logged-in user liked post or not if user not liked then isLiked state will be false and if it is liked then isLiked state will be true

const getLikedByLoggedInUser = async()=>{
  setIsFetchedLikeStatus(false)
    try {
    const response = await axios.get(`/api/v1/check-logged-in-user-liked/${postId}`)
    if(response.data.message === true){
      setIsLiked(true)
    }
    if(response.data.message === false){
      setIsLiked(false)
    }
    setIsFetchedLikeStatus(true)
    } catch (error) {
      console.log("Error while fething likes",error);
      setIsFetchedLikeStatus(true)
    }finally{
      setIsFetchedLikeStatus(true)
    }
}

const getSavedByLoggedInUser = async()=>{
  setIsFetchedSaveStatus(false)
    try {
    const response = await axios.get(`/api/v1/check-is-saved/${postId}`)
    if(response.data.message === true){
      setIsSaved(true)
    }
    if(response.data.message === false){
      setIsSaved(false)
    }
    setIsFetchedSaveStatus(true)
    } catch (error) {
      console.log("Error while fething likes",error);
      setIsFetchedSaveStatus(true)
    }finally{
      setIsFetchedSaveStatus(true)
    }
}

const {user} = useSelector((store:any)=>store.auth)

useEffect(()=>{
  getLikedByLoggedInUser()
  getSavedByLoggedInUser()
},[])

//opens comment box
const onComment =async () =>{
  setIsCommentClicked(!isCommentClicked)
}

const onDelete = async () =>{
  try {

    const response = await axios.post(`/api/v1/post-delete/${postId}`)

    if(response.status === 201){
      toast({
        title:response.data.message
      })
    }
  } catch (error) {
    console.log(error);
    toast({
      title:'Internal server error!'
    })
 }
}

const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/posts/${postId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'URL Copied!',
      description: 'Post URL has been copied to clipboard.',
    });
  };

  return (
    
    <>

      <div className="h-auto flex justify-center items-center">
        <div className="flex items-center justify-center px-5 py-3">
          <div className="max-w-[350px] w-full flex items-center gap-3 flex-col ">

            {/* post - header */}

            <div className="flex items-center justify-between w-[350px] px-2">
 
              <Link href={`/${username}`} className="flex items-center gap-2">
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
              </Link>


              <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger ><MdOutlineMoreVert className="h-5 w-5"/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href={`/${username}`}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                  <DropdownMenuItem onClick={onSave}>Save</DropdownMenuItem>
                  {
                    username === user?.username && <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={onDelete}>Delete</DropdownMenuItem>
                  }
                  
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
          
               <Dialog>
                  <DialogTrigger asChild>
                  <FaRegPaperPlane size={22} className=" cursor-pointer"/>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share link</DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to view this post.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link"
                          defaultValue={profileUrl}
                          readOnly
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
                        <span className="sr-only">Copy</span>
                        <Copy />
                      </Button>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
              </div>
              <div className="">
              {
                isSaved? <FaBookmark size={22} className=" cursor-pointer" onClick={onSave}/> : <FaRegBookmark size={22} className=" cursor-pointer" onClick={onSave}/>
              }
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
    </>  
  );
};

export default PostPage;
"use client"

import HomeNavbar from '@/components/HomeNavbar'
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { avatar } from '@nextui-org/react';
import PostPage from '../post/PostCard';
import RightSlidebarHeader from '../right-slidebar/RightSlidebar';


const HomePageAfterLogin = () => {

  const [isLoading,setIsLoading] = useState(false)
  const [posts,setPosts] = useState([])

 const fetchPost = useCallback(
  async()=>{
    setIsLoading(true)
    try {
      const response = await axios.get('/api/v1/all-posts')

      setPosts(response.data.message)
      console.log(posts);
      console.log(response.data.message);
      
      setIsLoading(false)
    } catch (error) {
      console.log(error); 
    }
  },[])

  useEffect(() => {
    fetchPost()
  }, [])
  

  return (

      <div className='w-full flex'>
      <div className='w-full min-h-screen'>
      <HomeNavbar></HomeNavbar>

        <div className="flex items-center justify-center flex-col">
        <div className="mt-2 p-5">
          {
            posts.length > 0 ?
            (
              posts.map((post,index)=>(
                <PostPage
                key={index}
                username={post.owner.username}
                postUrl={post.postUrl}
                avatar={post.owner.avatar}
                caption={post.caption}
                ></PostPage>
              ))
            ):(<p>No posts to display</p>)
          }
        </div>
        </div>
    </div>
    <RightSlidebarHeader></RightSlidebarHeader>
    </div>
  )
}

export default HomePageAfterLogin
"use client"
import Slidebar from '@/components/Slidebar'
import HomeNavbar from '@/components/HomeNavbar'
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { avatar } from '@nextui-org/react';
import PostPage from '../post/page';


const Page = () => {

  const [isLoading,setIsLoading] = useState(false)
  const [posts,setPosts] = useState([])

 const fetchPost = useCallback(
  async()=>{
    setIsLoading(true)
    try {
      const response = await axios.get('/api/v1/all-posts')
      
      // setUsername(response.data.message.post.username)
      // setAvatar(response.data.message.post.avatar)
      // setPostSrc(response.data.message.postUrl)
      // setCaption(response.data.message.caption)
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
    <main className='flex overflow-hidden'>
      <div className='w-[40vw] min-h-screen'>
      <Slidebar></Slidebar>
      </div>

      <div className='w-full min-h-screen'>
        <HomeNavbar></HomeNavbar>
        <div className="mt-2">
          {
            posts.length > 0 ?
            (
              posts.map((post,index)=>(
                <PostPage
                key={index}
                username={post.owner.username}
                postUrl={post.postUrl}
                avatar={post.owner.avatar.url}
                caption={post.caption}
                ></PostPage>
              ))
            ):(<p>No posts to display</p>)
          }
        </div>
    </div>

    </main>
  )
}

export default Page
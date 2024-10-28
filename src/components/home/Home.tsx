"use client"

import HomeNavbar from '@/components/HomeNavbar'
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PostPage from '../post/PostCard';
import RightSlidebarHeader from '../right-slidebar/RightSlidebar';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/app/redux/authSlice';


const HomePageAfterLogin = () => {

  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(false)
  const [posts,setPosts] = useState([])

  const {data:session} = useSession()
  const user :User = session?.user as User
  console.log("USer from home",user);

  dispatch(setAuthUser(user))
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
                postId={post._id}
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
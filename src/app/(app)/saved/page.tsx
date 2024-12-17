'use client'

import SmallPostCard from '@/components/user-profile/SmallPostCard';
import axios from 'axios';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const Page = () => {

    const {data:session} = useSession()
    const user:User = session?.user as User
    console.log(user?._id);
    
    const [userPosts, setUserPosts] = useState([]);
    
  
    useEffect(() => {      

        const fetchSavedPosts = async () => {
            try {
              const response = await axios.get(
                `api/v1/get-all-saved-post/${user?._id}`
              );
              setUserPosts(response.data.message);
              // dispatch(setFetchedUserPosts(response.data.message))
              console.log("Users posts fetched saved posts", response.data.message);
            } catch (error) {
              console.log("Error while fetching saved posts", error);
            }
          };

      fetchSavedPosts();
    }, [user?._id]);

  return (
    <div className="h-screen">
        <p className=' text-xl font-bold m-5'>Saved Posts</p>
        <div className="flex justify-center my-4 p-5">
          <div className="grid grid-flow-row grid-cols-4 gap-3">
            {userPosts[0]?.saved_post?.length > 0
              ? userPosts[0]?.saved_post?.map((item : any, index:any) => (
                  <SmallPostCard key={item?._id}  postUrl={item.postUrl} postId={item._id}/>
                ))
              : "No posts on feed :(("}
          </div>
        </div>
    </div>
  )
}

export default Page
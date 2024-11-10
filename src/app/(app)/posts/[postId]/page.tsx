'use client'

import PostPage from '@/components/post/PostCard'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
    const params = useParams<{ postId: string }>()
    const {fetchedUserPosts} = useSelector((store:any)=>store.post)
    const {postId} = params

    const postRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Scroll to the post with the matching postId
        if (postId && postRefs.current[postId]) {
          containerRef.current?.scrollTo({
            top: postRefs.current[postId]?.offsetTop || 0,
            behavior: 'auto' // No smooth scroll
        })
        }
    }, [postId, fetchedUserPosts])

  return (
    <div ref={containerRef} className="w-full h-screen overflow-auto">
        {
          fetchedUserPosts[0]?.all_posts?.map((post:any,index:any)=>(
            <div 
                  key={post._id} 
                  ref={(el) => { postRefs.current[post._id] = el }}
                >
                    <PostPage
                        avatar={fetchedUserPosts[0]?.avatar}
                        username={fetchedUserPosts[0]?.username}
                        postUrl={post?.postUrl}
                        postId={post?._id}
                        caption={post?.caption}
                        likeCount={post?.likeCount}
                    />
                </div>
          ))
        }
    </div>
  )
}

export default Page
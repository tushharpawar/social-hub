'use client'

import PostPage from '@/components/post/PostCard'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const Page = () => {
    const params = useParams<{ postId: string }>()
    const {postId} = params
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(false)
    const {data:session,status} = useSession()

    const {toast} = useToast()
    const router = useRouter()

    const getPost =async () =>{
      try {
        setLoading(true)
        const response = await axios.get(`/api/v1/get-post/${postId}`)
        if(response.status === 200){
          setPosts(response.data.message) 
        }
        setLoading(false)
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {

          if(error.response && error.response.status === 402){
            setLoading(true)
            toast({
              title:"Post not found!",
              variant:"destructive"
            })
            router.replace('/')
            setLoading(false)
          }
        else{
            setLoading(false)
            return <div>Internal server error</div>
          }
        }else{
          setLoading(false)
        }
      }
    }

    useEffect(() => {
        getPost()
    }, [postId])

    if(status === 'unauthenticated'){
      router.replace('/sign-in')
      }   
    
      if(status ==='loading'){
        return <div className="w-full flex justify-center m-3"><Loader2 className="mr-2 h-8 w-8 animate-spin"></Loader2><p className="text-lg sm:text-2xl">Loading..</p></div>
      }

  return (
    <div className="w-full h-screen overflow-auto">

        {
          loading && <div className="w-full flex justify-center m-3"><Loader2 className="mr-2 h-8 w-8 animate-spin"></Loader2><p className="text-lg sm:text-2xl">Loading..</p></div>
        } 

        {
          posts?.length > 0 ? (
            posts?.map((post:any,index:any)=>(
              <div key={post._id} >
                    <PostPage
                    username={post.post_owner[0].username}
                    avatar={post.post_owner[0].avatar}
                    postId={post._id}
                    postUrl={post.postUrl}
                    caption={post.caption}
                    likeCount={post.likeCount}
                    />
                  </div>
            ))
          ):(<div></div>)
        }
    </div>
  )
}

export default Page
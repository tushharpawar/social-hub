import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "@radix-ui/react-separator"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import axios from "axios"
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import CommentCard from "./CommentCard"
import { useDispatch, useSelector } from "react-redux"
import { setComment } from "@/app/redux/commentSlice"

type CommentBoxProps = {
  postId:any,
  isCommentClicked:any
}

export function CommentBox({postId,isCommentClicked}:CommentBoxProps) {
    
  const [content,setContent] = useState('')
  const {user} = useSelector((store:any)=>store.auth)
  const {toast} = useToast()
  const dispatch = useDispatch()
  const {comments} = useSelector((store:any)=>store.comment)
  
  const onChange = (e:any) =>{
    setContent(e.target.value)
  }  

  const addComment =async () =>{
    try {
      const newCmt = {
        "_id":Date.now(),
        "content":content,
        "createdAt":Date.now(),
        "commentOwner":[{
          "username":user.username,
          "avatar":user.avatar
        }]
      }

      dispatch(setComment([newCmt,...comments]))

      setContent('')

      const res = await axios.post(`/api/v1/posts/${postId}/comment`,{content})

      if(res.status === 201){
        toast({
          title:res.data.message
        })
      }

    } catch (error:any) {
      toast({
        title:"Cannot add comment due to technical reason!",
        variant:'destructive'
      })
  }
}

useEffect(()=>{
  const fetchComment = async()=>{
 
      try {
        const res = await axios.get(`/api/v1/get-all-comments/${postId}`)
    
        if(res.status === 201){
          dispatch(setComment(res.data.message))
        }
    
      } catch (error) {
      }
  }

  fetchComment()
},[isCommentClicked,postId])

  return (
    <>
    <div className="h-[40vh] w-full mx-5 border border-input rounded-md">
    <ScrollArea className="h-full w-full ">
      <div className="flex flex-col p-4 ">
        <h1 className=" font-medium">Commentssss</h1>

        {
          comments.length > 0 ? (
            comments.map((item:any,index:any)=>(
              <CommentCard
              key={item._id}
              avatar={item.commentOwner[0].avatar}
              content={item.content}
              createdAt={item.createdAt}
              username={item.commentOwner[0].username}
              />
            ))
          ) :(<div className="flex items-center h-[100%] justify-center bg-slate-400">No comments yet!</div>)
        }

      </div>
    </ScrollArea>
    </div>
    <div className="flex w-full max-w-sm items-center space-x-2">
    <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} />
    </Avatar>
    <Input type="text" placeholder="Add a comment" className=" border-none" value={content} onChange={onChange}/>
    <Button type="submit" onClick={addComment} >Comment</Button>
    </div>
    </>
  )
}

export default CommentBox
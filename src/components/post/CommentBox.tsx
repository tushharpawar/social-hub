import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "@radix-ui/react-separator"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import axios from "axios"
import { useState } from "react"
import { Toast } from "../ui/toast"
import { useToast } from "../ui/use-toast"
import CommentCard from "./CommentCard"


export function CommentBox(postId:any,commentData:any) {

  console.log("Commentdata",commentData);
  

  const [content,setContent] = useState('')

  const {toast} = useToast()
  
  const onChange = (e:any) =>{
    setContent(e.target.value)
  }  

  const addComment =async () =>{
    try {
      const res = await axios.post(`/api/v1/posts/${postId.postId}/comment`,{content})

      if(res.status === 201){
        toast({
          title:res.data.message
        })
      }

      setContent('')
    } catch (error:any) {
      console.log('Error in commenting',error);
      toast({
        title:"Cannot add comment due to technical reason!",
        variant:'destructive'
      })
  }
}

  return (
    <>
    <div className="h-[40vh] w-full mx-5 border border-input rounded-md">
    <ScrollArea className="h-full w-full ">
      <div className="flex flex-col p-4 ">
        <h1 className=" font-medium">Commentssss</h1>
        


        {
          commentData.length > 0 ? (
            commentData.map((item:any,index:any)=>(
              <CommentCard
              key={item._id}
              avatar={item.commentOwner.avatar}
              content={item.content}
              createdAt={item.createdAt}
              username={item.commentOwner.username}
              />
            ))
          ) :(<div className="flex items-center h-[100%] justify-center bg-slate-400">No comments yet!</div>)
        }


      </div>
    </ScrollArea>
    </div>
    <div className="flex w-full max-w-sm items-center space-x-2">
    <Avatar className="h-8 w-8">
          <AvatarImage src="https://res.cloudinary.com/tushharpawar/image/upload/v1725987768/avatar/hrcubc6bbowfwelcjheh.jpg" />
    </Avatar>
    <Input type="text" placeholder="Add a comment" className=" border-none" onChange={onChange}/>
    <Button type="submit" onClick={addComment} >Comment</Button>
    </div>
    </>
  )
}

export default CommentBox
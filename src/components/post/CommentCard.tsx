import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'

type CommentCardProps={
  avatar:string,
  username:string,
  createdAt:any,
  content:any,
}

const CommentCard = ({avatar,username,createdAt,content}:CommentCardProps) => {
  return (
    <div className="flex gap-2 mt-3">
        <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} />
        </Avatar>
        <div>
          <div className="flex gap-2">
          <p className=" text-sm font-semibold">{username}</p>
          <p className=" text-sm font-light text-gray-600">16m</p>
          </div>
          <p className=" text-sm">{content}</p>
        </div>
        </div>
  )
}

export default CommentCard
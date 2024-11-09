import Link from 'next/link';
import React from 'react'

type imageProps = {
    postUrl:string;
    postId:any;
}

const SmallPostCard = ({postUrl,postId}:imageProps) => {
  return (
        <Link href={`/posts/${postId}`} className="h-[180px] w-[180px] object-contain">
        <img src={postUrl} alt="" />
        </Link>        
  )
}

export default SmallPostCard
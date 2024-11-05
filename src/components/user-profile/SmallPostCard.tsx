import React from 'react'

type imageProps = {
    postUrl:string;
}

const SmallPostCard = ({postUrl}:imageProps) => {
  return (
        <div className="h-[180px] w-[180px] object-contain">
        <img src={postUrl} alt="" />
        </div>        
  )
}

export default SmallPostCard
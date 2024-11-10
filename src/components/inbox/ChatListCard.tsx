import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'

const ChatListCard = (props) => {
  // const { channel, setActiveChannel } = props;
  const { channel, displayImage, displayTitle, latestMessagePreview } = props;
  return (
    <div className="w-[95%] flex bg-gray-100 rounded-md border-b justify-center m-1 p-2 cursor-pointer">
            <div>
            <Avatar className="mr-3 h-10 w-10">
              <AvatarImage src="https://res.cloudinary.com/tushharpawar/image/upload/v1725987768/avatar/hrcubc6bbowfwelcjheh.jpg"/>
            </Avatar>
            </div>

            <div className="w-full">
                <div className="text-sm">{channel.id}</div>
                <div className="text-sm text-gray-500">{latestMessagePreview}</div>
            </div>
            </div>

  )
}

export default ChatListCard
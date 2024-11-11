import React, { useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useChatContext, useMessageListContext } from 'stream-chat-react';

const ChatListCard = (props) => {
  // const { channel, setActiveChannel } = props;
  const {setActiveChannel} = useChatContext()
  const { channel } = props;
  const [activeChannelId, setActiveChannelId] = useState(false)
  

  const activeChannel = () =>{
    setActiveChannelId(true)
    setActiveChannel(channel)  }

  return (
    <div className={`w-[95%] flex transition duration-200 transform hover:scale-105 active:scale-95 active:bg-gray-300 border-b justify-center m-1 p-2 cursor-pointer`} onClick={activeChannel}>
            <div>
            <Avatar className="mr-3 h-10 w-10">
              <AvatarImage src="https://res.cloudinary.com/tushharpawar/image/upload/v1725987768/avatar/hrcubc6bbowfwelcjheh.jpg"/>
            </Avatar>
            </div>

            <div className="w-full">
                <div className="text-sm">{channel.id}</div>
                <div className="text-sm text-gray-500">{activeChannelId}</div>
            </div>
            </div>

  )
}

export default ChatListCard
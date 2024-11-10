import React from 'react'
import { useChannelStateContext } from 'stream-chat-react'

const CustomChannelHeader = () => {
    const {channel} = useChannelStateContext()

    const channelId = channel.id
  return (
    <div className='flex items-center space-x-3 p-3 border-b-2 border-b-gray-200 chat-header'>
        <span className='text-3xl text-gray-500'>@</span>
        <span className='font-bold'>{channelId}</span>
    </div>
  )
}

export default CustomChannelHeader
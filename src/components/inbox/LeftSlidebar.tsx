"use client";
import { ListFilter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import ChatListCard from "./ChatListCard";
import { useCallback, useEffect, useState } from "react";
import { ChannelList, ChannelListMessengerProps, DefaultStreamChatGenerics, useChannelListContext, useChatContext } from "stream-chat-react";
import { IoSearch } from "react-icons/io5";
import { Channel, ChannelFilters, StreamChat, UserResponse } from 'stream-chat';
import { IoPersonAddOutline } from "react-icons/io5";
import { Button } from "../ui/button";

const LeftSlidebar = (props) => {

  const [users,setUsers] = useState<UserResponse>()
  const [channels1, setChannels] = useState<Array<Channel<DefaultStreamChatGenerics>>>([])

  const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

  
  const findChannels = async()=>{
    let filters:ChannelFilters ={
      type:'messaging',
      members:{$in:[client.userID as string]}
    }

    const channels = await client.queryChannels(filters)
    console.log("Channelsss",channels);
    
    setChannels(channels) 
  }
  

  // useEffect(()=>{
  //   findChannels()
  // },[])
  //TODO: do search functionality later

  const {channels} = useChannelListContext()

  const createChannel=async () =>{


    const channel = client.channel("messaging","abcd2",{
      members:[client.userID!,"66a8ee649ff17fd4fd5ca727"]
    })

    await channel.watch()
    console.log("channel created",channel.id);
  }


  const filters = { members: { $in: [client.userID!] } };
  const sort = { last_message_at: -1 };

  return (
  
    <div className="grid grid-rows-[auto_1fr] w-full h-screen border-b-2 border-b-gray-200">
      <div className=" chat-header border-b border-b-gray-300 z-10">
      <div className=" text-xl font-bold my-2">Inbox</div>
      <div className="flex gap-2 p-4">
      <Input
              type="text"
              placeholder="Search a existing chat"
              className="rounded-lg h-8 w-full"
            />
      <IoSearch size={28}/>
      <IoPersonAddOutline size={28} onClick={createChannel} className=" cursor-pointer"/>
      </div>
      </div>

      <div className="chat-body w-full overflow-y-auto">
      
          {
            channels?.length>0?(
              channels?.map((channel,index)=>(
                <ChatListCard
                 key={index}
                 channel={channel}
                 />
              ))
            ):("No channel")
          }
          
      </div>

      </div>
  

  );
};
export default LeftSlidebar;

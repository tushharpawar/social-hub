"use client";

import React from "react";
import { useChannelStateContext } from "stream-chat-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { StreamChat } from "stream-chat";
import Link from "next/link";

const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

const CustomChannelHeader = ({token}) => {
  const { channel } = useChannelStateContext();
  //find other user

    const otherUser =
    Object.values(channel?.state?.members || {}).find(
      (member) => member.user && member.user.id !== client?.userID
    )?.user || "";
  console.log("Channel header", channel);


  return (
    <div className="flex items-center justify-between space-x-3 p-3 border-b-2 border-b-gray-200">
      <Link href={`/${otherUser?.id}`} className="flex gap-2 items-center">
        <Avatar className="mr-3 h-12 w-12">
          <AvatarImage src={otherUser?.image} />
        </Avatar>

        <div className="text-lg font-semibold">
          <p>@{otherUser?.id}</p>
        </div>
      </Link>

    </div>
  );
};

export default CustomChannelHeader;

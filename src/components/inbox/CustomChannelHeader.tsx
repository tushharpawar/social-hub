import React from "react";
import { useChannelStateContext } from "stream-chat-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { IoCallOutline, IoVideocamOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

const CustomChannelHeader = () => {
  const { channel } = useChannelStateContext();

  const channelId = channel.id;
  return (
    <div className="flex items-center justify-between space-x-3 p-3 border-b-2 border-b-gray-200">
      <div className="flex gap-2 items-center">
        <Avatar className="mr-3 h-12 w-12">
          <AvatarImage src="https://res.cloudinary.com/tushharpawar/image/upload/v1725987768/avatar/hrcubc6bbowfwelcjheh.jpg" />
        </Avatar>

          <div className="text-lg font-semibold">
          <p>{channelId}</p>
          </div>

      </div>

      <div className="flex gap-5 items-center px-5">
        <IoCallOutline size={28} />
        <IoVideocamOutline size={28} />
        <IoMdInformationCircleOutline size={28}/>
      </div>
    </div>
  );
};

export default CustomChannelHeader;

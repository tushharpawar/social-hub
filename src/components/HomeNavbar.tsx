import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const HomeNavbar = () => {
  return (
    <div className=" w-[60%] h-[15vh] flex items-center">
      <div className=" px-2 w-[72px] h-[72px]">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-xs overflow-hidden">tushhar.14</div>
      </div>
      <div className=" px-2 w-[72px] h-[72px]">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-xs overflow-hidden">tushhar.14</div>
      </div>
      <div className=" px-2 w-[72px] h-[72px]">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-xs overflow-hidden">tushhar.14</div>
      </div>
    </div>
  );
};

export default HomeNavbar;

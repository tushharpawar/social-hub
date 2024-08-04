import React from "react";

import {Avatar} from "@nextui-org/react";

const HomeNavbar = () => {
  return (
    <div className=" w-[60%] h-[15vh] flex items-center">
      <div className=" px-2">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
        <div className="text-xs overflow-hidden">tushhar.14</div>
      </div>
      <div className=" px-2 ">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
        <div className="text-xs overflow-hidden">tushhar.14</div>
      </div>     
    </div>
  );
};

export default HomeNavbar;

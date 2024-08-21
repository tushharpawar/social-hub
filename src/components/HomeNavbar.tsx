'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

const HomeNavbar = () => {

  const {data:session} = useSession();

  if (!session || !session.user) {
    return <div>No session</div>;
  }

  const {username} = session.user as User

  return (
    <div className="flex items-center">
    <div className=" w-full h-[15vh] flex items-center justify-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Find your friends here..." className=" focus:outline-none"/>
        <Button type="submit">
            <IoSearchOutline className="w-4 h-4"></IoSearchOutline>
        </Button>
      </div>
    </div>

    {/* <div className="w-[20%] h-[15vh] flex items-center justify-center">
    <div className="flex items-center px-12 w-full justify-start text-lg">
          <div className="text-center">
            <Avatar className="mr-3 h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="text-md font-medium">@{username}</div>
        </div>
    </div> */}
    </div>

  );
};

export default HomeNavbar;

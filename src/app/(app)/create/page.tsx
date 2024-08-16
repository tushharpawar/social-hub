'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

const Page = () => {

  const {data:session} = useSession();

  if (!session || !session.user) {
    return <div>No session</div>;
  }

  const {username} = session.user as User

  return (

    <div className=" w-[60%] flex items-center justify-center">

    </div>


  );
};

export default Page;

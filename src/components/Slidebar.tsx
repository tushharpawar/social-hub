'use client'

import { cn } from "@/lib/utils";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { BiMessageRoundedDots } from "react-icons/bi";
import { MdOutlineSettings } from "react-icons/md";
import React from "react";
import Link from "next/link";
import CreatePostAlert from "../components/create-post/CreatePostAlert";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const {data:session} = useSession()
  const user:User = session?.user as User
  
  return (
    <div className={cn(className)}>
      <div className="flex justify-start">
        <div className="w-[20%] text-md fixed border-gray-600 border-r space-y-4 py-4 min-h-screen z-50">
          <div className="px-6 py-2">
            <h1 className="px-4 text-2xl font-semibold tracking-tight">
              Social-Hub
            </h1>
          </div>

          <div className="px-8 py-2">
            <div className="space-y-3 ">
              <Button variant="ghost" className="w-full justify-start text-lg">
                <Link href={"/"} className="flex">
                  <AiOutlineHome className="mr-3 h-6 w-6" />
                  Home
                </Link>
              </Button>

              <Button variant="ghost" className="w-full justify-start text-lg">
                <IoSearchOutline className="mr-3 h-6 w-6" fill="true" />
                Stories
              </Button>

              <CreatePostAlert />

              <Button variant="ghost" className="w-full justify-start text-lg">
                <Link href={"/note"} className="flex">
                  <CgNotes className="mr-3 h-6 w-6" />
                  Notes
                </Link>
              </Button>

              <Button variant="ghost" className="w-full justify-start text-lg">
                <Link href={`/inbox/${user?._id}`} className="flex">
                  <BiMessageRoundedDots className="mr-3 h-6 w-6" />
                  Messages
                </Link>
              </Button>

              <Button variant="ghost" className="w-full justify-start text-lg">
                <FaRegHeart className="mr-3 h-6 w-6" />
                Notification
              </Button>

              <Button variant="ghost" className="w-full justify-start text-lg">
                <MdOutlineSettings className="mr-3 h-6 w-6" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

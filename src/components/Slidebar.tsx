'use client'

import { cn } from "@/lib/utils";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
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
import { FaRegBookmark } from "react-icons/fa";

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
                <Link href={"/"} className="flex items-center gap-2">
                  <AiOutlineHome className="mr-3 h-6 w-6" />
                  <p>Home</p>
                </Link>
              </Button>


              <Button variant="ghost" className="w-full justify-start text-lg">
                <Link href={"/note"} className="flex items-center gap-2">
                  <CgNotes className="mr-3 h-6 w-6" />
                  <p>Notes</p>
                </Link>
              </Button>

              <CreatePostAlert />

              

              <Button variant="ghost" className="w-full justify-start text-lg">
                <Link href={`/inbox`} className="flex items-center gap-2">
                  <BiMessageRoundedDots className="mr-3 h-6 w-6" />
                  <p>Messages</p>
                </Link>
              </Button>

              <Button variant="ghost" className="w-full justify-start text-lg ">
                <Link href={`/live`} className="flex items-center gap-2">
                <IoVideocamOutline className="mr-3 h-8 w-8" />
                <p>Live</p>
                </Link>
              </Button>

              <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href={`/saved`} className="flex items-center gap-2">
                <FaRegBookmark className="mr-3 h-6 w-6" />
                <p>Saved</p>
                </Link>
              </Button>

              <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href={`#`} className="flex items-center gap-2">
                <MdOutlineSettings className="mr-3 h-7 w-7 gap-2" />
                <p>Settings</p>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

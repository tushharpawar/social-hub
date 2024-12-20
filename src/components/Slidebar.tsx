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
import HomeNavbar from "./SearchBar";
import RightSlidebarHeader from "./right-slidebar/RightSlidebar";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const {data:session} = useSession()
  const user:User = session?.user as User
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar for md and larger screens */}
      <div className="hidden md:block">
        <div className="md:w-[15%] lg:w-[20%] text-md fixed border-gray-600 border-r space-y-4 py-4 min-h-screen z-50">
          <div className="px-6 py-2">
            <h1 className="text-2xl font-semibold tracking-tight">Social-Hub</h1>
          </div>

          <div className="px-8 py-2 space-y-3">
            <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href="/" className="flex items-center gap-2">
                <AiOutlineHome className="mr-3" />
                <p className="hidden lg:block">Home</p>
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href="/note" className="flex items-center gap-2">
                <CgNotes className="mr-3 h-8 w-8" />
                <p className="hidden lg:block">Notes</p>
              </Link>
            </Button>

            <CreatePostAlert />

            <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href="/inbox" className="flex items-center gap-2">
                <BiMessageRoundedDots className="mr-3 h-8 w-8" />
                <p className="hidden lg:block">Messages</p>
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href="/live" className="flex items-center gap-2">
                <IoVideocamOutline className="mr-3 h-8 w-8" />
                <p className="hidden lg:block">Live</p>
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href="/settings" className="flex items-center gap-2">
                <MdOutlineSettings className="mr-3 h-8 w-8" />
                <p className="hidden lg:block">Settings</p>
              </Link>
            </Button>
          </div>
        </div>
      </div>


      {/* Tab bar for small screens */}
      <div className="fixed bottom-0 w-full bg-white border-t dark:bg-black dark:border-zinc-700 border-gray-300 sm:hidden flex justify-around py-2 z-10">
        <Link href="/" className="flex flex-col items-center">
          <AiOutlineHome className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/note" className="flex flex-col items-center">
          <CgNotes className="h-6 w-6" />
          <span className="text-xs">Notes</span>
        </Link>

        <Link href="/inbox" className="flex flex-col items-center">
          <BiMessageRoundedDots className="h-6 w-6" />
          <span className="text-xs">Messages</span>
        </Link>

        <Link href="/live" className="flex flex-col items-center">
          <IoVideocamOutline className="h-6 w-6" />
          <span className="text-xs">Live</span>
        </Link>

        <Link href="/settings" className="flex flex-col items-center">
          <MdOutlineSettings className="h-6 w-6" />
          <span className="text-xs">Settings</span>
        </Link>
      </div>

      {/* Top bar for small screens */}
    </div>
  );
}


// <Link href="/saved" className="flex flex-col items-center">
// <FaRegBookmark className="h-6 w-6" />
// <span className="text-xs">Saved</span>
// </Link>

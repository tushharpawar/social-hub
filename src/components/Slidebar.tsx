import { cn } from "@/lib/utils";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineSettings } from "react-icons/md";
import React from "react";
import Link from "next/link";
import CreatePostAlert from '../components/create-post/CreatePostAlert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn(className)}>
      <div className="w-[20%] text-md fixed border-r-2 border-gray-400 space-y-4 py-4 min-h-screen">
        <div className="px-6 py-2 ">
          <h1 className="px-4 text-2xl font-semibold tracking-tight">
            Social-Hub
          </h1>
        </div>

        <div className="px-8 py-2">
          <div className="space-y-3 ">
          <Link href={'/Home'}>
            <Button variant="ghost" className="w-full justify-start text-lg">
              <AiOutlineHome className="mr-3 h-6 w-6" />
              Home
            </Button>
            </Link>

            <Button variant="ghost" className="w-full justify-start text-lg">
              <IoSearchOutline className="mr-3 h-6 w-6" fill="true" />
              Stories
            </Button>

            


          <CreatePostAlert/>


            

            <Button variant="ghost" className="w-full justify-start text-lg">
              <CgNotes className="mr-3 h-6 w-6" />
              Notes
            </Button>

            <Button variant="ghost" className="w-full justify-start text-lg">
              <BiMessageRoundedDots className="mr-3 h-6 w-6" />
              Messages
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
  );
}

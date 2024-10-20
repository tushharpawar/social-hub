import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Button} from "@nextui-org/react";
import { Separator } from "@/components/ui/separator"
import { MdOutlineMoreVert } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function NoteCard({username,avatar,content}:any) {

  return (
    <Card className="w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5 my-2">
        <Avatar className="h-10 w-10">
              <AvatarImage src={avatar} />
            </Avatar>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{username}</h4>
            {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
          </div>
        </div>
        <DropdownMenu>
                <DropdownMenuTrigger ><MdOutlineMoreVert className="h-5 w-5"/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Save</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 focus:text-red-500">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
      </CardHeader>
      <CardBody className="p-6 text-sm text-default-400 border border-input rounded-md">
        <p>
            {content}
        </p>
      </CardBody>

      <div className="flex items-center justify-between w-full px-2 mt-5">
              <div className="flex items-center gap-5">
              <FaRegHeart className="h-5 w-5 cursor-pointer"/>
              <FaRegComment className="h-5 w-5 cursor-pointer"/>
              <IoPaperPlaneOutline className="h-5 w-5 cursor-pointer"/>
              </div>
              <div className="">
              <FaRegBookmark className="h-5 w-5 cursor-pointer"/>
              </div>
            </div>
      <Separator className="my-4"/>
    </Card>
  );
}

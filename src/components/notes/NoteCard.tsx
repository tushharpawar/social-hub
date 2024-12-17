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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//TODO: Delete note functionality.

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
                  <DropdownMenuItem className="text-red-500 focus:text-red-500">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
      </CardHeader>
      <CardBody className="p-6 text-sm text-default-400 border border-input rounded-md">
        <p>
            {content}
        </p>
      </CardBody>
      <Separator className="my-4"/>
    </Card>
  );
}

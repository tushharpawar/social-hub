import React from "react";
import {Card, CardBody,} from "@nextui-org/react";
import { Separator } from "@/components/ui/separator"
import { MdOutlineMoreVert } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import axios from "axios";
import {  useToast } from "../ui/use-toast";


export default function NoteCard({username,avatar,content,noteId}:any) {

  const {data:session} = useSession()
  const user:User = session?.user as User

  const {toast} = useToast()

  const onDelete =async () =>{
    try {
      const response = await axios.post(`/api/v1/delete-note/${noteId}`)

      if(response.status == 201){
        toast({
          title:'Note deleted!'
        })
      }else{
        toast({
          title:'Something went wrong.Please try again later.'
        })
      }
    } catch (error) {
      toast({
        title:'Something went wrong.Please try again later.'
      })
    }
  }

  return (
    <div className="w-[340px]">
      <div className="flex justify-between">
        <Link href={`/${username}`} className="flex gap-5 my-2">
        <Avatar className="h-10 w-10">
              <AvatarImage src={avatar} />
            </Avatar>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{username}</h4>
            {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
          </div>
        </Link>

        <DropdownMenu>
                <DropdownMenuTrigger ><MdOutlineMoreVert className="h-5 w-5"/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href={`/${username}`}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                  {
                    user?.username == username && <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer" onClick={onDelete}>Delete</DropdownMenuItem>
                  }
                </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="p-6 text-sm text-default-400 border border-input rounded-md">
        <p>
            {content}
        </p>
      </div>
      <Separator className="my-4"/>
    </div>
  );
}

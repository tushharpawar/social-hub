import { ComponentProps } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"



export function CommentBox() {

  return (
    <div className="h-[40vh] w-full bg-gray-500 mx-5 mb-20">
    <ScrollArea className="h-[20vh] w-full ">
      <div className="flex flex-col gap-2 p-4 pt-0">
      </div>
    </ScrollArea>
    </div>
  )
}


export default CommentBox
import { ComponentProps } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"


export function CommentBox() {

  return (
    <div className="h-[40vh] w-full mx-5 border-gray-100 rounded-md">
    <ScrollArea className="h-[20vh] w-full ">
      <div className="flex flex-col p-4">
        <h1 className=" font-medium">Comments</h1>
      </div>
    </ScrollArea>
    </div>
  )
}

export default CommentBox
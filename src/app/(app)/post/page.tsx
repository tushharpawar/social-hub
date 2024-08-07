"use client"

import React from "react";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@/components/ui/skeleton";
import { MdOutlineMoreVert } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const page = () => {
  return (
    <div className="w-full max-w-md min-h-screen ">
      <div className="h-auto flex justify-center items-center mt-10">
        <div className="flex items-center justify-center px-5 py-5">
          <div className="max-w-[300px] w-full flex items-center gap-3 flex-col ">
            <div className="flex items-center gap-10">
              <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-[170px]" />
              </div>
              </div>
              <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger ><MdOutlineMoreVert /></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 focus:text-red-500">Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            </div>

            <Skeleton className="h-[300px] w-[300px] space-y-5" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

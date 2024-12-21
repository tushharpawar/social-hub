'use client'

import React from "react";
import Link from "next/link";
import CreatePostAlert from "../components/create-post/CreatePostAlert";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { NotebookPen } from 'lucide-react';
import { House } from 'lucide-react';
import { MessageCircleMore } from 'lucide-react';
import { Radio } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { Settings } from 'lucide-react';

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
                <House className="mr-3 h-8 w-8" />
                <p className="hidden lg:block">Home</p>
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href="/note" className="flex items-center gap-2">
                <NotebookPen className="mr-3 h-8 w-8" />
                <p className="hidden lg:block">Notes</p>
              </Link>
            </Button>

            <CreatePostAlert />

            <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href="/inbox" className="flex items-center gap-2">
                <MessageCircleMore className="mr-3 h-8 w-8" />
                <p className="hidden lg:block">Messages</p>
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href="/live" className="flex items-center gap-2">
                <Radio className="mr-3 h-8 w-8" />
                <p className="hidden lg:block">Live</p>
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start text-lg">
            <Link href="/saved" className="flex items-center gap-2">
            <Bookmark className="mr-3 h-8 w-8" />
            <span className="hidden lg:block">Saved</span>
            </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start text-lg">
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="mr-3 h-8 w-8" />
                <p className="hidden lg:block">Settings</p>
              </Link>
            </Button>
          </div>
        </div>
      </div>


      {/* Tab bar for small screens */}
      <div className="fixed bottom-0 w-full bg-white border-t dark:bg-black dark:border-zinc-700 border-gray-300 sm:hidden flex justify-around py-2 z-10">
        <Link href="/" className="flex flex-col items-center">
          <House className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/note" className="flex flex-col items-center">
          <NotebookPen className="h-6 w-6" />
          <span className="text-xs">Notes</span>
        </Link>

        <Link href="/inbox" className="flex flex-col items-center">
          <MessageCircleMore className="h-6 w-6" />
          <span className="text-xs">Messages</span>
        </Link>

        <Link href="/live" className="flex flex-col items-center">
          <Radio className="h-6 w-6" />
          <span className="text-xs">Live</span>
        </Link>

        <Link href="/saved" className="flex flex-col items-center">
          <Bookmark className="h-6 w-6" />
          <span className="text-xs">Saved</span>
        </Link>
      </div>

      {/* Top bar for small screens */}
    </div>
  );
}


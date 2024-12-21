'use client'
import { HeroHighlight } from "@/components/ui/hero-highlight";
import HomePage from "./aceternity/HomePage";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import HomePageAfterLogin from "@/components/home/Home";
import RightSlidebarHeader from "@/components/right-slidebar/RightSlidebar";
import Slidebar from '@/components/Slidebar'
import HomeNavbar from "@/components/SearchBar";
import CreatePostAlert from "@/components/create-post/CreatePostAlert";
import { User } from "next-auth";
import { Loader2 } from "lucide-react";

export default function Home() {
    // const session = await getSession()
    
  const {data:session,status} = useSession()

  if(status ==='loading'){
    return <div className="w-full flex justify-center m-3"><Loader2 className="mr-2 h-10 w-10 animate-spin"></Loader2><p className="text-lg sm:text-2xl">Loading..</p></div>
  }

  return (
    <>
    <main className={`w-full min-h-screen flex`}>
      {
        status === 'authenticated' ? (
          <>
          <div className='sm:w-[25%]'>
          <Slidebar></Slidebar>
         </div>
          <div className="absolute top-0 w-full bg-white border-gray-300 dark:bg-black dark:border-zinc-700 flex justify-around py-2 z-50 sm:hidden">
          <CreatePostAlert/>
          <HomeNavbar/>   
          <RightSlidebarHeader/>     
        </div>
        <HomePageAfterLogin></HomePageAfterLogin>
          </>
        ) :(
          <HomePage/>
        )
      }

    </main>
    </>
)}

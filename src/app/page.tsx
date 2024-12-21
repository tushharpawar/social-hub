'use client'
import { HomePage } from "./aceternity/HomePage";
import { useSession, signIn, signOut } from "next-auth/react";
import HomePageAfterLogin from "@/components/home/Home";
import RightSlidebarHeader from "@/components/right-slidebar/RightSlidebar";
import Slidebar from '@/components/Slidebar'
import HomeNavbar from "@/components/SearchBar";
import CreatePostAlert from "@/components/create-post/CreatePostAlert";
import { User } from "next-auth";


export default function Home() {

  const {data:session} = useSession()
  const user:User = session?.user as User 
  
  return (
    <>
    <main className={`w-full min-h-screen flex`}>
      {
        session ? (
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
  );
}

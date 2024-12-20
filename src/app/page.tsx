'use client'
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { HomePage } from "./aceternity/HomePage";
import { getSession } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import HomePageAfterLogin from "@/components/home/Home";
import RightSlidebarHeader from "@/components/right-slidebar/RightSlidebar";
import Slidebar from '@/components/Slidebar'
import { useSelector } from "react-redux";
import HomeNavbar from "@/components/SearchBar";


//Notes::::
//Leaving on 13-11
//TODO: Add forget password functionality
//FIXME: Make website reponsive
//FIXME: Add home page based on if user logged in or not
//FIXME: Add real email service

export default function Home() {
  
  return (
    <>
    <main className={`w-full min-h-screen flex`}>
        <div className='sm:w-[25%]'>
          <Slidebar></Slidebar>
         </div>
          <div className="absolute top-0 w-full bg-white border-gray-300 dark:bg-black dark:border-zinc-700 flex justify-around py-2 z-50 sm:hidden">
          <HomeNavbar/>   
          <RightSlidebarHeader/>     
        </div>
        <HomePageAfterLogin></HomePageAfterLogin>
    </main>
    </>
  );
}

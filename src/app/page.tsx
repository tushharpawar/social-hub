'use client'
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { HomePage } from "./aceternity/HomePage";
import { getSession } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import HomePageAfterLogin from "@/components/home/Home";
import RightSlidebarHeader from "@/components/right-slidebar/RightSlidebar";
import Slidebar from '@/components/Slidebar'


//Notes::::
//Leaving on 13-11
//TODO:Add button for like which creates animation on when liked from magic ui (Component name:Cool button)
//TODO: Add Video call, audio call & live stream
//TODO: Add story functionality
//TODO: Add like, comment functionality in notes
//TODO: Add isSeen model in db and when user visit,like or see the post on feed update it
//      in db that post should not be fatched again on feed 
//TODO: Add setting for dark theme and logout button
//TODO: Add infinite scroll on feed
//TODO: Add forget password functionality

//FIXME: Make website reponsive
//FIXME: Optimise post and like functionality
//FIXME: Optimise react-redux
//FIXME: Add home page based on if user logged in or not
//FIXME: Add real email service

export default function Home() {
    const session = useSession()
  return (
    <>
    <main className="w-full min-h-screen flex items-center justify-center">
      <HomePageAfterLogin></HomePageAfterLogin>
    </main>
    </>
  );
}

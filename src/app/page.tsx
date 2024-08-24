'use client'
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { HomePage } from "./aceternity/HomePage";
import { getSession } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import HomePageAfterLogin from "@/components/home/Home";
import RightSlidebarHeader from "@/components/right-slidebar/RightSlidebar";


//Notes::::
// update File upload component from acertanity ui in create post
//Add button for like which creates animation on when liked from magic ui (Component name:Cool button)
//Add animated follow button from magic ui (Component name:Animated subscribe button)



export default function Home() {
    const session = useSession()
  return (
    <>
    <main className=" w-full min-h-screen flex items-center justify-center">
    <HomePageAfterLogin></HomePageAfterLogin>
    </main>
    </>
  );
}

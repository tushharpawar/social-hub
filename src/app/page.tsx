'use client'
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { HomePage } from "./aceternity/HomePage";
import { getSession } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import HomePageAfterLogin from "@/components/home/Home";
import RightSlidebarHeader from "@/components/right-slidebar/RightSlidebarHeader";





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

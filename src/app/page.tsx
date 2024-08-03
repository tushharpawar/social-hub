'use client'
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { HomePage } from "./aceternity/HomePage";
import { getSession } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";


export default function Home() {
    
  return (
    <>
    <main className=" w-full min-h-screen">
      
         <HomePage></HomePage>
      
    </main>
    </>
  );
}

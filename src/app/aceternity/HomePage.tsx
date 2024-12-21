"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Navbar from "../../components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className=" min-h-screen w-full">
      
      <HeroHighlight className="w-full">
       <Navbar/>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-xl mt-10 px-4 md:text-xl lg:text-3xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Welcome to <Highlight>Social-Hub</Highlight>.
        <p>Share what you&apos;re into with the people who get you.</p>

        <p className="text-base mt-8  dark:text-gray-300 text-gray-600">
      Post moments that matter, like, comment, and share your favorites. Connect in real-time with chat and live streams. 
      </p>

        <p className="text-base mt-4  dark:text-gray-300 text-gray-600">
        Social-Hub is where your passions find a voice and your connections come to life. Join the community and share your world today.
        </p>
      </motion.h1>

      

      <div className="w-full mt-8 flex justify-center items-center">

      <div className="flex gap-5 font-bold ">
            <div ><Button  className=" text-md "><Link href={'/sign-in'}>Log in</Link></Button></div>
            <div ><Button variant="outline" className=" text-md "><Link href={'/sign-up'}>Sign up</Link></Button></div>
          </div>
      </div>

    </HeroHighlight>
    </div>
  );
}

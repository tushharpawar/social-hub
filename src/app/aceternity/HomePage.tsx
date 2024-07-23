"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { CarouselPlugin } from "@/app/shadcn/autoCard";
import Navbar from "../../components/Navbar";

export function HomePage() {
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
      </motion.h1>

      <div className="w-full mt-5 flex justify-center items-center">

      {/* image carousel from shadcn */}
      <CarouselPlugin></CarouselPlugin>
      
      </div>

    </HeroHighlight>
    </div>
  );
}

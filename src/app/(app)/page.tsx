'use client'
import HomePageAfterLogin from "@/components/home/Home";
import Slidebar from '@/components/Slidebar'

export default function Page() {
  
  return (
    <>
    <main className="w-full min-h-screen flex items-center justify-center">
        <div className='sm:w-[25%]'>
            <Slidebar></Slidebar>
         </div>
      <HomePageAfterLogin></HomePageAfterLogin>
    </main>
    </>
  );
}

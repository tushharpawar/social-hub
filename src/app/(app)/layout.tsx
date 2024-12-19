'use client'

import Slidebar from '@/components/Slidebar'
import { useSelector } from 'react-redux';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

    const {theme} = useSelector((store:any)=>store.theme)

  return (
    <>
        <main className='w-full min-h-screen flex'>
        <div className={`w-[25%]`}>
            <Slidebar></Slidebar>
        </div>
        {children}
        </main>
    </>
  );
}
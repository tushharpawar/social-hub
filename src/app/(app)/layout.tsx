'use client'

import Slidebar from '@/components/Slidebar'
import { useSelector } from 'react-redux';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <>
        <main className='w-full h-screen flex'>
        <div className={`sm:w-[25%]`}>
            <Slidebar></Slidebar>
        </div>
        {children}
        </main>
    </>
  );
}
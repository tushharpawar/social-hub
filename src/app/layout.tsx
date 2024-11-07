import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from '../context/AuthProvider'
import { Toaster } from "@/components/ui/toaster"
import Slidebar from '@/components/Slidebar'
import { store } from '@/app/redux/store'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router';
import RightSlidebarHeader from "@/components/right-slidebar/RightSlidebar";
import { StoreProvider } from "./redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social-Hub",
  description: "An social media application!",
};


export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <AuthProvider>
      <body className={inter.className}>
        <main className="flex">
        <div className='w-[25%]'>
        <Slidebar></Slidebar>
        </div>
          <StoreProvider>
            {children}
          </StoreProvider>
          </main>
        <Toaster />

      </body>
      </AuthProvider>
    </html>
  );
}

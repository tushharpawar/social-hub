import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from '../context/AuthProvider'
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers";
import Slidebar from '@/components/Slidebar'
import RightSlidebarHeader from "@/components/right-slidebar/RightSlidebarHeader";

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
    <html lang="en">
      <AuthProvider>
      <body className={inter.className}>
        <Providers>
        
        <main className="flex">
        <div className='w-[25%]'>
        <Slidebar></Slidebar>
        </div>
          {children}

          </main>
        <Toaster />
        </Providers>
      </body>
      </AuthProvider>
    </html>
  );
}

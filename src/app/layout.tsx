import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from '../context/AuthProvider'
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers";

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
        <main>{children}</main>
        <Toaster />
        </Providers>
      </body>
      </AuthProvider>
    </html>
  );
}

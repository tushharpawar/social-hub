import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from '../context/AuthProvider'
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
      <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}

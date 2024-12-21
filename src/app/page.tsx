'use client';
import React, { Suspense, useMemo } from 'react';
import { useSession } from 'next-auth/react';

// Dynamically import components to reduce initial bundle size
const HomePage = React.lazy(() => import('../app/aceternity/HomePage'));
const HomePageAfterLogin = React.lazy(() => import('@/components/home/Home'));
const RightSlidebarHeader = React.lazy(() => import('@/components/right-slidebar/RightSlidebar'));
const Slidebar = React.lazy(() => import('@/components/Slidebar'));
const HomeNavbar = React.lazy(() => import('@/components/SearchBar'));
const CreatePostAlert = React.lazy(() => import('@/components/create-post/CreatePostAlert'));

export default function Home() {
  const { data: session } = useSession();

  // Memoize the layout to avoid unnecessary re-renders when session changes
  const loggedInLayout = useMemo(() => (
    <>
      <div className="sm:w-[25%]">
        <Suspense fallback={<div></div>}>
          <Slidebar />
        </Suspense>
      </div>
      <div className="w-full bg-white border-gray-300 dark:bg-black dark:border-zinc-700 flex justify-around py-2 z-50 sm:hidden">
        <Suspense fallback={<div></div>}>
          <CreatePostAlert />
        </Suspense>
        <Suspense fallback={<div></div>}>
          <HomeNavbar />
        </Suspense>
        <Suspense fallback={<div></div>}>
          <RightSlidebarHeader />
        </Suspense>
      </div>
      <Suspense fallback={<div></div>}>
        <HomePageAfterLogin />
      </Suspense>
    </>
  ), []);

  const loggedOutLayout = useMemo(() => (
    <Suspense fallback={<div>Loading HomePage...</div>}>
      <HomePage />
    </Suspense>
  ), []);

  return (
    <main className="w-full min-h-screen flex">
      {session ? loggedInLayout : loggedOutLayout}
    </main>
  );
}

'use client'

import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { setTheme } from '@/app/redux/themeSlice';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { setAuthUser } from '@/app/redux/authSlice';

const Page = () => {

    const {data:session} = useSession()
    const user:User = session?.user as User
    console.log(user?._id);

    const dispatch = useDispatch()
    const router =useRouter()
    
    
    const onChange= () =>{
        if(theme == 'dark'){
            console.log('removed dark');
            dispatch(setTheme('light'))
        }else{
            console.log('dark');
            dispatch(setTheme('dark'))
        }
    }

    useEffect(() => {      
        
    }, []);

    const handleLogout = async () => {
        await signOut({redirect:false});
        dispatch(setAuthUser(''))
        localStorage.removeItem('userSession');  // Example of clearing localStorage
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT';  // Example of clearing a cookie
        router.push('/sign-in')
      };

    const {theme} = useSelector((store:any)=>store.theme)

  return (
    <div className="h-screen">
        <p className=' text-xl font-bold m-5'>Settings</p>

        <div className="w-full m-6">
        <div className="w-full p-4 flex items-center justify-between rounded border  border-zinc-100 dark:border-zinc-800  gap-10">
        <p className='text-lg font-semibold'> Enable Dark Mode </p>
        <Switch 
        checked={theme ==='dark' ? true : false}
        onCheckedChange={onChange}
        className={`${theme == 'dark' ? 'dark:' : 'light'}` }
        />
        </div>

        <div className="w-full p-4 flex items-center justify-between rounded border  border-zinc-100 dark:border-zinc-800  gap-10 my-3">
        <Link href={`/forget-password/${user?._id}`} className='text-lg font-semibold'> Change Password </Link>
        </div>

        <div className="w-full p-4 flex items-center justify-between rounded border  border-zinc-100 dark:border-zinc-800  gap-10 my-3">
        <p className='text-lg font-semibold'> Logout </p>
        <MdLogout size={24} onClick={handleLogout} className=' cursor-pointer'/>
        </div>
        </div>

        

    </div>
  )
}

export default Page
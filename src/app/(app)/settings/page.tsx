'use client'

import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { setTheme } from '@/app/redux/themeSlice';
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { setAuthUser } from '@/app/redux/authSlice';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { setPosts } from '@/app/redux/postSlice';
import { setIsClickedOnEditProfile } from '@/app/redux/updateAvatarSlice';
import { setComment } from '@/app/redux/commentSlice';


const Page = () => {

    const {data:session} = useSession()
    const user:User = session?.user as User
    console.log(user?._id);

    const dispatch = useDispatch()
    const router =useRouter()

    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)
    const {toast} = useToast()
    
    const onChange= () =>{
        if(theme == 'dark'){
            console.log('removed dark');
            dispatch(setTheme('light'))
        }else{
            console.log('dark');
            dispatch(setTheme('dark'))
        }
    }

    const handleOldPasswordInput = (e)=>{
      setOldPassword(e.target.value)
    }
    const handleNewPasswordInput = (e)=>{
      setNewPassword(e.target.value)
    }

    const handleConfirmPasswordInput = (e)=>{
      setConfirmPassword(e.target.value)
    }

    const handleChangePassword =async ()=>{
      if(oldPassword && (newPassword == confirmPassword)){
        setLoading(true)
        try {
          const response = await axios.post(`api/v1/change-password`,{
            oldPassword:oldPassword,
            newPassword:confirmPassword
          })

          if(response.status==201){
            setMessage(response.data.message)
            toast({
              title:"Password changed successfully!"
            })
          }
          if(response.status==400 || response.status==401 || response.status==403 || response.status==404 || response.status==500){
            setMessage(response.data.message)
            toast({
              title:response.data.message,
              variant:"destructive",
            })
          }
          setLoading(false)
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setOpen(false)
        } catch (error) {
          setMessage("Internal server error.")
          toast({
            title:"Something went wrong.",
            description:"Please try again later",
            variant:'destructive'
          })
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setOpen(false)
        }finally{
          setLoading(false)
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setMessage('')
          setOpen(false)
        }  
      }else if(newPassword !== confirmPassword){
        setMessage("New password and Confirm password must be same.")
            toast({
              title:"New password and Confirm password must be same.",
              variant:"destructive",
        })
      }
    }
    
    const handleLogout = async () => {
        await signOut({redirect:false});
        dispatch(setAuthUser(''))
        dispatch(setPosts([]))
        dispatch(setIsClickedOnEditProfile(false))
        dispatch(setComment([]))

        localStorage.removeItem('userSession');  // Example of clearing localStorage
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT';  // Example of clearing a cookie
        router.push('/sign-in')
        dispatch(setTheme('light'))
      };

    const {theme} = useSelector((store:any)=>store.theme)

  return (
    <div className="h-screen">
        <p className='text-xl font-bold m-5'>Settings</p>

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
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className='text-lg font-semibold'>Change Password</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Change Password</SheetTitle>
              <SheetDescription>
                Your new password and confirm password must be same to change password.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Old Password
                </Label>
                <Input type='password' placeholder='Enter new password' value={oldPassword} className="col-span-3" onChange={handleOldPasswordInput}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  New Password
                </Label>
                <Input type='password' placeholder='Enter new password' value={newPassword} className="col-span-3" onChange={handleNewPasswordInput}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Confirm Password
                </Label>
                <Input type='password' placeholder='Enter confirm password' value={confirmPassword} className="col-span-3" onChange={handleConfirmPasswordInput}/>
              </div>
            </div>
            <SheetFooter>
                <Button type="submit" disabled={loading} onClick={handleChangePassword}>
                {
                  loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                    Please wait
                    </>
                  ) : ('Change Password')
                }
                </Button>
            </SheetFooter>
          </SheetContent>
          
        </Sheet>
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
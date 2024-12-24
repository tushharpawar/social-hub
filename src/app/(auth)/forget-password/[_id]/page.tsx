"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/app/schemas/signInSchema";
import { signIn, useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useParams } from "next/navigation";
import { set } from "mongoose";

const Page = () => {

    const [isSubmitting,setIsSubmitting] = useState(false);
	  const { toast } = useToast();
    const router = useRouter();
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    const [loading,setLoading] = useState(false)
    const params = useParams()

  //sign in using credentials from nextjs

  const user_id = params._id
  	const handleSubmit = async() => {
      setIsSubmitting(true)
        if(newPassword !== confirmPassword){
            toast({
                title:"New Password and Confirm Password should be same.",
                variant:'destructive'
            })
            setIsSubmitting(false)
            return
        }

        try{
            const response = await axios.post(`/api/v1/forget-password/${user_id}`,{
              newPassword
            })
            if(response.status === 200){
              toast({
                title:"Password reset successfully!"
              })
              router.replace('/sign-in')
              setIsSubmitting(false)
            }

        }catch(error){
          if(error.status === 400){
            toast({
              title:"New Password required!"
            })
            setIsSubmitting(false)
          }else{
            toast({
              title:"Internal server error!"
            })
            setIsSubmitting(false)
          }
        }

    setIsSubmitting(false)
	};

  const handleNewPasswordInput=(e)=>{
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordInput=(e)=>{
    setConfirmPassword(e.target.value)
  }

	return (
    <div className=" min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-lg font-extrabold tracking-tight lg:text-4xl">
            Social-hub
          </h1>
        </div>
        <div className="text-center">
          <p className=" text-md font-medium text-gray-600">
            Reset Password
          </p>
        </div>

              <div className="flex gap-4">
                <Label className="text-center">
                  New Password
                </Label>
                <Input type='password' required placeholder='Enter New Password' value={newPassword} className="col-span-3" onChange={handleNewPasswordInput}/>
              </div>


              <div className="flex gap-4">
                <Label className="text-center">
                  Confirm Password
                </Label>
                <Input type='password' required placeholder='Enter Confirm Password' value={confirmPassword} className="col-span-3" onChange={handleConfirmPasswordInput}/>
              </div>



            <Button disabled={isSubmitting} className="w-full text-md" onClick={handleSubmit}>
				{
					isSubmitting ? (
						<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
						Please wait
						</>
					) : ('Reset Password')
				}
			</Button>
      </div>
    </div>
  );
};

export default Page;
'use client'

import React,{useState} from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button";
import axios ,{AxiosError} from "axios";
import { useParams, useRouter } from "next/navigation";
import {z} from 'zod' 
import { verifyCodeSchema } from "@/app/schemas/verifyCodeSchema";
import { toast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Page = () => {

  const [isSubmitting,setIsSubmitting] = useState(false)

  //Get id from the url
  const params = useParams<{_id:string}>()
  const router = useRouter()

  //using from from react-hook form and validating data from zod.

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver:zodResolver(verifyCodeSchema)
  })

  //Sending request to api endpoint for validate verify-code

  const onSubmit  = async(data:z.infer<typeof verifyCodeSchema>)=>{
    setIsSubmitting(true)
        try {
          const _id = params._id.toString()
         const response = await axios.post(`/api/v1/verify-code/${_id}`,{
            code:data.code
          })
  
          toast({
            title:"Success",
            description:response.data.message
          })
          setIsSubmitting(false)
          router.replace(`/avatar/${params._id}`)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          toast({
            title: 'Verification Failed',
            description:
              axiosError.response?.data.message ??
              'An error occurred. Please try again.',
            variant: 'destructive',
          });
          console.log(error);
          setIsSubmitting(false)
        }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-sm font-extrabold tracking-tight lg:text-4xl">
            Social-hub
          </h1>
        </div>
        <div className="text-center">
          <p className=" text-md font-medium text-gray-600">
            We have sent you a 6-digit verification code on your email.
          </p>
        </div>

      {/* form from shadcn-ui */}

      <div className="w-full items-center flex justify-center">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
          Please wait
          </>
        ):(
          'Submit'
        )}
        </Button>
      </form>
    </Form>       
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/app/schemas/signInSchema";
import { signIn, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label";
import axios from "axios";

const Page = () => {

    const [isSubmitting,setIsSubmitting] = useState(false);
    
	  const { toast } = useToast();

	  const router = useRouter();
    const [email,setEmail] = useState('')
        const [message,setMessage] = useState('')
        const [loading,setLoading] = useState(false)
        const [open,setOpen] = useState(false)

	//implementing zod .

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver:zodResolver(signInSchema),
	});

  //sign in using credentials from nextjs

  	const onSubmit = async(data:z.infer<typeof signInSchema>) => {
      setIsSubmitting(true)

       const result = await signIn("credentials",{
            redirect:false,
            identifier:data.identifier,
            password:data.password
          })

          if(!result?.ok){

              toast({
                title:"Login failed",
                description:"Incorrect username or password",
                variant:"destructive"
              })
              
      }else{
              router.replace('/')
          }

    setIsSubmitting(false)
	};

  const handleEmailInput=(e)=>{
    setEmail(e.target.value)
  }

  const handleSubmitEmail =async ()=> {
      try {
        setLoading(true)

        if(email === ''){
          toast({
            title:"Please enter email!",
            variant:"destructive"
          })
          setOpen(false)
          setLoading(false)
          setEmail('')
          return
        }

        const response = await axios.post(`/api/v1/get-user/${email}`)

        if(response.status === 200){
          toast({
            title:"We have sent you a 6 digit code on your email.",
            description:"Please verify your account."
          })
          router.replace(`/verify-email/${response.data.message}`)
        }
        setLoading(false)
      } catch (error) {
        if(error.response && error.response.status === 400){
          toast({
            title:"User not found with this email or username.",
            variant:"destructive"
          })
          setLoading(false)
        }else{
          toast({
            title:"Internal server error.",
            variant:"destructive"
          })
          setLoading(false)
        }
      }finally{
        setEmail('')
      }
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
            Sign in to see photos and videos from your friends.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-md">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full text-md">
				{
					isSubmitting ? (
						<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
						Please wait
						</>
					) : ('Sign in')
				}
			</Button>

          </form>
        </Form>

        <div className="text-center mt-4">    
          <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className='text-lg'><p className="text-blue-600 hover:text-blue-800">Forget password</p>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Forget Password</SheetTitle>
              <SheetDescription>
                Enter your email address.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Email
                </Label>
                <Input type='email' placeholder='Enter email' value={email} className="col-span-3" onChange={handleEmailInput}/>
              </div>
            </div>
            <SheetFooter>
                <Button type="submit" disabled={loading} onClick={handleSubmitEmail}>
                {
                  loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                    Please wait
                    </>
                  ) : ('Submit')
                }
                </Button>
            </SheetFooter>
          </SheetContent>
          
        </Sheet>
        </div>
        <div className="text-center mt-4">
          <p>
            Not a member?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
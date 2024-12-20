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

const Page = () => {

    const [isSubmitting,setIsSubmitting] = useState(false);
    
	  const { toast } = useToast();

	  const router = useRouter();

	//implementing zod .

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver:zodResolver(signInSchema),
	});

  //sign in using credentials from nextjs

  	const onSubmit = async(data:z.infer<typeof signInSchema>) => {
      setIsSubmitting(true)
		 const result = await signIn("credentials",{
      redirect:true,
      identifier:data.identifier,
      password:data.password
    })

    if(result?.error){
      toast({
        title:"Login failed",
        description:"Incorrect username or password",
        variant:"destructive"
      })
    }

    if(result?.url){      
      router.replace('/')
    }
    setIsSubmitting(false)
	};

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
'use client'
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod" 

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const Page = () => {

    const form = useForm();

      const onSubmit =()=>{}

        return (

        <div className=" min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-sm font-extrabold tracking-tight lg:text-4xl">Social-hub</h1>
                </div>
                <div className="text-center">
                    <p className=" text-md font-medium text-gray-600">Sign up to see photos and videos from your friends.</p>
                </div>
                <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="full name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Sign up</Button>
      </form>
        </Form>
            </div>
           
        </div>

        )
}

export default Page
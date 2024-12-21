"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/app/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300);

  const { toast } = useToast();

  const router = useRouter();

  //implementing zod .

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
    },
  });

  //Checking for username's uniqueness

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/v1/check-username-unique?username=${username}`
          );

          setUsernameMessage(response.data.message);
        } catch (error: any) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error while checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  //Hitting api endpoint for sign-up user

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`api/v1/sign-up`, data);

      toast({
        title: "Signup Successful!🎉",
        description: "We have sent you 6-digit code on your email.If you didn't recieved in inbox, check spam folder.",
      });

      router.replace(`/verify/${response.data.newUser._id}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in signup user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;

      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen h-auto flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-lg font-extrabold tracking-tight lg:text-4xl">
            Social-hub
          </h1>
        </div>
        <div className="text-center">
          <p className=" text-md font-medium text-gray-600">
            Sign up to see photos and videos from your friends.
          </p>
        </div>

        {/* using form from shadcn ui  */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                        e.target.value === "" && setUsernameMessage("")
                      }}
                    />
                  </FormControl>

                  {/* display message for username's uniqueness */}

                  {isCheckingUsername && <Loader2 className=" animate-spin" />}
                  <p
                    className={`text-sm ${
                      usernameMessage === "Username is unique."
                        ? " text-green-500"
                        : " text-red-600"
                    }`}
                  >
                    {usernameMessage}
                  </p>
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
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {/* loading animation if form will be submitting */}
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                  Please wait
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;

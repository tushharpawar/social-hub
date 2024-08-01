"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/app/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm();

  const onGoogleLogin = async () => {
    setIsSubmitting(true)
    const result = await signIn("google", {
      redirect: true,
    });

    if (result?.error) {
      toast({
        title: "Login failed",
        description: "Please try again...",
        variant: "destructive",
      });
    }

    if (result?.ok) {
      router.replace("/post")
    }
    setIsSubmitting(false)
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onGoogleLogin)} className="space-y-4">
          <Separator />
          <Button type="submit" variant={"outline"} className="w-full gap-2 text-md">
          <FcGoogle className="text-xl text-center"/> Sign in with Google
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GoogleSignIn;

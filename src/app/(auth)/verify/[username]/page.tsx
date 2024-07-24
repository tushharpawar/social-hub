import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button";


const Page = () => {
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
      <div className="w-full items-center flex justify-center">
        <InputOTP
        maxLength={6}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>       
        </div>
        <div className="text-center text-lg">

          <>Enter your 6-digit code here.</>
       
      </div>
        <div className=" flex items-center justify-center ">
        <Button type="submit" className="w-[70%]">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

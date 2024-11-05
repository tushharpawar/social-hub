"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserProfile } from "@/app/redux/userProfileSlice";

interface AnimatedSubscribeButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
}

export const AnimatedSubscribeButton: React.FC<
  AnimatedSubscribeButtonProps
> = ({
  buttonColor,
  subscribeStatus,
  buttonTextColor,
  changeText,
  initialText,
}) => {
  const {userProfile} = useSelector((store:any)=>store.userProfile)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const dispatch = useDispatch()

  useEffect(()=>{
    if(userProfile.isFollowing){setIsSubscribed(true)}
    else{setIsSubscribed(false)}
  },[userProfile.isFollowing])


  const followUser = async () => {
      if(isSubscribed){
        dispatch(setUserProfile({
          ...userProfile,
          followers: userProfile.followers - 1
        }));
      }else{
        dispatch(setUserProfile({
          ...userProfile,
          followers: userProfile.followers + 1
        }));
      }
      setIsSubscribed(!isSubscribed)
      const res = await axios.post(`api/v1/follow-user/${userProfile._id}`)
      console.log(res.data.message);
  }

  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <motion.button
          className="relative flex w-[130px] h-8 items-center justify-center overflow-hidden rounded-md bg-white p-[4px] outline outline-1 outline-black"
          onClick={followUser}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="action"
            className="relative block h-full w-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonColor }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className="relative flex w-[130px] h-8 cursor-pointer items-center justify-center rounded-md border-none p-[4px]"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={followUser}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="reaction"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

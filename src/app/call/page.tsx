'use client'

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat';
import { useCalls, CallingState } from '@stream-io/video-react-sdk';
import {
    Call,
    CallControls,
    StreamCall,
    StreamTheme,
    StreamVideo,
    SpeakerLayout,
    StreamVideoClient,
  } from "@stream-io/video-react-sdk";
  import "@stream-io/video-react-sdk/dist/css/styles.css";

const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

const Page = () => {

    // const {userId,name,image} = router.query
    const [videoClient, setVideoClient] = useState<StreamVideoClient | undefined>(undefined);
    const [token,setToken] = useState()

    async function fetchToken() {
        try {
          const response = await fetch("/api/v1/get-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username:client.userID }),
          });
  
          const { token } = await response.json();
          setToken(token);
          
        } catch (error) {
          console.error("Error connecting to Stream Chat:", error);
        }
      }
  
   


    useEffect(() => {
        fetchToken();

        const myClient = new StreamVideoClient({
          apiKey:process.env.NEXT_PUBLIC_STREAM_API_KEY!,
          user: { 
            id: client.userID!,
            name:client.user?.name,
         },
          tokenProvider: () => Promise.resolve(token || ''),
          options: { logLevel: "debug" },
        });
        setVideoClient(myClient);
        return () => {
          myClient.disconnectUser();
          setVideoClient(undefined);
        };
      }, []);


    const [call, setCall] = useState<Call | undefined>(undefined);

    useEffect(() => {
      if (videoClient) {
        videoClient.call('default', crypto.randomUUID()).getOrCreate({
          ring: true,
          notify: true,
          data: {
            members: [
              { user_id: client?.userID! },
              { user_id: 'hello9' },
            ],
          },
        }).then(response => setCall(response.call as unknown as Call));
      }
    }, [videoClient]);

      
  return (
    <>
      {videoClient && (
        <StreamVideo client={videoClient}>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls />
          </StreamCall>
        </StreamVideo>
      )}
    </>
  )
}

export default Page

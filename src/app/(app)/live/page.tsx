'use client'

import { Button } from "@/components/ui/button";
import {
    LivestreamPlayer,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,
    CallControls,
    SpeakerLayout,
    User,
    StreamTheme,
    Call,
  } from "@stream-io/video-react-sdk";

import { User as AuthUser }  from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/cards/card";
import { MdOutlineVideocam } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const apiKey = "536ez6cv3czw";
   
  export default function App() {

    const[token,setToken] = useState("")
    const [client, setClient] = useState<StreamVideoClient | undefined>(undefined)
    const [isLoading,setIsLoading] = useState(false)
    const [livestreams, setLivestreams] = useState<Call[]>([])
    
      const {user} = useSelector((store:any)=>store.auth) 
      
      const clientUser: User = {
        id: user?.username|| "",
        name: user?.username || "",
        image: user?.avatar || "",
      };
    

    async function fetchToken() {
      try {
        setIsLoading(true)          
        
        const response = await fetch("/api/v1/get-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username :clientUser.id}),
        });

        const { token } = await response.json();
        setToken(token)
          const client = new StreamVideoClient({
            apiKey,
            user:clientUser,
            token: token as string,
          });
          setClient(client)
          await client.connectUser(clientUser,token)
          console.log("User connected");
          
          setLivestreams([])
          const { calls } = await client.queryCalls({
            filter_conditions: {
              type: { $eq: "livestream" },
              ongoing: { $eq: true } 
            },
            limit: 10,
            watch: true,
          });

          setLivestreams(calls)
          console.log("Live streams",calls);
          

        setIsLoading(false) 
      } catch (error) {
        setIsLoading(false)
        console.error("Error connecting to Stream Chat:", error);
      }
    }


    useEffect(() => {
      setIsLoading(true)
      fetchToken()
      setIsLoading(false)
      }, [user]);

  
      
    return (
      <div className="h-screen w-full">
        <Link href={`/create/live/${token}`}><Button className="justify-start text-lg m-8" disabled={isLoading}>
          {
              isLoading? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
              Please wait...
              </> : "Go Live"
          }
        </Button></Link>

        <div className="w-full text-xl font-bold px-8">
          Watch Livestreams
          <div className="m-5 flex flex-wrap">
            {livestreams.length > 0 ? (
              livestreams.map((livestream,index) => (
                  <Link href={`/watch/live/${livestream.id}/${token}/${user.username}`}  key={livestream.cid}>
                  <Card
                  image={livestream.state.createdBy?.image}
                  name={livestream.state.createdBy?.name}
                  online={livestream.state.createdBy?.online}
                  createdAt={livestream.state.createdAt}
                  watching={livestream.state.participantCount}
                  />
                  </Link>
              ))
            ) : (
              <div className="text-xl text-center font-bold">
                No live streams currently!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
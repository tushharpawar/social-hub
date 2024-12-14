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

const apiKey = "536ez6cv3czw";
   
  export default function App() {

    const[token,setToken] = useState("")
    const [username,setUsername] = useState("")
    const [client, setClient] = useState<StreamVideoClient | undefined>(undefined)
    const [isLoading,setIsLoading] = useState(false)
    const [livestreams, setLivestreams] = useState<Call[]>([])
    const { data: session } = useSession();

    const authUser: AuthUser = session?.user as AuthUser;
    const router = useRouter()
    const user: User = {
        id: authUser?.username|| "",
        name: authUser?.username || "",
        image: authUser?.image || "",
      };

    async function connectUser() {
        const client = new StreamVideoClient({
          apiKey,
          user,
          token: token as string,
        });
        setClient(client);
        await client.connectUser({ id: authUser?.username || "" }, token);
      }

    async function fetchToken() {
      try {
        setIsLoading(true)
        setUsername(authUser.username!)
        console.log("Username:",username);           
        
        const response = await fetch("/api/v1/get-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username}),
        });

        const { token } = await response.json();
        console.log("Token",token)
        setToken(token) 
        setIsLoading(false) 
      } catch (error) {
        setIsLoading(false)
        console.error("Error connecting to Stream Chat:", error);
      }
    }

    const fetchLive =async () =>{
      if (client) {
        const { calls } = await client.queryCalls({
          filter_conditions: {
            type: { $eq: "livestream" },
            ongoing: { $eq: true } 
          },
          limit: 10,
          watch: true,
        });

        setLivestreams(calls)
        console.log("livestrems",livestreams);
        
      }

    }

    useEffect(() => {
      setIsLoading(true)
      fetchToken()
      connectUser()
      fetchLive()
      setIsLoading(false)
      }, [authUser]);

      
    return (
      <div className="h-screen w-full">
        <Link href={`/create/live/${token}`}><Button className="justify-start text-lg m-8" disabled={isLoading}>
          {
              isLoading? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
              Please wait...
              </> : "Start Live"
          }
        </Button></Link>

        <div className="w-full text-xl font-bold px-8">
          Live
          <div className="m-5 flex flex-wrap">
            {livestreams.length > 0 ? (
              livestreams.map((livestream,index) => (
                  <Card
                  key={livestream.cid}
                  image={livestream.state.createdBy?.image}
                  name={livestream.state.createdBy?.name}
                  online={livestream.state.createdBy?.online}
                  createdAt={livestream.state.createdAt}
                  watching={livestream.state.participantCount}
                  />

              ))
            ) : (
              "No livestreams available"
            )}
          </div>
        </div>
      </div>
    );
  }
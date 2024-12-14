"use client";

import React, { useEffect, useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { User as authUser } from "next-auth";
import { useParams, useRouter } from "next/navigation";
import {
  StreamVideoClient,
  LivestreamPlayer,
    StreamCall,
    StreamVideo,
    useCallStateHooks,
    CallControls,
    SpeakerLayout,
    User,
    StreamTheme,
 } from "@stream-io/video-react-sdk";
import { v4 as uuid } from "uuid";
import { ImPhoneHangUp } from "react-icons/im";

const apiKey = "536ez6cv3czw";
const callId = uuid();

const Page = () => {
  const { data: session } = useSession();
  const { token } = useParams<{ token: string }>();
  const [client, setClient] = useState<StreamVideoClient | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  useEffect(() => {
    if (session && session.user) {
      setIsLoading(true);
      connectUser();
      call?.getOrCreate();
      setIsLoading(false);
    }
  }, [session,token]);

  if (!session || !session.user) {
    return <div>No session</div>;
  }
  const authUser = session.user as authUser;

  const user: User = {
    id: authUser?.username|| "",
    name: authUser.username || "",
    image: authUser?.avatar || "",
  };
  const call = client?.call("livestream", callId);

  async function connectUser() {
    const client = new StreamVideoClient({
      apiKey,
      user,
      token: token as string,
    });
    setClient(client);
    await client.connectUser({ id: authUser?.username || "" }, token);
  }

  const handleStopLive = () =>{
    call?.endCall()
    router.replace('/live')
  }

  return (
    <div className="h-screen">

      {client && !isLoading ? (
        <div className="">
          <div className="relative h-screen">
            <StreamVideo client={client}>
              <StreamTheme style={{ fontFamily: "sans-serif", color: "white" }}>
                <StreamCall call={call}>
                    <div className="h-screen relative">
                      <LivestreamPlayer
                        callType="livestream"
                        callId={callId}
                        layoutProps={{
                          showLiveBadge: true,
                          showDuration: true,
                          showParticipantCount: true,
                        }}
                      />
                      <div className="absolute top-6 right-10">
                      <ImPhoneHangUp size={24} onClick={handleStopLive}/>
                    </div>
                    </div>
                    
                </StreamCall>
              </StreamTheme>
            </StreamVideo>
          </div>
        </div>
      ) : "Loading ...."}
    </div>
  );
};

export default Page;

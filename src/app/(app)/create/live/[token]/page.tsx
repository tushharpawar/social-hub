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
  Call,
} from "@stream-io/video-react-sdk";
import cuid from "cuid";
import { ImPhoneHangUp } from "react-icons/im";
import { IoVideocamOutline } from "react-icons/io5";
import { IoVideocamOffOutline } from "react-icons/io5";
import { Loader2 } from "lucide-react";

const apiKey = "536ez6cv3czw";
const callId = cuid();

const Page = () => {
  const { data: session } = useSession();
  const { token } = useParams<{ token: string }>();
  const [client, setClient] = useState<StreamVideoClient | undefined>(
    undefined
  );
  const [call, setCall] = useState<Call | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const connectUser = async () => {
      setIsLoading(true);
      const client = new StreamVideoClient({
        apiKey,
        user,
        token: token as string,
      });
      setClient(client);

      const call = client?.call("livestream", callId);
      setCall(call);
      await call?.getOrCreate();
      setIsLoading(false);
    };

    connectUser();
  }, []);

  if (!session || !session.user) {
    return <div>No session</div>;
  }
  const authUser = session.user as authUser;

  const user: User = {
    id: authUser?.username || "",
    name: authUser.username || "",
    image: authUser?.avatar || "",
  };

  if (!call || !client) {
    return <div style={{maxHeight:"screen"}}> Something went wrong please try again later!</div>;
  }

  if(isLoading){
    return (
      <div style={{height:"full"}}>  
      <p style={{fontSize:"40px", textAlign:"center"}}>Initiating Live ...</p>
      </div>
    );
  }

  const handleStopLive = () => {
    call?.endCall();
    call?.camera.disable();
    call?.microphone.disable();
    call.streamClient.disconnectUser();
    router.replace("/");
  };


  return (
    <div className="h-screen">
      {client && call ? (
        <div className="h-screen w-full">
          <div className="md:relative h-screen">
            <StreamVideo client={client}>
              <StreamTheme style={{ fontFamily: "sans-serif", color: "white" }}>
                <StreamCall call={call}>
                  <div className=" md:h-screen md:relative md:p-4">
                    <LivestreamPlayer
                      callType="livestream"
                      callId={callId}
                      layoutProps={{
                        showLiveBadge: true,
                        showDuration: true,
                        showParticipantCount: true,
                      }}
                    />
                    <div className="absolute top-6 right-10 sm:top-4 sm:right-6">
                     <button
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      onClick={handleStopLive}
                    >
                      <ImPhoneHangUp size={24} />
                    </button>
                     </div>
                  </div>
                </StreamCall>
              </StreamTheme>
            </StreamVideo>
          </div>
        </div>
      ) : (
        "Something went wrong pls try again later!"
      )}
    </div>
  );
};

export default Page;

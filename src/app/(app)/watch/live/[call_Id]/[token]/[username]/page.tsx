"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { User as authUser } from "next-auth";
import {
  StreamVideoClient,
  User,
  StreamVideo,
  StreamCall,
  useCallStateHooks,
  ParticipantView,
  LivestreamLayout,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { ImPhoneHangUp } from "react-icons/im";
import { useSelector } from "react-redux";
import { MdFullscreen } from "react-icons/md";

const apiKey = "536ez6cv3czw";

const Page = () => {
  const [client, setClient] = useState<StreamVideoClient | undefined>(
    undefined
  );
  const [call, setCall] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnded, setIsEnded] = useState("");

  const { call_Id, token, username } = useParams() as {
    call_Id: string;
    token: string;
    username: string;
  };

  const router = useRouter()

  const {user} = useSelector((store:any)=>store.auth) 
      
  const clientUser: User = {
    id: user?.username|| "",
    name: user?.username || "",
    image: user?.avatar || "",
  };
  useEffect(() => {
    const connectUser = async () => {
      try {
        setIsLoading(true);
        const client = new StreamVideoClient({ apiKey, user:clientUser, token });
        setClient(client);

        const call = client.call("livestream", call_Id);
        setCall(call);

        call.camera.disable();
        call.microphone.disable();

        await call.join();
        console.log("Call joined successfully:", call);
      } catch (error) {
        console.error("Error connecting or joining call:", error);
      } finally {
        setIsLoading(false);
      }
    };

    connectUser();
  }, []);

  if (!call || !client) {
    return <div>Loading...</div>;
  }

  const handleLeaveLive = () => {
    call?.leave();
    router.replace('/live')
  };

  return (
    <div className="h-screen w-full flex flex-col sm:flex-row">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <div className="flex flex-col sm:h-screen sm:relative p-4">
            <LivestreamLayout
              muted={false}
              showParticipantCount={true}
              showDuration={true}
              showLiveBadge={true}
            />


            <div className="absolute top-6 right-10 sm:top-4 sm:right-6">
              <button
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={handleLeaveLive}
              >
                <ImPhoneHangUp size={24} />
              </button>
            </div>

          </div>
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default Page;

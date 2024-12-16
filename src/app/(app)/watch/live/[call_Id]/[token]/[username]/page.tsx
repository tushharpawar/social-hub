"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
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

const apiKey = "536ez6cv3czw";

const Page = () => {
  const [client, setClient] = useState<StreamVideoClient | undefined>(
    undefined
  );
  const [call, setCall] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { call_Id, token, username } = useParams() as {
    call_Id: string;
    token: string;
    username: string;
  };

  const { data: session } = useSession();
  const authUser = session?.user as authUser;

  const user: User = {
    id: username || "",
    name: username || "",
    image: authUser.image || "",
  };
  useEffect(() => {
    const connectUser = async () => {
      try {
        setIsLoading(true);
        const client = new StreamVideoClient({ apiKey, user, token });
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
  };

  return (
    <div className="h-screen">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <div className="h-screen relative p-4">
            <LivestreamLayout
              muted={false}
              showParticipantCount={true}
              showDuration={true}
              showLiveBadge={true}
            />
            <div className="absolute top-6 right-10">
              <ImPhoneHangUp size={24} onClick={handleLeaveLive} />
            </div>
          </div>
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default Page;

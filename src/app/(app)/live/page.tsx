'use client'

import {
    LivestreamPlayer,
    ParticipantView,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,
    CallControls,
    SpeakerLayout,
    User,
    StreamTheme,
    LivestreamLayout
  } from "@stream-io/video-react-sdk";

import { User as AuthUser }  from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
  
  const apiKey = "536ez6cv3czw";
  const callId = uuid();
  
 
  export default function App() {

    const[token,setToken] = useState("")
    const [username,setUsername] = useState("")
    const [client, setClient] = useState<StreamVideoClient | undefined>(undefined)
    const { data: session } = useSession();
    const authUser: AuthUser = session?.user as AuthUser;

    useEffect(() => {
        async function fetchToken() {
          try {
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

          } catch (error) {
            console.error("Error connecting to Stream Chat:", error);
          }
        }
        fetchToken()

        async function connectUser(){
          const client = new StreamVideoClient({ apiKey, user, token });
        setClient(client)
        await client.connectUser({id:username},token)
        }

        connectUser()
      }, [authUser]);

    const user: User = { id: username, name: "live", image: authUser?.avatar || "" };
    
    if (client) {
      const call = client.call("livestream", callId);
      call.getOrCreate();
    }

    if (!client) {
      return <div>Loading...</div>;
    }

    return (
      <StreamTheme style={{ fontFamily: 'sans-serif', color: 'white' }}>
    <StreamVideo client={client}>
        <StreamCall call={client.call("livestream", callId)}>
        <LivestreamLayout
          muted={false}
          enableFullscreen={true}
          showParticipantCount={true}
          showDuration={true}
          showLiveBadge={true}
          showSpeakerName={false}
          floatingParticipantProps={{
            muted: false,
            enableFullscreen: true,
            showParticipantCount: true,
            showDuration: true,
            showLiveBadge: true,
            showSpeakerName: false,
            position: "top-right",
          }}
        />

        <LivestreamPlayer callType="livestream" callId={callId}/>
        </StreamCall>
      </StreamVideo>
  </StreamTheme>
      
    );
  }

  const LivestreamView = ({call}) => {
    const {
      useCameraState,
      useMicrophoneState,
      useParticipantCount,
      useIsCallLive,
      useParticipants,
    } = useCallStateHooks();
  
    const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
    const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
    
    const participantCount = useParticipantCount();
    const isLive = useIsCallLive();
  
    const [firstParticipant] = useParticipants();
    
    return (
      <div style={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
        <div>{isLive ? `Live: ${participantCount}`: `In Backstage`}</div>
        {firstParticipant ? (
          <ParticipantView participant={firstParticipant} />
        ) : (
          <div>The host hasn&apos;t joined yet</div>
        )}
        <div style={{ display: 'flex', gap: '4px'}}>
          <button onClick={() => (isLive ? call.stopLive() : call.goLive())}>
            {isLive ? "Stop Live" : "Go Live"}
          </button>
          <button onClick={() => cam.toggle()}>
            {isCamEnabled ? "Disable camera" : "Enable camera"}
          </button>
          <button onClick={() => mic.toggle()}>
            {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
          </button>
        </div>
      </div>
    );
  };
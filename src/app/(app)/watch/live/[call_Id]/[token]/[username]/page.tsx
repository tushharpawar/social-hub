'use client'

import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { User as authUser } from 'next-auth';
import { 
  StreamVideoClient,
  User,
  StreamVideo,
  StreamCall,
  useCallStateHooks,
  ParticipantView,
  LivestreamLayout,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = '536ez6cv3czw';

const Page = () => {
  const [client, setClient] = useState<StreamVideoClient | undefined>(undefined);
  const [call, setCall] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { call_Id, token, username } = useParams();
  const { data: session } = useSession();
  const authUser = session?.user as authUser

  const { useParticipants, useRemoteParticipants } = useCallStateHooks();

  // Unconditionally call hooks
  // const participants = useParticipants?.() || [];
  const remoteParticipants = useRemoteParticipants?.() || [];

  const user: User = {
    id: authUser.username || '',
    name: authUser.username || '',
    image: authUser.image || '',
  };
  useEffect(() => {
    const connectUser = async () => {
      try {
        const client = new StreamVideoClient({ apiKey });
        setClient(client);
  
        await client.connectUser(user, token as string);
  
        const call = client.call('livestream', Array.isArray(call_Id) ? call_Id[0] : call_Id);
        setCall(call);
  
        await call.join({ create: false });
        console.log('Call joined successfully:', call);
      } catch (error) {
        console.error('Error connecting or joining call:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    connectUser();
  }, [call_Id, token, client, call]);
  
  // useEffect(() => {
  //   console.log('Remote Participants:', remoteParticipants);
  //   console.log('Participants:', participants);
  // }, [remoteParticipants, participants]);
  

  if (isLoading || !client || !call) {
    return <div>Loading...</div>;
  }

  console.log(remoteParticipants);
  

  return (
    <div className="h-screen">
      <StreamVideo client={client}>
        <StreamCall call={call}>
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
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default Page;

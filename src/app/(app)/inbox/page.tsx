"use client";
import React, { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  MessageList,
  MessageInput,
  useMessageContext,
  InfiniteScroll,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { StreamChat } from "stream-chat";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import "../../../utils/inbox.css";
import DateSpaerator from "@/components/inbox/DateSpaerator";
import CustomChannelHeader from "@/components/inbox/CustomChannelHeader";
import { useSelector } from "react-redux";

const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

const Page = () => {
  const [connected, setConnected] = useState(false);
  const [token,setToken] = useState()
  const filters = { members: { $in: [client.userID!] } };
  const sort = { last_message_at: -1 };
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const userId = user?._id;
  const { autoscrollToBottom } = useMessageContext();

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/v1/get-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username:user.username }),
        });

        const { token } = await response.json();
        setToken(token)
        await client.connectUser(
          {
            id: user.username!,
            name: user?.username,
            image: user?.avatar,
          },
          token
        );
        console.log("User connected", token);
        setConnected(true);
        if (autoscrollToBottom) {
          autoscrollToBottom();
        }
        
      } catch (error) {
        console.error("Error connecting to Stream Chat:", error);
      }
    }

    fetchToken();

    return () => {
      if (connected) {
        client.disconnectUser();
        console.log("Disconnected", userId);
      }
    };
  }, [user, userId]);

  const {theme} = useSelector((store:any)=>store.theme)

  return (
    <Chat client={client} theme={theme == 'dark' ? 'str-chat__theme-dark' : 'str-chat__theme-light'}>
      <section className="w-full flex gap-2 h-screen">
        
         <ChannelList
            filters={filters}
            options={{ state: true, presence: true }}
            sort={sort}
            showChannelSearch
            Paginator={InfiniteScroll}
            setActiveChannelOnMount={false}
          />

        <Channel DateSeparator={DateSpaerator}>
          <Window>
            <div className="grid grid-rows-[auto_1fr_auto] h-screen">
            <div className="chat-header z-10">
              <CustomChannelHeader token={token}/>
            </div>
            <div className="chat-body overflow-y-auto no-scrollbar">
              <MessageList/>
            </div>

            <div className="chat-bottom z-10 p-4 border-t">
              <MessageInput/>
            </div>
            </div>
          </Window>
        </Channel>
      </section>
    </Chat>
  );
};

export default Page;
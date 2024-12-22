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
  useChannelListContext,
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
  const sort = { last_message_at: -1 as const };
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
        setConnected(true);
        if (autoscrollToBottom) {
          autoscrollToBottom();
        }
        
      } catch (error) {
        
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
    <Chat client={client} theme={theme == "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"}>
      <section className="w-full flex flex-col md:flex-row h-screen gap-2">
        {/* Channel List Section */}

          <ChannelList
            filters={filters}
            options={{ state: true, presence: true }}
            sort={sort}
            showChannelSearch
            Paginator={InfiniteScroll}
            setActiveChannelOnMount={false}
            EmptyStateIndicator={
              ()=><div className="w-full h-screen text-center">
              Chat with your friends or <br/> search tushar to send a message to developer.
            </div>
            }
          />

        {/* Channel Chat Section */}
        <div className="w-full md:w-3/4 lg:w-4/5">

          <Channel DateSeparator={DateSpaerator}>
            <Window>
              <div className="w-full grid grid-rows-[auto_1fr_auto] h-screen">
                <div className="chat-header z-10">
                  <CustomChannelHeader token={token} />
                </div>
                <div className="chat-body sm:pb-0 overflow-y-auto no-scrollbar">
                  <MessageList />
                </div>

                <div className="sm:block chat-footer z-20 m-1 bg-white dark:bg-black border-t">
                  <MessageInput />
                </div>

                <div className="fixed bottom-0 w-full z-20 m-1 bg-white dark:bg-black border-t sm:hidden">
                  <MessageInput />
                </div>

              </div>
            </Window>
          </Channel>
        </div>
      </section>
    </Chat>
  );
};

export default Page;
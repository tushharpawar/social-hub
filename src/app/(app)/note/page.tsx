"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import NoteCard from "@/components/notes/NoteCard";
import RightSlidebarHeader from "@/components/right-slidebar/RightSlidebar";
import { Loader2 } from "lucide-react";
import NoteUpload from "@/components/notes/NoteUpload";

const Page = () => {
  interface Note {
    _id: string;
    owner: {
      username: string;
      avatar: string;
    };
    content: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading,setLoading] = useState(false)

  const getNotes = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/v1/get-all-notes");
      setNotes(response.data.message);
      setLoading(false)
    } catch (error) {
      toast({
        title: "Internal server error!",
      });
      setLoading(false)
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="w-full flex h-screen ">
      <div className="w-full min-h-screen pb-12 sm:pb-0 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-center flex-col">
          <div className="mt-2 p-5">
            {
              loading && <div className="flex justify-center gap-2">
                <Loader2 className="mr-2 h-6 w-6 animate-spin"></Loader2>
                <p className="text-lg">Loading notes...</p>
              </div>
            }
            {!loading && notes.length > 0 ? (
              notes.map((note, index) => (
                <NoteCard
                  key={index}
                  noteId={note._id}
                  username={note.owner.username}
                  avatar={note.owner.avatar}
                  content={note.content}
                ></NoteCard>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
      <RightSlidebarHeader></RightSlidebarHeader>
      </div>
      <div className="absolute top-0 right-2 sm:hidden">
        <NoteUpload/>
      </div>
    </div>
  );
};

export default Page;

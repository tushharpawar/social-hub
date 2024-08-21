"use client"

import HomeNavbar from '@/components/HomeNavbar'
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { avatar } from '@nextui-org/react';
import PostPage from '../post/page';
import NoteCard from '@/components/notes-card/NoteCard'
import { TweetBody, TweetHeader } from '@/components/magicui/tweet-card';
import RightSlidebarHeader from '@/components/right-slidebar/RightSlidebarHeader';


const Page = () => {

    const [notes,setNotes] = useState([])

    const getNotes = async() =>{
        try {
            const response = await axios.get('/api/v1/get-all-notes')
            setNotes(response.data.message)

        } catch (error) {
            console.log("Error");
            toast({
                title:'Internal server error!'
            })
        }
    }

    useEffect(()=>{
        getNotes()
    },[])


  return (
    <div className="w-full flex">

<div className='w-full min-h-screen'>
      <HomeNavbar></HomeNavbar>
        <div className="flex items-center justify-center flex-col">
        <div className="mt-2 p-5">
          {
            notes.length > 0 ?
            (
                notes.map((note,index)=>(
                    <NoteCard
                    key={index}
                    username={note.owner.username}
                    avatar={note.owner.avatar}
                    content={note.content}
                    ></NoteCard>
                ))
            ):(<p>No notes</p>)
          }
        </div>
        </div>
    </div>
    <RightSlidebarHeader></RightSlidebarHeader>
    </div>
      
  )
}

export default Page
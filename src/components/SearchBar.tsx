'use client'

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from 'next/link'

const HomeNavbar = () => {

  const {data:session} = useSession();

  const username = session?.user ? (session.user as User).username : '';

  const [query, setQuery] = useState("");
  interface UserResult {
    _id: string;
    username: string;
    avatar?: string;
  }
  
  const [results, setResults] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`/api/v1/search`, {
        params: {
          search: searchTerm
        }
      });
      setResults(response.data.data || []);
    } catch (error) {
      console.error("Error searching usernames:", error);
    }

    setLoading(false);
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    

    // Clear the previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300); // Wait 300ms before sending the request
  };

  return (
    <div className=" items-center">
    <div className=" w-full">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
         type="text"
         placeholder="Find your friend or tushar ..."
         className=" focus:outline-none"
         value={query}
          onChange={handleInputChange}
         />
      </div>

      {loading && <div className="flex gap-2 p-4"><Loader2 className="mr-2 h-6 w-6 animate-spin"/> Searching...</div>}
      <ul>
        {results.map((user,index) => (
          <div className="m-3 p-2 max-w-sm border border-gray-800 rounded-sm dark:hover:bg-zinc-800" key={index}>
          <Link href={`/${user?.username}`} className="flex items-center px-4 w-full justify-start text-lg">
          <div className="text-center">
            <Avatar className="mr-3 h-12 w-12">
              <AvatarImage src={user?.avatar} />
            </Avatar>
          </div>
          <div className="text-lg">@{user?.username}</div>
        </Link>
          </div>
        ))}
      </ul>
    </div>
    </div>

  );
};

export default HomeNavbar;

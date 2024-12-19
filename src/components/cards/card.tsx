"use client";
import { cn } from "@/lib/utils";
import timeAgo from "@/utils/time";
import Image from "next/image";
import { Eye } from 'lucide-react';

 
export function Card({image,name,online,createdAt,watching}) {
    const newCreatedAt = timeAgo(createdAt)
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          ` cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto  flex flex-col justify-between p-4 `,
        )}
        style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity:70
          }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src={image}
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-100 relative z-10">
              {name}
            </p>
            <p className="text-sm text-gray-400">started {newCreatedAt} ago</p>
          </div>
        </div>
        <div className="z-10">
            {online ? <div className=" flex items-center">
                <p className="font-lg text-sm relative z-10 my-4 flex gap-2 items-center">
                <Eye size={20}/>{watching}
                </p>
                <img className="h-28 w-28"  src="https://res.cloudinary.com/tushharpawar/image/upload/v1734178827/Animation_-_1734178421057_pludmq.gif" alt=""/>
                </div>
                :"Offline"}
        </div>
      </div>
    </div>
  );
}
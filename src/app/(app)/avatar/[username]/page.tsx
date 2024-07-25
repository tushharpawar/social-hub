'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { useParams } from 'next/navigation'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { type Crop } from 'react-image-crop'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import makeAspectCrop from "../../../../../node_modules/react-image-crop/dist/utils"

const ASPECT_RETIO = 1
const MIN_DIMENTION = 150
const Page = () => {

    const [imgSrc,setImgSrc] = useState("")

    const [crop,setCrop] = useState<Crop>()
    const [open,setOpen] = useState(false)

    const params = useParams<{username:string}>()

    const onSelectFile = (e : any) =>{
        const file = e.target.files?.[0]

        if(!file) return;

        const reader = new FileReader();

        reader.addEventListener("load",()=>{
            const imgUrl = reader.result?.toString() || "";
            console.log(imgUrl);
            setImgSrc(imgUrl);
            setOpen(true)
        })

        reader.readAsDataURL(file);

    }

    const onImageLoad = (e : any)=> {
        const width =75
        const height= 75
        setCrop({
            unit:"%",
            x:10,
            y:10,
            width,
            height,
        })
    }

  return (
    <div className='min-h-screen flex justify-center items-center bg-slate-100'>
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-sm font-extrabold tracking-tight lg:text-4xl">
            Social-hub
          </h1>
        </div>
    <div className="flex flex-col items-center space-y-4">

    <div className="text-center w-full text-lg font-medium">
        {`Welcome, @${params.username}`}    
    </div>

    <div>
        <Image src="https://res.cloudinary.com/dsgi2zbq2/image/upload/profile_pic_q6ssck.jpg" alt="profile pic" width={150} height={150} className='rounded-[50%]'/>
    
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5 text-md">
    
      <Label htmlFor="picture" className='text-md'>Please upload avatar</Label>
      <Input id="picture" type="file" className='text-md' onChange={onSelectFile}/>

    </div>
    {
        imgSrc &&

        <div className="">
            
            <AlertDialog>
            <AlertDialogTrigger>
                Open
            </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        <ReactCrop
                        crop={crop}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RETIO}
                        minWidth={MIN_DIMENTION}
                        onChange={(crop, percentCrop) => setCrop(crop)}
                        >
                    <Image src={imgSrc} alt='Upload' width={500} height={500} style={{maxHeight:"70vh"}}
                    onLoad={onImageLoad}
                    ></Image>
                    </ReactCrop>
                    

                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        
        </div>
      }
    </div>
    </div>
    </div>
  )
}

export default Page
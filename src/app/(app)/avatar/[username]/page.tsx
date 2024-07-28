/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/app/helper/getImg";
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
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const ASPECT_RETIO = 1;

const Page = () => {

  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [openBox, setOpenBox] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isLoadingImage,setIsLoadingImage] = useState(false)
  const [isUploading,setIsUploading] = useState(false)

  const params = useParams<{ username: string }>();
  const router = useRouter();

  const onSelectFile = (e: any) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (imgSrc) setImgSrc("");
      const imgUrl = reader.result?.toString() || "";
      setOpenBox(true);
      console.log(imgUrl);
      setImgSrc(imgUrl);
    });

    reader.readAsDataURL(file);
  };

  const cancelHandler = () => {
    setImgSrc("");
    setOpenBox(false);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage:any = await getCroppedImg(imgSrc, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setOpenBox(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onCropComplete = (croppedArea :any, croppedAreaPixels:any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onSkip = () => {
    router.replace('/sign-in')
  }

  const updateAvatar = async() =>{
      setIsUploading(true)
       try {
         const response = await axios.patch('/api/v1/update-avatar',{avatar:croppedImage,
           username:params.username
         })
 
         toast({
           title:"Avatar uploaded!",
         })
 
         router.replace('/sign-in')
 
         setIsUploading(false)
       } catch (error) {
            console.log("An error in avatar page.tsx",error);
            toast({
              title:"Something went wrong :(",
              description:"Please try again later.",
              variant:"destructive"
            })
            setIsUploading(false)
       }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
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
            <img
              src={
                croppedImage
                  ? croppedImage
                  : "https://res.cloudinary.com/dsgi2zbq2/image/upload/profile_pic_q6ssck.jpg"
              }
              alt="profile pic"
              width={150}
              height={150}
              className="rounded-[50%]"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 text-md">
            <Label htmlFor="picture" className="text-md">
              Please upload avatar
            </Label>

            <AlertDialog>
              <AlertDialogTrigger>
                <Input
                  id="picture"
                  type="file"
                  className="text-md"
                  onChange={onSelectFile}
                />
              </AlertDialogTrigger>
              {openBox && (
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Selected avatar</AlertDialogTitle>
                    <AlertDialogDescription>
                      Move circle to select area.
                    </AlertDialogDescription>
                    <div className="w-full h-[60vh] flex justify-center ml-2 items-center cropper">
                      <Cropper
                        image={imgSrc}
                        crop={crop}
                        aspect={ASPECT_RETIO}
                        zoom={zoom}
                        cropShape="round"
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        objectFit="cover"
                        style={{
                          containerStyle: {
                            width: "400px",
                            height: "400px",
                            marginTop: "100px",
                            display: "flex",
                            justifyItems: "center",
                          },
                          cropAreaStyle: {
                            width: "150px",
                            height: "150px",
                          },
                        }}
                      ></Cropper>
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={cancelHandler}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={showCroppedImage}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>
          </div>
        </div>
        <div className=" flex justify-between">
        <Button variant={"outline"} className="text-md border-gray-800" onClick={onSkip}>
          Skip for now
        </Button>

        {
          croppedImage && <Button className="text-md" disabled={isUploading} onClick={updateAvatar}>
          {
            isUploading ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
              Please wait
              </>
            ) : ('Save avatar') 
          }
        </Button>
        }
        </div>
      </div>
    </div>
  );
};

export default Page;

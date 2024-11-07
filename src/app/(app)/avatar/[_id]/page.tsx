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
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/app/redux/authSlice";

const ASPECT_RETIO = 1;

const Page = () => {
  const {isClickedOnEditProfile} = useSelector((store:any)=>store.isClickedOnEditProfile)
  const {user} = useSelector((store:any)=>store.auth)
  const dispatch = useDispatch()
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [openBox, setOpenBox] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const params = useParams<{ _id: string }>();
  const router = useRouter();

  //Getting imageurl when image is selected by user.

  const onSelectFile = (e: any) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setIsLoadingImage(true);
      if (imgSrc) setImgSrc("");
      const imgUrl = reader.result?.toString() || "";
      setOpenBox(true);
      console.log(imgUrl);
      setImgSrc(imgUrl);
    });

    reader.readAsDataURL(file);
    setIsLoadingImage(false);
  };

  //Handles when user cancels to update avatar when crop image alert is popped up.

  const cancelHandler = () => {
    setImgSrc("");
    setOpenBox(false);
  };

  //function for showing a cropped image as avatar on page.

  const showCroppedImage = async () => {
    try {
      setIsLoadingImage(true);
      const croppedImage: any = await getCroppedImg(imgSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      setOpenBox(false);
      setIsLoadingImage(false);
    } catch (e) {
      console.error(e);
      setIsLoadingImage(false);
    }
  };

  //When user compeletes a crop cropppedAreaPixels stores pixels of cropped image.

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  //When user clicks on (Skip for now ) button.

  const onSkip = () => {
    isClickedOnEditProfile ? router.replace(`/${user.username}`) : router.replace(`/sign-in`);
  };

  //Hits api endpoint for uploading avatar

  const updateAvatar = async () => {
    setIsUploading(true);
    try {
      const _id = params._id.toString();
      const response = await axios.post(`/api/v1/update-avatar/${_id}`, {
        avatar: croppedImage,
      });

      if(response.status === 201){
        toast({
          title: "Avatar uploaded!",
        });
  
        dispatch(setAuthUser({
          ...user,
          avatar:croppedImage
        }))
  
        isClickedOnEditProfile ? router.replace(`/${user.username}`) : router.replace(`/sign-in`);
        setIsUploading(false);
      }else{
        toast({
          title: "Avatar is not uploaded!",
        });
      }
    } catch (error) {
      console.log("An error in avatar page.tsx", error);
      toast({
        title: "Something went wrong :(",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-sm font-extrabold tracking-tight lg:text-4xl">
            Social-hub
          </h1>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center w-full text-lg font-medium">
            {isClickedOnEditProfile ? "" : `Welcome, @${params._id}`}
          </div>

          {/* showing avatar when user just signed up */}

          <div>
            <img
              src={
                croppedImage
                  ? croppedImage
                  : isClickedOnEditProfile ? user.avatar : "https://res.cloudinary.com/dsgi2zbq2/image/upload/profile_pic_q6ssck.jpg"
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

            {/* Alert when image will be loaded */}

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
                      Zoom or move to set your image
                    </AlertDialogDescription>

                    <div className="w-full h-[60vh] flex justify-center ml-2 items-center cropper">
                      {/* Cropper tool from react-easy-crop for croppping image */}
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
          { 
            <Button
              variant={"outline"}
              className="text-md border-gray-800"
              onClick={onSkip}
            >
              {
                isClickedOnEditProfile ? "Skip" : "Skip for now"
              }
            </Button>
          }

          {/* if image is cropped then this componnent will be shown */}
          {croppedImage && (
            <Button
              className="text-md"
              disabled={isUploading}
              onClick={updateAvatar}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                  Please wait
                </>
              ) : (
                "Save avatar"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

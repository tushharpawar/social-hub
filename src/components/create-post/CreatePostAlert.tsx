'use client'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/app/helper/getImg";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const ASPECT_RETIO = 1;

export default function AlertDialogDemo() {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [caption,setCaption] = useState()
  const [open,setOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [isLoading2,setIsLoading2] = useState(false)

  const router = useRouter()

  const onSelectFile = (e: any) => {
    setImgSrc('')
    setIsLoading2(false)
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (imgSrc) setImgSrc("");
      const imgUrl = reader.result?.toString() || "";
      setImgSrc(imgUrl);
    });
    reader.readAsDataURL(file);
  };

  const showCroppedImage = async () => {
    try {
      if(!imgSrc){
        toast({
          title:'Please select a photo to continue',
          variant:'destructive'
      })
      setOpen(false)
      setIsLoading2(false)
      }
      else{
      setIsLoading2(true)
      const croppedImage: any = await getCroppedImg(imgSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      setIsLoading2(false)
      }
    } catch (e) {
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCaption = (e:any) =>{
    setCaption(e.target.value)
  }

  const onUpload =async () =>{
    try {
      setIsLoading(true)
        const response = await axios.post(`/api/v1/post-upload`,{
            postUrl:croppedImage,
            caption
        })
        setIsLoading(false)
        setOpen(false)
        if(response.status ===201){
            toast({
                title:'Post uploaded',
            })
            setImgSrc('')
            router.replace('/');
        }
        
    } catch (error) {
        toast({
            title:'Internal server error',
            variant:'destructive'
        })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' className="sm:w-full sm:justify-start sm:text-lg">
          <AiOutlinePlusSquare size={24} className="sm:mr-3 sm:h-8 sm:w-8" />
          <p className="hidden lg:block">Create</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select an image</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              id="picture"
              type="file"
              className="text-md"
              onChange={onSelectFile}
            />
          </AlertDialogDescription>

          {imgSrc && (
            <div className="w-full h-[60vh] sm:h-[65vh] flex justify-center items-center cropper">
              {/* Cropper tool from react-easy-crop for croppping image */}
              <Cropper
                image={imgSrc}
                crop={crop}
                aspect={ASPECT_RETIO}
                zoom={zoom}
                cropShape="rect"
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
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-3">
          <AlertDialogCancel onClick={()=>setImgSrc('')}>Cancel</AlertDialogCancel>
          <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button onClick={showCroppedImage} disabled={isLoading2}>
                  {
                    isLoading2 ? <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                    Please wait
                    </> : "Continue"
                  }
                </Button>
            </AlertDialogTrigger>
            {
              imgSrc && !isLoading2 && 
              <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure to post this?
                </AlertDialogTitle>

                  <div className="flex justify-center">
                  <img
                    src={croppedImage!}
                    alt=""
                    className="w-[300px] h-[300px]"
                  />
                  </div>

                <div className="">
                <Label className="font-semibold text-md">Enter Caption</Label>
                <Input className="w-[90%]" onChange={onCaption} ></Input>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {
                  !isLoading && <AlertDialogCancel>Cancel</AlertDialogCancel>
                }
                <Button onClick={onUpload} disabled={isLoading}>
                  {
                    isLoading ? <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                    Please wait
                    </> : "Continue"
                  }
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
            }
          </AlertDialog>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

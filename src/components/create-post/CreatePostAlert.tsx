'use client'
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
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/app/helper/getImg";
import { Label } from "../ui/label";
import axios from "axios";
import { log } from "console";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const ASPECT_RETIO = 1;

export default function AlertDialogDemo() {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [caption,setCaption] = useState()

  const router = useRouter()

  const onSelectFile = (e: any) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (imgSrc) setImgSrc("");

      const imgUrl = reader.result?.toString() || "";
      console.log("Image url", imgUrl);
      setImgSrc(imgUrl);
      console.log(imgSrc);
    });
    reader.readAsDataURL(file);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage: any = await getCroppedImg(imgSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
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
        const response = await axios.post(`/api/v1/post-upload`,{
            postUrl:croppedImage,
            caption
        })

        console.log(response);

        if(response.status ===201){
            toast({
                title:'Post uploaded',
            })
    
            router.replace('/Home');
        }
        
    } catch (error) {
        toast({
            title:'Internal server error',
            variant:'destructive'
        })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-lg">
          <AiOutlinePlusSquare className="mr-3 h-6 w-6" />
          Create
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
            <div className="w-full h-[60vh] flex justify-center ml-2 items-center cropper">
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
                    width: "300px",
                    height: "300px",
                    marginTop: "110px",
                    marginLeft: "110px",
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button onClick={showCroppedImage}>Continue</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure to post this?
                </AlertDialogTitle>
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={croppedImage!}
                    alt=""
                    className="w-[300px] h-[300px]"
                  />
                }
                <div className="">
                <Label>Enter Caption</Label>
                <Input className="w-[90%]" onChange={onCaption} ></Input>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onUpload}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

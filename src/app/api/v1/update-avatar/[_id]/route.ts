import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import UserModel from "@/models/User.model"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_TOKEN,
});

export const POST = async (req: NextRequest,{params}:{params:{_id:string}}, res: NextResponse) => {
  await dbConnect();
  try {
    const { avatar } = await req.json();

        const {_id} = params
        const user = await UserModel.findById({_id})

        if(!user){
            return NextResponse.json({
                suceess:false,
                message: "User doesn't exist"}
            ,{status: 404}); 
        }

    const cloudinaryUrl =await cloudinary.uploader.upload(avatar, {
      folder: "avatar",
    });
    
    const update = {
      $set: {avatar:cloudinaryUrl.secure_url}
    }

    const updatedAvatar = await UserModel.updateOne({_id},update)

    if(updatedAvatar.modifiedCount >0 ){
      return NextResponse.json(
        {
          success: true,
          message: "Avatar uploaded successfully.",
        },
        { status: 200 }
      );
    }

    if(!updatedAvatar){
        return NextResponse.json(
            {
              success: false,
              message: "Avatar didn't uploaded.",
            },
            { status: 400 }
          );
    }
     
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong!",
      },
      { status: 400 }
    );
    
  } catch (error:any) {
    console.log("Error in uploading avatar: ", error);
    return NextResponse.json(
      {
        suceess: false,
        message: "Failed to uplaod avatar",
      },
      { status: 400 }
    );
  }
};

import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import UserModel from "@/models/User.model"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_TOKEN,
});

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  try {
    const { avatar,username } = await req.json();

    const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({username:decodedUsername})

        if(!user){
            return NextResponse.json({
                suceess:false,
                message: "User doesn't exist"}
            ,{status: 404}); 
        }

    // const cloudinaryUrl =await uploadOnCloudinary(avatar)
    const cloudinaryUrl = await cloudinary.uploader.upload(avatar, {
      folder: "avatar",
    });
    console.log(cloudinaryUrl.secure_url);
    
    const update = {
      $set: {"avatar":cloudinaryUrl.secure_url}
    }

    console.log(update);
    
    const updatedAvatar = await UserModel.updateOne({username:decodedUsername},{$set: {"avatar":cloudinaryUrl.secure_url}})
    
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
          success: true,
          message: "Avatar uploaded successfully.",
        },
        { status: 200 }
      );
  } catch (error) {
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

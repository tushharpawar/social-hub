import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post.model";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_TOKEN,
});

export const POST = async (req: NextRequest, res: NextResponse) =>{
    await dbConnect()

    //Getting userId from logged in user from Session

    const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const userId = _user._id;

    try {

        const {postUrl,caption} = await req.json()

            const cloudinaryUrl = await cloudinary.uploader.upload(postUrl,{
                folder:"user-posts"
            }) 

            const newPost = new PostModel({
                postUrl:cloudinaryUrl.secure_url,
                caption,
                owner:userId,
                likeCount:0
            })

            await newPost.save();

            console.log(newPost);
            
            return NextResponse.json({
                success: true,
                message: "Post uploaded successfully!",
            }, {status: 201});

    } catch (error:any) {
        console.log("Error in posting images: ", error);
        return NextResponse.json({
            suceess:false,
            message: "Failed to post an image"}
        ,{status: 400});
    }
}
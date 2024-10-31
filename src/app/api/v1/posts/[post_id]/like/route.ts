import dbConnect from "@/lib/dbConnect";
import LikeModel from "@/models/Like.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PostModel from "@/models/Post.model";

export async function POST(req:NextRequest,{params}:{params:{post_id:string}},res:NextResponse) {
    await dbConnect();

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

            const {post_id}  = params

            const existingLike = await LikeModel.findOne({
                post:post_id,
                likedBy:userId
            })

            if(existingLike){
                await LikeModel.findByIdAndDelete(existingLike._id)
                await PostModel.findByIdAndUpdate(post_id,{$inc:{likeCount:-1}})
                return NextResponse.json({
                    success:true,
                    message:"Unliked"
                },{status:201})                
            }

             const newLikeModel = new LikeModel({
                post:post_id,
                likedBy:userId
             })

             await newLikeModel.save()
             await PostModel.findByIdAndUpdate(post_id,{$inc:{likeCount:1}})

            return NextResponse.json({
                success:true,
                message:newLikeModel.likedBy
            },{status:201})
        } catch (error:any) {
            console.log("Error while liking on post:",error);
            return NextResponse.json({
                success:false,
                message:"Internal server error!"
            },{status:501})
        }
}
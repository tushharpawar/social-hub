import dbConnect from "@/lib/dbConnect";
import LikeModel from "@/models/Like.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function DELETE(req:NextRequest,{params}:{params:{post_id:string}},res:NextResponse) {
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

            const unlike = await LikeModel.findOneAndDelete(
                {
                    post:post_id,
                    likedBy:userId
            }
            )
            
            if(!unlike){
                return NextResponse.json({
                    success:false,
                    message:"You cannot unlike post right now!"
                },{status:401})
            }

            return NextResponse.json({
                success:true,
                message:"You unliked post!"
            },{status:201})
             
        } catch (error:any) {
            console.log("Error while unliking on post:",error);
            return NextResponse.json({
                success:false,
                message:"Internal server error!"
            },{status:501})
        }
}
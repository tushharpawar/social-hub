import dbConnect from "@/lib/dbConnect";
import LikeModel from "@/models/Like.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{post_id:string}},res:NextResponse) {
    await dbConnect();
        try {
            const {userId} =await req.json()
            const {post_id}  = params

             const newLikeModel = new LikeModel({
                post:post_id,
                likedBy:userId
             })

             await newLikeModel.save()

            return NextResponse.json({
                success:true,
                message:"Your like has been added!"
            },{status:201})
             
        } catch (error:any) {
            console.log("Error while liking on post:",error);
            return NextResponse.json({
                success:false,
                message:"Internal server error!"
            },{status:501})
        }
}
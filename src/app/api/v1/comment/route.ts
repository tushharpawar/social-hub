import dbConnect from "@/lib/dbConnect";
import CommentModel from "@/models/Comment.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse) {
    await dbConnect();
        try {
            const {content,userId,postId} =await req.json()

             const newCommentModel = new CommentModel({
                content,
                post:postId,
                owner:userId
             })

             await newCommentModel.save()

            return NextResponse.json({
                success:true,
                message:"Your comment has been added!"
            },{status:402})
             
        } catch (error) {
            console.log("Error while commenting on post:",error);
            return NextResponse.json({
                success:false,
                message:"Internal server error!"
            },{status:501})
        }
}
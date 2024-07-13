import dbConnect from "@/lib/dbConnect";
import CommentModel from "@/models/Comment.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{post_id:string}},res:NextResponse) {
    await dbConnect();
        try {
            const {content,userId} =await req.json()
            const {post_id}  = params
             const newCommentModel = new CommentModel({
                content,
                post:post_id as string,
                owner:userId
             })

             await newCommentModel.save()

            return NextResponse.json({
                success:true,
                message:"Your comment has been added!"
            },{status:201})
             
        } catch (error:any) {
            console.log("Error while commenting on post:",error);
            return NextResponse.json({
                success:false,
                message:"Internal server error!"
            },{status:501})
        }
}